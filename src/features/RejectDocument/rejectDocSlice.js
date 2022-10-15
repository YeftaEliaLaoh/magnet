import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";


export const getRejDoc = createAsyncThunk(
    'rejDoc/getRejDoc',
	
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-reject-document',
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

export const simpanRejDoc = createAsyncThunk(
    'rejDoc/simpanRejDoc',
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
            const response = await axios.post(API_URL + '/action-global-pendaftaran', param, config);
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
    showFormSuccess: false,
    dataRejDoc: [],
    isAddLoading: false,
    contentMsg: null,
    tipeSWAL: "success"
};

export const rejectDocSlice = createSlice({
    name: 'dtRejectDoc',
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
            state.rejDoc[payload.nama_group] = payload.value;
        },
        closeSwal: (state) => {
            state.contentMsg = null;
            state.showFormSuccess = false;
        },
    },
    extraReducers: {
        [getRejDoc.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataRejDoc = payload;
            return state;
        },
        [getRejDoc.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getRejDoc.pending]: (state) => {
            state.isFetching = true;

        },
        [simpanRejDoc.fulfilled]: (state) => {
            state.isError = false;
            state.tipeSWAL = "success";
            state.showFormSuccess = true;
            state.isAddLoading = false;
            state.contentMsg = "<div style='font-size:20px; text-align:center;'><strong>Success</strong>, Data berhasil disimpan</div>";
        },
        [simpanRejDoc.rejected]: (state, { payload }) => {
            console.log(payload);
            state.isAddLoading = payload !== undefined ? payload.isAddLoading : false;
            state.showFormSuccess = payload !== undefined ? payload.showFormSuccess : true;
            state.tipeSWAL = "error";
            state.contentMsg = payload !== undefined ? payload.contentMsg : "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, Something wrong</div>";
            state.isError = true;
            state.errorPriority = payload !== undefined ? payload.err_msg : null;
        },
        [simpanRejDoc.pending]: (state) => {
            state.isAddLoading = true;
        },
    }
})

export const { clearState, chgProps, closeSwal } = rejectDocSlice.actions;
export const userSelector = (state) => state.dtRejectDoc;
