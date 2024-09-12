import React from 'react';
import { Avatar, Menu } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, GlobalOutlined, DownCircleOutlined } from '@ant-design/icons';
import './index.scss';

const LeftSidebar: React.FC = () => {
  return (
    <Menu className="left-sidebar-menu">
      <Menu.Item key="1">
        <Avatar src="https://example.com/avatar.png" /> Lý Tiến thành
      </Menu.Item>
      <Menu.Item key="2" icon={<TeamOutlined />}>
        Bạn bè
      </Menu.Item>
      <Menu.Item key="3" icon={<GlobalOutlined />}>
        Nhóm
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
      <Menu.Item key="4" icon={<DownCircleOutlined />}>
        More
      </Menu.Item>
    </Menu>
  );
};

export default LeftSidebar;
