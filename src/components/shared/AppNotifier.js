import React, { Component } from 'react';

import sharedStore from '../../stores/sharedStore';
import * as sharedTypes from '../../actions/shared/sharedActionTypes';

import Snackbar from 'material-ui/Snackbar';

class AppNotifier extends Component {
    constructor() {
        super();

        this.state = {
            opened: false,
            type: 'normal',
            message: 'Welcome'
        };

        this._handleRequestClose = this._handleRequestClose.bind(this);
        this._handleNotification = this._handleNotification.bind(this);

        sharedStore.on(sharedTypes.NOTIFIED, this._handleNotification);
    }

    render() {
        return (
            <Snackbar
                open={this.state.opened}
                onRequestClose={this._handleRequestClose}
                message={<span className={`text-${this.state.type}`}>{this.state.message}</span>}
            />
        );
    }

    _handleRequestClose() {
        this.setState({
            opened: !this.state.opened
        });
    }

    _handleNotification(response) {
        this.setState({
            opened: true,
            message: response.message,
            type: response.type
        });
    }
}

export default AppNotifier;
