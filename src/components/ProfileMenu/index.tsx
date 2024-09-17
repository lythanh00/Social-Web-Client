import React from 'react';
import { Menu } from 'antd';

import './index.scss';

const ProfileMenu: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      label: 'Bài viết',
    },
    {
      key: '2',
      label: 'Giới thiệu',
    },
    {
      key: '3',
      label: 'Bạn bè',
    },
  ];

  return <Menu mode="horizontal" className="profile-menu" items={menuItems} defaultSelectedKeys={['1']} />;
};

export default ProfileMenu;
