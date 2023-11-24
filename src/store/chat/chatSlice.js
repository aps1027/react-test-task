import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, loadMessages } = chatSlice.actions;
export default chatSlice.reducer;