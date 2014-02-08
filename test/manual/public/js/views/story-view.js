YUI.add('story-view', function (Y) {

	Y.storyView = Y.Base.create('storyView', Y.ItemView, [], {
		events: {
			'.back': {
				click: 'showAll'
			}
		},
		showAll: function (e) {
			e.preventDefault();
			this.fire('showAll');
		}
	});

},
'0.0.1', {
	requires: ['item-view', 'handlebars-helpers']
});