import React from 'react';
import ActionCreators from '../actions/action-creators';
import ListenerMixin from 'alt/mixins/ListenerMixin'
import mixin from 'react-mixin';
import PageStore from '../stores/page-store';
function getStateFromStores(key) {
    return {isSelected: PageStore.getState().selectedPage === key};
}

export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    selectPage(e) {
        console.log('select ' +this.props.page);
        this.setState({isSelected:true});
        ActionCreators.pageSelected(this.props.page);
    }
    componentDidMount () { 
        this.listenTo(PageStore, this._onChange.bind(this));
    } 
    _onChange () {

        this.setState(getStateFromStores(this.props.page._id));
    }
    render() {
        let unknown = 'Unknown';
        let nodesc ='No Description was give, not cool';
        var selected = this.props.isSelected ;
        if (this.state && this.state.isSelected) {
            selected = true;
        }
        
        var selectedClass = selected ? 'page-item page-item-unread' : 'page-item bucket-of-nope'
        return (
        <div className={selectedClass} onClick={this.selectPage.bind(this)} key={this.props.page._id}>
            <div className="pure-u">
                <span className="avatar-unknown"></span>
                
            </div>

            <div className="page-item-details">
                <h5 className="page-editor-name">Editor {this.props.page.createdBy || unknown}</h5>
                <h4 className="page-title">{this.props.page.title}</h4>
                <p className="page-desc">
                    {this.props.page.description || nodesc }
                </p>
            </div>
        </div>
        );
    }
}
Page.defaultProps = { isSelected: false}


mixin(Page.prototype, ListenerMixin);
//<img className="editor-avatar" alt="editor avatar" height="64" width="64" src="" />