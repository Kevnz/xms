import React from 'react';
import Menu from './menu';
import List from './list';
import Main from './main';

export default class AdminApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Menu></Menu>
                <List  ></List>
                <Main  ></Main>
            </div>
        );
    }
}