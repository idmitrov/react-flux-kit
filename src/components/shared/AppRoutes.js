import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../../containers/Home';
import About from '../../containers/About';
import NotFound from '../../containers/NotFound';
import Login from '../../containers/Login';
import Register from '../../containers/Register';

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/account/login" component={Login} />
                <Route path="/account/register" component={Register} />
                <PrivateRoute path="/about" exact component={About} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default AppRoutes;
