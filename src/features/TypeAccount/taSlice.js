import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import "moment/locale/id";
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

export const getRate = createAsyncThunk(
    'option/getRate',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/data-rate',
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

export const getTA = createAsyncThunk(
    'option/getTA',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/data-tipe-akun',
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


export const simpanDataTA = createAsyncThunk(
    'typeAcc/simpanDataTA',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const config = {
            headers: {
                'Authorization': token,
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/action-data-tipe-akun', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
				 
                if (data.error_message === 0) {
					let payload = data.payload;
					
					await sessionStorage.setItem("data_tipe_akun_id", payload.data_tipe_akun_id);
                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);


const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    dataSelect: { data_tipe_akun_id: '', act : 'pendaftaran' },
    dataRate: [],
    dataTypeAccount: [],
    showFormDelete: false,
};

export const taSlice = createSlice({
    name: 'typeAcc',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = null;
            return state;
        },
        chgPropsTA: (state, { payload }) => {
            state.dataSelect[payload.key] = payload.value;
        },
        confirmDel: (state, { payload }) => {
            state.dataSelect['message'] = payload;
            state.showFormDelete = true;
            return state;
        },
        closeForm: (state) => {
            state.dataSelect['message'] = '';
            state.showFormDelete = false;
        },
    },
    extraReducers: {
        [getRate.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataRate = payload;
            return state;
        },
        [getRate.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getRate.pending]: (state) => {
            state.isFetching = true;
            state.dataRate = [];
        },
        [getTA.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataTypeAccount = payload;
            return state;
        },
        [getTA.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getTA.pending]: (state) => {
            state.isFetching = true;
            state.dataTypeAccount = [];
        },
    }
})

export const { clearState, chgPropsTA, confirmDel, closeForm } = taSlice.actions;
export const userSelector = (state) => state.type_acc;
//export default mainSlice.reducer;