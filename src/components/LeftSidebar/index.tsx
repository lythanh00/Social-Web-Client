import React from 'react';
import { Avatar, Menu } from 'antd';
import { GlobalOutlined, DownCircleOutlined } from '@ant-design/icons';
import './index.scss';
import testImage from '../../assets/test-image.jpg';
import friend from '../../assets/friend.jpg';
import group from '../../assets/group.jpg';
import more from '../../assets/more.jpg';

const LeftSidebar: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      label: (
        <>
          <Avatar src={testImage} /> Lý Tiến thành
        </>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <Avatar src={friend} /> Bạn bè
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <Avatar src={group} /> Nhóm
        </>
      ),
    },
    {
      key: '4',
      label: (
        <>
          <Avatar src={more} /> More
        </>
      ),
    },
  ];

  return <Menu className="left-sidebar-menu" items={menuItems} />;
};

export default LeftSidebar;
