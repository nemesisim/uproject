(function(){
    var module = {
        id: "am.ucom.iptv.channelsort.code.SelectSortPopup",
    	//id: "am.ucom.iptv.channelsort.common.popup.view.SelectWithInfoPopup",	
        version: [1, 0],
        type: "code",
        implementing: {
            loading: {
                id: "com.ericsson.iptv.portal.fw.interfaces.LoadingIF",
                version: [1, 0],
                publics: {}
            },
            view: {
                id: "com.ericsson.iptv.portal.fw.interfaces.ViewIF",
                version: [1, 0],
                publics: {}
            }
        },
        dependencies: {
            css: {
                id: "am.ucom.iptv.channelsort.skin.interfaces.SkinIF",
                version: [1, 0]
            },
            dom: {
                id: "com.ericsson.iptv.portal.fw.interfaces.DomFactoryIF",
                version: [1, 0]
            },
            mgr: {
                id: "com.ericsson.iptv.portal.fw.core.ViewManager",
                version: [1, 0]
            },
            lang: {
                id: "com.ericsson.iptv.portal.coreapps.common.lang.interfaces.MessagesIF",
                version: [1, 0]
            },
            actionMgr: {
                id: "com.ericsson.iptv.portal.fw.lib.ActionManager",
                version: [1, 0]
            }
        },
        publics: {},
        resources: {
            html: {
                type: "html",
                url: "/am/ucom/iptv/channelsort/view/popup.html"
            }
        }
    };
    var dom;
    var mgr;
    var lang;
    var css;
    var actionMgr;
    var okCancelList;
    var okCancelTitle;
    var okCancelDescription;
    var J;
    var A;
    var cancelObj;
    
    function I(P, Q){
        var R = J[Q];
        P.okCancelListInnerItem.setText(R.text || "\u00A0");
        P.okCancelListInnerItem.clearClass();
        if (R.id) {
            P.okCancelListInnerItem.addClass("selectPopupOption_" + R.id)
        }
        if (R.enabled) {
            P.okCancelListInnerItem.addClass("enabled")
        }
    }
    function E(){
        var P = function(S, R){
            S(true)
        };
        var actions = [{
            id: "ACTION_PREVIOUS",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
                okCancelList.onPreviousKey(event)
            },
            keyEvents: ["KEY_UP"]
        }, {
            id: "ACTION_NEXT",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
                okCancelList.onNextKey(event)
            },
            keyEvents: ["KEY_DOWN"]
        }, {
            id: "ACTION_EXIT",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
                mgr.hide(module.id);
                A()
            },
            keyEvents: ["KEY_EXIT"]
        }, {
            id: "ACTION_OK",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
                var R = J[okCancelList.getIndex()];
                mgr.hide(module.id);
                if (R.callback) {
                    R.callback()
                }
            },
            keyEvents: ["KEY_OK"]
        }
        
        , {
            id: "ACTION_RED",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
        		if(popupButtonRed.getClass() == "popupButtonDisable")
        			popupButtonRed.setClass("popupButtonRed");
        		else
        			popupButtonRed.setClass("popupButtonRed");
            },
            keyEvents: ["KEY_RED"]
        }, {
            id: "ACTION_GREEN",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
        		alert(popupButtonGreen.getClass());
	    		if(popupButtonGreen.getClass() == "popupButtonDisable")
	    			popupButtonGreen.setClass("popupButtonRed");
	    		else
	    			popupButtonGreen.setClass("popupButtonGreen");
            },
            keyEvents: ["KEY_GREEN"]
        }, {
            id: "ACTION_YELLOW",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
	    		if(popupButtonYellow.getClass() == "popupButtonDisable")
	    			popupButtonYellow.setClass("popupButtonRed");
	    		else
	    			popupButtonYellow.setClass("popupButtonYellow");
            },
            keyEvents: ["KEY_YELLOW"]
        }, {
            id: "ACTION_BLUE",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(event){
	    		if(popupButtonBlue.getClass() == "popupButtonDisable")
	    			popupButtonBlue.setClass("popupButtonRed");
	    		else
	    			popupButtonBlue.setClass("popupButtonBlue");
            },
            keyEvents: ["KEY_BLUE"]
        }
        
        ];
        return actions;
    }
    var popupButtonRed;
    var popupButtonGreen;
    var popupButtonYellow;
    var popupButtonBlue;
    
    var popupButtonRedText;
    var popupButtonGreenText;
    var popupButtonYellowText;
    var popupButtonBlueText;
    
    
    module.implementing.loading.publics.load = function(){
        dom = module.dependencies.dom.handle.getNodeFactory(module.resources.html.handle);
        mgr = module.dependencies.mgr.handle;
        lang = module.dependencies.lang.handle;
        css = module.dependencies.css.handle;
        actionMgr = module.dependencies.actionMgr.handle;
        okCancelList = dom.getListControllerNode("okCancelList", {
            maxVisible: 8,
            pageSize: 1,
            paintItem: I
        });
        okCancelTitle = dom.getTextNode("okCancelTitle");
        okCancelDescription = dom.getTextNode("okCancelDescription");
        
        popupButtonRed = dom.getImageNode("popupButtonRed");
        popupButtonGreen = dom.getImageNode("popupButtonGreen");
        popupButtonYellow = dom.getImageNode("popupButtonYellow");
        popupButtonBlue = dom.getImageNode("popupButtonBlue");
        
        popupButtonRedText = dom.getTextNode("popupButtonRedText");
        popupButtonGreenText = dom.getTextNode("popupButtonGreenText");
        popupButtonYellowText = dom.getTextNode("popupButtonYellowText");
        popupButtonBlueText = dom.getTextNode("popupButtonBlueText");

        actionMgr.mapActions(module.id, E());
    };
    module.implementing.loading.publics.unload = function(){
    };
    module.implementing.view.publics.onFocus = function(){
    };
    module.implementing.view.publics.onBlur = function(){
        mgr.hide(module.id);
    };
    module.implementing.view.publics.onHide = function(){
        okCancelList.clear();
    };
    
    function L(P, R){
        for (var Q = 0; Q < P.length; Q++) {
        	
        	console.log(Q + " = " + P[Q].id)
            if (P[Q].id === R) {
            	alert(Q);
                return Q
            }
        }
    }
    module.implementing.view.publics.onShow = function(args){
        J = args.options;
        okCancelTitle.setText(args.title);
        okCancelDescription.setText(args.text);

        popupButtonRedText.setText("Red");
        popupButtonGreenText.setText("Green");
        popupButtonYellowText.setText("Yellow");
        popupButtonBlueText.setText("Blue");
        
        module.resources.html.handle.firstChild.id = args.id;
        A = args.callback || function(){};
        var R = args.selected ? L(J, args.selected) || 0 : 0;
        okCancelList.init(J.length, R)
    };
    module.implementing.view.publics.onInput = function(event){
        actionMgr.matchInput(module.id, event);
        return true;
    };
    module.implementing.view.publics.getDomNode = function(){
        return module.resources.html.handle;
    };
    return module;
});

