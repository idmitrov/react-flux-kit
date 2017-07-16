import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ExitToApp from 'material-ui-icons/ExitToApp';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppNotifier from './AppNotifier';
import history from '../../tools/history';

import * as types from '../../actions/user/userActionTypes';
import userActions from '../../actions/user/userActions';
import userStore from '../../stores/userStore';

import sharedActions from '../../actions/shared/sharedActions';

class AppLayout extends Component {
    constructor() {
        super();

        this.state = {
            drawer: {
                opened: false,
                list: []
            },
            user: {
                name: null
            }
        };

        this._changeRoute = this._changeRoute.bind(this);
        this._toggleDrawer = this._toggleDrawer.bind(this);
        this._handleUserAuth = this._handleUserAuth.bind(this);

        userStore.on(types.USER_LOGGEDIN, this._handleUserAuth);
        userStore.on(types.USER_LOGGEDOUT, this._handleUserAuth);
        userStore.on(types.USER_AUTHENTICATED, this._handleUserAuth);
    }

    componentDidMount() {
        userActions.authenticate();
    }

    render() {
        return (
            <div id="app-wrapper">
                <AppNotifier />

                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon onClick={this._toggleDrawer} />
                        </IconButton>

                        <Typography type="title" color="inherit" style={{ "flex": "1" }}>
                            {this.props.heading}
                        </Typography>

                        {/* TODO: Improve rendering and anchors */}
                        <div>
                            {
                                this.state.user.name ? (
                                    <div>
                                        Hi {this.state.user.name}
                                        <IconButton
                                            onClick={userActions.logout}
                                            style={{ "verticalAlign": "middle" }}
                                            color="contrast"
                                            aria-label="Logout">
                                            <ExitToApp />
                                        </IconButton>
                                    </div>
                                ) : (
                                        <div>
                                            <Button
                                                href="/account/login"
                                                color="contrast"
                                                dense
                                                onClick={this._changeRoute}>
                                                Login
                                        </Button>

                                            <Button
                                                href="/account/register"
                                                color="contrast"
                                                dense
                                                onClick={this._changeRoute}>
                                                Register
                                        </Button>
                                        </div>
                                    )
                            }
                        </div>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={this.state.drawer.opened} onRequestClose={this._toggleDrawer}>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            {this.props.heading}
                        </Typography>
                    </Toolbar>

                    <List style={{ width: 250 }}>
                        {
                            this.state.drawer.list.map(item => (
                                <div key={item.name} onClick={this._toggleDrawer}>
                                    <ListItem button href={item.href} onClick={this._changeRoute}>
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                </div>
                            ))
                        }
                    </List>
                </Drawer>

                <main className="views-wrapper container-fluid">
                    {this.props.children}
                </main>
            </div>
        );
    }

    _handleUserAuth(e) {
        let privateDrawer = {
            list: [
                { name: 'Home', href: '/', title: 'Home' }
            ]
        };

        if (e.user.name) {
            privateDrawer.list = [
                ...privateDrawer.list,
                { name: 'About', href: '/about', title: 'About', role: "user" }
            ];
        }

        let newState = update(this.state, {
            user: {
                name: {
                    "$set": e.user.name
                }
            },
            drawer: {
                "$merge": privateDrawer
            }
        });

        this.setState(newState, () => {
            history.push('/');
            sharedActions.notfy({ message: e.message, type: e.type });
        });
    }

    _changeRoute(e) {
        e.preventDefault();

        history.push(e.currentTarget.getAttribute('href'));
    }

    _toggleDrawer() {
        let newState = update(this.state, {
            drawer: {
                opened: {
                    "$set": !this.state.drawer.opened
                }
            }
        });

        this.setState(newState);
    }
}

AppLayout.propTypes = {
    heading: PropTypes.string.isRequired
};

export default AppLayout;
