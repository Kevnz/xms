'use strict';

import React from 'react';

export default class Popover extends React.Component {
    constructor(props) {
        super(props)
    }
    render () {

        return (
            <div className="pure-popover bottom">
                <div>
                    {children}
                </div>
                <div className="pure-arrow-border"></div>
                <div className="pure-arrow"></div>
            </div>
        );
    }
}