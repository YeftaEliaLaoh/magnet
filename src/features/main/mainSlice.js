import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
const API_URL = process.env.REACT_APP_URL_API;

export const loginUser = createAsyncThunk(
  "users/login",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/login", param, config);
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        if (data.error_message === 0) {
          let payload = data.payload;
          let statuss = payload.status;
          let status_Dokumen = payload.status_dokumen;
          let myStatus = false;
          let accessToken = "";

          if (status_Dokumen === "Reject") {
            myStatus = false;
            await localStorage.setItem(tokenLogin, payload.accessToken);
            await localStorage.setItem("myStatusDokumen2", true);
          } else {
            myStatus = false;
            await localStorage.setItem(tokenLogin, payload.accessToken);
          }
          if (status_Dokumen === "Belum Lengkap") {
            await localStorage.setItem("myStatusDokumen", true);
          }

          if (statuss === "Reject") {
            accessToken = payload.accessToken;
            myStatus = true;
          }

          data = {
            ...data,
            accessTokenKu: accessToken,
            myStatus: myStatus,
          };
          return data;
        } else {
          if (data.error_message === 5) {
            data = {
              ...data,
              ...param,
              toVerify: true,
            };
          } else {
            data = {
              ...data,
              ...param,
              toVerify: false,
            };
          }
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

export const fetchUserBytoken = createAsyncThunk(
  "users/fetchUserBytoken",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";

    var config = {
      method: "get",
      url: API_URL + "/get-data-pribadi",
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
            let payload = {
              ...data.payload,
              agreement1: data.payload.no_identitas ? 1 : "",
            };
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

export const fetchUserKTP = createAsyncThunk(
  "users/fetchUserKTP",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    const form = Object.keys(param).reduce((f, k) => {
      f.append(k, param[k]);
      return f;
    }, new FormData());
    const config = {
      headers: {
        Authorization: `${token}`,
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/general-option/ocr",
        form,
        config
      );

      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        if (data.error_message === 0) {
          let myData = data.payload;
          let rt_rw = "";
          let rt = "";
          let rw = "";
          let jenis_kelamin =
            myData.jenis_kelamin === "LAKI-LAKI" ? "Laki-Laki" : "";
          jenis_kelamin =
            myData.jenis_kelamin === "PEREMPUAN" ||
            myData.jenis_kelamin === "WANITA"
              ? "Perempuan"
              : jenis_kelamin;

          var tanggal_lahir = myData.tanggal_lahir.split("-");
          var nama = myData.nama.split(" ");
          var nama_belakang =
            typeof nama[0] !== "undefined" && nama[0]
              ? myData.nama.replace(nama[0] + " ", "")
              : "";
          const selectedDate = myData.tanggal_lahir
            ? tanggal_lahir[2] + "-" + tanggal_lahir[1] + "-" + tanggal_lahir[0]
            : "";

          Object.keys(myData).map((key) => {
            if (key === "rt/rw") {
              rt_rw = myData[key].split("/");
              rt = rt_rw[0];
              rw = rt_rw[1];
            }
            return true;
          });
          const payload = {
            jenis_identitas: "KTP",
            data_pribadi_id: param.data_pribadi_id,
            no_identitas: myData.nik ? myData.nik : "",
            nama_depan: myData.nama,
            nama_belakang: nama_belakang && nama_belakang,
            tempat_lahir: myData.tempat_lahir && myData.tempat_lahir,
            kota_lahir: myData.tempat_lahir && myData.tempat_lahir,
            tanggal_lahir: selectedDate && selectedDate,
            status_pernikahan:
              myData.status_perkawinan && ucwords(myData.status_perkawinan),
            jenis_kelamin: myData.jenis_kelamin && jenis_kelamin,
            alamat: myData.alamat && myData.alamat,
            provinsi: myData.provinsi && ucwords(myData.provinsi),
            warga_negara: myData.kewarganegaraan === "WNI" ? "Indonesia" : "",
            rw: rw ? rw : "",
            rt: rt ? rt : "",
            photo_ktp_download: myData.photo_ktp ? myData.photo_ktp : "",
          };
          return payload;
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

const ucwords = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const profileUser = createAsyncThunk(
  "users/profileUser",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";

    var config = {
      method: "get",
      url: API_URL + "/profile",
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
          let isMenuTransfer = true;
          if (data.error_message === 0) {
            var day_server = data.payload.day;
            var jam_server = data.payload.jam.split(":");

            if (day_server === "Minggu") {
              isMenuTransfer = false;
            }
            if (day_server === "Sabtu" && jam_server[0] >= 4) {
              isMenuTransfer = false;
            }
            if (day_server === "Senin" && jam_server[0] < 5) {
              isMenuTransfer = false;
            }

            const res = {
              ...data.payload,
              isMenuTransfer: isMenuTransfer ? true : false,
            };
            return res;
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

export const regUser = createAsyncThunk(
  "users/register",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(API_URL + "/register", param, config);
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const changePass = createAsyncThunk(
  "user/changePass",
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
        API_URL + "/change-password",
        param,
        config
      );
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        console.log(data);
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

export const chgPass = createAsyncThunk(
  "users/chgPass",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    var config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/change-password-akun-trading",
        param,
        config
      );
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        if (data.error_message === 0) {
          let payload = data.payload;

          return payload;
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

export const chgPhonePass = createAsyncThunk(
  "users/chgPhonePass",
  async (param, thunkAPI) => {
    const token = localStorage.getItem(tokenLogin)
      ? "Bearer " + localStorage.getItem(tokenLogin)
      : "";
    var config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/change-phone-pwd-akun-trading",
        param,
        config
      );
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        if (data.error_message === 0) {
          let payload = data.payload;

          return payload;
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

export const verifUser = createAsyncThunk(
  "users/verifikasi",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/verifikasi-akun",
        param,
        config
      );
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getCabang = createAsyncThunk(
  "option/getCabang",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "backoffice-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        API_URL + "/general-option/data-cabang",
        param,
        config
      );
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getMarketing = createAsyncThunk(
  "option/getMarketing",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "backoffice-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        API_URL +
          "/general-option/data-marketing?kode_cabang=" +
          param.kode_cabang,
        param,
        config
      );
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const completeData = createAsyncThunk(
  "user/completeData",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "backoffice-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL + "/kelengkapan-diri",
        param,
        config
      );
      let data = "";
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
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updProfile = createAsyncThunk(
  "user/updProfile",
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
        API_URL + "/update-profile",
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

export const action_contact_us = createAsyncThunk(
  "users/contact_us",
  async (param, thunkAPI) => {
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
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
          return data.payload;
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

export const forgotPassword = createAsyncThunk(
  "users/forgot_password",
  async (param, thunkAPI) => {
    let API_URL2 = API_URL.replace("/api", "");
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL2 + "/forgot-password",
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

export const actionPassword = createAsyncThunk(
  "users/action_password",
  async (param, thunkAPI) => {
    let API_URL2 = API_URL.replace("/api", "");
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL2 + "/verifikasi-update-password" + param.token,
        param,
        config
      );
      let data = "";
      let _data = await response;
      if (response.status === 200) {
        data = _data.data;
        if (data.error_message === 0) {
          let payload = data.payload;
          await localStorage.setItem(tokenLogin, payload.accessToken);
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

export const resendOTP = createAsyncThunk(
  "users/resend_otp",
  async (param, thunkAPI) => {
    let API_URL2 = API_URL.replace("/api", "");
    const config = {
      headers: {
        "x-app-origin": "cabinet-app",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        API_URL2 + "/resend-otp",
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
  expandMenu: true,
  isLoggedIn: !!localStorage.getItem(tokenLogin),
  token: localStorage.getItem(tokenLogin),
  isFetching: false,
  isUploadingKTP: false,
  isSuccess: false,
  isError: false,
  isVerifikasi: false,
  isCompleteProfile: false,
  succesCompleteProfile: false,
  errorMessage: "",
  errFetchUserByToken: "",
  isMenuTransfer: true,
  user_id: "",
  defaultOpenKeys: "/",
  currentUser: {},
  dtProfileUser: {},
  dataCabang: [],
  dataMarketing: [],
  showFormSuccess: false,
  myStatus: false,
  toVerify: false,
  accessTokenKu: "",
  contentMsg: "",
  emailLogin: "",
  passLogin: "",
  tipeSWAL: "success",
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    clickExpand: (state) => {
      state.expandMenu = !state.expandMenu ? true : false;
      return state;
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = null;
      state.showFormSuccess = false;
      state.myStatus = false;
      state.contentMsg = "";
      state.tipeSWAL = "success";
      return state;
    },
    onLogout: (state) => {
      localStorage.removeItem(tokenLogin);
      state.isLoggedIn = false;
      state.token = null;
      state.fetchUserBytoken = "";
      state.currentUser = initialState.currentUser;
      return state;
    },
    setDefaultOpenKeys: (state, dt) => {
      state.defaultOpenKeys = dt.payload;
    },
    chgProps: (state, { payload }) => {
      state.currentUser[payload.key] = payload.value;
    },
    chgPropsProfile: (state, { payload }) => {
      state.dtProfileUser[payload.key] = payload.value;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      state.isFetching = false;
      state.toVerify = false;
      state.isSuccess = true;
      state.isLoggedIn = !!localStorage.getItem(tokenLogin);
      state.token = localStorage.getItem(tokenLogin);
      state.currentUser = payload;
      state.myStatus = payload.myStatus;
      state.accessTokenKu = payload.accessTokenKu;
      state.errorMessage = "";
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.toVerify = payload.toVerify;
      state.isVerifikasi = payload.toVerify;
      state.emailLogin = payload.email;
      state.passLogin = payload.password;
      state.user_id = payload.payload ? payload.payload.user_id : '';
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
      state.errFetchUserByToken = "";
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.errFetchUserByToken = "";
      state.currentUser = payload;
    },
    [fetchUserBytoken.rejected]: (state, { payload }) => {
      localStorage.removeItem(tokenLogin);
      state.isFetching = false;
      state.isError = true;
      state.isLoggedIn = false;
      state.token = "";
      state.errFetchUserByToken = payload.message;
    },
    [profileUser.pending]: (state) => {
      state.errFetchUserByToken = "";
    },
    [profileUser.fulfilled]: (state, { payload }) => {
      state.errFetchUserByToken = "";
      state.dtProfileUser = payload;
    },
    [profileUser.rejected]: (state, { payload }) => {
      localStorage.removeItem(tokenLogin);
      state.errFetchUserByToken = payload.message;
      state.isLoggedIn = false;
      state.token = null;
    },
    [fetchUserKTP.pending]: (state) => {
      state.errFetchUserByToken = "";
      state.isUploadingKTP = true;
      state.currentUser = {};
    },
    [fetchUserKTP.fulfilled]: (state, { payload }) => {
      state.errFetchUserByToken = "";
      state.currentUser = payload;
      state.isUploadingKTP = false;
    },
    [fetchUserKTP.rejected]: (state, { payload }) => {
      state.isUploadingKTP = false;
      console.log("payload", payload);
      //state.errFetchUserByToken = payload.message;
    },
    [regUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.user_id = payload.user_id;
      state.isVerifikasi = payload.user_id ? true : false;
      return state;
    },
    [regUser.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [regUser.pending]: (state) => {
      state.isFetching = true;
    },
    [verifUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isVerifikasi = false;
      state.isCompleteProfile = true;
      state.succesCompleteProfile = true;
      return state;
    },
    [verifUser.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [verifUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getCabang.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.dataCabang = payload;
      return state;
    },
    [getCabang.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getCabang.pending]: (state) => {
      state.isFetching = true;
    },
    [getMarketing.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.dataMarketing = payload;
      return state;
    },
    [getMarketing.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getMarketing.pending]: (state) => {
      state.dataMarketing = [];
    },
    [completeData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.succesCompleteProfile = true;
      state.dataMarketing = payload;
      return state;
    },
    [completeData.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [completeData.pending]: (state) => {
      state.dataMarketing = [];
    },
    [changePass.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      if(payload.message === "Success."){
        state.errorMessage = "Password kamu telah berhasil diperbarui"
      } else {
        state.errorMessage = payload.message;
      }
      return state;
    },
    [changePass.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [changePass.pending]: (state) => {
      state.errorMessage = "";
    },
    [chgPass.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.tipeSWAL = "warning";
      state.errorMessage = payload.message;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, " +
        payload.message +
        "</div>";
      state.showFormSuccess = true;
      return state;
    },
    [chgPass.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.showFormSuccess = true;
      state.isError = false;
      state.tipeSWAL = "success";
      //state.errorMessage = payload.message;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Success</strong>, Password berhasil disimpan</div>";
    },
    [changePass.pending]: (state) => {
      state.errorMessage = "";
    },
    [chgPhonePass.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.tipeSWAL = "warning";
      state.errorMessage = payload.message;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Failed</strong>, " +
        payload.message +
        "</div>";
      state.showFormSuccess = true;
      return state;
    },
    [chgPhonePass.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.showFormSuccess = true;
      state.isError = false;
      state.tipeSWAL = "success";
      //state.errorMessage = payload.message;
      state.contentMsg =
        "<div style='font-size:20px; text-align:center;'><strong>Success</strong>, Password berhasil disimpan</div>";
    },
    [chgPhonePass.pending]: (state) => {
      state.errorMessage = "";
    },
    [updProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      if(payload.message === "Success."){
        state.errorMessage = "Permintaan pergantian email kamu sudah terkirim, tim kami akan segera memproses, terima kasih";
      } else
        state.errorMessage = payload.message;
        
      return state;
    },
    [updProfile.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [updProfile.pending]: (state) => {
      state.errorMessage = "";
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      if(payload.message === "Success."){
        state.errorMessage = "Mohon periksa email kamu untuk melanjutkan"
      } else {
        state.errorMessage = payload.message;
      }

      return state;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [forgotPassword.pending]: (state) => {
      state.errorMessage = "";
    },
    [actionPassword.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = payload.message;
      state.token = localStorage.getItem(tokenLogin);
      //state.isLoggedIn = !!localStorage.getItem(tokenLogin);
      //return state;
    },
    [actionPassword.rejected]: (state, { payload }) => {
      //console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [actionPassword.pending]: (state) => {
      state.errorMessage = "";
    },
  },
});

export const {
  clickExpand,
  clearState,
  onLogout,
  setDefaultOpenKeys,
  chgProps,
  chgPropsProfile,
} = mainSlice.actions;
export const userSelector = (state) => state.main;
//export default mainSlice.reducer;
