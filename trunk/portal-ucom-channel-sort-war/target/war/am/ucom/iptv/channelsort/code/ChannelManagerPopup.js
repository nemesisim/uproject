(function() {

	var module = {
		id : "am.ucom.iptv.channelsort.code.ChannelManagerPopup",
		version : [ 1, 0 ],
		type : "code",

		implementing : {
			loading : {
				id : "com.ericsson.iptv.portal.fw.interfaces.LoadingIF",
				version : [ 1, 0 ],
				publics : {}
			},
			view : {
				id : "com.ericsson.iptv.portal.fw.interfaces.ViewIF",
				version : [ 1, 0 ],
				publics : {}
			}
		},
		dependencies : {
			css : {
				id : "am.ucom.iptv.channelsort.skin.interfaces.SkinIF",
				version : [ 1, 0 ]
			},
			log : {
				id : "com.ericsson.iptv.portal.fw.core.Log",
				version : [ 1, 0 ]
			},
			dom : {
				id : "com.ericsson.iptv.portal.fw.lib.DomFactory",
				version : [ 1, 0 ]
			}
		},
		resources : {
			html : {
				type : "html",
				url : "/am/ucom/iptv/channelsort/view/view.html"
			}
		}
	};

	var log;
	var domFactory;
	var html;

	var notificationImage;

	module.implementing.view.publics.onHide = function() {
		notificationImage.setImage(null);
	};

	module.implementing.view.publics.onFocus = function() {
	};

	module.implementing.view.publics.onBlur = function() {
	};

	module.implementing.view.publics.onShow = function(params) {
		notificationImage.setImage(params.imageURL);
	};

	module.implementing.view.publics.onInput = function(event) {
		return false;
	};

	module.implementing.view.publics.getDomNode = function() {
		return html;
	};

	module.implementing.loading.publics.load = function() {
		log = module.dependencies.log.handle;
		html = module.resources.html.handle;
		domFactory = module.dependencies.dom.handle
				.getNodeFactory(module.resources.html.handle);

		notificationImage = domFactory.getNode("notificationImage");
	};

	module.implementing.loading.publics.unload = function() {
	};
	return module;
});
