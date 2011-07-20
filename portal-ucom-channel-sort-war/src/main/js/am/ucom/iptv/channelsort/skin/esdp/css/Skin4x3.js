(function () {

    var module = {
        id: "am.ucom.iptv.channelsort.skin.esdp.css.Skin4x3",
        version: [ 1, 0 ],
        type: "code",    
 
        implementing: {
            skin: { id: "am.ucom.iptv.channelsort.skin.interfaces.SkinIF", version: [ 1, 0 ] }
        }, 
              
        resources: {
            css01: { type: "css", url: "/am/ucom/iptv/channelsort/skin/esdp/css/skin.css" },
            css02: { type: "css", url: "/am/ucom/iptv/channelsort/skin/esdp/css/skin_4x3.css" }
        },
       
        constraints: {
            "aspect": "4x3"
        }
    };

    return module;
});

