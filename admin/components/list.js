import React from 'react';
import PageItem from './page';

export default class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var pageNodes = this.props.pages.map(function (page) {
            return (
                <PageItem page={page}>
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