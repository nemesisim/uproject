(function() {
	var module = {
		id : "am.ucom.iptv.channelsort.code.GenreSort",
		version : [ 1, 0 ],
		type : "code",
		implementing : {
			loading : {
				id : "com.ericsson.iptv.portal.fw.interfaces.LoadingIF",
				version : [ 1, 0 ],
				publics : {}
			},
			view : {
				id : "com.ericsson.iptv.portal.fw.interfaces.ViewIF",
				version : [ 1, 0 ],
				publics : {}
			}
		},
		dependencies : {
			css : {
				id : "am.ucom.iptv.channelsort.skin.interfaces.SkinIF",
				version : [ 1, 0 ]
			},
			dom : {
				id : "com.ericsson.iptv.portal.fw.interfaces.DomFactoryIF",
				version : [ 1, 0 ]
			},
			mgr : {
				id : "com.ericsson.iptv.portal.fw.core.ViewManager",
				version : [ 1, 0 ]
			},
			broadcastTV : {
				id : "com.ericsson.iptv.portal.coreapps.common.data.interfaces.BroadcastTVIF",
				version : [ 1, 0 ]
			},
			lang : {
				id : "am.ucom.iptv.channelsort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			},
			actionMgr : {
				id : "com.ericsson.iptv.portal.fw.lib.ActionManager",
				version : [ 1, 0 ]
			},
			customPositionsMap : {
				id : "am.ucom.iptv.channelsort.code.CustomSortMap",
				version : [ 1, 0 ]
			},
			log : {
				id : "com.ericsson.iptv.portal.fw.core.Log",
				version : [ 1, 0 ]
			}
		},
		publics : {},
		resources : {
			html : {
				type : "html",
				url : "/am/ucom/iptv/channelsort/view/genre.html"
			}
		}
	};

	var dom;
	var mgr;
	var lang;
	var css;
	var log;
	var actionMgr;	
	var broadcastTV;
	var okCancelList;
	var okCancelTitle;
	var okCancelDescription;
	var listObj;

	var customSortMap;
	var customPositionsMap;
	var customPositionsMapRevert = {};
	var locale = "en-US";

	var popupButtonRedText;
	var popupButtonGreenText;
	var popupButtonYellowText;
	var popupButtonBlueText;
	var orderings = [];

	module.implementing.loading.publics.load = function() {
		dom = module.dependencies.dom.handle
				.getNodeFactory(module.resources.html.handle);
		mgr = module.dependencies.mgr.handle;
		lang = module.dependencies.lang.handle;
		css = module.dependencies.css.handle;
		actionMgr = module.dependencies.actionMgr.handle;
		broadcastTV = module.dependencies.broadcastTV.handle;
		log = module.dependencies.log.handle;
		customSortMap = module.dependencies.customPositionsMap.handle;

		customPositionsMap = customSortMap.getChannelMap();
		customPositionsMapRevert = customSortMap.getChannelMapReverted();
		module.resources.html.handle.firstChild.id = "genre_sort_view";
		
		okCancelList = dom.getListControllerNode("okCancelList", {
			maxVisible : 9,
			pageSize : 1,
			paintItem : I
		});
		okCancelTitle = dom.getTextNode("genereHeaderTitle");
		okCancelDescription = dom.getTextNode("genereHeaderDescription");

		popupButtonRedText = dom.getTextNode("popupButtonRedText");
		popupButtonGreenText = dom.getTextNode("popupButtonGreenText");
		popupButtonYellowText = dom.getTextNode("popupButtonYellowText");
		popupButtonBlueText = dom.getTextNode("popupButtonBlueText");

		orderings.push( {
			position: 1,
			text : "Public Cannels",
			disabled : "default"
		});

		orderings.push( {
			position: 2,
			text : "Music Channels",
			disabled : "false"
		});

		orderings.push( {
			position: 3,
			text : "Entertainment Channels",
			disabled : "true"
		});

		orderings.push( {
			position: 4,
			text : "Educational Channels",
			disabled : "true"
		});

		orderings.push( {
			position: 5,
			text : "Kid's Channels",
			disabled : "true"
		});

		orderings.push( {
			position: 6,
			text : "News Channels",
			disabled : "true"
		});
		
		orderings.push( {
			position: 7,
			text : "Sport Channels",
			disabled : "true"
		});
		
		orderings.push( {
			position: 8,
			text : "Movie Channels",
			disabled : "true"
		});	
		
		orderings.push( {
			position: 9,
			text : "Adult Channels",
			disabled : "true"
		});
		listObj = orderings;
		okCancelTitle.setText("Sort by Genre");
		okCancelDescription.setText("Geners");

		popupButtonRedText.setText("Add");
		popupButtonGreenText.setText("Remove");
		popupButtonYellowText.setText("Edit");
		popupButtonBlueText.setText("Cancel");

		actionMgr.mapActions(module.id, mapActionsFn());
	};
	module.implementing.loading.publics.unload = function() {
	};
	module.implementing.view.publics.onFocus = function() {
	};
	module.implementing.view.publics.onBlur = function() {
		mgr.hide(module.id);
	};
	module.implementing.view.publics.onHide = function() {
		okCancelList.clear();
	};

	function I(P, Q) {
		var R = listObj[Q];
		P.okCancelListInnerItem.setText(R.position + ". " + R.text);
		P.okCancelListInnerItem.clearClass();
		if (R.id) {
			P.okCancelListInnerItem.addClass("selectPopupOption_" + R.id)
		}
		if (R.enabled) {
			P.okCancelListInnerItem.addClass("enabled")
		}
	}
	function showPopupButtons(selectedObj) {

	}

	function performAction(action, args) {
		switch (action) {
		case 'ACTION_PREVIOUS':
			okCancelList.onPreviousKey(args.event);
			showPopupButtons(listObj[okCancelList.getIndex()]);
			break;
		case 'ACTION_NEXT':
			okCancelList.onNextKey(args.event);
			showPopupButtons(listObj[okCancelList.getIndex()]);
			break;
		case 'ACTION_EXIT':
			mgr.hide(module.id);
			break;
		case 'ACTION_OK':			
			mgr.hide(module.id);
			if (listObj[okCancelList.getIndex()].callback) {
				listObj[okCancelList.getIndex()].callback()
			}
			break;
		case 'ACTION_RED':
			swapListItems(okCancelList.getIndex(), 0);
			break;
		case 'ACTION_GREEN':
			swapListItems(okCancelList.getIndex(), 8);
			break;
		case 'ACTION_YELLOW':
			swapListItems(okCancelList.getIndex(), okCancelList.getIndex() - 1);
			break;
		case 'ACTION_BLUE':
			swapListItems(okCancelList.getIndex(), okCancelList.getIndex() + 1);
			break;
		}		
	}

	function swapListItems(from, to){
		var selected = listObj[from];
		var currentText = selected.text;
		selected.text = listObj[to].text;
		listObj[to].text = currentText;
		okCancelList.init(listObj.length, to);	
	}
	module.implementing.view.publics.onShow = function(args) {
		okCancelList.init(listObj.length, 0)
	};
	module.implementing.view.publics.onInput = function(event) {
		actionMgr.matchInput(module.id, event);
		return true;
	};
	module.implementing.view.publics.getDomNode = function() {
		return module.resources.html.handle;
	};
	
	function showInfoPopup(text) {
		mgr.show("com.ericsson.iptv.portal.coreapps.common.popup.view.Popup", {
			id : "channelsOrdering_info_popup",
			text : text
		});
	}
	
	function mapActionsFn() {
		var P = function(S, R) {
			S(true)
		};
		var actions = [ {
			id : "ACTION_PREVIOUS",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_PREVIOUS", {
					"event" : event
				});
			},
			keyEvents : [ "KEY_UP" ]
		}, {
			id : "ACTION_NEXT",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_NEXT", {
					"event" : event
				});
			},
			keyEvents : [ "KEY_DOWN" ]
		}, {
			id : "ACTION_EXIT",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_EXIT");
			},
			keyEvents : [ "KEY_EXIT" ]
		}, {
			id : "ACTION_OK",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_OK");
			},
			keyEvents : [ "KEY_OK" ]
		}, {
			id : "ACTION_RED",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_RED");
			},
			keyEvents : [ "KEY_INFO" ]
		}, {
			id : "ACTION_GREEN",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_GREEN");
			},
			keyEvents : [ "KEY_GREEN" ]
		}, {
			id : "ACTION_YELLOW",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_YELLOW");
			},
			keyEvents : [ "KEY_YELLOW" ]
		}, {
			id : "ACTION_BLUE",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_BLUE");
			},
			keyEvents : [ "KEY_BLUE" ]
		}

		];
		return actions;
	}
	
	return module;
});
