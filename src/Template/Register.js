import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  regUser,
  verifUser,
  userSelector,
  clearState,
  getMarketing,
  completeData,
  loginUser,
  resendOTP,
} from "../features/main/mainSlice";
import Button from "../components/button/Button";
import { Col, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import banner from "../assets/image_1.png";
import user_full_name_icon from "../assets/akun_red.svg";
import user_phone_number_icon from "../assets/phone_red.svg";
import user_reff_code_icon from "../assets/reff_code_red.svg";
import logoa from "../assets/logo.png";
import email_icon from "../assets/email.svg";
import password_icon from "../assets/password.svg";

import { SelectTgl, SelectBln, SelectThn } from "../components/modal/SelectTgl";

const Register = () => {
  const {
    isFetching,
    isSuccess,
    errorMessage,
    isVerifikasi,
    user_id,
    isCompleteProfile,
    succesCompleteProfile,
    emailLogin,
    passLogin,
    toVerify,
  } = useSelector(userSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  const initData = {

    phone_number: "",
    kode_verifikasi: "",
    nama_depan: "",

    tgl: "",
    bln: "",
    thn: "",
    cabang: "",
    marketing: "",
    tanggal_lahir: "",
    myCaptcha: "",
    ref_code: "",
    email: "",
    password: "",
  };
  const errorValidate = {

    phone_number: "",
    kode_verifikasi: "",

    tgl: "",
    bln: "",
    thn: "",
    cabang: "",
    marketing: "",
    myCaptcha: "",
    ref_code: "",
  };
  const [selected, setSelected] = useState(initData);
  const [errMsg, setErrMsg] = useState(errorValidate);
  const [errorValidationPasswordCheck, setErrorValidationPasswordCheck] = useState(
    {
      isMatchOneLetter: false,
      isMatchNumber: false,
      isMatchMinDigit: false
    }
  )

  useEffect(() => {
    if (succesCompleteProfile) {
      const queryString = {
        email: selected.email,
        password: selected.password,
      };

      dispatch(loginUser(queryString));
    }

  }, [succesCompleteProfile, dispatch, selected, toVerify, emailLogin, passLogin, user_id]);

  const formik = useFormik({
    initialValues: {
      nama_depan: "",
      phone_number: "",
      email: "",
      password: "",
      konfirmasi_password: ""
    },
    validationSchema: Yup.object({
      nama_depan: Yup.string()
        .required("Silahkan masukkan nama lengkap"),
      phone_number: Yup.number()
        .required("Silahkan masukkan nomor telepon"),
      email: Yup.string()
        .required("Silahkan masukkan email")
        .email("Silahkan masukkan email yang sah"),
      password: Yup.string()
        .required("Silahkan masukkan kata sandi"),
      konfirmasi_password: Yup.string()
        .required("Diperlukan!")
        .oneOf([Yup.ref("password")], "Kata sandi tidak sama"),
    }),
    onSubmit: (values) => {
      setSelected({
        ...selected,
        password: values.password,
        email: values.email,
      });
      dispatch(regUser(values));
    },
    handleChange: (values)=>{
      console.log(values)
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    let val = value;
    setSelected({
      ...selected,
      [name]: val,
    });

    if (name === "cabang") {
      const queryString = {
        kode_cabang: val,
      };
      dispatch(getMarketing(queryString));
    }
    dispatch(clearState());
  };

  const checkStateErrorValidationPasswordCheck = () => {
    if(errorValidationPasswordCheck.isMatchNumber === true) 
      return true
    
    if(errorValidationPasswordCheck.isMatchMinDigit === true) 
      return true

    if(errorValidationPasswordCheck.isMatchOneLetter === false) 
      return true

    return false
  }

  const handleSubmit = () => {
    // console.log('asdasd')
    let error = "";
    if (selected.kode_verifikasi === null || selected.kode_verifikasi === "") {
      error = { ...error, kode_verifikasi: "Required!" };
    }

    // if(checkStateErrorValidationPasswordCheck()){
    //   error = { ...error, password: "Password belum sesuai" };
    // }

    // console.log(error,errorValidationPasswordCheck)

    setErrMsg(error);
    let queryString = {};
    if (toVerify) {
      queryString = {
        user_id: user_id,
        kode_verifikasi: selected.kode_verifikasi,
      };
    } else {
      queryString = {
        ...selected,
        user_id: user_id,
      };
    }
    if (!error) dispatch(verifUser(queryString));
  };



  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function handleChangeCaptcha(value) {
    setSelected({
      ...selected,
      myCaptcha: value,
    });
    //console.log("Captcha value:", value);
  }

  function handleExpired() {
    const recaptchaValue = recaptchaRef.current.getValue();
    setSelected({
      ...selected,
      myCaptcha: recaptchaValue,
    });
    // console.log("recaptchaValue:", recaptchaValue);
  }

  function handleResendOTP() {
    setSelected({
      email: selected.email,
    });
    const queryString = {
      email: selected.email,
    };
    //console.log(queryString);
    dispatch(resendOTP(queryString));
  }

  const recaptchaRef = React.createRef();

  const hideAlert = () => {
    dispatch(clearState());
  };
  document.getElementById("root").classList = "hold-transition";

  const updateErrorValidationPassword = (str) => {
    const regexMatchOneLetter = /^-?\d*\.?\d*$/;
    const regexMatchNumber = /\d/;

    setErrorValidationPasswordCheck({
      isMatchOneLetter: regexMatchOneLetter.test(str) ? false : true,
      isMatchNumber: regexMatchNumber.test(str) ? true : false,
      isMatchMinDigit: str.length >= 8 ? true : false
    })
  }

  const frmUser = (
    <Form id="myForm">
      <Form.Group controlId="kode_verifikasi">
        <Form.Label>
          <div className="w-full mb-0 mt-0">
            <div className="text-merah-button  text-lg text-center font-normal ">
              Verifikasi
            </div>
          </div>

          <div className="w-full mb-2 mt-2">
            <div className="text-black  text-xs text-center font-normal">
              Silahkan masukkan kode aktivasi yang dikirim ke email kamu{" "}{selected.email}
            </div>
          </div>
        </Form.Label>
        {errMsg.kode_verifikasi ? (
          <span className="float-right text-error badge badge-danger">
            {errMsg.kode_verifikasi}
          </span>
        ) : (
          ""
        )}
        <Form.Control
          size="sm"
          autoComplete="off"
          name="kode_verifikasi"
          type="text"
          value={selected.kode_verifikasi}
          onChange={handleChange}
          placeholder="123456"
        />
      </Form.Group>

      <div className="social-auth-links text-center mt-2 mb-3">
        <div className="grid grid-cols-1 gap-0 place-items-center">
          <div className="w-full mb-2">
            <div className="text-black text-sm ">
              Belum menerima kode verifikasi?
              <a
                href="javascript:void(0)"
                onClick={handleResendOTP}
                className="text-center italic text-hijau-forex"
              >
                <br /> Kirim ulang kode aktivasi
              </a>
            </div>
          </div>
          <div className="w-2/4 mt-2">
            <Button
              block
              onClick={()=> handleSubmit()}
              isLoading={isFetching}
              theme=""
              style={{ backgroundColor: "#C1242B", color: "#fff" }}
            >
              Lanjut Registrasi
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );



  return (
    <div class="">
      <div class="w-full grid lg:grid-cols-2 gap-4 bg-white">
        <div className="overflow-hidden mobile-view  mb-5">
          <img src={banner} className="w-[100%] h-[100%]" />
        </div>

        <div className="grid grid-cols-1 gap-0 place-items-center">
          <div className="login-box ">
              <div className="card border-white">
                <div className="card-header text-center h1 text-red-500 text-lg bg-white border-white grid grid-cols-1 place-items-center lg:mt-4">
                  <div class="grid grid-cols-1 place-items-center">
                    <img src={logoa} width="60%" />
                  </div>
                  <div>
                    <b>
                      <span className="text-merah-button font-bold text-lg">
                        Daftar
                      </span>
                    </b>
                  </div>
                </div>
               
                  <div className="card-body" style={{ paddingTop: "0px",paddingRight:'35px' }}>
                    {errorMessage ? (
                      <div className="alert alert-sm" style={{ backgroundColor: "#C2262C" }}>
                        <button
                          onClick={hideAlert}
                          type="button"
                          className="close text-white"
                          data-dismiss="alert"
                          aria-hidden="true"
                          style={{ opacity: 1 }}
                        >
                          ×
                        </button>
                        <span className="text-bold text-white">
                          Error: {errorMessage}
                        </span>
                      </div>
                    ) : (
                      <p className="login-box-msg"></p>
                    )}

                    {(!isVerifikasi && !succesCompleteProfile) &&
                      <form onSubmit={formik.handleSubmit}>

                        {formik.touched.nama_depan && formik.errors.nama_depan ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.nama_depan}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={user_full_name_icon} width="22px" />
                            </div>
                          </div>
                          <input
                            autoFocus
                            autoComplete="off"
                            type="text"
                            className="form-control"
                            placeholder="Nama Lengkap"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("nama_depan")}
                          />
                        </div>

                        {formik.touched.phone_number && formik.errors.phone_number ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.phone_number}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={user_phone_number_icon} width="22px" />
                            </div>
                          </div>
                          <input

                            type="number"
                            className="form-control"
                            placeholder="No. Handphone"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("phone_number")}
                          />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.email}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={email_icon} width="22px" />
                            </div>
                          </div>
                          <input

                            type="text"
                            className="form-control"
                            placeholder="Email"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("email")}
                          />
                        </div>
                        {formik.values.password === "" &&
                          formik.errors.password ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.password}
                          </span>
                        ) : null}
                        <div
                          className={"input-group " + (formik.touched.password ? "mb-1" : "mb-3")}
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={password_icon} width="22px" />
                            </div>
                          </div>
                          <input
                            autoComplete="off"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            onChange={(event) => {
                              const { name, value } = event.target
                              updateErrorValidationPassword(value)
                              formik.setFieldValue(name, value)
                            }}
                            // onChange={formik.handleChange}
                          />
                        </div>
                        {
                          formik.values.password ? (
                            <div className="flex flex-col input-group mb-1">
                              <p className="text-muted mb-2">Password must contain the following:</p>
                              <ul>

                                <li className={`text-xs mb-1 ml-3 ${errorValidationPasswordCheck.isMatchOneLetter ? 'text-success' : 'text-danger'}`}>
                                  <i className={`fa ${errorValidationPasswordCheck.isMatchOneLetter ? 'fa-check' : 'fa-times'}`}></i> Only one or
                                  more <b>letter</b>
                                </li>
                                <li className={`text-xs mb-1 ml-3 ${errorValidationPasswordCheck.isMatchNumber ? 'text-success' : 'text-danger'}`}>
                                  <i className={`fa ${errorValidationPasswordCheck.isMatchNumber ? 'fa-check' : 'fa-times'}`}></i> Only one or
                                  more <b>number</b>
                                </li>
                                <li className={`text-xs mb-1 ml-3 ${errorValidationPasswordCheck.isMatchMinDigit ? 'text-success' : 'text-danger'}`}>
                                  <i className={`fa ${errorValidationPasswordCheck.isMatchMinDigit ? 'fa-check' : 'fa-times'}`}></i> Minimum
                                  <b> 8 Characters</b> letter or number
                                </li>
                              </ul>
                            </div>
                          ) : ''
                        }


                        {formik.touched.konfirmasi_password &&
                          formik.errors.konfirmasi_password ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.konfirmasi_password}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={password_icon} width="22px" />
                            </div>
                          </div>
                          <input

                            type="password"
                            className="form-control"
                            placeholder="Konfirmasi Password"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("konfirmasi_password")}
                          />

                        </div>

                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          <div className="input-group-append">
                            <div className="input-group-text bg-white border-white">
                              <img src={user_reff_code_icon} width="22px" />
                            </div>
                          </div>
                          <input

                            type="text"
                            className="form-control"
                            placeholder="Kode Referal"
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("reff_code")}
                          />
                        </div>

                        <ReCAPTCHA
                          hl="id"
                          ref={recaptchaRef}
                          sitekey="6LfEKfEcAAAAAGH6QCdvmj3wSSzFSyw0dbIoSmpK"
                          onChange={handleChangeCaptcha}
                          onExpired={handleExpired}
                        />
                        <div className="social-auth-links text-center mt-2 mb-3">
                          <div className="grid grid-cols-1 gap-0 place-items-center">
                            <div className="w-2/4">
                              <Button
                                disabled={selected.myCaptcha ? ( 
                                  !errorValidationPasswordCheck.isMatchOneLetter
                                  || !errorValidationPasswordCheck.isMatchNumber
                                  || !errorValidationPasswordCheck.isMatchMinDigit ? true : false) : true
                                }
                                block
                                type="submit"
                                isLoading={isFetching}
                                theme=""
                                style={{
                                  backgroundColor: "#C1242B",
                                  color: "#fff",
                                  marginRight: "2%",
                                }}
                              >
                                Lanjut Registrasi
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>}


                    <div className="text-left">
                      {isVerifikasi ? frmUser : ""}
                      {succesCompleteProfile ? (
                        <h4>
                          <p className="login-box-msg">
                            Pendaftaran berhasil,{" "}
                            <a href="login" className="text-center">
                              Silahkan login
                            </a>
                          </p>
                        </h4>
                      ) : (
                        ""
                      )}
                      {!succesCompleteProfile ? (
                        <div className="text-black text-center">
                          Sudah punya akun ?{" "}
                          <a
                            href="login"
                            className="text-center font-bold text-hijau-forex"
                          >
                            Login
                          </a>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
              </div>
            </div>
          </div>


        <div className="h-auto overflow-hidden mobile-hide">
          <img src={banner} className="w-[100%] h-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default Register;