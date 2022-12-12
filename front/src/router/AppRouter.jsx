import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Routes } from 'react-router-dom';
import routes from './Routers';
import NoPage from '../ui/pages/no-page/NoPage';
import AuthChecker from '../hoc/AuthChecker';

function AppRouter() {
  return (
    <Routes>
      {routes.map((route) =>
        <Route
          key={uuidv4()}
          path={route.path}
          element={<AuthChecker isNeedAuth={route.needAuth}>{route.element}</AuthChecker>}
          exact={route.exact} />
      )}
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default AppRouter;
