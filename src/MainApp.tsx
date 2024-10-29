import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from './apis';
import Navbar from './components/Navbar';
import ChatPopover from './components/ChatPopover';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const { Content } = Layout;

interface IMainAppProp {}

const MainApp = (props: IMainAppProp) => {
  const isOpen = useSelector((state: RootState) => state.chat.open);

  return (
    // <Layout style={{ minHeight: '100vh' }} hasSider={true}>
    //   <Content>
    //     <Outlet />
    //   </Content>
    // </Layout>
    <>
      <Navbar />
      <Outlet />
      {isOpen && <ChatPopover />}
    </>
  );
};
export default MainApp;
