import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../containers/Home';
import About from '../../containers/About';
import NotFound from '../../containers/NotFound';

class AppRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default AppRoutes;
