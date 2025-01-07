import React, { useEffect, useState } from 'react';
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
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // xử lý cuộn trang
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // cuộn tới cuối trang
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      console.log('Bạn đã cuộn tới cuối trang');
      setIsAtEnd(true);
    } else {
      setIsAtEnd(false);
    }
  };

  return (
    <Layout className="home-page" onScroll={handleScroll}>
      {/* <Navbar /> */}
      <Layout className="home-page-layout-content">
        <Sider width={400}>
          <LeftSidebar />
        </Sider>
        <Content className="content">
          <HomeContentArea isAtEnd={isAtEnd} />
        </Content>
        <Sider width={400}>
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Home;
