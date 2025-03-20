import { useSelector } from 'react-redux';
import MainApp from '../../MainApp';
import { RootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';

import { socketConfig } from '../../socket';
const Client = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (profile.userId) {
      socketConfig.auth = {
        authorization: `${localStorage.getItem('token')}`,
      }; //cấp quyền socket nếu có
      socketConfig.connect();
      socketConfig.emit('watching_message', profile.userId); // socket connect
    }
  }, [profile.userId]);

  return <MainApp />;
};
export default Client;
