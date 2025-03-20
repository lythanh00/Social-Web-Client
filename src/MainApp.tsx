import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { useGetProfile } from './apis/Profiles';
import { useEffect } from 'react';
import { setProfile } from './store/profileSlice';
import ChatBox from './components/ChatBox';

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
      {isOpen && <ChatBox />}
    </>
  );
};
export default MainApp;
