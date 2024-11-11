import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list post by owner
const getListPostsByOwner = async () => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner`);
  return response.data;
};

export const useGetListPostsByOwner = () => {
  return useQuery(['getListPostsByOwner'], () => getListPostsByOwner(), {
    enabled: true,
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

// get post by postId
const getPostByPostId = async (postId: number) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/get-post/${postId}`);
  return response.data;
};

export const useGetPostByPostId = (postId: number) => {
  console.log('ooo');

  return useQuery(['getPostByPostId', postId], () => getPostByPostId(postId), {
    enabled: !!postId, // Chỉ gọi khi userId có giá trị
  });
};
