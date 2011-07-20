(function() {

	var module = {
		id : "am.ucom.iptv.channelsort.code.ChannelSort",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
			broadcastActionProvider : {
				id : "com.ericsson.iptv.portal.coreapps.common.main.interfaces.BroadcastActionProviderIF",
				version : [ 1, 0 ],
				publics : {}
			},
			loading : {
				id : "com.ericsson.iptv.portal.fw.interfaces.LoadingIF",
				version : [ 1, 0 ],
				publics : {}
			} 
		},
		dependencies : {
			log : {
				id : "com.ericsson.iptv.portal.fw.core.Log",
				version : [ 1, 0 ]
			},
			viewManager : {
				id : "com.ericsson.iptv.portal.fw.core.ViewManager",
				version : [ 1, 0 ]
			},
			lang : {
				id : "am.ucom.iptv.channelsort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			},
			broadcastTV : {
				id : "com.ericsson.iptv.portal.coreapps.common.data.interfaces.BroadcastTVIF",
				version : [ 1, 0 ]
			},
			preferenceMgr : {
				id : "com.ericsson.iptv.portal.fw.lib.PreferenceMgr",
				version : [ 1, 0 ]
			},
			customPositionsMap : {
				id : "am.ucom.iptv.channelsort.code.CustomSortMap",
				version : [ 1, 0 ]
			}
		}
	};

	var viewManager;
	var lang;
	var log;
	var broadcastTV;
	var preferenceMgr;
	var customPositionsMap;

	var locale = "en-US";
	var orderingTypes = [];

	module.implementing.broadcastActionProvider.publics.getActions = function() {
		return [ {
			id : "ACTION_REORDER_CHANNELS",
			localizedLabel : lang.channelsReorderMenuLabel,
			isApplicable : alwaysApplicable,
			invoke : actionChannelSort,
			keyEvents : [],
			optionsMenuEvents : [ "KEY_OK" ]
		} ];
	};

	module.implementing.loading.publics.load = function() {
		viewManager = module.dependencies.viewManager.handle;
		lang = module.dependencies.lang.handle;
		log = module.dependencies.log.handle;
		broadcastTV = module.dependencies.broadcastTV.handle;
		preferenceMgr = module.dependencies.preferenceMgr.handle;
		customPositionsMap = module.dependencies.customPositionsMap.handle.channelPositionsMap;

		// var str = "";
		// for ( var index = 1; index < customPositionsMap.mapSize; index++) {
		// str += channelsPositionsMap.index + ", ";
		// }
		// alert(str);

		preferenceMgr.refresh(function() {
			var pref = preferenceMgr
					.get("com.ericsson.iptv.portal.user.locale")
			if (pref != undefined) {
				locale = pref;
			}
		}, function() {
		});

		orderingTypes.push( {
			text : lang.channelsAlphabetical,
			callback : setOrdering("Alphabetical")
		});

		orderingTypes.push( {
			text : lang.channelsUnsorted,
			callback : setOrdering("Unsorted")
		});

		orderingTypes.push( {
			text : lang.channelsSortUcom,
			callback : setOrdering("Custom")
		});

		orderingTypes.push( {
			text : lang.channelsStandard,
			callback : setOrdering("Standard")
		});

	};

	module.implementing.loading.publics.unload = function() {
	};

	function alwaysApplicable(success, failure, channelInfo, programInfo,
			mediaPlayer) {
		success(true);
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

	function setOrdering(orderingType) {
		if (orderingType == "Unsorted") {
			return function() {
				orderChannels(buildChannelsObjectDefault);
			}
		} else if (orderingType == "Alphabetical") {
			return function() {
				orderChannels(buildChannelsObjectAlphabetical);
			}
		} else if (orderingType == "Standard") {
			return function() {
				orderChannels(buildChannelsObjectStandart);
			}
		} else if (orderingType == "Custom") {
			return function() {
				orderChannels(buildChannelsObjectByCustomOrdering);
			}
		} else {
			return function() {
				showInfoPopup(lang.channelsOrderWrongMethodChosen);
			}
		}
	}

	function actionChannelSort(event, channelInfo, programInfo, mediaPlayer) {
		viewManager
				.show(
						"am.ucom.iptv.channelsort.code.SelectSortPopup",
						//"com.ericsson.iptv.portal.coreapps.common.popup.view.SelectWithInfoPopup",
						{
							id : "broadcast_programId_Popup",
							title : lang.channelsReorderPopupTitle,
							text : lang.channelsReorderPopupText,
							dontShowCancel : false,
							options : orderingTypes
						});
	}

	function showInfoPopup(text) {
		viewManager.show(
				"com.ericsson.iptv.portal.coreapps.common.popup.view.Popup", {
					id : "channelsOrdering_info_popup",
					text : text
				});
	}

	function buildChannelsObjectStandart(channelsInfo) {

		var objStr = {};
		var str = "";

		for ( var index = 0; index < channelsInfo.length; index++) {
			objStr[new String(index + 1)] = channelsInfo[index].channelId;
			str += index + " . " + channelsInfo[index].channelId + ", ";
		}
		str += "----------";
		channelsInfo.sort(sortByCustomMap);
		for ( var index = 0; index < channelsInfo.length; index++) {
			objStr[new String(index + 1)] = channelsInfo[index].channelId;
			str += index + " . " + channelsInfo[index].channelId + ", ";
		}
		alert(str + " ... " + customPositionsMap[0]);
		return objStr;
	}

	function buildChannelsObjectDefault(channelsInfo) {
		channelsInfo.sort(sortById);
		var objStr = {};
		for ( var index = 0; index < channelsInfo.length; index++) {
			objStr[channelsInfo[index].channelId] = channelsInfo[index].channelId;
		}
		return objStr;
	}

	function buildChannelsObjectAlphabetical(channelsInfo) {
		channelsInfo.sort(sortByName);
		var objStr = {};
		for ( var index = 0; index < channelsInfo.length; index++) {
			objStr[new String(index + 1)] = channelsInfo[index].channelId;
		}
		return objStr;
	}

	function buildChannelsObjectByCustomOrdering(channelsInfo) {
		var objStr = {};
		var str = "";
		for ( var index = 0; index < channelsInfo.length; index++) {
			objStr[new String(index + 1)] = customPositionsMap[index];
			str += (index + 1) + " . " + customPositionsMap[index + 1] + ", ";
		}
		alert(str);
		return objStr;
	}

	function sortByName(channelInfo1, channelInfo2) {
		try {
			var prop = "name";
			var str1 = channelInfo1[prop].toLowerCase();
			var str2 = channelInfo2[prop].toLowerCase();

			if (str1 > str2)
				return 1;
			else if (str1 < str2)
				return -1;
		} catch (e) {
			log.error(e);
		}
		return 0;
	}

	function sortById(channelInfo1, channelInfo2) {
		try {
			var prop = "channelId";
			var int1 = parseInt(channelInfo1[prop]);
			var int2 = parseInt(channelInfo2[prop]);

			return int1 - int2;
		} catch (e) {
			log.error(e);
			return 0;
		}
	}  

	function sortByCustomMap(channelInfo1, channelInfo2) {
		try {
			var prop = "channelId";
			var int1 = parseInt(channelInfo1[prop]);
			var int2 = parseInt(channelInfo2[prop]);

			return customPositionsMap[int2] - customPositionsMap[int1];
		} catch (e) {
			log.error(e);
			return 0;
		}
	}
	return module;
});
