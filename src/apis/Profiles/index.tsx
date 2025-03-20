import { useMutation, useQuery } from 'react-query';
import { api } from '..';
import { useAppDispatch } from '../../store';
import { setProfile } from '../../store/profileSlice';

// get profile owner
export const useGetProfile = () => {
  return useQuery({
    enabled: false,
    queryKey: ['profile'],
    queryFn: async () => api.get(`${process.env.REACT_APP_API_URL}/profiles/profile`),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error('Error fetching posts:', error);
    },
    staleTime: 1,
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
    enabled: !!name, // Chỉ gọi khi name có giá trị
  });
};

// get profile by user id
const getProfileByUserId = async (userId: number) => {
  const response = await api.get(`${process.env.REACT_APP_API_URL}/profiles/profile/${userId}`);
  return response.data;
};

export const useGetProfileByUserId = (userId: number) => {
  return useQuery(['getOtherProfile', userId], () => getProfileByUserId(userId), {
    enabled: !!userId,
  });
};
