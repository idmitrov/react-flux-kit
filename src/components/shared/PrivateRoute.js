import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import storage from '../../utils/storage';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let isAuthorized = storage.get('token');
    
    return (
        <Route render={props => {
            if (isAuthorized) {
                return <Component {...props} />;
            } else {
                let redirectRoute = {
                    pathname: "/account/login",
                    state: { from: props.location }
                };

                return <Redirect to={redirectRoute} />;
            }
        }} />
    );
}

export default PrivateRoute;
