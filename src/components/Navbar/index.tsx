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
  return (
    <Header className="navbar">
      <div className="navbar-logo-search">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <Input placeholder="Tìm kiếm trên SideWalk IceTea" prefix={<SearchOutlined />} className="navbar-search" />
      </div>

      <Menu mode="horizontal" className="navbar-menu">
        <Menu.Item key="1">
          <Avatar src={message} />
        </Menu.Item>
        <Menu.Item key="2">
          <Avatar src={notification} />
        </Menu.Item>
        <Menu.Item key="3">
          <Avatar src={testImage} />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
