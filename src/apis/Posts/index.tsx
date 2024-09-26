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

export const useCreatePost = () => {
  return useMutation(createPost);
};

// get list posts by other
const getListPostsByOther = async (userId: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-user/${userId}`);
  return response.data;
};

export const useGetListPostsByOther = (userId: number | null) => {
  return useQuery(['getListPostsByOther', userId], () => getListPostsByOther(userId), {
    enabled: !!userId, // Chỉ gọi khi userId có giá trị
  });
};

// get list posts by owner and friends
const getListPostsByOwnerAndFriends = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner-and-friends`);
  return response.data;
};

export const useGetListPostsByOwnerAndFriends = () => {
  return useQuery(['getListPostsByOwnerAndFriends'], () => getListPostsByOwnerAndFriends(), {
    enabled: true,
  });
};
