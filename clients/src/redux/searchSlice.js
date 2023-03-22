import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { searchUsers } from '../apis/auth';
const initialState = {
  searchResults: [],
  isLoading: false,
  isError: false,
};
export const searchUserThunk = createAsyncThunk(
  'redux/searchUser',
  async (search) => {
    try {
      const { data } = await searchUsers(search);
      return data;
    } catch (error) {
      toast.error('Something Went Wrong.Try Again!');
    }
  }
);
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [searchUserThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [searchUserThunk.fulfilled]: (state, { payload }) => {
      state.searchResults = payload;
      state.isLoading = false;
    },
    [searchUserThunk.rejected]: (state) => {
      state.isError = true;
    },
  },
});
export default searchSlice.reducer;
