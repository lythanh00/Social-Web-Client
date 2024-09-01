import React, { useContext } from 'react';
import { ConfigProvider } from 'antd';
import { css } from '@emotion/css';
import Button from '../../components/Button';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const AppHeader: React.FC = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const location = useLocation();
  const isSignIn = location.pathname.includes(CLIENT_ROUTE_PATH.SIGNIN);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;
  return (
    <div className="h-16 w-full flex  justify-center items-center absolute">
      <div className="bg-zinc-200/20 flex items-center justify-end w-11/12 absolute my-5 rounded-lg">
        <ConfigProvider
          button={{
            className: linearGradientButton
          }}
        >
          {!isSignIn ? <Link to="/">
            <Button buttonProps={{ size: 'middle', className: 'text-white mx-2 my-2' }} textButton="Đăng Nhập" />
          </Link> : <Link to="/register">
            <Button buttonProps={{ size: 'middle', className: 'text-white mx-2 my-2' }} textButton="Đăng ký" />
          </Link>}


        </ConfigProvider>
        <Outlet />
      </div>
    </div>
  );
};

export default AppHeader;
