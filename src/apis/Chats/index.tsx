import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// create chat
const createChat = async (participant2Id: number | null) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/chats/create-chat`, {
    participant2Id,
  });
  return response.data;
};

export const useCreateChat = () => {
  return useMutation((participant2Id: number | null) => createChat(participant2Id));
};
