import React from 'react';
import { Layout, Menu, Input, Avatar } from 'antd';
import { SearchOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.jpg'; // Import hình ảnh
const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className="navbar">
      <div className="navbar-logo-search">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <Input placeholder="Tìm kiếm trên Facebook" prefix={<SearchOutlined />} className="navbar-search" />
      </div>

      <Menu mode="horizontal" className="navbar-menu">
        <Menu.Item key="1" icon={<MessageOutlined />} />
        <Menu.Item key="2" icon={<BellOutlined />} />
        <Menu.Item key="3">
          <Avatar src="https://example.com/avatar.png" />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
