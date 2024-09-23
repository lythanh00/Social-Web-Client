import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import PostCard from '../../components/PostCard';
import RightSidebar from '../../components/RightSidebar';
import StatusUpdate from '../../components/StatusUpdate';
import NewsFeed from '../../components/NewsFeed';
import ContentArea from '../../components/ContentArea';
import './index.scss';
import { useGetProfile } from '../../apis/Profiles';
import { useAppDispatch } from '../../store';
import { setProfile } from '../../store/profileSlice';

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile, error } = useGetProfile();

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
          <ContentArea />
        </Content>
        <Sider width={400}>
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Home;
