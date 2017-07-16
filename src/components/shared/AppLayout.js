import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ExitToApp from 'material-ui-icons/ExitToApp';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppNotifier from './AppNotifier';
import history from '../../tools/history';

import * as types from '../../actions/user/userActionTypes';
import userActions from '../../actions/user/userActions';
import userStore from '../../stores/userStore';

class AppLayout extends Component {
    constructor() {
        super();

        this.state = {
            drawer: {
                opened: false,
                list: [
                    { name: 'Home', href: '/', title: 'Home' },
                    { name: 'About', href: '/about', title: 'About' },
                    { name: 'Test', href: '/test', title: 'Test' }
                ]
            },
            user: {
                name: null
            }
        };

        this._changeRoute = this._changeRoute.bind(this);
        this._toggleDrawer = this._toggleDrawer.bind(this);
        this._handleUserChange = this._handleUserChange.bind(this);
        this._onLogout = this._onLogout.bind(this);

        userStore.on(types.USER_LOGGEDIN, this._handleUserChange);
        userStore.on(types.USER_LOGGEDOUT, this._handleUserChange);
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
                                            onClick={this._onLogout}
                                            style={{ "verticalAlign": "middle" }}
                                            color="contrast"
                                            aria-label="Logout">
                                            <ExitToApp />
                                        </IconButton>
                                    </div>
                                ) : (
                                    <div>
                                        <a href="/account/login" onClick={this._changeRoute}>Login</a>
                                        <a href="/account/register" onClick={this._changeRoute}>Register</a>
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

    _onLogout() {
        userActions.logout();
    }

    _handleUserChange(e) {
        let newState = update(this.state, {
            user: {
                name: {
                    "$set": e.user.name
                }
            }
        });

        this.setState(newState);
        history.push('/');
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
