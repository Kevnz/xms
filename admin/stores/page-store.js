import alt from '../alt';
import ActionCreators from '../actions/action-creators';

class PageStore {
    constructor() {
        this.bindActions(ActionCreators);
        this.pages = [];
        this.selectedPage = this.getNewPage();

    }
    getNewPage(){
        return {
            edit: true,
            _id: 'new',
            status: 'new',
            saved: false,
            title: '',
            subtitle:'',
            content: '',
            description: '',
            createdOn: new Date()
        };
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
        console.log(page);
        console.log('page');
        this.selectedPage = page;
    }
    onComposeSelected() {
        console.log('onComposeSelected');
        this.selectedPage = {
            edit: true,
            _id: 'new',
            status: 'new',
            saved: false,
            title: 'New Title',
            subtitle:'SubTitle',
            content: 'Content Here',
            description: 'Description',
            createdOn: new Date()
        }
    }
}

module.exports = alt.createStore(PageStore);