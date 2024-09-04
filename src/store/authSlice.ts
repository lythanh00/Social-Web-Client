import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface AuthState {
  loading: boolean;
  error: string;
  authUser?: 'Client';
  profiler: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    name: string;
    username: string;
    avatar: string;
    birthDate: string;
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: (): AuthState => {
    let initState: AuthState = {
      loading: false,
      error: '',
      profiler: {
        email: '',
        firstName: '',
        id: '',
        lastName: '',
        name: '',
        username: '',
        avatar: '',
        birthDate: '',
      },
    };

    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      initState.authUser = JSON.parse(authUser);
    }

    return initState;
  },
  reducers: {
    login: (state, action: PayloadAction) => {
      localStorage.setItem('token', JSON.stringify(state));
    },
    updateMe: (state, action: PayloadAction) => {},
    profiler: (state, action: PayloadAction<any>) => {
      state.profiler = {
        email: action?.payload.email,
        firstName: action?.payload.firstName,
        id: action?.payload.id,
        lastName: action?.payload.lastName,
        name: action?.payload.name,
        username: action?.payload.username,
        avatar: action?.payload.avatar
          ? action?.payload.avatar.url
          : 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        birthDate: action?.payload.birthDate,
      };
    },
    logout: (state) => {
      localStorage.removeItem('token');
    },
  },
});

export const { logout, login, updateMe, profiler } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
