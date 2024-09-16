import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface AuthState {
  loading: boolean;
  error: string;
  authUser?: 'Client';
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: (): AuthState => {
    let initState: AuthState = {
      loading: false,
      error: '',
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

    logout: (state) => {
      localStorage.removeItem('token');
    },
  },
});

export const { logout, login, updateMe } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
