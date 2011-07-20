
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
		dependencies : {},
		publics : {}
	};

	module.publics.channelPositionsMap = {
		1 : 005,
		2 : 009,
		3 : 001,
		4 : 006,
		5 : 003,
		6 : 008,
		7 : 011,
		8 : 002,
		9 : 010,
		10 : 007
	};

	var asd = {
		1 : 067,
		2 : 071,
		3 : 069,
		4 : 068,
		5 : 075,
		6 : 072,
		7 : 073,
		8 : 074,
		9 : 070,
		10 : 076,
		11 : 058,
		12 : 064,
		13 : 045,
		14 : 036,
		15 : 059,
		16 : 063,
		17 : 038,
		18 : 026,
		19 : 035,
		20 : 003,
		21 : 054,
		22 : 060,
		23 : 061,
		24 : 062,
		25 : 014,
		26 : 051,
		27 : 017,
		28 : 015,
		29 : 024,
		30 : 028,
		31 : 065,
		32 : 023,
		33 : 025,
		34 : 055,
		35 : 057,
		36 : 056,
		37 : 039,
		38 : 034,
		39 : 066,
		40 : 031,
		41 : 050,
		42 : 041,
		43 : 037,
		44 : 027,
		45 : 053,
		46 : 024,
		47 : 016,
		48 : 032,
		49 : 033,
		50 : 022,
		51 : 007,
		52 : 006,
		53 : 046,
		54 : 048,
		55 : 009,
		56 : 012,
		57 : 021,
		58 : 040,
		59 : 004,
		60 : 002,
		61 : 001,
		62 : 011,
		63 : 010,
		64 : 020,
		65 : 005,
		66 : 052,
		67 : 008,
		68 : 018,
		69 : 019,
		70 : 013,
		71 : 043,
		72 : 042,
		73 : 044,
		74 : 049,
		75 : 047,
		76 : 030
	};

	module.implementing.loading.publics.load = function() {
	};

	module.implementing.loading.publics.unload = function() {
	};

	return module;
});
