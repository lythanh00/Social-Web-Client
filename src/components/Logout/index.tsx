import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { css } from '@emotion/css';
import { ConfigProvider } from 'antd';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

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

  const handleLogout = () => {
    // Xóa token hoặc thông tin xác thực
    localStorage.removeItem('token'); // Hoặc cách lưu trữ khác mà bạn đang sử dụng
    navigate(CLIENT_ROUTE_PATH.SIGNIN); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div>
      <ConfigProvider
        button={{
          className: linearGradientButton,
        }}
      >
        <Button
          buttonProps={{ size: 'middle', className: 'bg-blue-400 text-white', onClick: handleLogout }}
          textButton="Đăng xuất"
        />
      </ConfigProvider>
    </div>
  );
};

export default Logout;
