import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { useGetProfile, useGetProfileByUserId } from '../../apis/Profiles';
import { setOtherProfile, setProfile } from '../../store/profileSlice';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import OtherProfileInfo from '../../components/OtherProfile/OtherProfileInfo';
import { useSearchParams } from 'react-router-dom';
import OtherProfileContentArea from '../../components/OtherProfile/OtherProfileContentArea';
import OtherProfileIntroduction from '../../components/OtherProfile/OtherProfileIntroduction';
import OtherProfileFriends from '../../components/OtherProfile/OtherProfileFriends';

const OtherProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // kiểm tra cuộn tới cuối trang
  useEffect(() => {
    const handleWindowScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        console.log('Bạn đã cuộn tới cuối trang');
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

  const [searchParams] = useSearchParams();
  const stringUserId = searchParams.get('userId');
  const userId = parseInt(stringUserId as any);

  const { data: dataOtherProfile } = useGetProfileByUserId(userId);
  if (dataOtherProfile) {
    dispatch(setOtherProfile(dataOtherProfile as any));
  }

  const [selectedMenu, setSelectedMenu] = useState<string>('1');

  const handleMenuChange = (key: string) => {
    setSelectedMenu(key);
  };

  if (!dataOtherProfile) {
    return <div>Loading...</div>; // Hoặc một loader khác
  }

  return (
    <Layout className="profile-page">
      <Layout className="profile-page-layout-content">
        <OtherProfileInfo />
        <ProfileMenu onChange={handleMenuChange} />
        <div className="profile-content">
          {selectedMenu === '1' && <OtherProfileContentArea isAtEnd={isAtEnd} />}
          {selectedMenu === '2' && <OtherProfileIntroduction />}
          {selectedMenu === '3' && <OtherProfileFriends />}
        </div>
      </Layout>
    </Layout>
  );
};

export default OtherProfilePage;
