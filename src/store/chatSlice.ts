// store/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socketConfig } from '../socket';

interface ChatState {
  open: boolean;
  friend: any;
  ownerId: number | null;
  chatId: number | null;
}

const initialState: ChatState = {
  open: false,
  friend: null,
  ownerId: null,
  chatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<{ friend: any; ownerId: number | null; chatId: number | null }>) {
      state.open = true;
      state.friend = action.payload.friend;
      state.ownerId = action.payload.ownerId;
      state.chatId = action.payload.chatId;
    },
    closeChat(state) {
      state.open = false;
      socketConfig.disconnect();
    },
    resetChatState: (state) => {
      state.open = false;
      state.friend = null;
      state.ownerId = null;
      state.chatId = null;
    },
  },
});

export const { openChat, closeChat, resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
