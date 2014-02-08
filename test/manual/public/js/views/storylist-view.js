YUI.add('storylist-view', function (Y) {
	var win = Y.config.win,
		 self;

	Y.storyListView = Y.Base.create('storylistView', Y.CollectionView, [], {
		initializer: function () {
			Y.log('init of story list view');
			this.publish('selectStory', { preventable: false });
			this.publish('endOfList', { preventable: false });
			self = this; 
			this.after('render', function () {
				Y.log('render after');
				Y.on('scroll', this.onScroll);



			}, self);
			

		},
		destroy: function() {
			this.detach('scroll', this.onScroll);
		},
		onRender: function() {
			Y.log('onrender function');

		},
		onScroll: function () { 
			Y.log('scroll');
			if (Y.one('.story-list-bottom')) {
				if (self.isElementInViewport(Y.one('.story-list-bottom').getDOMNode())) {
 
					var currentList = self.get('modelList');
					var currentSize = currentList.size();
					Y.log(currentSize);
					if (self.loading) return;
					Y.log('not loading so load');
					self.loading = true;
					var newStories = new Y.StoryList({start:currentSize});
					
					newStories.load(function () {
						Y.log('loaded stories');
						self.get('modelList').add(newStories, { silent: false });
						Y.log(self.get('modelList').size() + ' total stories');
						//newStories.destroy();
						self.loading = false;
						//self.render();
					});
				}
			}
		},
		events: {
			'.story': {
				click: 'selectstory'
			},
			'.story h2 a': {
				click: 'selectstory'
			},
			'body': {
				scroll: 'onScroll'
			}
		},
		endOfList: function (e) {
			self.fire('endOfList', {});
		},

		isElementInViewport: function (el) {
			var rect = el.getBoundingClientRect();
			var res = (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
				);
			return res;
		},
		selectstory: function (e) {
			Y.log(e.currentTarget);
			e.preventDefault();
			var stories = this.get('modelList');
			var storiesZ = stories.toJSON();
			var self = this;
			var key = e.currentTarget.getData('story-key');
 
 
			var s = Y.Array.find(storiesZ, function(item, index, array) {
				return item.Id == key;
			});
			//var storyToShow = this.get('modelList').getByKey(key);
			self.fire('selectStory', { story: new Y.StoryModel(s) });

		} 
	}, {
		ATTRS : {
			previous: {
				value: null
			}
		}
	});

},
'0.0.1', {
	requires: ['story-list', 'collection-view', 'handlebars-helpers', 'story-model', 'array-extras','scrollview', 'node','event', 'node-scroll-info']
});