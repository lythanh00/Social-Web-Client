import React from 'react';
import { Layout } from 'antd';
import Logout from '../../components/Logout';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import PostCard from '../../components/PostCard';
import RightSidebar from '../../components/RightSidebar';
import StatusUpdate from '../../components/StatusUpdate';
import NewsFeed from '../../components/NewsFeed';
import ContentArea from '../../components/ContentArea';

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <Layout className="h-dvh">
        <Sider width={400}>
          <LeftSidebar />
        </Sider>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
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
