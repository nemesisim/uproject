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
                url: "/am/ucom/iptv/channelsort/view/view.html"
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
        var R = J[Q] || cancelObj;
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
        var Q = [{
            id: "ACTION_PREVIOUS",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(R){
                okCancelList.onPreviousKey(R)
            },
            keyEvents: ["KEY_UP"]
        }, {
            id: "ACTION_NEXT",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(R){
                okCancelList.onNextKey(R)
            },
            keyEvents: ["KEY_DOWN"]
        }, {
            id: "ACTION_EXIT",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(R){
                mgr.hide(module.id);
                A()
            },
            keyEvents: ["KEY_EXIT"]
        }, {
            id: "ACTION_OK",
            localizedLabel: undefined,
            isApplicable: P,
            invoke: function(S){
                var R = J[okCancelList.getIndex()] || cancelObj;
                mgr.hide(module.id);
                if (R.callback) {
                    R.callback()
                }
            },
            keyEvents: ["KEY_OK"]
        }];
        return Q
    }
    module.implementing.loading.publics.load = function(){
        dom = module.dependencies.dom.handle.getNodeFactory(module.resources.html.handle);
        mgr = module.dependencies.mgr.handle;
        lang = module.dependencies.lang.handle;
        css = module.dependencies.css.handle;
        actionMgr = module.dependencies.actionMgr.handle;
        okCancelList = dom.getListControllerNode("okCancelList", {
            maxVisible: css.SELECTWITHINFOPOPUP_MAXVISIBLE,
            pageSize: 1,
            paintItem: I
        });
        okCancelTitle = dom.getTextNode("okCancelTitle");
        okCancelDescription = dom.getTextNode("okCancelDescription");
        cancelObj = {
            id: "cancel",
            text: lang.commonCancel
        };
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
            if (P[Q].id === R) {
                return Q
            }
        }
    }
    module.implementing.view.publics.onShow = function(args){
        J = args.options;
        okCancelTitle.setText(args.title);
        okCancelDescription.setText(args.text);
        module.resources.html.handle.firstChild.id = args.id;
        A = args.callback ||
        function(){
        };
        var Q = J.length;
        if (!args.dontShowCancel) {
            Q++;
        }
        var R = args.selected ? L(J, args.selected) || 0 : 0;
        okCancelList.init(Q, R)
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
