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
