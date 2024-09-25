import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import { useAppDispatch } from '../../store';
import { useGetProfile, useGetProfileByUserId } from '../../apis/Profiles';
import { setOtherProfile, setProfile } from '../../store/profileSlice';
import ProfileInfo from '../../components/ProfileInfo';
import ProfileMenu from '../../components/ProfileMenu';
import ContentArea from '../../components/ContentArea';
import ProfileIntroduction from '../../components/ProfileIntroduction';
import ProfileFriends from '../../components/ProfileFriends';
import OtherProfileInfo from '../../components/OtherProfileInfo';
import { useParams, useSearchParams } from 'react-router-dom';
import OtherContentArea from '../../components/OtherContentArea';

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
          {selectedMenu === '1' && <OtherContentArea />}
          {selectedMenu === '2' && <ProfileIntroduction />}
          {selectedMenu === '3' && <ProfileFriends />}
        </div>
      </Layout>
    </Layout>
  );
};

export default OtherProfilePage;
