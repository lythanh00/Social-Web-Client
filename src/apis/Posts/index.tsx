import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// get list post by owner
const getListPostsByOwner = async (cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner`, {
    params: { cursor },
  });
  return response.data;
};

export const useGetListPostsByOwner = (cursor: number | null) => {
  return useQuery(['getListPostsByOwner'], () => getListPostsByOwner(cursor), {
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
const getListPostsByOther = async (userId: number | null, cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-user/${userId}`, {
    params: { cursor },
  });
  return response.data;
};

export const useGetListPostsByOther = (userId: number | null, cursor: number | null) => {
  return useQuery(['getListPostsByOther', userId], () => getListPostsByOther(userId, cursor), {
    enabled: !!userId,
  });
};

// get list posts by owner and friends
const getListPostsByOwnerAndFriends = async (cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/list-posts-by-owner-and-friends`, {
    params: { cursor },
  });
  return response.data;
};

export const useGetListPostsByOwnerAndFriends = (cursor: number | null) => {
  return useQuery(['getListPostsByOwnerAndFriends'], () => getListPostsByOwnerAndFriends(cursor), {
    enabled: true,
  });
};

// get post by postId
const getPostByPostId = async (postId: number) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/posts/get-post/${postId}`);
  return response.data;
};

export const useGetPostByPostId = (postId: number) => {
  return useQuery(['getPostByPostId', postId], () => getPostByPostId(postId), {
    enabled: !!postId,
  });
};
