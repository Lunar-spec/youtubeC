// channelSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios"
// Create async thunk for fetching channel
export const fetchChannel = createAsyncThunk(
    'channel/fetchChannel',
    async () => {
        const token = localStorage.getItem('token');
        const response = await api.get('me/channel', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    }
);

// Slice
const channelSlice = createSlice({
    name: "channel",
    initialState: {
        channelData: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannel.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChannel.fulfilled, (state, action) => {
                state.loading = false;
                state.channelData = action.payload;
            })
            .addCase(fetchChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default channelSlice.reducer;