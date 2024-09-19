import React, { useState } from 'react';
import { Menu } from 'antd';

import './index.scss';

interface ProfileMenuProps {
  onChange: (key: string) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onChange }) => {
  const [selectedKey, setSelectedKey] = useState<string>('1');

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    onChange(e.key);
  };
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

  return (
    <Menu
      mode="horizontal"
      className="profile-menu"
      items={menuItems}
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    />
  );
};

export default ProfileMenu;
