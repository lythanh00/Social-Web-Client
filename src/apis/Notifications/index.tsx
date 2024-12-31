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
    refetchInterval: 60000,
  });
};

// mark notification as read
const markNotificationAsRead = async (notificationId: number) => {
  return api.put(`${process.env.REACT_APP_API_URL}/notifications/mark-notification-as-read`, { notificationId });
};

export const useMarkNotificationAsRead = () => {
  return useMutation(markNotificationAsRead);
};

// count unread notifications
const countUnreadNotifications = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/notifications/count-unread-notifications`);
  return response.data;
};

export const useCountUnreadNotifications = () => {
  return useQuery(['countUnreadNotifications'], () => countUnreadNotifications(), {
    enabled: true,
    refetchInterval: 60000,
  });
};
