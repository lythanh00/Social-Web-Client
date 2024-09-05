import React from 'react';
import { Layout } from 'antd';
import Logout from '../../components/Logout';

const { Header, Content, Sider } = Layout;

const Chat: React.FC = () => {
  return (
    <div>
      abc <Logout />
    </div>
  );
};

export default Chat;
