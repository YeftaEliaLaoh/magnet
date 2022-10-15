import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import "moment/locale/id";
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
//const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

export const simpanDataPribadi = createAsyncThunk(
    'personal/simpanDataPribadi',
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
            const response = await axios.post(API_URL + '/action-data-pribadi', param, config);
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

export const simpanDataExpTrading = createAsyncThunk(
    'personal/simpanDataExpTrading',
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
        // console.log('simpanDataExpTrading');
        // console.log(config);
        try {
            const response = await axios.post(API_URL + '/action-data-pengalaman-trading', param, config);
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

export const simpanDataKekayaan = createAsyncThunk(
    'personal/simpanDataKekayaan',
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
        console.log('simpanDataKekayaan');
        console.log(config);
        try {
            const response = await axios.post(API_URL + '/action-kekayaan', param, config);
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

export const simpanKontakDarurat = createAsyncThunk(
    'personal/simpanKontakDarurat',
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
        console.log('simpanKontakDarurat');
        console.log(config);
        try {
            const response = await axios.post(API_URL + '/action-kontak-darurat', param, config);
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

export const simpanDataPekerjaan = createAsyncThunk(
    'personal/simpanDataPekerjaan',
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
        console.log('simpanDataPekerjaan');
        console.log(config);
        try {
            const response = await axios.post(API_URL + '/action-data-pekerjaan', param, config);
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

export const simpanAkunBank = createAsyncThunk(
    'personal/simpanAkunBank',
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
		const form = Object.keys(param).reduce((f, k) => {
            f.append(k, param[k]);
            return f;
        }, new FormData());
        
        try {
            const response = await axios.post(API_URL + '/action-data-akun-bank', form, config);
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

export const simpanDPP = createAsyncThunk(
    'personal/simpanDPP',
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
            const response = await axios.post(API_URL + '/action-selanjutnya-dokumen_pribadi', param, config);
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

export const uplDocPribadi = createAsyncThunk(
    'personal/uplDocPribadi',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const form = Object.keys(param).reduce((f, k) => {
            f.append(k, param[k]);
            return f;
        }, new FormData());
        const config = {
            headers: {
                'Authorization': `${token}`,
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        
        try {
            const response = await axios.post(API_URL + '/action-dokumen_pribadi', form, config);
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

export const getExpTrading = createAsyncThunk(
    'personal/getExpTrading',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-data-pengalaman-trading',
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
                        let payload = {
                            ...data.payload,
                            agreement2: data.payload.pengalaman_trading_id ? 1 : ''
                        }
                        if (data.payload === '') {
                            payload = {
                                pengalaman_trading_id: '',
                                agreement2: '',
                                pertanyaan1: "N",
                                pertanyaan2: "",
                                pertanyaan3: "N",
                                pertanyaan4: "N",
                                pertanyaan5: "N",
                                pertanyaan6: "",
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

export const getKekayaan = createAsyncThunk(
    'personal/getKekayaan',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-kekayaan',
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
                        let payload = {
                            ...data.payload,
                            agreement3: data.payload.kekayaan_id ? 1 : ''
                        }
                        if (data.payload === '') {
                            payload = {
                                kekayaan_id: '',
                                agreement3: '',
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

export const getKontakDarurat = createAsyncThunk(
    'personal/getKontakDarurat',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-kontak-darurat',
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        // console.log('getKontakDarurat');
        // console.log(config);

        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = {
                            ...data.payload,
                            agreement4: data.payload.kontak_id ? 1 : ''
                        }
                        if (data.payload === '') {
                            payload = {
                                kontak_id: '',
                                agreement4: '',
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

export const getPekerjaan = createAsyncThunk(
    'personal/getPekerjaan',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-data-pekerjaan',
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        // console.log('getPekerjaan');
        // console.log(config);

        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = {
                            ...data.payload,
                            agreement5: data.payload.pekerjaan_id ? 1 : ''
                        }
                        if (data.payload === '') {
                            payload = {
                                pekerjaan_id: '',
                                agreement5: '',
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

export const getAkunBank = createAsyncThunk(
    'personal/getAkunBank',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/get-data-akun-bank',
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };
        // console.log('getAkunBank');
        // console.log(config);
        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = {
							...data.payload,
							agreement6: data.payload ? "Y" : 'N'
						}
                        if (data.payload === '') {
                            payload = {
                                akun_bank_id: '',
                                agreement6: '',
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

export const getDocPribadi = createAsyncThunk(
    'personal/getDocPribadi',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/dokumen_pribadi',
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
                    let unggahFileNames = [];
                    if (data.error_message === 0) {
                        let payload = {
                            ...data.payload,
                            dokumen_pribadi_pernyataan: {
                                data_pribadi_pernyataan_id: '',
                                agree: data.payload.dokumen_pribadi_pernyataan && data.payload.dokumen_pribadi_pernyataan.agree ? data.payload.dokumen_pribadi_pernyataan.agree : 'N',
                                unggahFileName: unggahFileNames
                            }
                        }                       
						
                        if (data.payload.arr_dokumen.total_data > 0) {
                            const arr_dokumen = data.payload.arr_dokumen.data;
                            for (var i = 0; i < arr_dokumen.length; i++) {
                                unggahFileNames.push(arr_dokumen[i].tipe);
                            }

                            payload = {
                                ...payload,
                                unggahFileName: unggahFileNames.includes('KTP') && unggahFileNames.includes('OTHER') && unggahFileNames.includes('PHOTO')
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

export const delDocPribadi = createAsyncThunk(
    'personal/delDocPribadi',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/delete-dokumen_pribadi/' + param,
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
                        return data;
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

export const delAkunBankKu = createAsyncThunk(
    'personal/delAkunBankKu',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/delete-akun-bank/' + param,
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
                        return data;
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


export const getNegara = createAsyncThunk(
    'option/getNegara',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/data-negara',
            headers: {
                'x-app-origin': 'backoffice-app',
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


export const getProvinsi = createAsyncThunk(
    'option/getProvinsi',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/data-provinsi',
            headers: {
                'x-app-origin': 'backoffice-app',
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

export const getBank = createAsyncThunk(
    'option/getBank',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/data-bank',
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
    isLoading: false,
    isFetchingUpl: false,
    isSuccess: false,
    isError: false,
    showFormDelete: false,
    showFormSuccess: false,
    contentMsg: '',
    tipeSWAL: '',
    errorMessage: '',
    errUplFileMsg: '',
    dataNegara: [],
    dataProvinsi: [],
    dataBank: [],
    docPribadi: [],
    unggahFileName: false,
    dokumenPribadiPernyataan: {},
    dataExpTrading: {},
    dataKontakDarurat: {},
    dataKekayaan: { agreement3: '' },
    dataPekerjaan: {},
    dataAkunBank: {}
};

export const personalSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {
        chgPropsExpTrading: (state, { payload }) => {
            state.dataExpTrading[payload.key] = payload.value;
        },
        chgPropsKontakDarurat: (state, { payload }) => {
            state.dataKontakDarurat[payload.key] = payload.value;
        },
        chgPropsKekayaan: (state, { payload }) => {
            state.dataKekayaan[payload.key] = payload.value;
        },
        chgPropsPekerjaan: (state, { payload }) => {
            state.dataPekerjaan[payload.key] = payload.value;
        },
        chgPropsAkunBank: (state, { payload }) => {
            state.dataAkunBank[payload.key] = payload.value;
        },
        chgPropsDPP: (state, { payload }) => {
            state.dokumenPribadiPernyataan[payload.key] = payload.value;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errUplFileMsg = null;
            return state;
        },
        confirmDel: (state) => {
            state.showFormDelete = true;
            return state;
        },
        closeForm: (state) => {
            state.showFormDelete = false;
        },
		closeSwal: (state) => {
            state.showFormSuccess = false;
        },

    },
    extraReducers: {
        [getNegara.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataNegara = payload;
            return state;
        },
        [getNegara.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getNegara.pending]: (state) => {
            state.dataNegara = [];
        },
        [getProvinsi.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataProvinsi = payload;
            return state;
        },
        [getProvinsi.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getProvinsi.pending]: (state) => {
            state.dataProvinsi = [];
        },
        [getBank.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataBank = payload;
            return state;
        },
        [getBank.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getBank.pending]: (state) => {
            state.dataBank = [];
        },
        [getExpTrading.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataExpTrading = payload;
            return state;
        },
        [getExpTrading.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getExpTrading.pending]: (state) => {
            state.dataExpTrading = {};
        },
        [getKekayaan.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataKekayaan = payload;
            return state;
        },
        [getKekayaan.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getKekayaan.pending]: (state) => {
            state.dataKekayaan = {};
        },
        [getKontakDarurat.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataKontakDarurat = payload;
            return state;
        },
        [getKontakDarurat.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getKontakDarurat.pending]: (state) => {
            state.dataKontakDarurat = {};
        },
        [getPekerjaan.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataPekerjaan = payload;
            return state;
        },
        [getPekerjaan.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getPekerjaan.pending]: (state) => {
            state.dataPekerjaan = {};
        },
        [getAkunBank.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataAkunBank = payload;
            return state;
        },
        [getAkunBank.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunBank.pending]: (state) => {
            state.dataAkunBank = {};
        },
        [getDocPribadi.fulfilled]: (state, { payload }) => {
            
            state.isFetchingUpl = false;
            state.docPribadi = payload.arr_dokumen.data;
            state.unggahFileName = payload.unggahFileName;
            state.dokumenPribadiPernyataan = payload.dokumen_pribadi_pernyataan;
            return state;
        },
        [getDocPribadi.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetchingUpl = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getDocPribadi.pending]: (state) => {
            state.isFetchingUpl = true;
        },        
        [uplDocPribadi.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errUplFileMsg = 'File uploaded successfully!';
            return state;
        },
        [uplDocPribadi.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errUplFileMsg = payload.message;
        },
        [uplDocPribadi.pending]: (state) => {
            state.isFetching = true;
        },
		[delDocPribadi.fulfilled]: (state) => {
            state.isLoading = false;
            state.showFormDelete = false;
            state.errUplFileMsg = 'File sudah dihapus!';
            return state;
        },
        [delDocPribadi.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [delDocPribadi.pending]: (state) => {
            state.isLoading = true;
        },
		[delAkunBankKu.fulfilled]: (state) => {
            state.isLoading = false;
            state.showFormDelete = false;
            state.errUplFileMsg = 'File sudah dihapus!';
            return state;
        },
        [delAkunBankKu.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [delAkunBankKu.pending]: (state) => {
            state.isLoading = true;
        },
        [simpanDataPribadi.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanDataPribadi.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanDataPribadi.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanDataExpTrading.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanDataExpTrading.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanDataExpTrading.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanDataKekayaan.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanDataKekayaan.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanDataKekayaan.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanKontakDarurat.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanKontakDarurat.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanKontakDarurat.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanDataPekerjaan.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanDataPekerjaan.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanDataPekerjaan.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanAkunBank.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
			state.showFormSuccess = true;
            state.contentMsg = "<div style='font-size:20px; text-align:center; line-height:23px;'><strong>Success</strong><br/> Data Bank baru telah dikirim dan akan segera diproses oleh tim Magnet</div>";
            state.tipeSWAL = "success";
            return state;
        },
        [simpanAkunBank.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
			state.showFormSuccess = true;
            state.contentMsg = "<div style='font-size:20px; text-align:center; line-height:23px;'><strong>Failed</strong><br/>"+payload.message+"</div>";
            state.tipeSWAL = "error";
        },
        [simpanAkunBank.pending]: (state) => {
            state.isFetching = true;
        },
        [simpanDPP.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.errorMessage = payload.message;
            return state;
        },
        [simpanDPP.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [simpanDPP.pending]: (state) => {
            state.isFetching = true;
        },
    }
})

export const {
    chgPropsExpTrading, chgPropsKontakDarurat, chgPropsKekayaan, chgPropsPekerjaan, chgPropsAkunBank,
    clearState, closeForm, chgPropsDPP, closeSwal,
    confirmDel } = personalSlice.actions;
export const userSelector = (state) => state.personal;
//export default mainSlice.reducer;
