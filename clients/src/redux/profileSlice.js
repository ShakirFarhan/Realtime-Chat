import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showProfile: false,
  showNotifications: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setShowProfile: (state, { payload }) => {
      state.showProfile = payload;
    },
    setShowNotifications: (state, { payload }) => {
      state.showNotifications = payload;
    },
  },
});
export const { setShowProfile, setShowNotifications } = profileSlice.actions;
export default profileSlice.reducer;
