import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from './apis';
import Navbar from './components/Navbar';
import ChatPopover from './components/ChatPopover';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { Header } from 'antd/es/layout/layout';
import { useGetProfile } from './apis/Profiles';
import { useEffect } from 'react';
import { setProfile } from './store/profileSlice';

const { Content } = Layout;

interface IMainAppProp {}

const MainApp = (props: IMainAppProp) => {
  const isOpen = useSelector((state: RootState) => state.chat.open);

  const dispatch = useAppDispatch();
  const { refetch } = useGetProfile();

  useEffect(() => {
    refetch().then((res) => {
      dispatch(setProfile(res?.data?.data as any));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      {isOpen && <ChatPopover />}
    </>
  );

  // return (
  //   <>
  //     <Layout>
  //       <Header>
  //         <Navbar />
  //       </Header>
  //       <Content>
  //         <Outlet />
  //       </Content>
  //     </Layout>
  //     {isOpen && <ChatPopover />}
  //   </>
  // );
};
export default MainApp;
