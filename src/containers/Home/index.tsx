import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';
import './index.scss';
import HomeContentArea from '../../components/Home/HomeContentArea';

const { Content, Sider } = Layout;

const Home: React.FC = () => {
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

  // kiểm tra cuộn tới cuối trang
  useEffect(() => {
    const handleWindowScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
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
