YUI.add('item-view', function (Y) {
 

	var ItemView = Y.Base.create('itemView', Y.View, [], {
		initializer: function (config) {
			Y.log('init item view');
			
			this.publish('render', {
				broadcast: true,
				bubbles: true,
				emitFacade: true
			});
			
			Y.log(this.get('model'));
			this.get('model').after(['load', 'change', 'reset'], this.render, this);
			ItemView.superclass.constructor.apply(this, arguments);
		},
		render: function () { 
			Y.log('render item view');
			ItemView.superclass.render.apply(this, arguments);
			var container = this.get('container');
			Y.log(this.get('model').toJSON());
            var source = Y.TemplateLoader(this.template),
                compiledTemplate = Y.Handlebars.compile(source),
                html = compiledTemplate(this.get('model').toJSON());

			container.setHTML(html);

			if (!container.inDoc()) {
				Y.one('body').append(container);
			}
			this.fire('render');
			
			return this;
		}
	});
	Y.ItemView = ItemView;
},
'0.0.1', {
	requires: ['view', 'handlebars', 'node', 'event', 'template-loader','handlebars-helpers']
});