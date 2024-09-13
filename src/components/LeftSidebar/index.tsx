import React from 'react';
import { Avatar, Menu } from 'antd';
import { GlobalOutlined, DownCircleOutlined } from '@ant-design/icons';
import './index.scss';
import testImage from '../../assets/test-image.jpg';
import friend from '../../assets/friend.jpg';
import group from '../../assets/group.jpg';
import more from '../../assets/more.jpg';

const LeftSidebar: React.FC = () => {
  return (
    <Menu className="left-sidebar-menu">
      <Menu.Item key="1">
        <Avatar src={testImage} /> Lý Tiến thành
      </Menu.Item>
      <Menu.Item key="2">
        <Avatar src={friend} /> Bạn bè
      </Menu.Item>
      <Menu.Item key="3">
        <Avatar src={group} /> Nhóm
      </Menu.Item>
      <Menu.Item key="4">
        <Avatar src={more} /> More
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
