import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Interceptor.js";
import { apiEndPoint } from "../WebApi/WebApi.js";
export const fetchCitiesByState = createAsyncThunk(
    'city/fetchCitiesByState',
    async (state_id) => {
        try {
            // Use POST to send state_id in the request body
            console.log("Sending stateId in request body:", { stateId: state_id });

            const response = await axios.post(apiEndPoint.CITY_API, { stateId: state_id });
            console.log("Response from API:", response.data);
            if (response.data.status) {
                console.log("Fetched cities:", response.data);
                return response.data.city;  
            } else {
                throw new Error("Failed to fetch cities");
            }
        } catch (error) {
            console.error("Error in fetchCitiesByState:", error);
            throw new Error(error.message || "Something went wrong while fetching cities");
        }
    }
);
const citySlice = createSlice({
    name: 'city',
    initialState: {
        city: [],
        isLoading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitiesByState.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCitiesByState.fulfilled, (state, action) => {
                state.cityList = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCitiesByState.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to load cities";
            });
    },
});
export default citySlice.reducer;
