import React from 'react';
import { Avatar, Menu } from 'antd';
import './index.scss';
import friend0 from '../../assets/friend0.jpg';
import allFriends from '../../assets/all-friends.jpg';
import friendInvitation from '../../assets/friend-invitation.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { TeamOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';

const LeftSidebarFriendsPage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      label: (
        <div onClick={() => navigate(CLIENT_ROUTE_PATH.FRIENDS)}>
          <Avatar src={friend0} /> Trang chủ
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <>
          <Avatar src={friendInvitation} /> Lời mời kết bạn
        </>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <Avatar src={allFriends} /> Tất cả bạn bè
        </>
      ),
    },
  ];

  return <Menu className="left-sidebar-friends-page-menu" items={menuItems} defaultSelectedKeys={['1']} />;
};

export default LeftSidebarFriendsPage;
