import { createSlice } from "@reduxjs/toolkit";
// import { validUser } from "../apis/auth";
const initialState = {
  id: "",
  email: "",
  profilePic: "",
};
// export const getActiveUser = createAsyncThunk("user/activeUser", async () => {
//   try {
//     const res = await validUser();
//     if (!res.token) {
//       return false;
//     } else {
//       return res.user;
//     }
//   } catch (error) {
//     console.log("error in getActiveuser thunk");
//   }
// });
const activeUserSlice = createSlice({
  name: "activeUser",
  initialState,
  reducers: {
    setActiveUser: (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.profilePic;
      state.profilePic = payload.profilePic;
    },
  },
  // extraReducers: {
  //   [getActiveUser.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getActiveUser.fulfilled]: (state, { payload }) => {
  //     state.id = payload._id;
  //     state.email = payload.email;
  //     state.profilePic = payload.profilePic;
  //     state.err = false;
  //     state.isLoading = false;
  //   },
  //   [getActiveUser.rejected]: (state) => {
  //     state.err = true;
  //     state.isLoading = false;
  //   },
  // },
});
export const { setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
