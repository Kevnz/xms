YUI.applyConfig({"root":"/yui/build/","combine":true,"groups":{"newsApp":{"combine":true,"root":"","modules":{"handlebars-helpers":{"requires":["handlebars"],"path":"/js/helpers/handlebars-helpers.js"},"template-loader":{"requires":["io-base"],"path":"/js/helpers/template-loader.js"},"story-model":{"requires":["model","model-sync-rest"],"path":"/js/models/story.js"},"story-list":{"requires":["story-model","model-sync-rest"],"path":"/js/models/storylist.js"},"news-app":{"requires":[],"path":"/js/news-app.js"},"collection-view":{"requires":["view","handlebars","event-custom","handlebars-helpers"],"path":"/js/views/collection-view.js"},"item-view":{"requires":["view","handlebars","node","event","template-loader","handlebars-helpers"],"path":"/js/views/item-view.js"},"story-view":{"requires":["item-view","handlebars-helpers"],"path":"/js/views/story-view.js"},"storylist-view":{"requires":["story-list","collection-view","handlebars-helpers","story-model","array-extras","scrollview","node","event","node-scroll-info"],"path":"/js/views/storylist-view.js"}}}}});