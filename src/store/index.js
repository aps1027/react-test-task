import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chatSlice";

export default configureStore({
  reducer: { chat: chatReducer },
});
