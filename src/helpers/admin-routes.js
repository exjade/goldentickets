import React from 'react';
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom';
import FallBackLoader from '../components/FallBackLoader';
import * as ROUTES from '../constants/routes'

const ProtectedRoutes = ({ user, allowedRoles, children, ...rest }) => {

    if (user === null) {
        // Si el usuario aún no se ha cargado, muestra un loader.
        return <FallBackLoader />;
    }


    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (user.role === 'guest') {
                    // If user is not logged in, redirect to login page
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                } else if (!user) {
                    // If user is not logged in, redirect to login page
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.LOGIN,
                                state: { from: location }
                            }}
                        />
                    );
                } else if (allowedRoles !== user?.role) {
                    // If user role is not in the allowedRoles array, redirect to a forbidden page
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.DASHBOARD,
                                state: { from: location }
                            }}
                        />
                    );
                } else if (typeof allowedRoles === 'string' && allowedRoles !== user.role) {
                    // Si allowedRoles es una sola cadena y no coincide con el rol del usuario, redirige a una página prohibida.
                    return (
                        <Redirect
                            to={{
                                pathname: ROUTES.DASHBOARD,
                                state: { from: location },
                            }}
                        />
                    );
                } else {
                    // If user is logged in and has the required role, render the protected component
                    return children;
                }
            }}
        />
    );
};

export default ProtectedRoutes;

ProtectedRoutes.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object,
    allowedRoles: PropTypes.string
}
