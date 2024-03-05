import { configureStore } from "@reduxjs/toolkit";
import chatHistorySlice from "./chatHistory/chatHistory.reducer";

export const store = configureStore({
  reducer: {
    history: chatHistorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
