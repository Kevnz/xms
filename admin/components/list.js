import React from 'react';
import PageItem from './page';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(PageItem);
        var pageNodes = this.props.pages.map( (page) => { 
            let isSelected = this.props.selectedPage === page._id;
            console.log('this is selected ?' + isSelected);
            return (
                <PageItem page={page} isSelected={isSelected} selectedPage={this.props.selectedPage}>
                </PageItem>
            );
        });
        return (
            <div className="list">
                {pageNodes}
            </div>
        );
    }
}