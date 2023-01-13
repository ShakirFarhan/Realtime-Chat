import { configureStore } from "@reduxjs/toolkit";
import activeUserSlice from "./redux/activeUserSlice";
const store = configureStore({
  reducer: {
    activeUser: activeUserSlice,
  },
});
export default store;
