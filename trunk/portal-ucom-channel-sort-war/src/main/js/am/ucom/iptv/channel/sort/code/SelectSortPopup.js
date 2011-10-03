(function() {
	var module = {
		id : "am.ucom.iptv.channel.sort.code.SelectSortPopup",
		version : [ 1, 0 ],
		type : "code",
		implementing : {
			broadcastActionProvider : {
				id : "com.ericsson.iptv.portal.coreapps.common.main.interfaces.BroadcastActionProviderIF",
				version : [ 1, 0 ],
				publics : {}
			},
// menu: {
// id:
// "com.ericsson.iptv.portal.coreapps.common.main.interfaces.MainMenuItemIF",
// version: [ 1, 0 ],
// statics: { },
// publics: { }
// },
			loading : {
				id : "com.ericsson.iptv.portal.fw.interfaces.LoadingIF",
				version : [ 1, 0 ],
				publics : {}
			},
			view : {
				id : "com.ericsson.iptv.portal.fw.interfaces.ViewIF",
				version : [ 1, 0 ],
				publics : {}
			},
			preferenceDefinitionIF : {
				id : "com.ericsson.iptv.portal.fw.interfaces.PreferenceDefinitionIF",
				version : [ 1, 0 ],
				publics : {}
			}
		},
		dependencies : {
			css : {
				id : "am.ucom.iptv.channel.sort.skin.interfaces.SkinIF",
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
				id : "am.ucom.iptv.channel.sort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			},
			actionMgr : {
				id : "com.ericsson.iptv.portal.fw.lib.ActionManager",
				version : [ 1, 0 ]
			},
			customPositionsMap : {
				id : "am.ucom.iptv.channel.sort.code.CustomSortMap",
				version : [ 1, 0 ]
			},
			log : {
				id : "com.ericsson.iptv.portal.fw.core.Log",
				version : [ 1, 0 ]
			},
			viewManager : {
				id : "com.ericsson.iptv.portal.fw.core.ViewManager",
				version : [ 1, 0 ]
			},
			preferenceMgr : {
				id : "com.ericsson.iptv.portal.fw.lib.PreferenceMgr",
				version : [ 1, 0 ]
			}
		},
		publics : {},
		resources : {
			html : {
				type : "html",
				url : "/am/ucom/iptv/channel/sort/view/popup.html"
			}
		}
	};


// module.implementing.menu.statics.cssModule =
// "am.ucom.iptv.channel.sort.skin.interfaces.SkinIF";
// module.implementing.menu.statics.iconClass = "sortMenuIcon";
// module.implementing.menu.statics.langModule =
// "am.ucom.iptv.channel.sort.lang.interfaces.LangIF";
// module.implementing.menu.statics.appNameKey = "channelsReorderMenuLabel";
// module.implementing.menu.statics.parentNode =
// "com.ericsson.iptv.portal.coreapps.mycontent.code.MyContent";
// module.implementing.menu.statics.menuPosition = "6";
// module.implementing.menu.publics.activate = function () {
// viewManager
// .show(module.id, {
// "position" : 0
// });
// };
    
	var dom;
	var mgr;
	var lang;
	var css;
	var log;
	var preferenceMgr;
	var actionMgr;
	var viewManager;
	var broadcastTV;
	var okCancelList;
	var okCancelTitle;
	var okCancelDescription;
	var genreOrderList;
	var custom1;
	var custom2;
	var custom3;
	var userChannelList = {};
	var userCustomSortMap = {};

	var tempGenreMap;
	var customSortMap;
	var customPositionsMap;
	var customPositionsMapRevert = {};
	var genrePositionMap = {};
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

	module.implementing.broadcastActionProvider.publics.getActions = function() {
		return [ 
		         {
			id : "ACTION_REORDER_CHANNELS",
			localizedLabel : lang.channelsReorderMenuLabel,
			isApplicable : alwaysApplicable,
			invoke : actionChannelSort,
			keyEvents : [],
			optionsMenuEvents : [ "KEY_OK" ]
		}
		         ];
	};
	function alwaysApplicable(success, failure, channelInfo, programInfo,
			mediaPlayer) {
		success(true);
	}
	function actionChannelSort(event, channelInfo, programInfo, mediaPlayer) {
		viewManager
				.show(module.id,				{
							"position" : 0
						});
	} 
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
		module.resources.html.handle.firstChild.id = "select_sort_popup";
		preferenceMgr = module.dependencies.preferenceMgr.handle;

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

		broadcastTV.getChannelList(function(channels) {
			for ( var i = 0; i < channels.channelList.length; i++) {
				// userChannelList[new
				// String(channels.channelList[i].channelId)] =
				// channels.channelList[i].channelId;
				userChannelList[new String(parseInt(channels.channelList[i].channelId, 10))] = parseInt(channels.channelList[i].channelId, 10);				
			}
		}, function() {
		}, locale);	
		
		// definition for content block preference
		module.implementing.preferenceDefinitionIF.publics.parameters = {
			"am.ucom.portal.iptv.channel.sort.code.ChannelSort.genrePreference" : {
				"displaytext" : lang.preferenceNameGenreOrder,
				"type" : "STRING",
				"basis" : "USER",
				"writeRights" : "NONE",
				"default" : "",
				"position" : 9061
			},
			"am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv1Preference" : {
				"displaytext" : lang.preferenceNameCustom1,
				"type" : "STRING",
				"basis" : "USER",
				"writeRights" : "NONE",
				"default" : "",
				"position" : 9062
			},
			"am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv2Preference" : {
				"displaytext" : lang.preferenceNameCustom2,
				"type" : "STRING",
				"basis" : "USER",
				"writeRights" : "NONE",
				"default" : "",
				"position" : 9063
			},
			"am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv3Preference" : {
				"displaytext" : lang.preferenceNameCustom3,
				"type" : "STRING",
				"basis" : "USER",
				"writeRights" : "NONE",
				"default" : "",
				"position" : 9064
			}
		};
		orderings.push( {
			text : lang.channelsStandard,
			callback : setOrdering("standard"),
			preferenceValue : "default"
		});

		preferenceMgr
				.refresh(
						function() {
							var genrePrefName = "am.ucom.portal.iptv.channel.sort.code.ChannelSort.genrePreference"; 
							orderings
									.push( {
										text : lang.channelsByGenre,
										callback : setOrdering("genre"),
										preferenceValue : preferenceMgr.get(genrePrefName),
										preferenceName : genrePrefName
									});
							loadPreference("am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv1Preference", 1);
							loadPreference("am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv2Preference", 2);
							loadPreference("am.ucom.portal.iptv.channel.sort.code.ChannelSort.utv3Preference", 3);
						}, function() {
						});
		okCancelTitle.setText(lang.selectSortPopupTitle);
		okCancelDescription.setText(lang.selectSortPopupDescription);

		popupButtonRedText.setText(lang.sortAdd);
		popupButtonGreenText.setText(lang.sortRemove);
		popupButtonYellowText.setText(lang.sortEdit);
		popupButtonBlueText.setText(lang.sortCancel);

		actionMgr.mapActions(module.id, mapActionsFn());
	};

	module.implementing.view.publics.onShow = function(args) {
		showPopupButtons(orderings[args.position]);
		okCancelList.init(orderings.length, args.position)
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

	function I(P, index) {
		var R = orderings[index];
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
		if (selectedObj.preferenceValue != "default") {
			if (selectedObj.preferenceValue) {
				popupButtonRed.setClass("popupButtonDisable");
				popupButtonGreen.setClass("popupButtonGreen");
				popupButtonYellow.setClass("popupButtonYellow");
			} else {
				popupButtonRed.setClass("popupButtonRed");
				popupButtonYellow.setClass("popupButtonDisable");
				popupButtonGreen.setClass("popupButtonDisable");
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
			showPopupButtons(orderings[okCancelList.getIndex()]);
			break;
		case 'ACTION_NEXT':
			okCancelList.onNextKey(args.event);
			showPopupButtons(orderings[okCancelList.getIndex()]);
			break;
		case 'ACTION_EXIT':
			mgr.hide(module.id);
			break;
		case 'ACTION_OK':
			if (orderings[okCancelList.getIndex()].preferenceValue) {
				if (orderings[okCancelList.getIndex()].callback) {
					orderings[okCancelList.getIndex()].callback()
				}
				mgr.hide(module.id);
			}
			break;
		case 'ACTION_RED':
			if (!orderings[okCancelList.getIndex()].preferenceValue) {
				if (okCancelList.getIndex() == 1)
					viewManager
							.show("am.ucom.iptv.channel.sort.code.GenreSort",
									{
										"callback" : approveGenreSavePopup,
									});
				else if (okCancelList.getIndex() > 1) {
					viewManager
							.show(
									"am.ucom.iptv.channel.sort.code.CustomAndAccessSort",
									{
										"position" : okCancelList.getIndex(),
										"callback" : approveCustomSavePopup,
										"name" : lang.channelsUtv,
										"channelList" : userChannelList		
									});
				}				
			}
			break;
		case 'ACTION_GREEN':
			if (orderings[okCancelList.getIndex()].preferenceValue && orderings[okCancelList.getIndex()].preferenceValue != "default") {
				removeSortingPopup(okCancelList.getIndex());
			}
			break;
		case 'ACTION_YELLOW':
			if (orderings[okCancelList.getIndex()].preferenceValue && orderings[okCancelList.getIndex()].preferenceValue != "default") {
				if (okCancelList.getIndex() == 1)
					viewManager
							.show("am.ucom.iptv.channel.sort.code.GenreSort",
									{
										"callback" : approveGenreSavePopup,
										"orderList" : orderings[okCancelList
												.getIndex()].preferenceValue
									});
				else if (okCancelList.getIndex() > 1) {
					viewManager
							.show(
									"am.ucom.iptv.channel.sort.code.CustomAndAccessSort",
									{
										"position" : okCancelList.getIndex(),
										"callback" : approveCustomSavePopup,
										"name" : orderings[okCancelList
												.getIndex()].text,
										"orderList" : orderings[okCancelList
												.getIndex()].preferenceValue,
										"channelList" : userChannelList		
									});
				}
			}
			break;
		case 'ACTION_BLUE':
			mgr.hide(module.id);
			break;
		}
	}
	function removeSortingPopup(position){
		mgr.show(
				"com.ericsson.iptv.portal.coreapps.common.popup.view.SelectWithInfoPopup",
				{
					id : "customSort_accessPopup",
					title: lang.removeSortingTitle,
					text : lang.removeSortingText,
					dontShowCancel : "true",
					selected : 0,				
					options : [ {
						id : 0,
						text : lang.popupYes,
						callback : function(){
							preferenceMgr.put(
									orderings[position].preferenceName,
									undefined, "USER");
							preferenceMgr.persist(function() {
								orderings[position].preferenceValue = undefined;
								if(position == 2)
									orderings[position].text = "...";
								if(position == 3)
									orderings[position].text = "...";
								if(position == 4)
									orderings[position].text = "...";
								okCancelList.init(orderings.length, position);
								showPopupButtons(orderings[position]);
							}, function() {
								showInfoPopup(lang.channelsOrderUnableToSaveOrdering);
							});
							viewManager.show(module.id, {
								"position" : position
							});
						}
					}, {
						id : 0,
						text : lang.popupNo,
						callback : function(){
							viewManager.show(module.id, {
								"position" : position
							});
						}
					} ]
				});			
	}
	function loadPreference(preferenceName, position){
		var prefValue = preferenceMgr.get(preferenceName);
		var chName = "...";
		if(prefValue && prefValue.length > 0){
			log.error("old.prefValue = " + prefValue);
			chName = prefValue.substring(0, prefValue.indexOf(","));
			prefValue = prefValue.substring(prefValue.indexOf(",")+1);
			var str = "";
			for ( var i = 0; i < prefValue.length; i++) {
				str +=  prefValue.charCodeAt(i);
				if (i < prefValue.length - 1)
					str += ",";
			}
			prefValue = chName + "," + str;								
			log.error("new.prefValue = " + prefValue);
		}							
		orderings
				.push( {
					text : chName,
					callback : setOrdering("custom", position),
					preferenceValue : prefValue,
					preferenceName : preferenceName
				});		
	}	
	function approveCustomSavePopup(position, channelName, channelsOrder,
			channelsAccessOrder){	
		mgr.show(
			"com.ericsson.iptv.portal.coreapps.common.popup.view.SelectWithInfoPopup",
			{
				id : "customSort_accessPopup",
				title: lang.saveSortingTitle,
				text : lang.saveSortingText,
				dontShowCancel : "true",
				selected : 0,				
				options : [ {
					id : 0,
					text : lang.popupYes,
					callback : function(){
						viewManager.show(module.id, {
							"position" : position
						});
						var str = channelName + ","
						var strCharEncode = channelName + ",";
						for ( var i = 0; i < channelsOrder.length; i++) {
							strCharEncode+=  String.fromCharCode(channelsOrder[i].position)
							str += channelsOrder[i].position							
							// + "-" + channelsAccessOrder[i].access;
							if (i < channelsOrder.length - 1)
								str += ",";
						}
						log.error("old.str = " + strCharEncode.length + " : " + strCharEncode);
						preferenceMgr.put(orderings[position].preferenceName, strCharEncode, "USER");
						preferenceMgr.persist(function() {
							orderings[position].text = channelName;
							orderings[position].preferenceValue = str;
							okCancelList.init(orderings.length, position);
							showPopupButtons(orderings[position]);
						}, function() {
							showInfoPopup(lang.channelsOrderUnableToSaveOrdering);
						});
					}
				}, {
					id : 0,
					text : lang.popupNo,
					callback : function(){
						viewManager.show(module.id, {
							"position" : position
						});
					}
				} ]
			});	
	}
	
	function approveGenreSavePopup(orderingsArray){	
		mgr.show(
			"com.ericsson.iptv.portal.coreapps.common.popup.view.SelectWithInfoPopup",
			{
				id : "customSort_accessPopup",
				title: lang.saveSortingTitle,
				text : lang.saveSortingText,
				dontShowCancel : "true",
				selected : 0,				
				options : [ {
					id : 0,
					text : lang.popupYes,
					callback : function(){
						viewManager.show(module.id, {
							"position" : 1
						});
						var str = "";
						for ( var i = 0; i < orderingsArray.length; i++) {
//							str += orderingsArray[i].position;
							str +=  String.fromCharCode(orderingsArray[i].position)
//							if (i < orderingsArray.length - 1)
//								str += ",";			
						}
						
						preferenceMgr.put(orderings[1].preferenceName, str, "USER");
						preferenceMgr.persist(function() {
							orderings[1].preferenceValue = str;
							showPopupButtons(orderings[1]);
						}, function() {
							showInfoPopup(lang.channelsOrderUnableToSaveOrdering);
						});		
					}
				}, {
					id : 0,
					text : lang.popupNo,
					callback : function(){
						viewManager.show(module.id, {
							"position" : 1
						});
					}
				} ]
			});	
	}
	
	function orderChannels(orderMethod, position) {
		broadcastTV.getChannelList(function(channels) {
			broadcastTV.setChannelList(function() {
				showInfoPopup(lang.channelsOrderChannelsListSorted);
			}, function() {
				showInfoPopup(lang.channelsOrderUnableToSetChannelsList);
			}, orderMethod(channels.channelList, position));
		}, function() {
			showInfoPopup(lang.channelsOrderUnableToGetChannelsList);
		}, locale);
	}

	function setOrdering(type, position) {
		if (type === "standard") {
			return function() {
				orderChannels(buildChannelsObjectStandart);
			}
		} else if (type === "genre") {
			return function() {
				orderChannels(buildChannelsObjectGenre);
			}
		} 
		else if (type === "custom") {
			return function() {
				orderChannels(buildChannelsObjectCustom, position);
			}
		} 		
		else {
			return function() {
				showInfoPopup(lang.channelsOrderWrongMethodChosen);
			}
		}
	}

	function buildChannelsObjectGenre(channelsInfo) {		
		genrePositionMap = customSortMap.getGenresPositionsMap();
		var genreSortOrder = orderings[1].preferenceValue.split(",");;
		tempGenreMap = {};
		var cursorIndex = 1;
		for(var j = 0; j < genreSortOrder.length; j++){
			for(var i = 0; i < genrePositionMap[genreSortOrder[j]].length; i++){					
				tempGenreMap[parseInt(genrePositionMap[genreSortOrder[j]][i], 10)] = cursorIndex;
				cursorIndex++;
			}
		}
		channelsInfo.sort(sortByGenreMap);
		var objStr = {};
		for ( var i = 0; i < channelsInfo.length; i++) {
			objStr[new String(i + 1)] = channelsInfo[i].channelId;
		}
		var str = "";
		for(prop in objStr){
			str += objStr[prop] + ":" + prop + ", ";
		}
		log.error("genre:str = " + str);		

		return objStr;
	}
	function sortByGenreMap(channelInfo1, channelInfo2) {
		try {
			var int1 = tempGenreMap[parseInt(channelInfo1["channelId"], 10)];
			var int2 = tempGenreMap[parseInt(channelInfo2["channelId"], 10)];
			return int1 - int2;
		} catch (e) {
			log.error(e);
			return 0;
		}
	}	
	function buildChannelsObjectCustom(channelsInfo, position) {
		var objStr = {};
		var positionIndex = 1;
		var customPrefObj = orderings[position].preferenceValue.split(",");
		while (positionIndex < customPrefObj.length) {
// var item = customPrefObj[positionIndex].split("-");
// userCustomSortMap[item[0]] = positionIndex;
			userCustomSortMap[parseInt(customPositionsMap[customPrefObj[positionIndex]], 10)] = positionIndex;
			positionIndex ++;
		}
		var str = "";
		for(prop in userCustomSortMap)
			str += userCustomSortMap[prop] + " : " + prop + ", ";
		log.error("str1 = " + str);		
		channelsInfo.sort(sortByCustomMap);
		for ( var i = 0; i < channelsInfo.length; i++) {
			objStr[new String(i + 1)] = channelsInfo[i].channelId;
		}
		str = "";
		for(prop in objStr)
			str += objStr[prop] + " : " + prop + ", ";
		log.error("str2 = " + str);
		return objStr;
	}

	function sortByCustomMap(channelInfo1, channelInfo2) {
		try {
			var int1 = userCustomSortMap[parseInt(channelInfo1["channelId"], 10)];
			var int2 = userCustomSortMap[parseInt(channelInfo2["channelId"], 10)];
			return int1 - int2;
		} catch (e) {
			log.error(e);
			return 0;
		}
	}
	
	function buildChannelsObjectStandart(channelsInfo) {
		var objStr = {};
		channelsInfo.sort(sortByStandartMap);
		for ( var i = 0; i < channelsInfo.length; i++) {
			objStr[new String(i + 1)] = channelsInfo[i].channelId;
		}
		return objStr;
	}

	function sortByStandartMap(channelInfo1, channelInfo2) {
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
			keyEvents : [ "KEY_INFO", "KEY_RED_HACK" ]
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

	function showInfoPopup(text) {
		mgr.show("com.ericsson.iptv.portal.coreapps.common.popup.view.Popup", {
			id : "channelsOrdering_info_popup",
			text : text
		});
	}	
	module.implementing.view.publics.onInput = function(event) {
		actionMgr.matchInput(module.id, event);
		return true;
	};
	module.implementing.view.publics.getDomNode = function() {
		return module.resources.html.handle;
	};
	
	module.implementing.preferenceDefinitionIF.publics.parameters = {};

	return module;
});
