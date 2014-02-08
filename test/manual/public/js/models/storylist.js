YUI.add('story-list', function(Y) {

	Y.StoryList = Y.Base.create('storyList', Y.ModelList, [Y.ModelSync.REST], {
		root: '/api/story',
		url: '/api/story?start={start}',
		model: Y.StoryModel,
		getByKey: function (key) {
			Y.log('getByKey');
			var models = this.get('modelList');
			Y.log(models.toJSON());
			
			return models.filter(function(model) {
				return model.get('Key') === key;
			});
		}
	}, {
		ATTRS: {
			start: {
				value: 0
			}
		}
	});
}, '0.0.1', { requires: ['story-model', 'model-sync-rest'] });