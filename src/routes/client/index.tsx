import { useSelector } from 'react-redux';
import MainApp from '../../MainApp';
import { RootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';

import { socketConfig } from '../../socket';
const Client = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //data user tồn tại thì nhảy vào đây
    if (profile.userId) {
      // dispatch(profiler(dataProfile?.data as any));
      socketConfig.auth = {
        authorization: `${localStorage.getItem('token')}`,
      }; //cấp quyền socket nếu có
      socketConfig.connect();
      socketConfig.emit('watching_message', profile.userId); // socket connect
      // socketConfig.on('chatToClient', (data) => {
      //   console.log('Connected ', data);
      // });
      //'CONNECT' là tên chanel
      // socketConfig.on('CONNECT', (data) => {
      //   // (data)=>{} 1 callback function trả về data sau khi connect thành công
      //   console.log('socket has been connected ', data);
      // });

      // return () => {
      //   // useEffect cleanUp function -> google đi
      //   console.log('socket has been disconnected...');
      //   socketConfig.disconnect();
      //   // };
      // };
    }
  }, [profile.userId]); //dependency

  return <MainApp />;
};
export default Client;
