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

  // kiểm tra cuộn tới cuối trang
  useEffect(() => {
    const handleWindowScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        console.log('Bạn đã cuộn tới cuối trang');
        setIsAtEnd(true);
      } else {
        setIsAtEnd(false);
      }
    };

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <Layout className="home-page">
      <Layout className="home-page-layout-content">
        <Sider width={350} breakpoint="lg" collapsedWidth="0">
          <LeftSidebar />
        </Sider>
        <Content className="content">
          <HomeContentArea isAtEnd={isAtEnd} />
        </Content>
        <Sider width={350} breakpoint="lg" collapsedWidth="0">
          <RightSidebar />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default Home;
