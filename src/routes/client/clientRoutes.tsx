import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SuspenseWrapper } from '../../components/loading/SuspenseWrap';
import ProtectRoute from '../../components/ProtectRoutes';
import AuthRoute from '../../components/AuthRoutes';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import NotFound from '../../components/NotFound';
import SignIn from '../../auth/signIn';
import Register from '../../auth/register';


// example of lazy loading
// const Client = React.lazy(() => import('.'));

export const ClientRoutes = () => (
  <Routes>
    {/* AuthRoute */}
    {/* using AuthRoute when the route doesnt need user to sign in to access it */}
    <Route element={<AuthRoute/>}>
      <Route path={`/${CLIENT_ROUTE_PATH.SIGNIN}`} element={<SuspenseWrapper component={<SignIn />} />} />
      <Route path={`/${CLIENT_ROUTE_PATH.REGISTER}`} element={<SuspenseWrapper component={<Register />} />} />

    </Route>
    {/* ProtectRoute */}
    {/* using ProtectRoute when the route need user to sign in to access it */}
    <Route element={<ProtectRoute />}>
      <Route path="" element={<SuspenseWrapper component={<>homepage</>} />} />
    </Route>
    {/* Not Found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
