(function() {

	var module = {
		id : "am.ucom.iptv.channelsort.lang.en_us.Lang",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
			lang : {
				id : "am.ucom.iptv.channelsort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			}
		},

		constraints : {
			locale : "en_us"
		}
	};

	module.implementing.lang.publics = {
		channelsReorderMenuLabel : "Sort channels",
		channelsReorderPopupTitle : "Sort By.",
		channelsReorderPopupText : "Choose channels sorting method.",

		channelsUnsorted : "Unsorted",
		channelsStandard : "Standard",
		channelsAlphabetical : "Alphabetical",
		channelsSortUcom : "Ucom Standard",
		
		channelsOrderWrongMethodChosen : "Wrong method chosen.",
		channelsOrderUnableToGetChannelsList : "Unable to load current channels list.",
		channelsOrderUnableToSetChannelsList : "Unable to sort channels list by given method.",
		channelsOrderChannelsListSorted : "Your channels list sorted successfully.",
		channelsUnableToRefresh : "Unable to refresh."
	};

	return module;
});
