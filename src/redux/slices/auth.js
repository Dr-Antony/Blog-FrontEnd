import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await instance.post('/auth/login', params);
    return data;
})


export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    debugger
    const { data } = await instance.get('/auth/me');
    debugger
    return data;
})

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params)=>{
    const { data } = await instance.post('/auth/register',params);
    console.log(data)
    return data
})


const initialState = {
    data: null,
    status: 'loading'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchUserData.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUserData.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchRegistration.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegistration.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegistration.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        }
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;