import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiEndPoint } from "../WebApi/WebApi";
import newAxios from '../Interceptor';

export const addBook = createAsyncThunk(
  'book/addBook',
  async (bookData, { rejectWithValue }) => {
    try {
      console.log("Sending book data to API:", bookData); 
      const response = await newAxios.post(apiEndPoint.ADD_BOOK, bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response received from API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding book to database:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const addBookSlice = createSlice({
  name: 'addBook',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetAddBookState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to add book';
      });
  },
});

export const { resetAddBookState } = addBookSlice.actions;
export default addBookSlice.reducer;
