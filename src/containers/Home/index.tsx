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
import './index.scss';

const { Header, Content, Sider } = Layout;

const Home: React.FC = () => {
  return (
    <Layout className="homepage">
      <Navbar />
      <Layout className="layout-content">
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
