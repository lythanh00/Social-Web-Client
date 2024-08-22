import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { api } from './apis';

const { Content } = Layout;

interface IMainAppProp {
}

const MainApp = (props: IMainAppProp) => {

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider={true}>
      <Content
        style={{
          padding: 24,
          margin: 0,
          height: '1vh',
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
export default MainApp;
