import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer";
import { filterSlice } from "./filterSlice";
import channelReducer from "./channelSlice";

export default configureStore({
    reducer: {
        userDetails: userReducer,
        filters: filterSlice.reducer,
        channel: channelReducer
    },
});
