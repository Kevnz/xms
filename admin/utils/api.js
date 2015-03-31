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
        request.get('/xms/api/pages')
            .end((err, res) => {
                console.log('receivePages');
                console.log(res);
                ActionCreators.receivePages(res.body);
            });
    },
    getPagesByStatus:function (status) {

    }
    getAllSettings: function () {
        request.get('/xms/api/settings')
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveSettings(res.body);
            });
    }
}