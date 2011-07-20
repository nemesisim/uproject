(function() {

	var module = {
		id : "am.ucom.iptv.channelsort.lang.ru_ru.Lang",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
			lang : {
				id : "am.ucom.iptv.channelsort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			}
		},

		constraints : {
			locale : "ru_ru"
		}
	};

	module.implementing.lang.publics = {
		channelsReorderMenuLabel : "Переупорядочить",
		channelsReorderPopupTitle : "Sort By.",
		channelsReorderPopupText : "Choose channels sorting method.",

		channelsUnsorted : "Unsorted",
		channelsStandard : "Standard",
		channelsAlphabetical : "Alphabetical",
		channelsSortUcom : "Ucom Standard",

		channelsUnableToRefresh : "Unable to refresh",
		channelsOrderWrongMethodChosen : "Wrong method chosen.",
		channelsOrderUnableToGetChannelsList : "Unable to load current channels list.",
		channelsOrderUnableToSetChannelsList : "Unable to sort channels list by given method.",
		channelsOrderChannelsListSorted : "Your channels list sorted successfully."
	};

	return module;
});
