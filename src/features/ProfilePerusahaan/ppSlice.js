import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

export const getDataPP = createAsyncThunk(
  "companyProfile/getPP",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    var config = {
      method: "get",
      url: API_URL + "/get-data-profile-perusahaan",
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
    };

    /* axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            }); */
    return axios(config)
      .then(function (response) {
        const _data = JSON.stringify(response);
        if (response.status === 200) {
          let data = response.data;
          if (data.error_message === 0) {
            let payload = data.payload;

            /* if (payload === '') {
                            payload['persetujuan'] = {
                                data_profile_perusahaan_id: '',
                                agree1: '',
                                agree2: '',
                            }
                        } */
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

export const simpanDataPP = createAsyncThunk(
  "companyProfile/simpanDataPP",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: token,
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/action-data-profile-perusahaan",
        param,
        config
      );
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        console.log(data)
        if (data.error_message === 0) {
          const dt = {
            ...data,
            wakil_pialang_caller : param.wakil_pialang_caller,
          }
          return dt;
        } else if(data.error_message === 3){
       
          return data
        }else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return thunkAPI.rejectWithValue(_data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const action_contact_us = createAsyncThunk(
  "contact_us/action_contact_us",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const config = {
      headers: {
        Authorization: token,
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    //const _API_URL = API_URL.replace('api','');
    try {
      const response = await axios.post(
        API_URL + "/action-data-contact-us",
        param,
        config
      );
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  dataPP: {},
  wakil_pialang: [],
  akun_terpisah: [],
  susunan_pengurus: [],
  susunan_saham: [],
  profile_perusahaan: {},
  persetujuan: {},
  legalitas_perusahaan: {},
};

export const ppSlice = createSlice({
  name: "companyProfile",
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
      state.showFormFailed = false;
    },
  },
  extraReducers: {
    [getDataPP.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.wakil_pialang = payload.wakil_pialang;
      state.persetujuan = payload.persetujuan
        ? payload.persetujuan
        : { agree1: "", agree2: "", data_profile_perusahaan_id: "" };
      state.akun_terpisah = payload.akun_terpisah;
      state.susunan_pengurus = payload.susunan_pengurus;
      state.susunan_saham = payload.susunan_saham;
      state.legalitas_perusahaan = payload.legalitas_perusahaan;
      state.profile_perusahaan = payload.profile_perusahaan;
      return state;
    },
    [getDataPP.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getDataPP.pending]: (state) => {
      state.isFetching = true;
      state.wakil_pialang = [];
    },
    [action_contact_us.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = payload.message;
      state.showFormSuccess = true;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center; line-height:23px;'><strong>Terima kasih</strong><br/> Pesan kamu telah terkirim, tim kami akan segera menjawab pesan kamu</div>";
      state.tipeSWAL = "success";
      return state;
    },
    [action_contact_us.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [action_contact_us.pending]: (state) => {
      state.errorMessage = "";
    },
    [simpanDataPP.fulfilled]: (state, { payload }) => {
    
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = payload.message;

      if(payload.error_message === 3){
        state.showFormFailed = true;
        state.tipeSWAL = "warning";
      } else {
        state.showFormSuccess = true;
        state.tipeSWAL = "success";
      }
      
      state.contentMsg =
        "<div style='font-size:20px; text-align:center; line-height:23px;'>Data kamu akan kami verifikasi, wakil pialang kami akan menghubungi kamu dengan nomor "+payload.wakil_pialang_caller+"</div>";
      return state;
    },
    [simpanDataPP.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [simpanDataPP.pending]: (state) => {
      state.errorMessage = "";
    },
  },
});

export const { clearState, chgProps, closeForm } = ppSlice.actions;
export const userSelector = (state) => state.companyProfile;
//export default mainSlice.reducer;
