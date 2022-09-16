import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routers';
import Error from '../ui/pages/Error';

function AppRouter() {
    return (
        <Routes>
            {routes.map(route =>
                <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />
            )}
            <Route path="*" element={<Error />}></Route>
        </Routes>
    );
}

export default AppRouter;
