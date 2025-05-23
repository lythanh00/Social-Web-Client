import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list friends
const getFriends = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/user-friends/list-friends`);
  return response.data;
};

export const useGetFriends = () => {
  return useQuery(['getFriends'], () => getFriends(), {
    enabled: true,
  });
};

// check is friend
const checkIsFriend = async (friendId: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/user-friends/is-friend/${friendId}`);
  return response.data;
};

export const useCheckIsFriend = (friendId: number | null) => {
  return useQuery(['checkIsFriend', friendId], () => checkIsFriend(friendId), {
    enabled: !!friendId, // Chỉ gọi khi userId có giá trị
  });
};

// remove user friend
const removeUserFriend = async (friendId: number | null) => {
  const response = await api.delete(`${process.env.REACT_APP_API_URL}/user-friends/remove-friend`, {
    data: { friendId },
  });
  return response.data;
};

export const useRemoveUserFriend = () => {
  return useMutation((friendId: number | null) => removeUserFriend(friendId));
};

// get list friends by other
const getListFriendsByOther = async (userId: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/user-friends/list-friends-by-user/${userId}`);
  return response.data;
};

export const useGetListFriendsByOther = (userId: number | null) => {
  return useQuery(['getListFriendsByOther', userId], () => getListFriendsByOther(userId), {
    enabled: !!userId, // Chỉ gọi khi userId có giá trị
  });
};

// count friends by owner
const countFriendsByOwner = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/user-friends/count-friends-by-owner`);
  return response.data;
};

export const useCountFriendsByOwner = () => {
  return useQuery(['countFriendsByOwner'], () => countFriendsByOwner(), {
    enabled: true,
  });
};

// count friends by other
const countFriendsByOther = async (userId: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/user-friends/count-friends-by-user/${userId}`);
  return response.data;
};

export const useCountFriendsByOther = (userId: number | null) => {
  return useQuery(['countFriendsByOther', userId], () => countFriendsByOther(userId), {
    enabled: !!userId,
  });
};
