import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from './apis';

const { Content } = Layout;

interface IMainAppProp {}

const MainApp = (props: IMainAppProp) => {
  return (
    // <Layout style={{ minHeight: '100vh' }} hasSider={true}>
    //   <Content>
    //     <Outlet />
    //   </Content>
    // </Layout>
    <Outlet />
  );
};
export default MainApp;
