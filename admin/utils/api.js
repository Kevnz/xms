import request from 'superagent';
import ActionCreators from '../actions/action-creators';

export default {
    getAllPages() {
        request.get('/xms/api/pages')
            .end((res) => {
                console.log(ActionCreators);
                ActionCreators.receivePages(res);
            })
    }
}