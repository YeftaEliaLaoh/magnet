import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";


export const getDT = createAsyncThunk(
    'yukBelajar/getDT',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
		const _URL = API_URL.replace('/api','');
        var config = {
            method: 'get',
            url: _URL + '/data-artikel'+param,
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        
       
        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = data.payload;

                       
                        return payload;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } else {
                    return thunkAPI.rejectWithValue(_data);
                }
            })
            .catch(function (error) {
                console.log(error);
                return thunkAPI.rejectWithValue(error);
            });
    }
);

export const getDTDetail = createAsyncThunk(
    'yukBelajar/getDTDetail',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
		const _URL = API_URL.replace('/api','');
        var config = {
            method: 'get',
            url: _URL + '/data-artikel'+param,
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        
       
        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = data.payload;

                       
                        return payload;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } else {
                    return thunkAPI.rejectWithValue(_data);
                }
            })
            .catch(function (error) {
                console.log(error);
                return thunkAPI.rejectWithValue(error);
            });
    }
);


const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',    
    data: [],
	dataDetail:{},
    totalData: 0,
    
};

export const ybSlice = createSlice({
    name: 'yukBelajar',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = null;
            return state;
        },
        chgProps: (state, { payload }) => {
            console.log(payload);
            state.persetujuan[payload.key] = payload.value;
        },
		closeForm: (state) => {            
			state.showFormSuccess = false;
        },
    },
    extraReducers: {

        [getDT.fulfilled]: (state, { payload }) => {			
            state.isFetching = false;
            state.data = payload.data;          
            state.totalData = payload.total_data;          
            return state;
        },
        [getDT.rejected]: (state, { payload }) => {            
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getDT.pending]: (state) => {
            state.isFetching = true;
            state.wakil_pialang = [];
        },
		 [getDTDetail.fulfilled]: (state, { payload }) => {	
			console.log(payload);
            state.isFetching = false;
            state.dataDetail = payload;                 
            return state;
        },
        [getDTDetail.rejected]: (state, { payload }) => {            
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getDTDetail.pending]: (state) => {
            state.isFetching = true;
            state.wakil_pialang = [];
        },
    }
})

export const { clearState, chgProps, closeForm } = ybSlice.actions;
export const userSelector = (state) => state.yukBelajar;
