import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    loading : false,
    error: null,
    signInError: null,
    signUpError: null,
}

const userSlice = createSlice({
    name :'user',
    initialState,
    reducers :{
        signInStart: (state) =>{
            state.loading = true
            state.signInError = null
        },
        signInSuccess: (state,action) =>{ 
            state.currentUser = action.payload;
            state.loading = false;
            state.signInError = null
        },
        signInFailure: (state,action) =>{
            state.loading = false;
            state.signInError = action.payload;
        },
        updateUserStart:(state)=>{
            state.loading = true;
        },
        updateUserSuccess:(state,action) =>{
           state.currentUser = action.payload;
           state.loading = false;
           state.error = null
        },
        updateUserFailure: (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart:(state)=>{
            state.loading = true;
        },
        deleteUserSuccess:(state) =>{
           state.currentUser = null;
           state.loading = false;
           state.error = null
        },
        deleteUserFailure: (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state)=>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        signUpStart: (state) => {
            state.loading = true;
            state.signUpError = null
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.signUpError = null;
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.signUpError = action.payload;
        }
    }
})

export const { 
    signInStart, signInSuccess ,signInFailure,
     updateUserFailure,updateUserSuccess, updateUserStart,
    deleteUserStart, deleteUserSuccess, deleteUserFailure,
    signOut,
    signUpStart,signUpSuccess,signUpFailure
} = userSlice.actions;

export default userSlice.reducer;