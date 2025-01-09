import { useMutation, useQuery } from 'react-query';
import { api } from '..';

// comment post
const commentPost = async (postId: number | null, content: string | null) => {
  const response = await api.post(`${process.env.REACT_APP_API_URL}/comments/create-comment-post/${postId}`, {
    content,
  });
  return response.data;
};

export const useCommentPost = () => {
  return useMutation((x: { postId: number | null; content: string | null }) => commentPost(x.postId, x.content));
};

// get list comments by post
const getListCommentsByPost = async (postId: number | null, cursor: number | null) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/comments/get-comments-post/${postId}`, {
    params: { cursor },
  });
  return response.data;
};

export const useGetListCommentsByPost = (postId: number | null, cursor: number | null) => {
  return useQuery(['getListCommentsByPost', [postId]], () => getListCommentsByPost(postId, cursor), {
    enabled: !!postId,
  });
};
