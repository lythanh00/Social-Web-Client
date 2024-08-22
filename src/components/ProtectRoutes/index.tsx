import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const ProtectRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return isLoggedIn ? <Outlet /> : <Navigate to={CLIENT_ROUTE_PATH.SIGNIN} />;
};

export default ProtectRoute;
