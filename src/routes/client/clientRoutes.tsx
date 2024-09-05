import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { SuspenseWrapper } from '../../components/loading/SuspenseWrap';
import ProtectRoute from '../../components/ProtectRoutes';
import AuthRoute from '../../components/AuthRoutes';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import Chat from '../../auth/chat';

// example of lazy loading
const Client = React.lazy(() => import('./index'));
// const Chat = React.lazy(() => import('../../auth/chat'));
const WaitForConfirmation = React.lazy(() => import('../../auth/waitForConfirmation'));
const Register = React.lazy(() => import('../../auth/register'));
// const ForgotPassword = React.lazy(() => import('../../auth/forgotPassword'));
// const ChangePassword = React.lazy(() => import('../../auth/changePassword'));
const SignIn = React.lazy(() => import('../../auth/login'));
const NotFound = React.lazy(() => import('../../components/NotFound'));

export const ClientRoutes = () => {
  const navigate = useNavigate();
  // push user back to signin if token doesnt exist
  // logout
  useEffect(() => {
    function checkUserData() {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate(CLIENT_ROUTE_PATH.SIGNIN);
      }
    }

    window.addEventListener('storage', checkUserData);
    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  return (
    <Routes>
      {/* AuthRoute */}
      {/* using AuthRoute when the route doesnt need user to sign in to access it */}
      <Route element={<AuthRoute />}>
        <Route path={`/${CLIENT_ROUTE_PATH.SIGNIN}`} element={<SuspenseWrapper component={<SignIn />} />} />
        <Route path={`/${CLIENT_ROUTE_PATH.REGISTER}`} element={<SuspenseWrapper component={<Register />} />} />
        <Route
          path={`/${CLIENT_ROUTE_PATH.WAITFORCONFIRMATON}`}
          element={<SuspenseWrapper component={<WaitForConfirmation />} />}
        />
        {/* <Route path="/" element={<Navigate to={`${CLIENT_ROUTE_PATH.SIGNIN}`} replace />} /> */}
        {/* <Route
        path={`/${CLIENT_ROUTE_PATH.CHANGEPASSWORD}`}
        element={<SuspenseWrapper component={<ChangePassword />} />}
      />
      <Route
        path={`/${CLIENT_ROUTE_PATH.FORGOTPASSWORD}`}
        element={<SuspenseWrapper component={<ForgotPassword />} />}
      /> */}
      </Route>
      {/* ProtectRoute */}
      {/* using ProtectRoute when the route need user to sign in to access it */}
      <Route element={<ProtectRoute />}>
        <Route path={`/${CLIENT_ROUTE_PATH.DASHBOARD}`} element={<SuspenseWrapper component={<Client />} />}>
          <Route path={`/${CLIENT_ROUTE_PATH.CHAT}`} element={<SuspenseWrapper component={<Chat />} />} />
        </Route>
      </Route>
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
