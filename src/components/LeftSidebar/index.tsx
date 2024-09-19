import React from 'react';
import { Avatar, Menu } from 'antd';
import './index.scss';
import friend from '../../assets/friend.jpg';
import group from '../../assets/group.jpg';
import more from '../../assets/more.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const LeftSidebar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      label: (
        <div onClick={() => navigate(CLIENT_ROUTE_PATH.PROFILE)}>
          <Avatar src={profile.avatar.url} /> {profile.lastName + ' ' + profile.firstName}
        </div>
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
