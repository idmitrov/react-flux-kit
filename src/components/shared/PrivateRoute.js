import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route render={props => {
            // TODO: Add logic for isAuthorized 
            let isAuthorized = false;

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
