import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list messages by chat
const getListMessagesByChat = async (chatId: number | null, cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/messages/list-messages-by-chat/${chatId}`, {
    params: { cursor }, // Lấy 20 tin nhắn trước cursor
  });
  return response.data;
};

export const useGetListMessagesByChat = (chatId: number | null, cursor: number | null) => {
  return useQuery(['getListMessagesByChat', chatId], () => getListMessagesByChat(chatId, cursor), {
    enabled: !!chatId,
  });
};

// send message
const sendMessage = async (chatId: number | null, receiverId: number | null, text: string | null) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/messages/send-message`, {
    chatId,
    receiverId,
    text,
  });
  return response.data;
};

export const useSendMessage = (chatId: number | null, receiverId: number | null, text: string | null) => {
  return useMutation(() => sendMessage(chatId, receiverId, text));
};

// count unread chats
const countUnreadChats = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/messages/count-unread-chats`);
  return response.data;
};

export const useCountUnreadChats = () => {
  return useQuery(['countUnreadChats'], () => countUnreadChats(), {
    enabled: true,
  });
};
