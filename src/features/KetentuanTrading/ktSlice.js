import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

export const getSetting = createAsyncThunk(
    'option/getSetting',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const config = {
            headers: {
                'x-app-origin': 'backoffice-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get(API_URL + '/general-option/data-setting', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
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


export const getKT = createAsyncThunk(
    'option/getKT',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
		const data_tipe_akun_id = sessionStorage.getItem('data_tipe_akun_id');
        var config = {
            method: 'get',
            url: API_URL + '/get-data-ketentuan-trading?data_tipe_akun_id='+data_tipe_akun_id,
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        // console.log('getKT');
        // console.log(config);
        
        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = {
                            ...data.payload,
                            data_ketentuan_trading_id: data.payload.data_ketentuan_trading_id ? data.payload.data_ketentuan_trading_id : '',
                            agreement1: data.payload.data_ketentuan_trading_id ? 1 : '',
                        }

                        if (payload === '') {
                            payload = {
                                data_ketentuan_trading_id: '',
                                agree: '',
                            }
                        }
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

export const simpanDataKT = createAsyncThunk(
    'kt/simpanDataKT',
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
            const response = await axios.post(API_URL + '/action-data-ketentuan-trading', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
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
    dataSetting: [],
    dataKetentuanTrading: {}
};

export const ktSlice = createSlice({
    name: 'dtSetting',
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
            state.dataKetentuanTrading[payload.key] = payload.value;
        },
    },
    extraReducers: {
        [getSetting.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataSetting = payload;
            return state;
        },
        [getSetting.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getSetting.pending]: (state) => {
            state.isFetching = true;
            state.dataSetting = [];
        },
        [getKT.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataKetentuanTrading = payload;
            return state;
        },
        [getKT.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getKT.pending]: (state) => {
            state.isFetching = true;
            state.dataKetentuanTrading = {};
        },
    }
})

export const { clearState, chgProps } = ktSlice.actions;
export const userSelector = (state) => state.dtSetting;
//export default mainSlice.reducer;