import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClientRoutes } from './routes/client/clientRoutes';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
