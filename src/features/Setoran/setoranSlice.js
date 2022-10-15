import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;


export const getBankCompany = createAsyncThunk(
    'setoran/getBankCompany',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/get-bank-perusahaan',
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

export const getHistorySetor = createAsyncThunk(
    'setoran/getHistorySetor',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/setor' + param,
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
    'setoran/getAkunTrading',
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

export const getAkunTradingDemo = createAsyncThunk(
    'setoran/getAkunTradingDemo',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/get-akun-trading?tipe=demo',
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
                        let payload1 = payload ? data.payload[0] : [];
						localStorage.setItem('loginDemo', payload.length > 0 ? payload1.login : '');						
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

export const actionSetor = createAsyncThunk(
    'setoran/actionSetor',
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
            const response = await axios.post(API_URL + '/action-setor', form, config);
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
    dataBank: [],
    akunTrading: [],
    akunTradingDemo: [],
    dataHistory: [],
    totalData: 0,
};

export const setoranSlice = createSlice({
    name: 'setoran',
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
        },
        chgProps: (state, { payload }) => {
            console.log(payload);
            state.persetujuan[payload.key] = payload.value;
        },
    },
    extraReducers: {
        [getBankCompany.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataBank = payload;
            return state;
        },
        [getBankCompany.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getBankCompany.pending]: (state) => {
            state.isFetching = true;
            state.dataBank = [];
        },
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
        [getAkunTradingDemo.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.akunTradingDemo = payload;
            return state;
        },
        [getAkunTradingDemo.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunTradingDemo.pending]: (state) => {
            state.isFetching = true;
            state.akunTradingDemo = [];
        },
        [actionSetor.fulfilled]: (state, { payload }) => {
            state.showFormSuccess = true;
            state.contentMsg = "<div style='font-size:20px; text-align:center; line-height:23px;'><strong>Terima kasih</strong><br/> Konfirmasi setor kamu sudah terkirim, tim kami akan segera melakukan pengecekan</div>";
            state.tipeSWAL = "success";
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [actionSetor.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [actionSetor.pending]: (state) => {
            state.isFetching = true;
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

export const { clearState, chgProps, closeForm } = setoranSlice.actions;
export const userSelector = (state) => state.setoran;
//export default mainSlice.reducer;