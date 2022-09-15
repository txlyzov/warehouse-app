import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from '../router/routers';
import Error from '../ui/pages/error';

class AppRouter extends Component {
    render() {
        return (

            <Routes>
                {routes.map(route =>
                    <Route path={route.path} element={route.element} exact={route.exact} />
                )}
                <Route path="*" element={<Error />}></Route>
            </Routes>
        );
    }
}

export default AppRouter;
