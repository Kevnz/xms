'use strict';
import request from 'superagent';
import ActionCreators from '../actions/action-creators';

const PAGES_URI = '/xms/api/pages';
const PAGE_URI = '/xms/api/pages/{id}';
const PUBLISHED_PAGES_URI = '/xms/api/pages/published';
const DRAFT_PAGES_URI = '/xms/api/pages/draft';
const QUEUED_PAGES_URI = '/xms/api/pages/queued';
const DELETED_PAGES_URI = '/xms/api/pages/deleted';

export default {
    getAllPages: function () {
        request.get(PUBLISHED_PAGES_URI)
            .end((err, res) => {
                console.log('receivePages');
                console.log(res);
                ActionCreators.receivePages(res.body);
            });
    },
    getPagesByStatus: function (status) {

        request.get(PAGES_URI + '/' + status)
            .end((err, res) => {
                console.log('receivePages');
                console.log(res);
                ActionCreators.receivePages(res.body);
            });
    },
    savePage: function (page) {
        console.log('savePage');
        console.log(page);

        let url = page._id === 'new' ? PAGES_URI : PAGES_URI + '/' + page._id;
        console.log(url);
        request.post(url)
            .send(page)
            .end((err, res) => {
                console.log(res);
                ActionCreators.pageSaved(res.body);
            });
    },
    getAllSettings: function () {
        request.get('/xms/api/settings')
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveSettings(res.body);
            });
    }
}