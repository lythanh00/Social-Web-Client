import React from 'react';
import { Layout, Menu, Input, Avatar, Popover } from 'antd';
import { SearchOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.jpg';
import setting from '../../assets/setting.jpg';
import logout from '../../assets/logout.jpg';
import message from '../../assets/message.jpg';
import notification from '../../assets/notification.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();

  const profilePopoverContent = (
    <div className="profile-popover-content">
      <p onClick={() => navigate(CLIENT_ROUTE_PATH.PROFILE)}>
        <strong>
          <Avatar className="border-1 border-gray-400 rounded-full" src={profile.avatar.url} />{' '}
          {profile.lastName + ' ' + profile.firstName}
        </strong>
      </p>
      <p>
        <Avatar src={setting} /> Cài đặt
      </p>
      <p>
        <Avatar src={logout} /> Đăng xuất
      </p>
    </div>
  );

  const menuItems = [
    {
      key: '1',
      icon: <Avatar src={message} />,
    },
    {
      key: '2',
      icon: <Avatar src={notification} />,
    },
    {
      key: '3',
      icon: (
        <Popover
          content={profilePopoverContent}
          trigger="click"
          placement="bottomRight"
          // arrow={{ pointAtCenter: false }}
        >
          <Avatar className="border-1 border-gray-400 rounded-full" src={profile.avatar.url} />
        </Popover>
      ),
    },
  ];

  return (
    <Header className="navbar">
      <div className="navbar-logo-search">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <Input placeholder="Tìm kiếm trên SideWalk IceTea" prefix={<SearchOutlined />} className="navbar-search" />
      </div>

      <Menu mode="horizontal" className="navbar-menu" items={menuItems} />
    </Header>
  );
};

export default Navbar;
