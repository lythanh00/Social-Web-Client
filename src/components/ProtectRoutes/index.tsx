import { Navigate, Outlet } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { LOCAL_STORAGE, SESSION_STORAGE } from '../../constant/storage';
import MainApp from '../../MainApp';

const ProtectRoute = () => {
  const isLoggedIn = Boolean(
    localStorage.getItem(LOCAL_STORAGE.TOKEN) || sessionStorage.getItem(SESSION_STORAGE.TOKEN),
  );
  return isLoggedIn ? <Outlet /> : <Navigate to={CLIENT_ROUTE_PATH.SIGNIN} />;
};

export default ProtectRoute;
