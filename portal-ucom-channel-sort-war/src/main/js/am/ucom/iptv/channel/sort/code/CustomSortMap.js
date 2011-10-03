(function() {

	var module = {
		id : "am.ucom.iptv.channel.sort.code.CustomSortMap",
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
				id : "am.ucom.iptv.channel.sort.lang.interfaces.LangIF",
				version : [ 1, 0 ]
			}
		},
		publics : {}
	};
	var preferenceMgr;
	var region;
	var log;
	var lang;
	var genresMap;
	var accessLevels;
	
	var channelPositionsMapFull={
			"1" : "067",
			"2" : "071",
			"3" : "069",
			"4" : "068",
			"5" : "075",
			"6" : "072",
			"7" : "073",
			"8" : "074",
			"9" : "070",
			"10" : "076",
			"11" : "117",
			"12" : "115",
			"13" : "116",
			"14" : "058",
			"15" : "064",
			"16" : "023",
			"17" : "062",
			"18" : "045",
			"19" : "003",
			"20" : "060",
			"21" : "061",
			"22" : "111",
			"23" : "097",
			"24" : "098",
			"25" : "087",
			"26" : "024",
			"27" : "008",
			"28" : "017",
			"29" : "015",
			"30" : "029",
			"31" : "028",
			"32" : "016",
			"33" : "035",
			"34" : "050",
			"35" : "025",
			"36" : "039",
			"37" : "054",
			"38" : "031",
			"39" : "041",
			"40" : "079",
			"41" : "066",
			"42" : "036",
			"43" : "084",
			"44" : "083",
			"45" : "082",
			"46" : "099",
			"47" : "088",
			"48" : "107",
			"49" : "059",
			"50" : "037",
			"51" : "109",
			"52" : "108",
			"53" : "114",
			"54" : "063",
			"55" : "106",
			"56" : "021",
			"57" : "100",
			"58" : "094",
			"59" : "040",
			"60" : "026",
			"61" : "046",
			"62" : "048",
			"63" : "103",
			"64" : "113",
			"65" : "080",
			"66" : "081",
			"67" : "009",
			"68" : "012",
			"69" : "006",
			"70" : "007",
			"71" : "086",
			"72" : "085",
			"73" : "096",
			"74" : "001",
			"75" : "057",
			"76" : "056",
			"77" : "002",
			"78" : "004",
			"79" : "055",
			"80" : "010",
			"81" : "011",
			"82" : "091",
			"83" : "092",
			"84" : "014",
			"85" : "102",
			"86" : "101",
			"87" : "038",
			"88" : "034",
			"89" : "105",
			"90" : "095",
			"91" : "089",
			"92" : "020",
			"93" : "093",
			"94" : "090",
			"95" : "005",
			"96" : "027",
			"97" : "051",
			"98" : "052",
			"99" : "053",
			"100" : "078",
			"101" : "110",
			"102" : "077",
			"103" : "042",
			"104" : "043",
			"105" : "104",
			"106" : "044",
			"107" : "049",
			"108" : "047",
			"109" : "065",
			"110" : "013",
			"111" : "018",
			"112" : "019",
			"113" : "032",
			"114" : "033",
			"115" : "022",
			"116" : "030",
			"117" : "121",
			"118" : "128",
			"119" : "123",
			"120" : "124",
			"121" : "125",
			"122" : "122",
			"123" : "126",
			"124" : "127",
			"125" : "112",
			"126" : "118",
			"127" : "119",
			"128" : "120",
			"129" : "129",
			"130" : "130",
			"131" : "131",
			"132" : "132"
	}
	var channelPositionsMapGenre={ "1" : ["067", "071", "069", "068", "075", "072", "073", "074", "070", "076", "058", "064", "023", "045", "046", "048", "009"], 
								   "2" : ["012", "007", "006", "036", "037", "059", "063", "021"], 
								   "3" : ["038", "040", "026", "035", "066", "025", "003", "054", "050"], 
								   "4" : ["031", "060", "061", "041", "062", "004", "055", "002", "001", "057", "056"], 
								   "5" : ["039", "014", "034", "011", "010"], 
								   "6" : ["020", "005", "027", "053", "052", "051", "024"], 
								   "7" : ["008", "017", "016", "015", "029", "028", "018", "019", "065", "013", "043"], 
								   "8" : ["042", "044", "049", "047", "032", "033"], 
								   "9" : ["022", "030" ]};

	var channelsNames = {
			"1":{"name":"Հ1","access":"o"},
			"2":{"name":"Հ2","access":"o"},
			"3":{"name":"Շանթ","access":"o"},
			"4":{"name":"Արմենիա TV","access":"o"},
			"5":{"name":"Կենտրոն","access":"o"},
			"6":{"name":"Հայ TV","access":"o"},
			"7":{"name":"Երկիր Մեդիա","access":"o"},
			"8":{"name":"ATV","access":"o"},
			"9":{"name":"ԱՐ","access":"o"},
			"10":{"name":"Դար 21","access":"o"},
			"11":{"name":"Արմնյուզ","access":"o"},
			"12":{"name":"Երևան","access":"o"},
			"13":{"name":"Շողակաթ","access":"o"},
			"14":{"name":"OРТ","access":"o"},
			"15":{"name":"Rossia 1","access":"o"},
			"16":{"name":"РТР Планета","access":"o"},
			"17":{"name":"Россия К (Культура)","access":"o"},
			"18":{"name":"НТВ","access":"o"},
			"19":{"name":"ДТВ","access":"o"},
			"20":{"name":"ТНТ","access":"o"},
			"21":{"name":"СТС","access":"o"},
			"22":{"name":"3 Канал","access":"o"},
			"23":{"name":"Пятый канал","access":"o"},
			"24":{"name":"Домашний","access":"o"},
			"25":{"name":"РЕН ТВ","access":"o"},
			"26":{"name":"Россия 24 (Вести)","access":"o"},
			"27":{"name":"РБК","access":"o"},
			"28":{"name":"Euronews","access":"o"},
			"29":{"name":"BBC Wold News","access":"o"},
			"30":{"name":"France 24","access":"o"},
			"31":{"name":"Deutsche Welle","access":"o"},
			"32":{"name":"CNN","access":"o"},
			"33":{"name":"Кухня ТВ","access":"o"},
			"34":{"name":"Индия ТВ","access":"o"},
			"35":{"name":"World Fashion channel","access":"o"},
			"36":{"name":"TLC","access":"o"},
			"37":{"name":"Man TV","access":"o"},
			"38":{"name":"Комедия ТВ","access":"o"},
			"39":{"name":"НСТ-смешное","access":"o"},
			"40":{"name":"НСТ-страшное","access":"o"},
			"41":{"name":"Усадьба","access":"o"},
			"42":{"name":"Охота и рыбалка","access":"o"},
			"43":{"name":"Ретро","access":"o"},
			"44":{"name":"Драйв","access":"o"},
			"45":{"name":"Здоровое ТВ","access":"o"},
			"46":{"name":"Ностальгия","access":"o"},
			"47":{"name":"ОРТ-Телекафе","access":"o"},
			"48":{"name":"Propoker","access":"o"},
			"49":{"name":"Муз ТВ","access":"o"},
			"50":{"name":"Musicbox RU","access":"o"},
			"51":{"name":"RU TV","access":"o"},
			"52":{"name":"Шансон ТВ","access":"o"},
			"53":{"name":"ОРТ - Музыка","access":"o"},
			"54":{"name":"MTV ","access":"o"},
			"55":{"name":"MTV Hits (UK)","access":"o"},
			"56":{"name":"MTV Dance","access":"o"},
			"57":{"name":"MTV Rocks","access":"o"},
			"58":{"name":"Bridge TV","access":"o"},
			"59":{"name":"MCM Top","access":"o"},
			"60":{"name":"Mezzo","access":"o"},
			"61":{"name":"Кинохит","access":"o"},
			"62":{"name":"Премьера","access":"o"},
			"63":{"name":"КИНО ПЛЮС","access":"o"},
			"64":{"name":"Кинопоказ","access":"o"},
			"65":{"name":"ЕвроКино","access":"o"},
			"66":{"name":"TV XXI","access":"o"},
			"67":{"name":"Viasat TV 1000","access":"o"},
			"68":{"name":"Viasat TV 1000 рус. кино","access":"o"},
			"69":{"name":"Fox Crime","access":"o"},
			"70":{"name":"Fox Life","access":"o"},
			"71":{"name":"AXN Sci-Fi","access":"o"},
			"72":{"name":"Sony Entertainment","access":"o"},
			"73":{"name":"Zone Romantica","access":"o"},
			"74":{"name":"Discovery Channel","access":"o"},
			"75":{"name":"Discovery World","access":"o"},
			"76":{"name":"Discovery Science","access":"o"},
			"77":{"name":"Animal planet","access":"o"},
			"78":{"name":"National Geographic","access":"o"},
			"79":{"name":"NAT GEO WILD","access":"o"},
			"80":{"name":"Viasat Explorer","access":"o"},
			"81":{"name":"Viasat History","access":"o"},
			"82":{"name":"Viasat Action","access":"o"},
			"83":{"name":"Viasat Nature","access":"o"},
			"84":{"name":"Travel Channel","access":"o"},
			"85":{"name":"Zone Reality","access":"o"},
			"86":{"name":"24 Док","access":"o"},
			"87":{"name":"24 Техно","access":"o"},
			"88":{"name":"365 Дней ТВ","access":"o"},
			"89":{"name":"Ocean TV","access":"o"},
			"90":{"name":"Интересное ТВ","access":"o"},
			"91":{"name":"Мать и дитя","access":"o"},
			"92":{"name":"English Club","access":"o"},
			"93":{"name":"Da Vinci Learning","access":"o"},
			"94":{"name":"ОРТ-Время","access":"o"},
			"95":{"name":"Disney Channel","access":"o"},
			"96":{"name":"Boomerang","access":"o"},
			"97":{"name":"Cartoon Network","access":"o"},
			"98":{"name":"Gulli","access":"o"},
			"99":{"name":"Tiji","access":"o"},
			"100":{"name":"Nickelodeon","access":"o"},
			"101":{"name":"Детский мир","access":"o"},
			"102":{"name":"Карусель","access":"o"},
			"103":{"name":"НТВ + Футбол","access":"o"},
			"104":{"name":"НТВ + Наш футбол","access":"o"},
			"105":{"name":"НТВ + Спорт ","access":"o"},
			"106":{"name":"НТВ + Спорт Онлайн","access":"o"},
			"107":{"name":"НТВ + Теннис","access":"o"},
			"108":{"name":"НТВ + Баскетбол","access":"o"},
			"109":{"name":"Россия 2 (Спорт)","access":"o"},
			"110":{"name":"Viasat Sport","access":"o"},
			"111":{"name":"Eurosport","access":"o"},
			"112":{"name":"Eurosport 2","access":"o"},
			"113":{"name":"Авто Плюс","access":"o"},
			"114":{"name":"Боец ТВ","access":"o"},
			"115":{"name":"Playboy TV","access":"o"},
			"116":{"name":"Русская ночь","access":"o"},
			"117":{"name":"High Life HD","access":"o"},
			"118":{"name":"MTVN HD","access":"o"},
			"119":{"name":"Kinopokaz 1-HD","access":"o"},
			"120":{"name":"Kinopokaz 2-HD","access":"o"},
			"121":{"name":"National Geographic HD","access":"o"},
			"122":{"name":"Nat Geo Wild HD","access":"o"},
			"123":{"name":"HD Sport","access":"o"},
			"124":{"name":"Eurosport HD","access":"o"},
			"125":{"name":"Russia Today","access":"o"},
			"126":{"name":"2X2","access":"o"},
			"127":{"name":"TV3","access":"o"},
			"128":{"name":"Discovery Investigation","access":"o"},
			"129":{"name":"Teleputeshestviya HD","access":"o"},
			"130":{"name":"Zhenskiy Mir HD","access":"o"},
			"131":{"name":"SPORT 1 HD","access":"o"},
			"132":{"name":"HD Life","access":"o"}
		};
	var channelPositionsMapFullRevert = {};	
	
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
		return channelPositionsMapFull;
	}
	
	module.publics.getChannelMapReverted = function(){
		return channelPositionsMapFullRevert;
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
	};

	module.implementing.loading.publics.unload = function() {
	};
	
	return module;
});
