import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./redux/activeUserSlice";
import chatsSlice from "./redux/chatsSlice";
import profileSlice from "./redux/profileSlice";
import searchSlice from "./redux/searchSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
    profile: profileSlice,
    search: searchSlice,
    chats: chatsSlice,
  },
});
export default store;
