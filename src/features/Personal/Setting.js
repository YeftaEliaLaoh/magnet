import React, { Component, Fragment } from "react";
import { Col, Nav, Row } from "rsuite";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import AppButton from "../../components/button/Button";
import {
  chgPropsProfile,
  changePass,
  updProfile,
  clearState,
  profileUser,
} from "../main/mainSlice";
import icon from "../../assets/setting.svg";
import "../../styles/custom_muis.css";
import GearIcon from "@rsuite/icons/Gear";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      email: "",
      current_password: "",
      password: "",
      konfirmasi_password: "",
      
    };
    this.state = {
      errMsg1: this.initSelected,
      lastSegmentUrl: "",
      active_tab: "profile",
      errorValidationPasswordCheck: {
        isMatchOneLetter: false,
        isMatchNumber: false,
        isMatchMinDigit: false 
      }
    };
  }

  componentDidMount = async () => {
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };
  handleSelect(activeKey) {
    this.props.clearErr();
    this.setState({ active_tab: activeKey });
  }

  handleChange(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    dt["key"] = name;
    dt["value"] = value;

    if(evt.target.name === "password")
      this.updateErrorValidationPassword(evt.target.value)
    
    this.props.changeProps(dt);
  }

  updateErrorValidationPassword(str){
    const regexMatchOneLetter = /^-?\d*\.?\d*$/;
    const regexMatchNumber = /\d/;
  
    this.setState({
      errorValidationPasswordCheck: {
        isMatchOneLetter: regexMatchOneLetter.test(str) ? false : true,
        isMatchNumber: regexMatchNumber.test(str) ? true : false,
        isMatchMinDigit: str.length >= 8 ? true : false
      }
    })
  }

  checkStateErrorValidationPasswordCheck(){
    if(
      this.state.errorValidationPasswordCheck.isMatchNumber === true &&
      this.state.errorValidationPasswordCheck.isMatchMinDigit === true &&
      this.state.errorValidationPasswordCheck.isMatchOneLetter === false
    ) 
     return true

    return false
  }

  handleSubmitPass() {
    var errors = this.state.errMsg1;
    errors.current_password = !this.props.profile.current_password
      ? "Kolom ini harus diisi"
      : "";
    errors.password = !this.props.profile.password
      ? "Kolom ini harus diisi"
      : "";

    
    
    errors.konfirmasi_password = !this.props.profile.konfirmasi_password
      ? "Kolom ini harus diisi"
      : "";
    
    errors.password = this.checkStateErrorValidationPasswordCheck() ? "Password belum sesuai" : ""
    
    errors.konfirmasi_password =
      !errors.konfirmasi_password &&
      this.props.profile.konfirmasi_password !== this.props.profile.password
        ? "Konfirmasi password tidak sesuai"
        : errors.konfirmasi_password;

  
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg1)) {
      this.props.submitPass(this.props.profile);
    } else {
      console.error("Invalid Form");
    }
  }

  handleSubmit() {
    var errors = this.state.errMsg1;
    errors.email = !this.props.profile.email ? "Kolom ini harus diisi" : "";
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    //console.log(this.props.data.send_mail);
    if (!errors.email) {
      if (!pattern.test(this.props.profile.email)) {
        errors.email = "Please enter valid email address";
      }
    }
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg1)) {
      this.props.submitProfile(this.props.profile);
    } else {
      console.error("Invalid Form");
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  hideAlert() {
    this.props.clearErr();
  }

  render() {
    const { active_tab, errMsg1 } = this.state;
    const { user, profile, errorMessage, isError } = this.props;

    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="mobile-hide">
              <h1 style={{ marginBottom: 10, fontSize: 30, color: "#2E2E2F" }}>
                <GearIcon size="35px" className="label_ijo" />
                &nbsp;Pengaturan
              </h1>
            </div>

            <div className="mobile-view">
              <h1 style={{ marginBottom: 10, fontSize: 20, color: "#2E2E2F" }}>
                <GearIcon size="35px" className="label_ijo" />
                &nbsp;Pengaturan
              </h1>
            </div>

            <div className="row">
              <div className="col-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg rounded-2xl"
                  style={{ minHeight: "430px", borderRadius: "2rem" }}
                >
                  <div
                    className="card-body"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                  >
                    <Nav
                      appearance="subtle"
                      activeKey={active_tab}
                      className="tab_personal"
                    >
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "password_form" ? true : false}
                        eventKey="password_form"
                        className="default"
                      >
                        Password
                      </Nav.Item>
                      <Nav.Item
                        style={{ marginLeft: 60 }}
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "profile" ? true : false}
                        eventKey="profile"
                        className="default"
                      >
                        Personal Info
                      </Nav.Item>
                    </Nav>
                    <div style={{ paddingTop: 0 }} className="px-0 lg:px-5">
                      {errorMessage ? (
                        <div
                          className={
                            !isError
                              ? "alert alert-info alert-sm"
                              : "alert alert-danger alert-sm"
                          }
                          style={{ marginTop: ".3rem" }}
                        >
                          <button
                            onClick={this.hideAlert.bind(this)}
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <span className="fw-semi-bold">{errorMessage}</span>
                        </div>
                      ) : (
                        <br />
                      )}
                      {active_tab === "password_form" && (
                        <Fragment>
                          <div className="border py-4 px-4 w-[100%] shadow-lg rounded-2xl ">
                            <Row className="mb-3">
                              <Col sm="24">
                                {errMsg1.current_password ? (
                                  <span className="float-right text-error badge badge-danger">
                                    {errMsg1.current_password}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <Form.Control
                                  value={
                                    profile.current_password
                                      ? profile.current_password
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChange.bind(this)}
                                  size="lg"
                                  name="current_password"
                                  type="password"
                                  required
                                  placeholder="Current Password"
                                />
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col sm="24">
                                {errMsg1.password ? (
                                  <span className="float-right text-error badge badge-danger">
                                    {errMsg1.password}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <Form.Control
                                  value={
                                    profile.password ? profile.password : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChange.bind(this)}
                                  size="lg"
                                  name="password"
                                  type="password"
                                  required
                                  placeholder="New Password"
                                />
                              </Col>
                              {profile.password && (
                                <div
                                  className="flex flex-col input-group mt-2"
                                  style={{ marginLeft: 5 }}
                                >
                                  <p className="text-muted mb-2">
                                    Password must contain the following:
                                  </p>
                                  <ul className="mb-0">
                                    <li className={`text-xs mb-1 ml-3 ${this.state.errorValidationPasswordCheck.isMatchOneLetter ? 'text-success' : 'text-danger'}`}>
                                      <i className={`fa ${this.state.errorValidationPasswordCheck.isMatchOneLetter ? 'fa-check' : 'fa-times'}`}></i> Only one or
                                      more <b>letter</b>
                                    </li>
                                    <li className={`text-xs mb-1 ml-3 ${this.state.errorValidationPasswordCheck.isMatchNumber ? 'text-success' : 'text-danger'}`}>
                                      <i className={`fa ${this.state.errorValidationPasswordCheck.isMatchNumber ? 'fa-check' : 'fa-times'}`}></i> Only one or
                                      more <b>number</b>
                                    </li>
                                    <li className={`text-xs mb-1 ml-3 ${this.state.errorValidationPasswordCheck.isMatchMinDigit ? 'text-success' : 'text-danger'}`}>
                                      <i className={`fa ${this.state.errorValidationPasswordCheck.isMatchMinDigit ? 'fa-check' : 'fa-times'}`}></i> Minimum
                                      <b> 8 Characters</b> letter or number
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </Row>
                            <Row className="mb-3">
                              <Col sm="24">
                                {errMsg1.konfirmasi_password ? (
                                  <span className="float-right text-error badge badge-danger">
                                    {errMsg1.konfirmasi_password}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <Form.Control
                                  value={
                                    profile.konfirmasi_password
                                      ? profile.konfirmasi_password
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChange.bind(this)}
                                  size="lg"
                                  name="konfirmasi_password"
                                  type="password"
                                  required
                                  placeholder="Repeat New Password"
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="grid grid-cols-1 place-items-center mt-4 mb-2">
                            <AppButton
                              onClick={this.handleSubmitPass.bind(this)}
                              type="button"
                              size="lg"
                              theme=""
                              style={{
                                backgroundColor: "#C3262A",
                                color: "#fff",
                              }}
                            >
                              Change Password
                            </AppButton>
                          </div>
                        </Fragment>
                      )}

                      {active_tab === "profile" && (
                        <Fragment>
                          <div className="border py-4 px-4 w-[100%] shadow-lg rounded-2xl ">
                            <Row className="mb-3">
                              <Col sm="24">
                                <Form.Control
                                  value={user.nama_depan ? user.nama_depan : ""}
                                  autoComplete="off"
                                  size="lg"
                                  name="nama_depan"
                                  type="text"
                                  readOnly
                                  placeholder="First Name"
                                  style={{ backgroundColor: "#e9ecef" }}
                                />
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col sm="24">
                                {errMsg1.email ? (
                                  <span className="float-right text-error badge badge-danger">
                                    {errMsg1.email}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <Form.Control
                                  value={profile.email ? profile.email : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange.bind(this)}
                                  size="lg"
                                  name="email"
                                  type="text"
                                  required
                                  readOnly={
                                    profile.is_email_change === "1" || profile.is_email_change === 1 ? true : false
                                  }
                                  placeholder="Email"
                                />
                              </Col>
							  
                              {profile.is_email_change === 1 && (
                                <div className="w-full place-items-center static">
                                  <h5 style={{marginTop:5,fontSize:13,marginLeft:5}}>
                                    Permintaan perubahan email kamu sedang di
                                    verifikasi oleh admin
                                  </h5>
                                </div>
                              )}
							  
                            </Row>
                          </div>

                          <div className="grid grid-cols-1 place-items-center mt-4 mb-2">
                            <AppButton
                              onClick={this.handleSubmit.bind(this)}
                              type="button"
                              size="lg"
                              theme=""
                              style={{
                                backgroundColor: "#C3262A",
                                color: "#fff",
                              }}
                            >
                              Update Profile
                            </AppButton>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.main.currentUser,
  profile: state.main.dtProfileUser,
  errorMessage: state.main.errorMessage,
  isError: state.main.isError,
});
const mapDispatchToPros = (dispatch) => {
  return {
    changeProps: (param) => {
      dispatch(chgPropsProfile(param));
    },
    submitPass: (param) => {
      dispatch(changePass(param));
    },
    submitProfile: (param) => {
      dispatch(updProfile(param));
    },
    clearErr: () => {
      dispatch(profileUser());
      dispatch(clearState());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Setting);
