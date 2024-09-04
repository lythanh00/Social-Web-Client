import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { LOCAL_STORAGE, SESSION_STORAGE } from '../../constant/storage';
import { useMemo } from 'react';

const AuthRoute = () => {
  const isLogin = localStorage.getItem(LOCAL_STORAGE.TOKEN) || sessionStorage.getItem(SESSION_STORAGE.TOKEN);

  const isLoggedIn = useMemo(() => {
    return isLogin ? JSON.parse(isLogin) : false;
  }, [isLogin]);

  return !isLoggedIn ? <Outlet /> : <Navigate to={CLIENT_ROUTE_PATH.SIGNIN} />;
};

export default AuthRoute;
