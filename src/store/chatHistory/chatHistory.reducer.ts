import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HistoryState {
  date: string;
  link: string;
  analysis: string;
}
export interface HistoryStateList {
  history: HistoryState[];
  activeRequest: HistoryState;
}

const initialState: HistoryStateList = {
  activeRequest: {
    date: "",
    link: "",
    analysis: "",
  },
  history: [],
};

export const chatHistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    currentRequest: (state, action: PayloadAction<any>) => {
      state.activeRequest = action.payload;
    },
    addToHistory: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    },
  },
});

export const { addToHistory, currentRequest } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
