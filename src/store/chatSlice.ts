// store/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socketConfig } from '../socket';

interface ChatState {
  open: boolean;
  arrMessages: any[];
  friend: any;
  senderId: number | null;
  chatId: number | null;
}

const initialState: ChatState = {
  open: false,
  arrMessages: [],
  friend: null,
  senderId: null,
  chatId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    openChat(state, action: PayloadAction<{ friend: any; senderId: number | null; chatId: number | null }>) {
      state.open = true;
      state.friend = action.payload.friend;
      state.senderId = action.payload.senderId;
      state.chatId = action.payload.chatId;
    },
    closeChat(state) {
      state.open = false;
      socketConfig.disconnect();
    },
    setMessages(state, action: PayloadAction<any[]>) {
      state.arrMessages = action.payload;
    },
    addMessage(state, action: PayloadAction<any>) {
      state.arrMessages.push(action.payload);
    },
  },
});

export const { openChat, closeChat, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
