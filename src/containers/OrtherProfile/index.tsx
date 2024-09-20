import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { useGetProfile } from '../../apis/Profiles';
import { setProfile } from '../../store/profileSlice';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileMenu from '../../components/ProfileMenu';
import ContentArea from '../../components/ContentArea';
import ProfileIntroduction from '../../components/ProfileIntroduction';
import ProfileFriends from '../../components/ProfileFriends';

const OrtherProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile, error } = useGetProfile();
  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);
  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const handleMenuChange = (key: string) => {
    setSelectedMenu(key);
  };
  return (
    <Layout className="profile-page">
      <Navbar />
      <Layout className="profile-page-layout-content">
        <ProfileInfo />
        <ProfileMenu onChange={handleMenuChange} />
        <div className="profile-content">
          {selectedMenu === '1' && <ContentArea />}
          {selectedMenu === '2' && <ProfileIntroduction />}
          {selectedMenu === '3' && <ProfileFriends />}
        </div>
      </Layout>
    </Layout>
  );
};

export default OrtherProfilePage;
