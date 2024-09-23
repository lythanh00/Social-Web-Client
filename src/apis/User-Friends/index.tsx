import { useQuery } from 'react-query';
import { api } from '..';

// get list friends
export const useGetFriends = () => {
  return useQuery({
    queryKey: ['user-friend'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/user-friends/list-friends`),
    staleTime: 5000,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
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
