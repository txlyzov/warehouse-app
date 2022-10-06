import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './Routers';
import NoPage from '../ui/pages/no-page/NoPage';

function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />)}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default AppRouter;
