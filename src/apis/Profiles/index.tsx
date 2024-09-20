import { useMutation, useQuery } from 'react-query';
import { api } from '..';
import { log } from 'console';

// get profile owner
export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/profiles/profile`),
    staleTime: 5000,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
  });
};

// update profile
const updateProfile = async (profileData: {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  bio: string;
  location: string;
  interests: string;
}) => {
  return api.put(`${process.env.REACT_APP_API_URL}/profiles/update-profile`, profileData);
};

export const useUpdateProfile = () => {
  return useMutation(updateProfile);
};

// search profile by name

const searchProfileByName = async (name: string) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/profiles/search-profile-by-name?name=${name}`);
  return response.data;
};

export const useSearchProfileByName = (name: string) => {
  return useQuery(['searchProfile', name], () => searchProfileByName(name), {
    enabled: false, // Chỉ gọi khi name có giá trị
  });
};
