import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface AuthState {
  loading: boolean;
  error: string;
  authUser?: 'Client';
}

const initialState = (): AuthState => {
  let initState: AuthState = {
    loading: false,
    error: '',
  };

  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    initState.authUser = JSON.parse(authUser);
  }

  return initState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction) => {
      localStorage.setItem('token', JSON.stringify(state));
    },
    updateMe: (state, action: PayloadAction) => {},
    resetAuthState: () => initialState(),
  },
});

export const { resetAuthState, login, updateMe } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
