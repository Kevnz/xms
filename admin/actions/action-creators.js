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
    savePage(page) {
        this.dispatch(page);
        api.savePage(page);
    }
    pageSaved(page) {
        this.dispatch(page);
    }
    settingSelected (setting) {
        this.dispatch(setting.name.toLowerCase());
        api.getPagesByStatus(setting.name.toLowerCase());
    }
}
alt.createActions(ActionsCreators, exports);