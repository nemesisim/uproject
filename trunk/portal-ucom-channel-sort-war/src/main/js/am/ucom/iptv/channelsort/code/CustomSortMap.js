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
			},
			lang : {
				id : "am.ucom.iptv.channelsort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			}
		},
		publics : {}
	};
	var preferenceMgr;
	var region;
	var log;
	var lang;
	
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
	
	var genresMap;

	var channelsNames = {
			"1":{"name" : "Հ1", "access":"o"},
			"2":{"name" : "Հ2", "access":"o"},
			"3":{"name" : "Շանթ", "access":"o"},
			"4":{"name" : "Արմենիա TV", "access":"o"},
			"5":{"name" : "Կենտրոն", "access":"o"},
			"6":{"name" : "12", "access":"o"},
			"7":{"name" : "Երկիր Մեդիա", "access":"o"},
			"8":{"name" : "ATV", "access":"o"},
			"9":{"name" : "ԱՐ", "access":"o"},
			"10":{"name" : "ОРТ", "access":"o"},
			"11":{"name" : "Rossia 1", "access":"o"},
			"12":{"name" : "РТР Планетa ", "access":"o"},
			"13":{"name" : "HTB", "access":"o"},
			"14":{"name" : "ДТВ", "access":"o"},
			"15":{"name" : "TNT", "access":"o"},
			"16":{"name" : "CTC", "access":"o"},
			"17":{"name" : "Культура/Россия К ", "access":"o"},
			"18":{"name" : "Դար 21", "access":"o"},
			"19":{"name" : "Musicbox RU", "access":"o"},
			"20":{"name" : "Муз ТВ ", "access":"o"},
			"21":{"name" : "MTV", "access":"o"},
			"22":{"name" : "MTV Dance", "access":"o"},
			"23":{"name" : "Bridge TV (24 Techno)", "access":"o"},
			"24":{"name" : "MCM Top", "access":"o"},
			"25":{"name" : "Mezzo", "access":"o"},
			"26":{"name" : "Охота и рыбалка", "access":"o"},
			"27":{"name" : "Кухня ТВ", "access":"o"},
			"28":{"name" : "Усадьба", "access":"o"},
			"29":{"name" : "World Fashion channel", "access":"o"},
			"30":{"name" : "Man TV", "access":"o"},
			"31":{"name" : "Индия ТВ", "access":"o"},
			"32":{"name" : "Коммедия ТВ", "access":"o"},
			"33":{"name" : "HCT", "access":"o"},
			"34":{"name" : "TLC", "access":"o"},
			"35":{"name" : "National Geographic", "access":"o"},
			"36":{"name" : "NAT GEO WILD", "access":"o"},
			"37":{"name" : "Animal planet", "access":"o"},
			"38":{"name" : "Discovery Channel", "access":"o"},
			"39":{"name" : "Discovery World", "access":"o"},
			"40":{"name" : "Discovery Science", "access":"o"},
			"41":{"name" : "Travel Channel", "access":"o"},
			"42":{"name" : "365 ДНЕЙ ТВ", "access":"o"},
			"43":{"name" : "VIASAT HISTORY", "access":"o"},
			"44":{"name" : "VIASAT EXPLORER", "access":"o"},
			"45":{"name" : "English Club", "access":"o"},
			"46":{"name" : "Disney channel", "access":"o"},
			"47":{"name" : "Boomerang", "access":"o"},
			"48":{"name" : "Tiji", "access":"o"},
			"49":{"name" : "Gulli", "access":"o"},
			"50":{"name" : "Cartoon Network", "access":"o"},
			"51":{"name" : "Вести/Россия 24", "access":"o"},
			"52":{"name" : "РБК", "access":"o"},
			"53":{"name" : "Euronews", "access":"o"},
			"54":{"name" : "CNN", "access":"o"},
			"55":{"name" : "BBC World News", "access":"o"},
			"56":{"name" : "France 24", "access":"o"},
			"57":{"name" : "Deutsche Welle", "access":"o"},
			"58":{"name" : "Eurosport", "access":"o"},
			"59":{"name" : "Eurosport 2", "access":"o"},
			"60":{"name" : "Спорт/Россия 2", "access":"o"},
			"61":{"name" : "VIASAT SPORT", "access":"o"},
			"62":{"name" : "НТВ+Наш футбол", "access":"o"},
			"63":{"name" : "НТВ+ футбол", "access":"o"},
			"64":{"name" : "НТВ+спорт online", "access":"o"},
			"65":{"name" : "НТВ+ Теннис", "access":"o"},
			"66":{"name" : "НТВ+ Баскетбол", "access":"o"},
			"67":{"name" : "Авто плюс", "access":"o"},
			"68":{"name" : "БОЕЦ ТВ ", "access":"o"},
			"69":{"name" : "Кинохит", "access":"o"},
			"70":{"name" : "Премьера", "access":"o"},
			"71":{"name" : "VIASAT ТВ 1000", "access":"o"},
			"72":{"name" : "VIASAT ТВ 1000 рус.", "access":"o"},
			"73":{"name" : "FOX Life", "access":"o"},
			"74":{"name" : "FOX CRIME", "access":"b"},
			"75":{"name" : "Playboy TV", "access":"r"},
			"76":{"name" : "Русская ночь ", "access":"r"}
		};
	var accessLevels;
	
	var channelPositionsMapFullRevert = {};	
	var channelPositionsMapFamilyRevert = {};
	var channelPositionsMapEconomRevert = {};
	var channelPositionsMapBasicRevert = {};
	
	module.publics.getGenresPositionsMap = function(){
		return channelPositionsMapGenre;
	}
	module.publics.getGenresMap = function(){
		return genresMap;
	}	
	module.publics.getChannelsNames = function(){
		return channelsNames;
	}
	module.publics.getAccessLevels = function(){
		return accessLevels;
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
		lang = module.dependencies.lang.handle;

		genresMap = { "1" : {text : lang.genrePublicCannels, image : "publicChannels"},
				"2" : {text : lang.genreMusicChannels, image : "musicChannels"},
				"3" : {text : lang.genreEntertainmentChannels, image : "entertainmentChannels"},
				"4" : {text : lang.genreEducationalChannels, image : "educationalChannels"},
				"5" : {text : lang.genreKidsChannels, image : "kidsChannels"},
				"6" : {text : lang.genreNewsChannels, image : "newsChannels"},
				"7" : {text : lang.genreSportChannels, image : "sportsChannels"},
				"8" : {text : lang.genreMovieChannels, image : "movieChannels"},
				"9" : {text : lang.genreAdultChannels, image : "adultChannels"}};
		accessLevels = {
				"o" : lang.accessLevelOpen,
				"r" : lang.accessLevelRequirePassword,
				"b" : lang.accessLevelBlocked
			};
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
