import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HistoryState {
  videoLink: string;
  commentCount?: number | null;
  analysis: string;
  modelUsed: string;
}


export interface HistoryStateList {
  activeRequest: HistoryState;

  
}

const initialState: HistoryStateList = {
  activeRequest: {
    videoLink: "",
    commentCount: null,
    analysis: "",
    modelUsed: ''
  },
};

export const chatHistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    currentRequest: (state, action: PayloadAction<any>) => {
      state.activeRequest = action.payload;
    },
  

  }
});

export const {  currentRequest } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
