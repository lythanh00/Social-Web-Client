import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from './apis';
import Navbar from './components/Navbar';

const { Content } = Layout;

interface IMainAppProp {}

const MainApp = (props: IMainAppProp) => {
  return (
    // <Layout style={{ minHeight: '100vh' }} hasSider={true}>
    //   <Content>
    //     <Outlet />
    //   </Content>
    // </Layout>
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default MainApp;
