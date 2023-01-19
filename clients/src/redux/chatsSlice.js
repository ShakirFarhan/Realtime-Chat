import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllChats } from "../apis/chat";
const initialState = {
  chats: [],
  activeChat: "",
  isLoading: false,
};
export const fetchChats = createAsyncThunk("redux/chats", async () => {
  try {
    const data = await fetchAllChats();
    return data;
  } catch (error) {
    console.log(error);
  }
});
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat: (state, { payload }) => {
      state.activeChat = payload;
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchChats.fulfilled]: (state, { payload }) => {
      state.chats = payload;
      state.isLoading = false;
    },
    [fetchChats.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setActiveChat } = chatsSlice.actions;
export default chatsSlice.reducer;
