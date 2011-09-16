(function() {

	var module = {
		id : "am.ucom.iptv.channel.sort.lang.hy_am.Lang",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
			lang : {
				id : "am.ucom.iptv.channel.sort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			}
		},

		constraints : {
			locale : "hy_am"
		}
	};

	module.implementing.lang.publics = {
		channelsReorderMenuLabel : "Ալիքների դասավորում",

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

		popupChannelNameTitle : "Change Name",
		popupChannelNameText : "Change sorting type name",
		
		channelsOrderUnableToSaveOrdering : "Unable To Save Ordering",

		channelsOrderWrongMethodChosen : "Wrong method chosen.",
		channelsOrderUnableToGetChannelsList : "Unable to load current channels list.",
		channelsOrderUnableToSetChannelsList : "Unable to sort channels list by given method.",
		channelsOrderChannelsListSorted : "Your channels list sorted successfully.",
		channelsUnableToRefresh : "Unable to refresh"
	};

	return module;
});
