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

		channelsStandard : "Ucom Standard",
		channelsByGenre : "By genre",
		channelsUtv1 : "Utv1",
		channelsUtv2 : "Utv2",
		channelsUtv3 : "Utv3",

		selectSortPopupTitle : "Channel management",
		selectSortPopupDescription : "Sorting",
		genreSortTitle : "Sort by Genre",
		genreSortDescription : "Geners",

		sortAdd : "Add",
		sortRemove : "Remove",
		sortEdit : "Edit",
		sortCancel : "Cancel",

		preferenceNameGenreOrder : "Genre Order",
		preferenceNameCustom1 : "Custom 1",
		preferenceNameCustom2 : "Custom 2",
		preferenceNameCustom3 : "Custom 3",

		labelExit : "Exit/Save",
		labelSetFirst : "Set First",
		labelSetLast : "Set Last",
		labelMoveUp : "Move Up",
		labelMoveDown : "Move Down",

		labelSortingOptionsFor : "Sorting options for ",
		labelChannels : "Channels",
		labelAccessType : "Access Type",
		labelRename : "Rename",
		labelNavigate : "Navigate",

		accessLevelOpen : "Open",
		accessLevelRequirePassword : "Require Password",
		accessLevelBlocked : "Blocked",

		genrePublicCannels : "Public Cannels",
		genreMusicChannels : "Music Channels",
		genreEntertainmentChannels : "Entertainment Channels",
		genreEducationalChannels : "Educational Channels",
		genreKidsChannels : "Kid's Channels",
		genreNewsChannels : "News Channels",
		genreSportChannels : "Sport Channels",
		genreMovieChannels : "Movie Channels",
		genreAdultChannels : "Adult Channels",

		channelsOrderUnableToSaveOrdering : "Unable To Save Ordering",

		channelsUnableToRefresh : "Unable to refresh",
		channelsOrderWrongMethodChosen : "Wrong method chosen.",
		channelsOrderUnableToGetChannelsList : "Unable to load current channels list.",
		channelsOrderUnableToSetChannelsList : "Unable to sort channels list by given method.",
		channelsOrderChannelsListSorted : "Your channels list sorted successfully."
	};

	return module;
});
