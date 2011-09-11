(function() {
	var module = {
		id : "am.ucom.iptv.channelsort.code.CustomAndAccessSort",
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
				url : "/am/ucom/iptv/channelsort/view/custom.html"
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
	var customSortList;
	var customSortAccessList;
	var okCancelTitle;
	var channelName = "";
	var channelLabel = "";
	var customChannelsLabel;
	var customAccessTypeLabel;
	var customOkLabel;
	var customNavigateLabel;
	var callback;
	var channelsNames;
	var accessLevels;

	var customSortMap;
	var customPositionsMap;
	var customPositionsMapRevert = {};
	var locale = "en-US";
	var initOrderList = true;

	var popupButtonRedText;
	var popupButtonGreenText;
	var popupButtonYellowText;
	var popupButtonBlueText;
	var channelsOrder = [];
	var channelsAccessOrder = [];
	var callbackPosition;

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
		channelsNames = customSortMap.getChannelsNames();
		accessLevels = customSortMap.getAccessLevels();

		module.resources.html.handle.firstChild.id = "custom_sort_view";

		customSortList = dom.getListControllerNode("customSortList", {
			maxVisible : 10,
			pageSize : 1,
			paintItem : paintItem
		});

		customSortAccessList = dom.getListControllerNode(
				"customSortAccessList", {
					maxVisible : 10,
					pageSize : 1,
					paintItem : paintItemAccess
				});
		customSortAccessList.hideSelector();
		okCancelTitle = dom.getTextNode("customHeaderTitle");
		customChannelsLabel = dom.getTextNode("customChannelsLabel");
		customAccessTypeLabel = dom.getTextNode("customAccessTypeLabel");
		customOkLabel = dom.getTextNode("customOkLabel");
		customChannelsLabel = dom.getTextNode("customChannelsLabel");
		customNavigateLabel = dom.getTextNode("customNavigateLabel");

		popupButtonRedText = dom.getTextNode("customButtonRedText");
		popupButtonGreenText = dom.getTextNode("customButtonGreenText");
		popupButtonYellowText = dom.getTextNode("customButtonYellowText");
		popupButtonBlueText = dom.getTextNode("customButtonBlueText");

		channelLabel = "Sorting options for "
		customChannelsLabel.setText("Channels");
		customAccessTypeLabel.setText("Access Type");
		customOkLabel.setText("Rename");
		customNavigateLabel.setText("Navigate");

		popupButtonRedText.setText("Set First");
		popupButtonGreenText.setText("Set Last");
		popupButtonYellowText.setText("Move Up");
		popupButtonBlueText.setText("Move Down");

		dom.getTextNode("customExitLabel").setText("Save/Exit");

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
		customSortList.clear();
		customSortAccessList.clear();
	};

	function paintItem(P, Q) {
		var R = channelsOrder[Q];
		P.customSortListInnerItem.setText(R.position + ". " + R.text);
		P.customSortListInnerItem.clearClass();
		if (R.id) {
			P.customSortListInnerItem.addClass("selectPopupOption_" + R.id)
		}
		if (R.enabled) {
			P.customSortListInnerItem.addClass("enabled")
		}
	}
	function paintItemAccess(P, Q) {
		var R = channelsAccessOrder[Q];
		P.customSortAccessListInnerItem.setText(R.text);
		P.customSortAccessListInnerItem.clearClass();
		if (R.id) {
			P.customSortAccessListInnerItem.addClass("selectPopupOption_"
					+ R.id)
		}
		if (R.enabled) {
			P.customSortAccessListInnerItem.addClass("enabled")
		}
	}
	function selectColumn(direction) {
		if (direction === "right") {
			mgr
					.show(
							"com.ericsson.iptv.portal.coreapps.common.popup.view.SelectPopup",
							{
								id : "customSort_accessPopup",
								text : "Select Access",
								enabled : "false",
								callback : function() {
									alert("Select Access");
								},
								options : [ "Open", "Blocked", "Esiminch" ]
							});

			// customSortAccessList.showSelector();
			// customSortList.hideSelector();
		}
		// if (direction === "left") {
		// customSortAccessList.hideSelector();
		// customSortList.showSelector();
		// }
	}

	function performAction(action, args) {
		switch (action) {
		case 'ACTION_PREVIOUS':
			customSortList.onPreviousKey(args.event);
			customSortAccessList.onPreviousKey(args.event);
			break;
		case 'ACTION_NEXT':
			customSortList.onNextKey(args.event);
			customSortAccessList.onNextKey(args.event);
			break;
		case 'ACTION_LEFT':
			// selectColumn("left");
			break;
		case 'ACTION_RIGHT':
			// selectColumn("right");
			break;
		case 'ACTION_EXIT':
			if (callback)
				callback(callbackPosition, channelName, channelsOrder,
						channelsAccessOrder);
			mgr.hide(module.id);
			break;
		case 'ACTION_OK':
			mgr
					.show(
							"com.ericsson.iptv.portal.coreapps.common.popup.view.InputPopup",
							{
								id : "customSort_inputPopup",
								title : "Change Name",
								text : "Change sorting type name",
								value : channelName,
								type : "STRING",
								callback : function(value) {
									if (value)
										channelName = value;
									mgr
											.show(
													"am.ucom.iptv.channelsort.code.CustomAndAccessSort",
													{
														"callback" : callback,
														"name" : channelName,
														"position" : callbackPosition
													});
								}
							});
			break;
		case 'ACTION_RED':
			swapListItems(customSortList.getIndex(), 0);
			break;
		case 'ACTION_GREEN':
			swapListItems(customSortList.getIndex(), channelsOrder.length - 1);
			break;
		case 'ACTION_YELLOW':
			swapListItems(customSortList.getIndex(),
					customSortList.getIndex() - 1);
			break;
		case 'ACTION_BLUE':
			swapListItems(customSortList.getIndex(),
					customSortList.getIndex() + 1);
			break;
		}
	}

	function swapListItems(from, to) {
		var selected = channelsOrder[from];
		var currentText = selected.text;
		var currentPosition = selected.position;
		var currentAccess = channelsAccessOrder[from].text;
		
		if (from < to)
			for ( var i = from; i < to; i++) {
				if (channelsOrder[i + 1]) {
					channelsOrder[i].text = channelsOrder[i + 1].text;
					channelsOrder[i].position = channelsOrder[i + 1].position;
					channelsAccessOrder[i].text = channelsAccessOrder[i + 1].text;
				} else {
					return;
				}
			}
		else
			for ( var i = from; i > to; i--) {
				if (channelsOrder[i - 1]) {
					channelsOrder[i].text = channelsOrder[i - 1].text;
					channelsOrder[i].position = channelsOrder[i - 1].position;
					channelsAccessOrder[i].text = channelsAccessOrder[i - 1].text;
				} else {
					return;
				}
			}
		channelsOrder[to].text = currentText;
		channelsOrder[to].position = currentPosition;
		channelsAccessOrder[to].text = currentAccess;
		customSortList.init(channelsOrder.length, to);
		customSortAccessList.init(channelsAccessOrder.length, to);
	}

	module.implementing.view.publics.onShow = function(args) {
		callback = args.callback;
		callbackPosition = args.position;
		if (args.orderList) {
			var positionIndex = 1;
			var orderList = args.orderList.split(",");
			channelName = orderList[0];
			while (positionIndex < orderList.length) {
				var item = orderList[positionIndex].split("-");
				channelsOrder.push( {
					position : item[0],
					text : channelsNames[item[0]].name
				});
				channelsAccessOrder.push( {
					text : accessLevels[item[1]],
					access : item[1]
				});
				positionIndex++;
			}
		} else {
			channelName = args.name;
			for ( var chNumber in channelsNames) {
				var channelObject = channelsNames[chNumber];
				channelsOrder.push( {
					position : chNumber,
					text : channelObject.name
				});
				channelsAccessOrder.push( {
					text : accessLevels[channelObject.access],
					access : channelObject.access
				});
			}
		}
		okCancelTitle.setText(channelLabel + channelName);
		customSortList.init(channelsOrder.length, 0);
		customSortAccessList.init(channelsAccessOrder.length, 0);
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
			id : "ACTION_LEFT",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_LEFT", {
					"event" : event
				});
			},
			keyEvents : [ "KEY_LEFT" ]
		}, {
			id : "ACTION_RIGHT",
			localizedLabel : undefined,
			isApplicable : P,
			invoke : function(event) {
				performAction("ACTION_RIGHT", {
					"event" : event
				});
			},
			keyEvents : [ "KEY_RIGHT" ]
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
		} ];
		return actions;
	}

	return module;
});
