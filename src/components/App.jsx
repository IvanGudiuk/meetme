import { useEffect, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RestrictedRoute } from './restrictedRoute';
const Login = lazy(() => import('Pages/Login'));

export const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<RestrictedRoute redirectTo="/" component={<Login />} />}
      />
    </Routes>
  );
};
