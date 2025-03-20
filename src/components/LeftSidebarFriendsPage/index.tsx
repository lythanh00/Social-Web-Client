import React from 'react';
import { Avatar, Menu } from 'antd';
import './index.scss';
import allFriends from '../../assets/all-friends.jpg';
import friendInvitation from '../../assets/friend-invitation.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface LeftSidebarFriendsPageProps {
  selectedKey: string;
  onMenuSelect: (key: string) => void;
}

const LeftSidebarFriendsPage: React.FC<LeftSidebarFriendsPageProps> = ({ selectedKey, onMenuSelect }) => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      label: (
        <div>
          <Avatar src={friendInvitation} /> Lời mời kết bạn
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <Avatar src={allFriends} /> Tất cả bạn bè
        </div>
      ),
    },
  ];

  return (
    <Menu
      className="left-sidebar-friends-page-menu"
      items={menuItems}
      selectedKeys={[selectedKey]}
      onClick={({ key }) => onMenuSelect(key)}
    />
  );
};

export default LeftSidebarFriendsPage;
