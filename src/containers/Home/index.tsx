import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';
import './index.scss';
import { useGetProfile } from '../../apis/Profiles';
import { useAppDispatch } from '../../store';
import { setProfile } from '../../store/profileSlice';
import HomeContentArea from '../../components/Home/HomeContentArea';

const { Content, Sider } = Layout;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile } = useGetProfile();

  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);

  return (
    <Layout className="home-page">
      <Navbar />
      <Layout className="home-page-layout-content">
        <Sider width={400}>
          <LeftSidebar />
        </Sider>
        <Content className="content">
          <HomeContentArea />
        </Content>
        <Sider width={400}>
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Home;
