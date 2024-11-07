import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list notifications
const getListNotifications = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/notifications/list-notifications-by-owner`);
  return response.data;
};

export const useGetListNotifications = () => {
  return useQuery(['getListNotifications'], () => getListNotifications(), {
    enabled: true,
  });
};
