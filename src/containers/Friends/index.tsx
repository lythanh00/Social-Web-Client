import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import LeftSidebarFriendsPage from '../../components/LeftSidebarFriendsPage';
import ReceivedFriendRequests from '../../components/ReceivedFriendRequests';

const FriendsPage: React.FC = () => {
  return (
    <Layout className="friends-page">
      <Navbar />
      <Layout className="friends-page-layout-content">
        <Sider width={350}>
          <LeftSidebarFriendsPage />
        </Sider>
        <Content className="friends-page-content">
          <ReceivedFriendRequests />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FriendsPage;
