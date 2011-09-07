(function() {

	var module = {
		id : "am.ucom.iptv.channelsort.code.CustomSortMap",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
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
			preferenceMgr : {
				id : "com.ericsson.iptv.portal.fw.lib.PreferenceMgr",
				version : [ 1, 0 ]
			}
		},
		publics : {}
	};
	var preferenceMgr;
	var region;
	var log
	
	var channelPositionsMapFull={"1" : "067", "2" : "071", "3" : "069", "4" : "068", "5" : "075", "6" : "072", "7" : "073", "8" : "074", "9" : "070", "10" : "076", "11" : "058", "12" : "064", "13" : "023", "14" : "045", "15" : "046", "16" : "048", "17" : "009", "18" : "012", "19" : "007", "20" : "006", "21" : "036", "22" : "037", "23" : "059", "24" : "063", "25" : "021", "26" : "038", "27" : "040", "28" : "026", "29" : "035", "30" : "066", "31" : "025", "32" : "003", "33" : "054", "34" : "050", "35" : "031", "36" : "060", "37" : "061", "38" : "041", "39" : "062", "40" : "004", "41" : "055", "42" : "002", "43" : "001", "44" : "057", "45" : "056", "46" : "039", "47" : "014", "48" : "034", "49" : "011", "50" : "010", "51" : "020", "52" : "005", "53" : "027", "54" : "053", "55" : "052", "56" : "051", "57" : "024", "58" : "008", "59" : "017", "60" : "016", "61" : "015", "62" : "029", "63" : "028", "64" : "018", "65" : "019", "66" : "065", "67" : "013", "68" : "043", "69" : "042", "70" : "044", "71" : "049", "72" : "047", "73" : "032", "74" : "033", "75" : "022", "76" : "030" }
	var channelPositionsMapFamily={"1" : "067", "2" : "071", "3" : "069", "4" : "068", "5" : "075", "6" : "072", "7" : "073", "8" : "074", "9" : "070", "10" : "076", "11" : "058", "12" : "064", "13" : "023", "14" : "045", "15" : "007", "16" : "036", "17" : "037", "18" : "059", "19" : "063", "20" : "038", "21" : "026", "22" : "035", "23" : "066", "24" : "025", "25" : "003", "26" : "054", "27" : "050", "28" : "031", "29" : "060", "30" : "061", "31" : "041", "32" : "062", "33" : "055", "34" : "057", "35" : "056", "36" : "039", "37" : "014", "38" : "034", "39" : "027", "40" : "053", "41" : "051", "42" : "024", "43" : "017", "44" : "016", "45" : "015", "46" : "029", "47" : "028", "48" : "065", "49" : "032", "50" : "033", "51" : "022" }
	var channelPositionsMapEconom={"1" : "067", "2" : "071", "3" : "069", "4" : "068", "5" : "075", "6" : "072", "7" : "073", "8" : "074", "9" : "070", "10" : "076", "11" : "058", "12" : "064", "13" : "045", "14" : "036", "15" : "059", "16" : "063", "17" : "038", "18" : "026", "19" : "035", "20" : "003", "21" : "054", "22" : "060", "23" : "061", "24" : "062", "25" : "014", "26" : "051", "27" : "017", "28" : "015", "29" : "029", "30" : "028", "31" : "065" }
	var channelPositionsMapBasic={"1" : "067", "2" : "071", "3" : "069", "4" : "068", "5" : "075", "6" : "072", "7" : "073", "8" : "074", "9" : "070", "10" : "076", "11" : "058", "12" : "064", "13" : "023", "14" : "045", "15" : "046", "16" : "048", "17" : "009", "18" : "012", "19" : "007", "20" : "006", "21" : "036", "22" : "037", "23" : "059", "24" : "063", "25" : "021", "26" : "038", "27" : "040", "28" : "026", "29" : "035", "30" : "066", "31" : "025", "32" : "003", "33" : "054", "34" : "050", "35" : "031", "36" : "060", "37" : "061", "38" : "041", "39" : "062", "40" : "004", "41" : "055", "42" : "002", "43" : "001", "44" : "057", "45" : "056", "46" : "039", "47" : "014", "48" : "034", "49" : "011", "50" : "010", "51" : "020", "52" : "005", "53" : "027", "54" : "053", "55" : "052", "56" : "051", "57" : "024", "58" : "008", "59" : "017", "60" : "016", "61" : "015", "62" : "029", "63" : "028", "64" : "018", "65" : "019", "66" : "065", "67" : "013", "68" : "043", "69" : "042", "70" : "044", "71" : "049", "72" : "047", "73" : "032", "74" : "033", "75" : "022", "76" : "030" }

	var channelPositionsMapGenre={ "1" : ["067", "071", "069", "068", "075", "072", "073", "074", "070", "076", "058", "064", "023", "045", "046", "048", "009"], 
								   "2" : ["012", "007", "006", "036", "037", "059", "063", "021"], 
								   "3" : ["038", "040", "026", "035", "066", "025", "003", "054", "050"], 
								   "4" : ["031", "060", "061", "041", "062", "004", "055", "002", "001", "057", "056"], 
								   "5" : ["039", "014", "034", "011", "010"], 
								   "6" : ["020", "005", "027", "053", "052", "051", "024"], 
								   "7" : ["008", "017", "016", "015", "029", "028", "018", "019", "065", "013", "043"], 
								   "8" : ["042", "044", "049", "047", "032", "033"], 
								   "9" : ["022", "030" ]};
	
	var genresMap = { "public" : {text : "Public Cannels", image : "publicChannels"},
		"music" : {text : "Music Channels", image : "musicChannels"},
		"entertainment" : {text : "Entertainment Channels", image : "entertainmentChannels"},
		"educational" : {text : "Educational Channels", image : "educationalChannels"},
		"kids" : {text : "Kid's Channels", image : "kidsChannels"},
		"news" : {text : "News Channels", image : "newsChannels"},
		"sports" : {text : "Sport Channels", image : "sportsChannels"},
		"movie" : {text : "Movie Channels", image : "movieChannels"},
		"adult" : {text : "Adult Channels", image : "adultChannels"}};
	
	var channelPositionsMapFullRevert = {};	
	var channelPositionsMapFamilyRevert = {};
	var channelPositionsMapEconomRevert = {};
	var channelPositionsMapBasicRevert = {};
	
	module.publics.getGenreMap = function(){
		return channelPositionsMapGenre;
	}
	module.publics.getGenresMap = function(){
		return genresMap;
	}	
	module.publics.getChannelMap = function(){
		if(region == "UTV_Full")
			return channelPositionsMapFull;
		else if (region == "UTV_Family")
			return channelPositionsMapFamily;
		else if (region == "UTV_Econom")
			return channelPositionsMapEconom;
		else
			return channelPositionsMapBasic;
	}
	
	module.publics.getChannelMapReverted = function(){
		if(region == "UTV_Full")
			return channelPositionsMapFullRevert;
		else if (region == "UTV_Family")
			return channelPositionsMapFamilyRevert;
		else if (region == "UTV_Econom")
			return channelPositionsMapEconomRevert;
		else
			return channelPositionsMapBasicRevert;
	}
	
	module.implementing.loading.publics.load = function() {
		preferenceMgr = module.dependencies.preferenceMgr.handle;
		log = module.dependencies.log.handle;
		region = preferenceMgr.get("com.ericsson.iptv.portal.user.region");

		for(prop in channelPositionsMapFull)
			channelPositionsMapFullRevert[channelPositionsMapFull[prop]] = prop;	
		for(prop in channelPositionsMapEconom)
			channelPositionsMapEconomRevert[channelPositionsMapEconom[prop]] = prop;	
		for(prop in channelPositionsMapFamily)
			channelPositionsMapFamilyRevert[channelPositionsMapFamily[prop]] = prop;	
		for(prop in channelPositionsMapBasic)
			channelPositionsMapBasicRevert[channelPositionsMapBasic[prop]] = prop;	
	};

	module.implementing.loading.publics.unload = function() {
	};
	
	return module;
});
