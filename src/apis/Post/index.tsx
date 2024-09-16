import { useQuery } from 'react-query';
import { api } from '../../apis';

// get list post by owner
export const useGetListPostsByOwner = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner`),
    staleTime: 5000,
    onSuccess: (data) => {
      console.log('get list posts', data);
    },
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });
};
