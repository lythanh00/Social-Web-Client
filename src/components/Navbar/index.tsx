import React from 'react';
import { Layout, Menu, Input, Avatar } from 'antd';
import { SearchOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.jpg';
import testImage from '../../assets/test-image.jpg';
import message from '../../assets/message.jpg';
import notification from '../../assets/notification.jpg';

const { Header } = Layout;

const Navbar: React.FC = () => {
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
      icon: <Avatar src={testImage} />,
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
