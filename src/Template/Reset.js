import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  actionPassword,
  userSelector,
  clearState,
} from "../features/main/mainSlice";
import Button from "../components/button/Button";
import { Form } from "react-bootstrap";

import banner from "../assets/image_1.png";
import logoa from "../assets/logo.svg";

import password_icon from "../assets/password.svg";
import { useLocation } from "react-router-dom";

const Reset = () => {
  const {
    isFetching,
    errorMessage,
    isVerifikasi,
    isCompleteProfile,
    succesCompleteProfile,
    token,
  } = useSelector(userSelector);

  const [errorValidationPasswordCheck, setErrorValidationPasswordCheck] = useState(
    {
      isMatchOneLetter: false,
      isMatchNumber: false,
      isMatchMinDigit: false 
    }
  )

  const dispatch = useDispatch();

  const { search } = useLocation();

  useEffect(async () => {
    if (token) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch(clearState());
      window.location.reload();
    } else {
      await dispatch(clearState());
    }
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      konfirmasi_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Silahkan masukan password")
        .min(8, "Minimal 8 karakter"),
      konfirmasi_password: Yup.string()
        .required("Harus diisi!")
        .oneOf([Yup.ref("password")], "Konfirmasi password tidak sama"),
    }),
    onSubmit: (values) => {
      const val = {
        ...values,
        token: search.replace("?", "/"),
      };
      dispatch(actionPassword(val));
    },
    onChange: (values) => {
      console.log(values)
    }
  });

  const hideAlert = () => {
    formik.setFieldValue("konfirmasi_password", "");
    formik.setFieldValue("password", "");
    formik.resetForm({ password: "", konfirmasi_password: "" });
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

  return (
    <div class="">
      <div class="w-full grid lg:grid-cols-2 gap-4 bg-white">
        <div className="overflow-hidden mobile-view">
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
                        Reset Password
                      </span>
                    </b>
                  </div>
                </div>

                <div className="card-body" style={{ paddingTop: "0px" }}>
                  {errorMessage ? (
                    <div
                      className={"alert alert-danger alert-sm"}
                      style={{backgroundColor: (new RegExp("\\b" + "berhasil" + "\\b").test(
                        errorMessage
                          ? errorMessage.toOneLetter()
                          : "no match"
                      ) ? "#28a745" :"#C2262C")}}
                    >
                      <button
                        onClick={hideAlert}
                        type="button"
                        className="close text-white"
                        data-dismiss="alert"
                        aria-hidden="true"
                        style={{opacity:1}}
                      >
                        ×
                      </button>
                      <span className="fw-semi-bold text-white">
                        Info: {errorMessage}
                      </span>
                    </div>
                  ) : (
                    <p className="login-box-msg"></p>
                  )}

                  {!isCompleteProfile &&
                    !isVerifikasi &&
                    !succesCompleteProfile ? (
                    <form onSubmit={formik.handleSubmit}>
                      <Form.Label>
                        <div className="w-full mb-2 mt-2">
                          <div className="text-black  text-xs text-center font-normal">
                            Silahkan masukan Password baru kamu.
                          </div>
                        </div>
                      </Form.Label>
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
                          onChange={(event)=>{
                            const {name,value} = event.target
                            updateErrorValidationPassword(value)
                            formik.setFieldValue(name,value)
                          }}
                        />
                      </div>

                      {
                        formik.touched.password && (
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
                        )
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
                          autoComplete="off"
                          type="password"
                          className="form-control"
                          placeholder="Confirmation Password"
                          style={{ backgroundColor: "#fff", border: "0" }}
                          {...formik.getFieldProps("konfirmasi_password")}
                        />
                      </div>

                      <div className="social-auth-links text-center mt-2 mb-3">
                        <div className="grid grid-cols-1 gap-0 place-items-center">
                          <div className="w-2/4 mt-2">
                            <Button
                              block
                              type="submit"
                              isLoading={isFetching}
                              theme=""
                              style={{
                                backgroundColor: "#C1242B",
                                color: "#fff",
                              }}
                            >
                              Ubah
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
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

export default Reset;
