(function () {

    var module = {
        id: "am.ucom.iptv.channelsort.skin.esdp.css.Skin16x9",
        version: [ 1, 0 ],
        type: "code",

        implementing: {
            skin : {
                id :"am.ucom.iptv.channelsort.skin.interfaces.SkinIF",
                version : [ 1, 0 ]
            }
        },
        
        resources: {
            css : {
                type :"css",
                url :"/am/ucom/iptv/channelsort/skin/esdp/css/skin.css"
            }
        },
       
        constraints: {
            "aspect": "16x9"
        }
    };

    return module;
});
