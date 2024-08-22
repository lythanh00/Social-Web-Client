import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const AuthRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleCheckUserLoggedIn = async () => {

  };

  useEffect(() => {
    handleCheckUserLoggedIn();
  }, []);

  return !isLoggedIn ? <Outlet /> : <Navigate to={CLIENT_ROUTE_PATH.DASHBOARD} />;
};

export default AuthRoute;
