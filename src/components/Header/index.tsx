import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import Button from '../../components/Button';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const isSignIn = location.pathname.includes(CLIENT_ROUTE_PATH.SIGNIN);

  return (
    <div className="h-16 w-full flex  justify-center items-center absolute">
      <div className="bg-zinc-200/70 flex items-center justify-end w-11/12 absolute my-5 rounded-lg">
        {!isSignIn ? (
          <Link to="/">
            <Button buttonProps={{ size: 'middle', className: 'text-white mx-2 my-2' }} textButton="Đăng nhập" />
          </Link>
        ) : (
          <Link to="/register">
            <Button buttonProps={{ size: 'middle', className: 'text-white mx-2 my-2' }} textButton="Đăng ký" />
          </Link>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AppHeader;
