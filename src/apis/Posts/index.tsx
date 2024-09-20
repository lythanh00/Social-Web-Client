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

// // get list posts by orther
// const getProfileByProfileId = async (profileId: number) => {
//   const response = await api.get(`${process.env.REACT_APP_API_URL}/profiles/orther-profile/${profileId}`);
//   return response.data;
// };

// export const useGetProfileByProfileId = (profileId: number) => {
//   return useQuery(['getOrtherProfile', profileId], () => getProfileByProfileId(profileId), {
//     enabled: !!profileId, // Chỉ gọi khi userId có giá trị
//   });
// };
