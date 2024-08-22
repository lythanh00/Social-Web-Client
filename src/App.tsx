import React from 'react';
import RoutesApp from './routes';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <RoutesApp />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
