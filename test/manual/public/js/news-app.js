YUI().use('app', 
	'app-transitions', 
	'story-model', 
	'story-list', 
	'story-view', 
	'storylist-view', 'event', 'selector-css3', 'node-scroll-info', function (Y) {

	var win = Y.config.win;
	//list.load();
	var NewsApp = Y.Base.create('newsApp', Y.App, [], {
		views: {
			home: {
				type: 'storyListView',
				preserve: true
			},
			story: {
				type: 'storyView',
				parent: 'home',
				preserve: false
			}
		},
		loading: false,
		initializer: function(config) {

		},
		loadMoreStories: function () {
			Y.log('loadMore');
			if (this.loading) {
				return;
			}
			this.loading = true;
			var self = this;
			Y.log('load More Stories');
			var stories = this.get('modelList'),
				newStories = new Y.StoryList();
			Y.log('load page ' + stories.size());
			newStories.load({ 
				start: stories.size()
			}, function () {
				stories.add(newStories);

				newStories.destroy();
				self.loading = false;
			});
		},
		navigateToStory: function(e) {
			Y.log('navigateToStory');
			var story = e.story.get('Key');
			this.story = e.story;
			Y.log(this.story);
			Y.log('story selected Id ' + story);
			this.navigate('/story/' + story + '/');
		},
		navigateToAll: function (e) {
			Y.log('navtoall'); 
			this.navigate('/');
		},
		setStories: function (e) {
			this.stories = e.stories;
			this.set('modelList', e.stories);
		},
		showHomePage: function (req, res, next) {
			Y.log('showhome');
			Y.one('title').setContent('New Zealand News');
			Y.log(req.query); 
			var self = this;
			if (self.stories === null) {
				Y.log('stories are null');
				self.stories = new Y.StoryList({ start: 0 });
				self.stories.load(function () {
					self.showView('home', { template: '/templates/stories.html', modelList: self.stories });
				});
			} else {
				Y.log('previous maybe?');
				self.showView('home', { template: '/templates/stories.html', modelList: self.stories, previous: req.query.previous, render:true },
				function () {
					Y.log('showview callback');
					var prev = req.query.previous;
					Y.log('prev');
					if (prev) {
						var prevSelector = 'div[data-story-key="' + prev + '"]';
						Y.log(prevSelector);
						var storyNode = Y.one(prevSelector);
						if (storyNode) {
							storyNode.plug(Y.Plugin.ScrollInfo);
							Y.log(storyNode.scrollInfo.getScrollInfo());
							Y.log(storyNode.scrollInfo); 
							win.scroll(0, (storyNode.get('offsetTop') - 145));
							//storyNode.scrollIntoView();
						}
					}
				});
			}
		},
		showStoryPage: function(req, res, next) {

			var key = req.params.key; 
			var self = this;
			self.story = new Y.StoryModel({ id: key });
			Y.log('show Story');
			self.story.load(function () {
				Y.one('title').setContent(self.story.get('Title') + ' New Zealand News');
				Y.log('show loaded ');
				self.showView('story', { model: self.story, template:'/templates/story.html' });

			});
		},
		stories: null
	}, {
		ATTRS: {
			story: { value: new Y.StoryModel() },
			stories: { value: null },
			routes: {
				value: [
					{ path: '/', callbacks: 'showHomePage' },
					{
						path: '/story/:key/',
						callbacks: [
							'showStoryPage'
						]
					},
					{
						path: '/story/:key',
						callbacks: [
							'showStoryPage'
						]
					},
					{
						path: 'story/:key',
						callbacks: [
							'showStoryPage'
						]
					}
				]
			}
		}
	});

	var app = new NewsApp({
		transitions: true,
		viewContainer: '#app',
		container: 'body',
		scrollToTop: false
	});
	Y.log('gonna load ' + window.pathname);
	app.render().save(window.pathname);
});