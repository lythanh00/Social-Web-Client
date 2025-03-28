import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import ProfileContentArea from '../../components/Profile/ProfileContentArea';
import ProfileIntroduction from '../../components/Profile/ProfileIntroduction';
import ProfileFriends from '../../components/Profile/ProfileFriends';

const ProfilePage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  const handleMenuChange = (key: string) => {
    setSelectedMenu(key);
  };

  // kiểm tra cuộn tới cuối trang
  useEffect(() => {
    const handleWindowScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <Layout className="profile-page">
      <Layout className="profile-page-layout-content">
        <ProfileInfo />
        <ProfileMenu onChange={handleMenuChange} />
        <div className="profile-content">
          {selectedMenu === '1' && <ProfileContentArea isAtEnd={isAtEnd} />}
          {selectedMenu === '2' && <ProfileIntroduction />}
          {selectedMenu === '3' && <ProfileFriends />}
        </div>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
