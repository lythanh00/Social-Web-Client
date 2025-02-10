import React, { useEffect, useState } from 'react';
import './index.scss';
import { Layout } from 'antd';
import Navbar from '../../components/Navbar';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import LeftSidebarFriendsPage from '../../components/LeftSidebarFriendsPage';
import ReceivedFriendRequests from '../../components/ReceivedFriendRequests';
import ListFriends from '../../components/ListFriends';

const FriendsPage: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <ReceivedFriendRequests />; // Hiển thị danh sách lời mời kết bạn
      case '2':
        return <ListFriends />; // Hiển thị danh sách bạn bè
      default:
        return <ReceivedFriendRequests />;
    }
  };
  return (
    <Layout className="friends-page">
      <Layout className="friends-page-layout-content">
        <Sider width={350}>
          <LeftSidebarFriendsPage selectedKey={selectedKey} onMenuSelect={setSelectedKey} />
        </Sider>
        <Content className="friends-page-content">
          {renderContent()} {/* Hiển thị nội dung tương ứng */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default FriendsPage;
