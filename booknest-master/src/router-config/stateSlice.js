import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Interceptor.js";
import { apiEndPoint } from "../WebApi/WebApi.js";

export const fetchState = createAsyncThunk('state/fetchState', async () => {
    let response = await axios.get(apiEndPoint.STATE_API);
    if (response.data.status) {
        console.log("Fetched states:", response.data);
        return response.data.stateList
    }
})
const slice = createSlice({
    name: 'state',
    initialState: {
        stateList: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchState.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchState.fulfilled, (state, action) => {
            state.stateList = action.payload
            state.isLoading = false
        }).addCase(fetchState.rejected, (state, action) => {
            state.isLoading = false
            state.error = "oops Something Went Wrong"
        })
    }
})
export default slice.reducer;