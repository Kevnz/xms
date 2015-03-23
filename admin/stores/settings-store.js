import alt from '../alt';
import ActionCreators from '../actions/action-creators';

class SettingsStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.settings = []; 
    }
    onReceiveSettings (settings) {
        console.log(settings);
        this.settings = settings;
    }
    onAddPage (page) {
        this.pages.push(page);
    }
}

module.exports = alt.createStore(SettingsStore);