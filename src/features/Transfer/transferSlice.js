import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

export const getHistorySetor = createAsyncThunk(
    'transfer/getHistory',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/transfer' + param,
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

export const getAkunTrading = createAsyncThunk(
    'transfer/getAkunTrading',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/get-akun-trading?tipe=real',
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

export const getAkunTradingTo = createAsyncThunk(
    'transfer/getAkunTradingTo',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-akun-to?from='+param,
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

export const actionTransfer = createAsyncThunk(
    'setoran/actionTransfer',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const form = Object.keys(param).reduce((f, k) => {
            f.append(k, param[k]);
            return f;
        }, new FormData());
        const config = {
            headers: {
                'Authorization': token,
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/action-transfer', form, config);
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
    showFormSuccess: false,
    errorMessage: '',
    akunTrading: [],
    akunTradingTo: [],
    dataHistory: [],
    totalData: 0,
};

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = null;
            return state;
        },
        closeForm: (state) => {
            state.showFormSuccess = false;
            state.errorMessage = '';
            state.akunTradingTo = [];
        },
        chgProps: (state, { payload }) => {
            console.log(payload);
            state.persetujuan[payload.key] = payload.value;
        },
    },
    extraReducers: {
        
        [getAkunTrading.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.akunTrading = payload;
            return state;
        },
        [getAkunTrading.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunTrading.pending]: (state) => {
            state.isFetching = true;
            state.akunTrading = [];
        },
       [getAkunTradingTo.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.akunTradingTo = payload;
            return state;
        },
        [getAkunTradingTo.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunTradingTo.pending]: (state) => {
            state.isFetching = true;
            state.akunTradingTo = [];
			state.errorMessage = '';
        },
       [actionTransfer.fulfilled]: (state, { payload }) => {
            state.showFormSuccess = true;
            state.contentMsg = "<div style='font-size:20px; text-align:center; line-height:23px;'><strong>Terima kasih</strong><br/> Transfer dana kamu sudah selesai</div>";
            state.tipeSWAL = "success";
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [actionTransfer.rejected]: (state, { payload }) => {
            
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [actionTransfer.pending]: (state) => {
            state.isFetching = true;
			state.errorMessage = '';
        },
        [getHistorySetor.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataHistory = payload.data;
            state.totalData = payload.total_data;
            return state;
        },
        [getHistorySetor.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getHistorySetor.pending]: (state) => {
            state.isFetching = true;
            state.dataHistory = [];
        },
    }
})

export const { clearState, chgProps, closeForm } = transferSlice.actions;
export const userSelector = (state) => state.penarikan;
//export default mainSlice.reducer;