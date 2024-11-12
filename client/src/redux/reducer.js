import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const token = localStorage.getItem("token") || null;

export const userSlice = createSlice({
    name: "user",
    initialState: { user: storedUser, token },
    reducers: {
        loginReducer: (state, action) => {
            const { user, token } = action.payload;

            state.user = user;
            state.token = token;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const { loginReducer, logout } = userSlice.actions;
export const selectUser = (state) => state.userDetails;
export default userSlice.reducer;