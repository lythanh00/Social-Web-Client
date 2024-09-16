import { useQuery } from 'react-query';
import { api } from '..';

// get profile owner
export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/profiles/profile`),
    staleTime: 5000,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });
};
