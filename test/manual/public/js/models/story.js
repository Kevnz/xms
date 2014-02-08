YUI.add('story-model', function (Y) {

	// Create a new Y.PieModel class that extends Y.Model.
	Y.StoryModel = Y.Base.create('storyModel', Y.Model, [Y.ModelSync.REST], {
		idAttribute: 'Key',
		root: '/api/story/',
		url: '/api/story/{id}'
	}, {
		ATTRS: {
			Title: {
				value: ''
			},

			Description: {
				value: ''
			},

			Content: {
				value: ''
			},

			Key: {
				value: ''
			},

			ImageUrl: {
				value: ''
			},
			PublishedDate: {
				value: ''
			},
			Link: {
				value: ''
			}
		}
	});


}, '0.0.1', { requires: ['model', 'model-sync-rest'] });