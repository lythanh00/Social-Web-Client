import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface ProfileState {
  loading: boolean;
  error: string;
  profile: {
    id: number | null;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    bio: string;
    location: string;
    interests: string;
    avatar: {
      id: number | null;
      url: string;
    };
    coverPhoto: {
      id: number | null;
      url: string;
    };
    userId: number | null;
  };
  ortherProfile: {
    id: number | null;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    bio: string;
    location: string;
    interests: string;
    avatar: {
      id: number | null;
      url: string;
    };
    coverPhoto: {
      id: number | null;
      url: string;
    };
    userId: number | null;
  };
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: (): ProfileState => {
    let initState: ProfileState = {
      loading: false,
      error: '',
      profile: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        bio: '',
        location: '',
        interests: '',
        avatar: {
          id: null,
          url: '',
        },
        coverPhoto: {
          id: null,
          url: '',
        },
        userId: null,
      },
      ortherProfile: {
        id: null,
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        bio: '',
        location: '',
        interests: '',
        avatar: {
          id: null,
          url: '',
        },
        coverPhoto: {
          id: null,
          url: '',
        },
        userId: null,
      },
    };

    return initState;
  },
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        bio: action.payload.bio,
        location: action.payload.location,
        interests: action.payload.interests,
        avatar: {
          id: action.payload.avatar.id,
          url: action.payload.avatar.url,
        },
        coverPhoto: {
          id: action.payload.coverPhoto.id,
          url: action.payload.coverPhoto.url,
        },
        userId: action.payload.userId,
      };
    },
    setOrtherProfile: (state, action: PayloadAction<any>) => {
      state.ortherProfile = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        bio: action.payload.bio,
        location: action.payload.location,
        interests: action.payload.interests,
        avatar: {
          id: action.payload.avatar.id,
          url: action.payload.avatar.url,
        },
        coverPhoto: {
          id: action.payload.coverPhoto.id,
          url: action.payload.coverPhoto.url,
        },
        userId: action.payload.userId,
      };
    },
  },
});

export const { setProfile, setOrtherProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;
export default profileSlice.reducer;
