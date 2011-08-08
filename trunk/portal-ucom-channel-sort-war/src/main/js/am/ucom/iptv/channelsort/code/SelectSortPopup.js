(function() {
	var module = {
		id : "am.ucom.iptv.channelsort.code.SelectSortPopup",
		// id: "am.ucom.iptv.channelsort.common.popup.view.SelectWithInfoPopup",
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
			},
			viewManager : {
				id : "com.ericsson.iptv.portal.fw.core.ViewManager",
				version : [ 1, 0 ]
			}
		},
		publics : {},
		resources : {
			html : {
				type : "html",
				url : "/am/ucom/iptv/channelsort/view/popup.html"
			}
		}
	};

	var dom;
	var mgr;
	var lang;
	var css;
	var log;
	var actionMgr;
	var viewManager;
	var broadcastTV;
	var okCancelList;
	var okCancelTitle;
	var okCancelDescription;
	var listObj;

	var customSortMap;
	var customPositionsMap;
	var customPositionsMapRevert = {};
	var locale = "en-US";

	var popupButtonRed;
	var popupButtonGreen;
	var popupButtonYellow;
	var popupButtonBlue;

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
		viewManager = module.dependencies.viewManager.handle;
		customSortMap = module.dependencies.customPositionsMap.handle;

		customPositionsMap = customSortMap.getChannelMap();
		customPositionsMapRevert = customSortMap.getChannelMapReverted();

		okCancelList = dom.getListControllerNode("okCancelList", {
			maxVisible : 8,
			pageSize : 1,
			paintItem : I
		});
		okCancelTitle = dom.getTextNode("okCancelTitle");
		okCancelDescription = dom.getTextNode("okCancelDescription");

		popupButtonRed = dom.getImageNode("popupButtonRed");
		popupButtonGreen = dom.getImageNode("popupButtonGreen");
		popupButtonYellow = dom.getImageNode("popupButtonYellow");
		popupButtonBlue = dom.getImageNode("popupButtonBlue");

		popupButtonRedText = dom.getTextNode("popupButtonRedText");
		popupButtonGreenText = dom.getTextNode("popupButtonGreenText");
		popupButtonYellowText = dom.getTextNode("popupButtonYellowText");
		popupButtonBlueText = dom.getTextNode("popupButtonBlueText");

		orderings.push( {
			text : "Ucom Standard",
			callback : setOrdering("Standard"),
			disabled : "default"
		});

		orderings.push( {
			text : "By genre",
			callback : setOrdering("By genre"),
			disabled : "false"
		});

		orderings.push( {
			text : "Custom 1",
			callback : setOrdering("Custom 1"),
			disabled : "true"
		});

		orderings.push( {
			text : "Custom 2",
			callback : setOrdering("Custom 2"),
			disabled : "true"
		});

		orderings.push( {
			text : "Custom 3",
			callback : setOrdering("Custom 3"),
			disabled : "true"
		});
		listObj = orderings;
		okCancelTitle.setText("Channel management");
		okCancelDescription.setText("Sorting");

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
		P.okCancelListInnerItem.setText(R.text || "\u00A0");
		P.okCancelListInnerItem.clearClass();
		if (R.id) {
			P.okCancelListInnerItem.addClass("selectPopupOption_" + R.id)
		}
		if (R.enabled) {
			P.okCancelListInnerItem.addClass("enabled")
		}
	}
	function showPopupButtons(selectedObj) {
		if (selectedObj.disabled != "default") {
			if (selectedObj.disabled === "true") {
				popupButtonRed.setClass("popupButtonRed");
				popupButtonYellow.setClass("popupButtonDisable");
				popupButtonGreen.setClass("popupButtonDisable");
			} else {
				popupButtonRed.setClass("popupButtonDisable");
				popupButtonGreen.setClass("popupButtonGreen");
				popupButtonYellow.setClass("popupButtonYellow");
			}
		} else {
			popupButtonRed.setClass("popupButtonDisable");
			popupButtonYellow.setClass("popupButtonDisable");
			popupButtonGreen.setClass("popupButtonDisable");
		}
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
			if (listObj[okCancelList.getIndex()].disabled === "true") {

			}
			break;
		case 'ACTION_GREEN':
			if (listObj[okCancelList.getIndex()].disabled === "false") {
				alert("G" + listObj[okCancelList.getIndex()].text);
			}
			break;
		case 'ACTION_YELLOW':
			if (listObj[okCancelList.getIndex()].disabled === "false") {
				viewManager
				 .show("am.ucom.iptv.channelsort.code.GenreSort");		
			}
			break;
		case 'ACTION_BLUE':
			mgr.hide(module.id);
			break;
		}
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

	function showInfoPopup(text) {
		mgr.show("com.ericsson.iptv.portal.coreapps.common.popup.view.Popup", {
			id : "channelsOrdering_info_popup",
			text : text
		});
	}

	function orderChannels(orderMethod) {
		broadcastTV.getChannelList(function(channels) {
			broadcastTV.setChannelList(function() {
				showInfoPopup(lang.channelsOrderChannelsListSorted);
			}, function() {
				showInfoPopup(lang.channelsOrderUnableToSetChannelsList);
			}, orderMethod(channels.channelList));
		}, function() {
			showInfoPopup(lang.channelsOrderUnableToGetChannelsList);
		}, locale);
	}

	function setOrdering(type) {
		if (type == "Standard") {
			return function() {
				orderChannels(buildChannelsObjectStandart);
			}
		} else {
			return function() {
				showInfoPopup(lang.channelsOrderWrongMethodChosen);
			}
		}
	}

	function buildChannelsObjectStandart(channelsInfo) {
		var objStr = {};
		channelsInfo.sort(sortByCustomMap);
		for ( var i = 0; i < channelsInfo.length; i++) {
			objStr[new String(i + 1)] = channelsInfo[i].channelId;
		}
		return objStr;
	}

	function sortByCustomMap(channelInfo1, channelInfo2) {
		try {
			var prop = "channelId";
			var int1 = parseInt(customPositionsMapRevert[channelInfo1[prop]],
					10);
			var int2 = parseInt(customPositionsMapRevert[channelInfo2[prop]],
					10);
			return int1 - int2;
		} catch (e) {
			log.error(e);
			return 0;
		}
	}

	module.implementing.view.publics.onShow = function(args) {
		showPopupButtons(listObj[0]);

		module.resources.html.handle.firstChild.id = args.id;
		okCancelList.init(listObj.length, 0)
	};
	module.implementing.view.publics.onInput = function(event) {
		actionMgr.matchInput(module.id, event);
		return true;
	};
	module.implementing.view.publics.getDomNode = function() {
		return module.resources.html.handle;
	};
	return module;
});
