var Fluxxor = require('fluxxor');

var constants = {
    ADD_PAGE: "ADD_PAGE",
    EDIT_PAGE: "EDIT_PAGE",
    PUBLISH_PAGE: "PUBLISH_PAGE",
    UNPUBLISH_PAGE: "UNPUBLISH_PAGE"
};

var PageStore = Fluxxor.createStore({
    initialize: function() {
        this.pages = [];

        this.bindActions(
            constants.ADD_PAGE, this.onAddPage,
            constants.EDIT_PAGE, this.onEditPage,
            constants.PUBLISH_PAGE, this.onPublishPage,
            constants.UNPUBLISH_PAGE, this.onUnpublishPage
        );
    },

    onAddPage: function(payload) {
        this.pages.push({text: payload.text, complete: false});
        this.emit("change");
    },
    onEditPage: function(payload) {
        this.pages.push({text: payload.text, complete: false});
        this.emit("change");
    },
    onPublishPage: function(payload) {
        payload.todo.complete = !payload.todo.complete;
        this.emit("change");
    },

    onUnpublishPage: function() {
        this.pages = this.pages.filter(function(todo) {
            return !todo.complete;
        });
        this.emit("change");
    },

    getState: function() {
        return {
            pages: this.pages
        };
    }
});

exports.module = PageStore