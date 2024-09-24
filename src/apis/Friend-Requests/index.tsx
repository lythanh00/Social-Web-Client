import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// send friend request
const sendFriendRequest = async (receiverId: number | null) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/friend-requests/send`, {
    receiverId,
  });
  return response.data;
};

export const useSendFriendRequest = () => {
  return useMutation((receiverId: number | null) => sendFriendRequest(receiverId));
};

// check is friend
const checkIsPendingFriendRequest = async (receiverId: number | null) => {
  const response = await api.get(
    `${process.env.REACT_APP_API_URL}/friend-requests/is-pending-friend-request/${receiverId}`,
  );
  return response.data;
};

export const useCheckIsPendingFriendRequest = (receiverId: number | null) => {
  return useQuery(['checkIsPendingFriendRequest', receiverId], () => checkIsPendingFriendRequest(receiverId), {
    enabled: !!receiverId, // Chỉ gọi khi userId có giá trị
  });
};

// remove friend request
const removeFriendRequest = async (receiverId: number | null) => {
  const response = await api.delete(`${process.env.REACT_APP_API_URL}/friend-requests/remove-friend-request`, {
    data: { receiverId },
  });
  return response.data;
};

export const useRemoveFriendRequest = () => {
  return useMutation((receiverId: number | null) => removeFriendRequest(receiverId));
};

// get list received friend requests
const getReceivedFriendRequests = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/friend-requests/list-received-friend-requests`);
  return response.data;
};

export const useGetReceivedFriendRequests = () => {
  return useQuery(['getReceivedFriendRequests'], () => getReceivedFriendRequests(), {
    enabled: true, // Chỉ gọi khi userId có giá trị
  });
};

// respond to received friend requests
const respondToFriendRequest = async (friendRequestId: number, accept: boolean) => {
  const response = await api.put(`${process.env.REACT_APP_API_URL}/friend-requests/respond/${friendRequestId}`, {
    accept,
  });
  return response.data;
};

export const useRespondToFriendRequest = () => {
  return useMutation((x: { friendRequestId: number; accept: boolean }) =>
    respondToFriendRequest(x.friendRequestId, x.accept),
  );
};
