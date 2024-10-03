import { useMutation } from 'react-query';
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
