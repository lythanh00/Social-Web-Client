import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list post by owner
export const useGetListPostsByOwner = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner`),
    staleTime: 5000,
    onSuccess: (data) => {
      // console.log('get list posts', data);
    },
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });
};

// create post
const createPost = async (formData: FormData) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/posts/create-post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

// Custom hook sử dụng useMutation từ React Query
export const useCreatePost = () => {
  return useMutation(createPost);
};
