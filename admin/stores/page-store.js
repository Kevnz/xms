import alt from '../alt';
import ActionCreators from '../actions/action-creators';

class PageStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.pages = [];
        this.onPageSelected = null;
    }
    onReceivePages (pages) {
        console.log(pages);
        this.pages = pages;
    }
    onAddPage (page) {
        this.pages.push(page);
    }
    onDeletePage (page) {
        this.pages = this.pages.filter((item) => {
            return item._id !== page._id;
        });
    }
    onPageSelected (page) {
        console.log('page');
        this.selectedPage = page;
    }
}

module.exports = alt.createStore(PageStore);