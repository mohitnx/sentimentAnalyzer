import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface HistoryState {
  videoLink: string;
  commentCount?: number | null;
  analysis: string;
}

export interface CommentsDetailsType {
  comments:string[]
  labels:string[]
}

export interface HistoryStateList {
  activeRequest: HistoryState;
  comments: string[]
  labels: string[]
}

const initialState: HistoryStateList = {
  activeRequest: {
    videoLink: "",
    commentCount: null,
    analysis: "",
  },

  comments:[],
  labels:[]
};

export const chatHistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    currentRequest: (state, action: PayloadAction<any>) => {
      state.activeRequest = action.payload;
    },
  
  setComments: (state, action: PayloadAction<any>) => {
    state.comments = action.payload;
  },
  setLabels: (state, action: PayloadAction<any>) => {
    state.labels = action.payload;
  },
  }
});

export const {  currentRequest,setComments,setLabels } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;
