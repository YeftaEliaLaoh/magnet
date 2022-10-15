import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

export const getDataPernyataan = createAsyncThunk(
  "pernyataan/getDataPernyataan",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
	  const selectedId = sessionStorage.getItem('data_tipe_akun_id');
    var config = {
      method: "get",
      url: API_URL + "/get-data-pernyataan?data_tipe_akun_id=" + selectedId,
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
    };

    return axios(config)
      .then(function (response) {
        const _data = JSON.stringify(response);
        if (response.status === 200) {
          let data = response.data;
          if (data.error_message === 0) {
            let payload = data.payload;

            if (payload === "") {
              payload = {
                data_pernyataan_id: "",
                pernyataan1: "",
                pernyataan2: "",
                pernyataan3: "",
                pernyataan4: "",
                wakil_pialang: "",
                badan_abritase: "",
                pengadilan: "",
                agree: "",
              };
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

export const getSelectAkun = createAsyncThunk(
  "pernyataan/getSelectAkun",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const act_tipe_akun_id = sessionStorage.getItem("act_tipe_akun_id")
      ? sessionStorage.getItem("act_tipe_akun_id")
      : "";

    var config = {
      method: "get",
      url: API_URL + "/get-data-tipe-akun?act=" + act_tipe_akun_id,
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
    };

    return axios(config)
      .then(function (response) {
        const _data = JSON.stringify(response);
        if (response.status === 200) {
          let data = response.data;
          if (data.error_message === 0) {
            let payload = data.payload;

            if (payload === "") {
              payload = {
                data_tipe_akun_id: "",
              };
            } else {
              
              payload = {
                data_tipe_akun_id: sessionStorage.getItem('data_tipe_akun_id'),
              };
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

export const simpanDataPernyataan = createAsyncThunk(
  "pernyataan/simpanDataPernyataan",
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
        API_URL + "/action-data-pernyataan",
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

export const getBankPerusahaan = createAsyncThunk(
  "option/getBankPerusahaan",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    var config = {
      method: "get",
      url: API_URL + "/general-option/get-bank-perusahaan",
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
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
  errorMessage: "",
  dataBankPerusahaan: [],
  dataPernyataan: {
    data_pernyataan_id: "",
    pernyataan1: "Y",
    pernyataan2: "Y",
    pernyataan3: "Y",
    pernyataan4: "Y",
    wakil_pialang: "-",
    badan_abritase: "Y",
    pengadilan: "",
    agree: "Y",
    data_tipe_akun_id: "",
  },
};

export const pernyataanSlice = createSlice({
  name: "dtPernyataan",
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
      state.dataPernyataan[payload.key] = payload.value;
    },
  },
  extraReducers: {
    [getDataPernyataan.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.dataPernyataan = payload;
      return state;
    },
    [getDataPernyataan.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getDataPernyataan.pending]: (state) => {
      state.isFetching = true;
    },
    [getSelectAkun.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.dataPernyataan.data_tipe_akun_id = payload.data_tipe_akun_id;
      return state;
    },
    [getSelectAkun.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getSelectAkun.pending]: (state) => {
      state.isFetching = true;
    },
    [getBankPerusahaan.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.dataBankPerusahaan = payload;
      return state;
    },
    [getBankPerusahaan.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getBankPerusahaan.pending]: (state) => {
      state.dataBankPerusahaan = [];
    },
  },
});

export const { clearState, chgProps } = pernyataanSlice.actions;
export const userSelector = (state) => state.dtPernyataan;
//export default mainSlice.reducer;
