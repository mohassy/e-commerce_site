import {createSlice} from "@reduxjs/toolkit";
import {loginUser} from "../models/actions.ts";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false
    },
    reducers: {
        startLogin:(state) =>{
            state.isFetching = true;
        },
        successfulLogin: (state, action:loginUser) =>{
            // @ts-ignore
            state.currentUser = action.payload;
            state.isFetching = false;
            state.isError = false;
        },
        errorLogin: (state) =>{
            state.isError = true;
            state.isFetching = false;
        },
        logout: (state)=>{
            state.currentUser = null;
        }
    }
})
export const {startLogin, successfulLogin, errorLogin, logout} = userSlice.actions;
export default userSlice.reducer;
