import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Interceptor";
import { apiEndPoint } from "../WebApi/WebApi";

export const fetchRecentProduct = createAsyncThunk("recentProduct/fetchRecentProduct", async() => {
    let response = await axios.get(apiEndPoint.RECENT_PRODUCT);
    if (response.data.status)
        return response.data.products;
});
const slice = createSlice({
    name: 'recentProduct',
    initialState: {
        recentProductList: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecentProduct.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchRecentProduct.fulfilled, (state, action) => {
            state.recentProductList = action.payload;
            state.isLoading = false;
        }).addCase(fetchRecentProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Oops! something went wrong";
        })
    }
});

export default slice.reducer;