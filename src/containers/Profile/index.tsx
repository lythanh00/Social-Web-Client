import React, { useEffect } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { useGetProfile } from '../../apis/Profiles';
import { setProfile } from '../../store/profileSlice';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileMenu from '../../components/ProfileMenu';
import ContentArea from '../../components/ContentArea';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile, error } = useGetProfile();
  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);
  return (
    <Layout className="profile-page">
      <Navbar />
      <Layout className="profile-page-layout-content">
        <ProfileInfo />
        <ProfileMenu />
        <div className="profile-content-area">
          <ContentArea />
        </div>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
