import { useMutation } from 'react-query';
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
