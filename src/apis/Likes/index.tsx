import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// like post
const likePost = async (postId: number | null) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/likes/like-post/${postId}`);
  return response.data;
};

export const useLikePost = () => {
  return useMutation((postId: number | null) => likePost(postId));
};

// unlike post
const unLikePost = async (postId: number | null) => {
  const response = await api.delete(`${process.env.REACT_APP_API_URL}/likes/unlike-post/${postId}`);
  return response.data;
};

export const useUnLikePost = () => {
  return useMutation((postId: number | null) => unLikePost(postId));
};

// get list likes by post
const getListLikesByPost = async (postId: number | null, cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/likes/list-likes/${postId}`, {
    params: { cursor },
  });
  return response.data;
};

export const useGetListLikesByPost = (postId: number | null, cursor: number | null) => {
  return useQuery(['getListLikesByPost', postId], () => getListLikesByPost(postId, cursor), {
    enabled: !!postId,
  });
};
