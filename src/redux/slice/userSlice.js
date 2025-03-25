import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = null
               // Clear the token from cookies
               Cookies.remove("token");
             
            Cookies.remove("user");
  // Clear all persisted data from storage
  localStorage.clear(); // Clear localStorage
  sessionStorage.clear(); // Clear sessionStorage (if used)

            
        }
    }
})

export const { setUser, setToken, logout } = userSlice.actions

export default userSlice.reducer