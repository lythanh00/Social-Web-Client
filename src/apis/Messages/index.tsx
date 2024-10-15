import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list messages by chat
const getListMessagesByChat = async (chatId: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/messages/list-messages-by-chat/${chatId}`);
  return response.data;
};

export const useGetListMessagesByChat = (chatId: number | null) => {
  return useQuery(['getListMessagesByChat'], () => getListMessagesByChat(chatId), {
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
