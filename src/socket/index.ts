import { io } from 'socket.io-client'; // gọi Input Output từ socket client
// 'api socket' api socket được định nghĩa trong env của src với tiền tố REACT_APP_XXXXXXXX
export const socketConfig = io(`${process.env.REACT_APP_SOCKET_URL}` as string, {
    autoConnect: false,
    multiplex: false,
    transports: ['websocket'],
    //   các config khác của socket client https://socket.io/docs/v4/client-options
});
