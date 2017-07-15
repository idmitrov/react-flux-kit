import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';

import AppNotifier from './AppNotifier';

import history from '../../tools/history';

class AppLayout extends Component {
    constructor() {
        super();

        this.state = {
            opened: false
        };

        this._changeRoute = this._changeRoute.bind(this);
        this._toggleDrawer = this._toggleDrawer.bind(this);
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

                        <Typography type="title" color="inherit">
                            {this.props.heading}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={this.state.opened} onRequestClose={this._toggleDrawer}>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            {this.props.heading}
                        </Typography>
                    </Toolbar>

                    <List style={{ width: 250 }}>
                        {
                            this.props.drawer.map(item => (
                                <ListItem key={item.name} button href={item.href} onClick={this._changeRoute}>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Drawer>

                <main className="container-fluid">
                    {this.props.children}
                </main>
            </div>
        );
    }

    _changeRoute(e) {
        history.push(e.currentTarget.getAttribute('href'));

        this._toggleDrawer();
    }

    _toggleDrawer() {
        this.setState({
            opened: !this.state.opened
        });
    }
}

AppLayout.propTypes = {
    heading: PropTypes.string.isRequired,
    drawer: PropTypes.array.isRequired
};

export default AppLayout;
