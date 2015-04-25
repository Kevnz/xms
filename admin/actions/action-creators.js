import alt from '../alt';

import api from '../utils/api';

class ActionsCreators {
    constructor() {
        this.generateActions(
            'receivePages',
            'editPage',
            'addPage',
            'removePage',
            'pageSelected',
            'receiveSettings'
            );
    }
    pageUpdated(page) {
        this.dispatch(page._id);
        //api.updatePage(page);
    }
    settingSelected (setting) {
        this.dispatch(setting.name.toLowerCase());
        api.getPagesByStatus(setting.name.toLowerCase());
    }
}
alt.createActions(ActionsCreators, exports);