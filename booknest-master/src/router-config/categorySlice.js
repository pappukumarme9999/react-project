import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Interceptor.js";
import { apiEndPoint } from "../WebApi/WebApi.js";
export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  try {
    let response = await axios.get(apiEndPoint.CATEGORY_API);
    if (response.data.status) {
      console.log("API Response Success:", response.data);
      return response.data.category;
    } else {
      console.error("API returned false status:", response.data); // Log if status is false
      return [];
    }
  } catch (error) {
    console.error("API Error:", error); // Log any error from the API
    throw error;
  }
});
const slice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.categoryList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "oops Something Went Wrong";
      });
  },
});
export default slice.reducer;
