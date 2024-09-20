import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { useGetProfile, useGetProfileByUserId } from '../../apis/Profiles';
import { setOrtherProfile, setProfile } from '../../store/profileSlice';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileMenu from '../../components/ProfileMenu';
import ContentArea from '../../components/ContentArea';
import ProfileIntroduction from '../../components/ProfileIntroduction';
import ProfileFriends from '../../components/ProfileFriends';
import OrtherProfileInfo from '../../components/OrtherProfileInfo';
import { useParams, useSearchParams } from 'react-router-dom';

const OrtherProfilePage: React.FC = () => {
  // load owner profile
  const dispatch = useAppDispatch();
  const { data: dataProfile, error } = useGetProfile();
  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);

  const [searchParams] = useSearchParams();
  const stringUserId = searchParams.get('userId');
  const userId = parseInt(stringUserId as any);

  const { data: dataOrtherProfile } = useGetProfileByUserId(userId);
  console.log('data orther profile', dataOrtherProfile);
  if (dataOrtherProfile) {
    dispatch(setOrtherProfile(dataOrtherProfile as any));
  }

  const [selectedMenu, setSelectedMenu] = useState<string>('1');
  const handleMenuChange = (key: string) => {
    setSelectedMenu(key);
  };
  if (!dataOrtherProfile) {
    return <div>Loading...</div>; // Hoặc một loader khác
  }
  return (
    <Layout className="profile-page">
      <Navbar />
      <Layout className="profile-page-layout-content">
        <OrtherProfileInfo />
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
