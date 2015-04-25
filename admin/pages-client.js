'use strict';
import agent from 'superagent';
import format from 'string-template';

const PAGES_URI = '/xms/api/pages/published';
const PAGE_URI = '/xms/api/pages/{id}';
const PUBLISHED_PAGES_URI = '/xms/api/pages/';
const DRAFT_PAGES_URI = '/xms/api/pages/draft';
const QUEUED_PAGES_URI = '/xms/api/pages/queued';
const DELETED_PAGES_URI = '/xms/api/pages/deleted';

var PagesClient = {
    
    
    getPages: function (callback) {
        agent
            .get(PAGES_URI)
            .end(callback);
    },
    addPage: function (page, callback) {
        agent
            .post(PAGES_URI)
            .send(page)
            .set('Accept', 'application/json')
            .end(callback);
    },
    editPage: function (page, callback) {
        agent
            .post(format(PAGE_URI, {id: page._id})
            .send(page)
            .set('Accept', 'application/json')
            .end(callback);
    }
};

module.exports = PagesClient;