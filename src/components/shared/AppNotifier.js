import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

class AppNotifier extends Component {
    constructor() {
        super();

        this.state = {
            opened: true,
            type: 'normal',
            message: 'Welcome'
        };

        this._handleRequestClose = this._handleRequestClose.bind(this);
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
