import request from 'superagent';
import ActionCreators from '../actions/action-creators';

export default {
    getAllPages() {
        request.get('/xms/api/pages')
            .end((err, res) => {
                console.log('receivePages');
                console.log(res);
                ActionCreators.receivePages(res.body);
            })
    }
    getAllSettings() {
        request.get('/xms/api/settings')
            .end((err, res) => { 
                console.log(res);
                ActionCreators.receiveSettings(res.body);
            })
    }
}