import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  userSelector,
  clearState,
} from "../features/main/mainSlice";
import Button from "../components/button/Button";
import logoa from "../assets/logo.svg";
import banner from "../assets/image_1.png";
import email_icon from "../assets/email.svg";
import password_icon from "../assets/password.svg";
import AppModal from "../components/modal/MyModal";

import AppModalLoading from "../components/modal/MyModalLoading";

const Login = () => {
  const [showModalDialog, setShowModalDialog] = useState(false);
  const { isFetching, isSuccess, errorMessage, myStatus, accessTokenKu, toVerify } =
    useSelector(userSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  

  useEffect(() => {
	  
    if (myStatus) {
      setShowModalDialog(true);
    }
    if (isSuccess && !myStatus) {
      dispatch(clearState());
      history.push("/");
    }
	if(toVerify) history.push("/register");
  }, [isSuccess, myStatus, dispatch, history, toVerify]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Silahkan masukan email")
        .email("Silahkan masukkan email yang sah"),
      password: Yup.string().required("Silahkan masukan password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  

  const hideAlert = () => {
	  setShowModalDialog(false);
    dispatch(clearState());
  };
  document.getElementById("root").classList = "hold-transition";
  const contentDelete = (
    <div      
      dangerouslySetInnerHTML={{
        __html:
          '<div id="caption" style=padding-bottom:20px;">Akun Anda sudah tidak dapat digunakan. Untuk bantuan lebih lanjut Anda bisa menghubungi kami di <a href="https://www.magnetfx.co.id/contact" style="color: rgb(220, 53, 69);">sini</a></div>',
      }}
    />
  );

  return (
    <div class="">
      <div className="mobile-hide">
        <div class="w-full grid grid-cols-2 gap-4 bg-white">
          <div className="grid grid-cols-1 gap-0 place-items-center h-screen ">
            <div className="login-box ">
              <div className="card  border-white">
                <div className="card-header text-center h1 text-red-500 text-lg bg-white border-white grid grid-cols-1 place-items-center">
                  <div style={{ width: "75%" }}>
                    <img src={logoa} />
                  </div>
                  <div>
                    <b>
                      <span className="text-merah-button font-bold text-lg">
                        Login
                      </span>
                    </b>
                  </div>
                </div>
                <div className="card-body">
                  {errorMessage ? (
                    <div className="alert alert-sm" style={{backgroundColor:"#C2262C"}}>
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
                        Error: {errorMessage}
                      </span>
                    </div>
                  ) : (
                    <p className="login-box-msg"></p>
                  )}

                  <form onSubmit={formik.handleSubmit}>
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
                      <div className="input-group-append ">
                        <div className="input-group-text bg-white border-white">
                          <img src={email_icon} width="22px" />
                        </div>
                      </div>
                      <input
                        autoFocus
                        autoComplete="off"
                        type="text"
                        className="form-control border-white"
                        placeholder="Email"
                        style={{ backgroundColor: "#fff" }}
                        {...formik.getFieldProps("email")}
                      />
                    </div>

                    {formik.touched.password && formik.errors.password ? (
                      <span className="float-right text-error badge badge-danger">
                        {formik.errors.password}
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
                        className="form-control border-white bg-white"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                      />
                    </div>

                    <div className="social-auth-links text-center mt-2 mb-3">
                      <div className="grid grid-cols-4">
                        <div className="col-span-2 text-left pt-1">
                          <a href="forgot" className="text-center ">
                            <span className="text-black font-bold">
                              Lupa Password
                            </span>
                          </a>
                        </div>
                        <div className="col-span-1 align-middle pt-1">
                          <a href="register" className="text-center ">
                            <span className="text-hijau-forex font-bold">
                              Daftar
                            </span>
                          </a>
                        </div>
                        <div className="col-span-1">
                          <Button
                            block
                            type="submit"
                            isLoading={isFetching}
                            className="bg_color_merah"
                            theme=""
                            style={{
                              backgroundColor: "#C3262A",
                              color: "#fff",
                            }}
                          >
                            Login
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="show_hide h-auto overflow-hidden">
            <img src={banner} className="w-[100%] h-[100%]" />
          </div>
        </div>
      </div>

      <div className="mobile-view mb-5">
        <div class="w-full grid grid-cols-2 gap-4">
          <div className="overflow-hidden col-span-2">
            <img src={banner} className="w-[100%] h-[100%]" />
          </div>

          <div className="col-span-2 lg:col-span-0 grid grid-cols-1 gap-0 place-items-center">
            <div className="login-box ">
              <div className="card  border-white">
                <div className="card-header text-center h1 text-red-500 text-lg bg-white border-white">
                  <div class="grid grid-cols-1 place-items-center">
                    <img src={logoa} width="60%" />
                  </div>
                  <b>
                    <span className="text-merah-button font-bold text-lg">
                      Login
                    </span>
                  </b>
                </div>
                <div className="card-body">
                
                  {errorMessage ? (
                    <div className="alert alert-sm" style={{backgroundColor:"#C2262C"}}>
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
                      <span className="text-bold text-white">
                        Error: {errorMessage}
                      </span>
                    </div>
                  ) : (
                    <p className="login-box-msg"></p>
                  )}

                  <form onSubmit={formik.handleSubmit}>
                    {formik.touched.email && formik.errors.email ? (
                      <span className="float-right text-error badge badge-danger">
                        {formik.errors.email}
                      </span>
                    ) : null}
                    <div
                      className="input-group mb-3 border-black"
                      style={{
                        border: "1px solid #B7B7B7",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <div className="input-group-append ">
                        <div className="input-group-text bg-white border-white">
                          <img src={email_icon} width="22px" />
                        </div>
                      </div>
                      <input
                        autoFocus
                        autoComplete="off"
                        type="text"
                        className="form-control border-white bg-white"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                      />
                    </div>

                    {formik.touched.password && formik.errors.password ? (
                      <span className="float-right text-error badge badge-danger">
                        {formik.errors.password}
                      </span>
                    ) : null}
                    <div
                      className="input-group mb-3 border-black "
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
                        className="form-control border-white bg-white"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                      />
                    </div>

                    <div className="social-auth-links text-center mt-2 mb-3">
                      <div className="grid grid-cols-2">
                        <div className="col-span-2 text-right pt-1">
                          <a href="forgot" className="text-center ">
                            <span className="text-black font-bold">
                              Lupa Password
                            </span>
                          </a>
                        </div>

                        <div className="grid col-span-2 grid-cols-1 place-items-center mt-4">
                          <div className="col-span-2 w-[35%]">
                            <Button
                              block
                              type="submit"
                              isLoading={isFetching}
                              className="bg_color_merah"
                              theme=""
                              style={{
                                backgroundColor: "#C3262A",
                                color: "#fff",
                              }}
                            >
                              Login
                            </Button>
                          </div>

                          <div className="col-span-2 align-middle pt-1 mt-3">
                            <a href="register" className="text-center ">
                              <span className="text-hijau-forex font-bold">
                                Daftar
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppModal
        show={showModalDialog}
        size="sm"
        form={contentDelete}
        handleClose={hideAlert}
        backdrop="static"
        keyboard={false}
        noBtnAction={true}
        myCloseButton={true}
        title="Info"
        titleButton="Delete"
        themeButton="danger"
      ></AppModal>
    </div>
  );
};

export default Login;
