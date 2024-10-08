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

  const { data: dataOtherProfile } = useGetProfileByUserId(userId);
  console.log('data other profile', dataOtherProfile);
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
      <Navbar />
      <Layout className="profile-page-layout-content">
        <OtherProfileInfo />
        <ProfileMenu onChange={handleMenuChange} />
        <div className="profile-content">
          {selectedMenu === '1' && <OtherProfileContentArea />}
          {selectedMenu === '2' && <OtherProfileIntroduction />}
          {selectedMenu === '3' && <OtherProfileFriends />}
        </div>
      </Layout>
    </Layout>
  );
};

export default OtherProfilePage;
