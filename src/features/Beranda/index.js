import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAkunTrading, getAkunTradingDemo } from "../Setoran/setoranSlice";
import { profileUser, chgPass, chgPhonePass, clearState } from '../main/mainSlice';
import { getDataPP } from "../ProfilePerusahaan/ppSlice";
import NumberFormat from "react-number-format";
import akun_icon from "../../assets/akun_white.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AppModal from "../../components/modal/MyModal";
import AppModalStatus from "../../components/modal/MyModalStatus";
import AppModall from "../../components/modal/MyModall";
import { Button, Form } from "react-bootstrap";
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import provider_mt5 from '../../assets/mt5.png';
import AdminIcon from '@rsuite/icons/Admin';

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      login: "",
      phonepass: "",
      setor: "",
      akun_trading: "",
      img: "",
      konf_password: "",
      password: "",
      password2: "",
      password3: "",
      phonepwd: "",
    };
    this.state = {
      selected: this.initSelected,
      errMsg: this.initSelected,
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: localStorage.getItem("myStatusDokumen")
        ? localStorage.getItem("myStatusDokumen")
        : false,
	  myStatusDokumen2: localStorage.getItem("myStatusDokumen2")
        ? localStorage.getItem("myStatusDokumen2")
        : false,
    };
  }

  componentDidMount() {
    //await this.sleep(300);
    sessionStorage.removeItem("data_tipe_akun_id");
    sessionStorage.removeItem("act_tipe_akun_id");
    this.props.onLoad();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  to_at = async () => {
    await sessionStorage.setItem("act_tipe_akun_id", "create_new_akun");
    this.props.history.push("/account-type");
  };

  handleChange(event) {
    const { name, value } = event.target;
    var val = value;
    this.setState({
      loadingForm: false,
      errMsg: { ...this.state.errMsg, [name]: "" },
      selected: {
        ...this.state.selected,
        [name]: val,
      },
    });
  }

  handleSubmit = async () => {
    var errors = this.state.errMsg;
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    errors.password = !this.state.selected.password ? "Password required" : "";
    if (this.state.selected.password) {
      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var test = reg.test(this.state.selected.password);
      errors.password = !test ? "password must be 8 characters" : "";
      errors.password2 = !test ? "least one uppercase letter" : "";
      errors.password3 = !test ? "one OneLetter letter and one number" : "";
    }
    errors.konf_password = !this.state.selected.konf_password
      ? "Konfirmasi password required"
      : "";
    if (errors.konf_password === "")
      errors.konf_password =
        this.state.selected.konf_password !== this.state.selected.password
          ? "Password not match"
          : "";

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      const param = {
        login: this.state.selected.login,
        password: this.state.selected.password,
      };
      this.props.onChangePass(param);
    } else {
      console.error("Invalid Form");
      this.setState({
        loadingForm: false,
      });
    }
  };

  handleSubmit2 = async () => {
    var errors = this.state.errMsg;
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    errors.phonepwd = !this.state.selected.phonepwd ? "Password required" : "";
    if (this.state.selected.phonepwd) {
      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var test = reg.test(this.state.selected.phonepwd);
      errors.phonepwd = !test ? "password must be 8 characters" : "";
      errors.phonepwd2 = !test ? "least one uppercase letter" : "";
      errors.phonepwd3 = !test ? "one OneLetter letter and one number" : "";
    }
    errors.konf_password = !this.state.selected.konf_password
      ? "Konfirmasi password required"
      : "";
    if (errors.konf_password === "")
      errors.konf_password =
        this.state.selected.konf_password !== this.state.selected.phonepwd
          ? "Password not match"
          : "";

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      const param = {
        login: this.state.selected.login,
        phonepwd: this.state.selected.phonepwd,
      };
      this.props.onChangePhonePass(param);
    } else {
      console.error("Invalid Form");
      this.setState({
        loadingForm: false,
      });
    }
  };

  handleSubmit3 = async () => {
    localStorage.removeItem("myStatusDokumen");
    this.setState({
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
    });
    this.props.history.push("/personal");
  };

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  chg_pass(record) {
    this.setState({
      showFormResPass: true,
      selected: {
        ...record,
        konf_password: "",
        password: "",
        errMsg: this.initSelected,
      },
    });
  }

  chg_pass2(record) {
    this.setState({
      showFormResPhonePass: true,
      selected: {
        ...record,
        konf_password: "",
        phonepwd: "",
        errMsg: this.initSelected,
      },
    });
  }

  handleClose() {
    localStorage.removeItem("myStatusDokumen");
    this.setState({
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
    });
  }
  handleCloseSwal() {
    this.setState({
      loadingForm: false,
      showFormResPass: false,
      showFormResPhonePass: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
    });
    this.props.closeSwal();
  }
  
  handleClose2() {
    localStorage.removeItem("myStatusDokumen2");
    this.setState({
      myStatusDokumen: false,
      myStatusDokumen2: false,
    });
	//this.props.history.push("/rej-doc");
  }
  
  handleClose2A() {
    localStorage.removeItem("myStatusDokumen2");
    this.setState({
      myStatusDokumen: false,
      myStatusDokumen2: false,
    });
	this.props.history.push("/rej-doc");
  }

  render() {
    const { akun_trading, akun_trading_demo, profile, profile_perusahaan } = this.props;
    const { selected, errMsg, myStatusDokumen, myStatusDokumen2 } = this.state;

    const frmUser = (
      <Form id="myForm">
        <Form.Group controlId="password">
          <h5 className="mb-2" style={{fontSize:"12px"}}>NO LOGIN: {this.state.selected.login}</h5>
          <Form.Label>Password Baru</Form.Label>
          {errMsg.password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.password}
              <br />
              {errMsg.password2}
              <br />
              {errMsg.password3}
            </span>
          ) : (
            ""
          )}

          <Form.Control
            size="sm"
            autoComplete="off"
            name="password"
            type="password"
            value={selected.password}
            onChange={this.handleChange.bind(this)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="konf_password">
          <Form.Label>Konfirmasi Password</Form.Label>
          {errMsg.konf_password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.konf_password}
            </span>
          ) : (
            ""
          )}
          <Form.Control
            size="sm"
            autoComplete="off"
            name="konf_password"
            type="password"
            value={selected.konf_password}
            onChange={this.handleChange.bind(this)}
            placeholder="Konfirmasi Password"
          />
          <br />
          <span
            style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}
          >
            Password ini akan di gunakan untuk login dan trading di MT5
          </span>
        </Form.Group>
      </Form>
    );
    const frmUser2 = (
      <Form id="myForm">
        <Form.Group controlId="password">
          <h5 className="mb-2" style={{fontSize:"12px"}}>NO LOGIN: {this.state.selected.login}</h5>
          <Form.Label>Password Baru</Form.Label>
          {errMsg.phonepwd ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.phonepwd}
              <br />
              {errMsg.phonepwd2}
              <br />
              {errMsg.phonepwd3}
            </span>
          ) : (
            ""
          )}

          <Form.Control
            size="sm"
            autoComplete="off"
            name="phonepwd"
            type="password"
            value={selected.phonepwd}
            onChange={this.handleChange.bind(this)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="konf_password">
          <Form.Label>Konfirmasi Password</Form.Label>
          {errMsg.konf_password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.konf_password}
            </span>
          ) : (
            ""
          )}
          <Form.Control
            size="sm"
            autoComplete="off"
            name="konf_password"
            type="password"
            value={selected.konf_password}
            onChange={this.handleChange.bind(this)}
            placeholder="Konfirmasi Password"
          />
        </Form.Group>
        <br />
        <span style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}>
          Password ini akan di gunakan untuk menelepon dealing kamu
        </span>
      </Form>
    );
    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px; text-align:left;">Nasabah yang terhormat, selamat datang di Magnet, kami sangat senang kamu bergabung bersama kami, agar bisa segera memulai silahkan lengkapi data pribadi kamu. Data ini diperlukan sebagai persyaratan resmi dalam pembukaan rekening.</div>',
        }}
      />
    );
	
	const contentDelete2 = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px; text-align:left;">Nasabah yang terhormat, selamat datang di Magnet. Silahkan perbaiki kembali data pribadi kamu. Data ini diperlukan sebagai persyaratan resmi dalam pembukaan rekening.</div>',
        }}
      />
    );
    return (
      <div className="content-wrapper pr-1">
        <section className="content">
          <div className="container-fluid">

            <div className="grid grid-cols-1 py-3">


              <div className="w-full bg-hijau-forex rounded-xl text-white pb-6 pt-6 grid grid-cols-1 place-items-center static">


                <div class="flex flex-row justify-center"><span className="text-lg font-bold"><AdminIcon size="25px" />&nbsp;Akun Saya</span></div>


              </div>



              <div className="w-full text-white pt-3 pb-3  grid grid-cols-1 place-items-center static">


                <div className="mobile-hide relative  text-black text-center  py-0 w-full ..." >

                  <div className="mobile-hide relative    bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10   ...">


                    <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN REAL MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>  

                    <div className="grid grid-cols-3 gap-4 px-3 mt-4 mb-4">

                      {akun_trading ? (
                        akun_trading.map((at, index) => {
                          return (

                            <div className="rounded-2xl border border-solid border-gray-300 text-left p-3" style={{ backgroundColor: "#F1F1F1" }}>
                              <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                  <span className="text-red-500 text-sm font-bold">NO LOGIN: {at.login}</span>
                                </div>
                                <div className="box-bank__actions place-items-end text-right">
                                  <Dropdown>
                                    <Dropdown.Toggle size="sm" variant="secondary"
                                      style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#000' }} id="dropdown-basic">
                                      <i className="fa fa-cog"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="my-dropdown-menu">
                                      <Dropdown.Item as="button" onClick={() => this.chg_pass(at)}>RESET PASSWORD</Dropdown.Item>
                                      <Dropdown.Item as="button" onClick={() => this.chg_pass2(at)}>RESET PHONE PASSWORD</Dropdown.Item>

                                    </Dropdown.Menu>
                                  </Dropdown>

                                </div>
                              </div>
                              <div className="grid grid-cols-2" style={{fontSize:"12px"}}>
                                <div className="font-bold">BALANCE</div>
                                <div className="font-bold">FREE MARGIN</div>
                                
                                <div><NumberFormat
                                  value={at.balance > 0 ? at.balance : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>

                                <div><NumberFormat
                                  value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>

                                <div className="font-bold">EQUITY</div>
                                <div>&nbsp;</div>
                                <div><NumberFormat
                                  value={at.equity > 0 ? at.equity : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>
                              </div>

                            </div>


                          );
                        })
                      ) : ''}

                    </div>
                    <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">
                      {profile.status_dokumen === 'Approve' &&
                        <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>

                          <Link to='/account-type' className="btn btn-lgreen btn-sm" onClick={() => this.to_at()}>
                            <span className="font-bold text-white">BUAT AKUN TRADING BARU</span>
                          </Link>
                        </div>}

                      {profile.status_dokumen === 'Belum Lengkap' &&
                        <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>

                          <Link to='/personal' className="btn btn-lgreen btn-sm">
                            <span className="font-bold text-white">LENGKAPI REGISTRASI</span>
                          </Link>
                        </div>}

                      {profile.status_dokumen === 'Menunggu Verifikasi' &&
                        <div className="w-full place-items-center static">
                          <h5>Akun kamu sedang di verifikasi oleh admin dan akan di telepon oleh Wakil Pialang dari nomor {profile_perusahaan.wakil_pialang_caller}</h5>

                        </div>}

                    </div>

                  </div>

                </div>

                <div className="mobile-hide relative  text-black text-center    py-0 w-full mt-0 ..." >

                  <div className="mobile-hide relative    bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10   ...">

                    <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN DEMO MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>

                    <div className="grid grid-cols-3 gap-4 px-3 mt-4 mb-4">

                      {akun_trading_demo ? (
                        akun_trading_demo.map((at, index) => {
                          return (

                            <div className="rounded-2xl border border-solid border-gray-300 text-left p-2" style={{ backgroundColor: "#F1F1F1" }}>
                              <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                  <span className="text-red-500 text-sm font-bold">NO LOGIN: {at.login}</span>
                                </div>
                                <div className="box-bank__actions place-items-end text-right">
                                  <Dropdown>
                                    <Dropdown.Toggle size="sm" variant="secondary"
                                      style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#000', paddingLeft: "80%" }} id="dropdown-basic">
                                      <i className="fa fa-cog"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="my-dropdown-menu">
                                      <Dropdown.Item as="button" onClick={() => this.chg_pass(at)}>RESET PASSWORD</Dropdown.Item>
                                      <Dropdown.Item as="button" onClick={() => this.chg_pass2(at)}>RESET PHONE PASSWORD</Dropdown.Item>

                                    </Dropdown.Menu>
                                  </Dropdown>

                                </div>
                              </div>
                             
                              <div className="grid grid-cols-2" style={{fontSize:"12px"}}>
                                <div className="font-bold">BALANCE</div>
                                <div className="font-bold">FREE MARGIN</div>
                                
                                <div><NumberFormat
                                  value={at.balance > 0 ? at.balance : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>

                                <div><NumberFormat
                                  value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>

                                <div className="font-bold">EQUITY</div>
                                <div>&nbsp;</div>
                                <div><NumberFormat
                                  value={at.equity > 0 ? at.equity : '0.00'}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={'text'}
                                /></div>
                              </div>

                            </div>


                          );
                        })
                      ) : ''}


                    </div>

                    {akun_trading_demo.length <= 10 &&(

                    <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">
                      <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>
                        <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-white">BUAT AKUN DEMO</span></a>
                      </div>

                    </div>
                    )}


                  </div>

                </div>




                <div className="mobile-view  relative mt-[0rem] bg-white text-black text-center rounded-2xl shadow-lg  py-4 w-[100%] ..." >
                      
                  <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN REAL MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>  

                 
                  <div className="grid grid-cols-1 gap-4 px-5 mt-4 mb-4">

                    {akun_trading ? (
                      akun_trading.map((at, index) => {
                        return (

                          <div className="border border-solid border-gray-300 text-left p-4 rounded-2xl" style={{ backgroundColor: "#F1F1F1" }}>


                            <div className="grid grid-cols-4">
                              <div className="py-2 col-span-3">
                                <span className="text-bold text-md text-red-500">NO LOGIN: {at.login}</span>
                              </div>



                              <div className="box-bank__actions place-items-end text-right">
                                <Dropdown>
                                  <Dropdown.Toggle size="sm" variant="secondary"
                                    style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#000', paddingLeft: "80%" }} id="dropdown-basic">
                                    <i className="fa fa-cog"></i>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="my-dropdown-menu">
                                    <Dropdown.Item as="button" onClick={() => this.chg_pass(at)}>RESET PASSWORD</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={() => this.chg_pass2(at)}>RESET PHONE PASSWORD</Dropdown.Item>

                                  </Dropdown.Menu>
                                </Dropdown>

                              </div>
                            </div>
                            <div className="grid grid-cols-2" style={{fontSize:"12px"}}>
                              <div className="font-bold">BALANCE</div>

                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.balance > 0 ? at.balance : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                              <div className="font-bold">FREE MARGIN</div>

                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                              <div className="font-bold">EQUITY</div>
                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.equity > 0 ? at.equity : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                            </div>
                          </div>

                        );
                      })
                    ) : ''}

                  </div>
                  <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">

                  {profile.status_dokumen === 'Approve' &&
                    <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 pb-20 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>

                      <Link to='/account-type' className="btn btn-lgreen btn-sm" onClick={() => this.to_at()}>
                        <span className="font-bold text-white">BUAT AKUN TRADING BARU</span>
                      </Link>
                    </div>}

                  {profile.status_dokumen === 'Belum Lengkap' &&
                    <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 pb-20 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>

                      <Link to='/personal' className="btn btn-lgreen btn-sm">
                        <span className="font-bold text-white">LENGKAPI REGISTRASI</span>
                      </Link>
                    </div>}

                  </div>

                </div>
              </div>

              <div className="mobile-view relative mt-[0rem]  bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10 mx-1 ...">
                
                <div className="flex justify-center items-center">
                  <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN DEMO MT5</span>
                  <img width="45" className="pl-2" src={provider_mt5} />
                </div>

                <div className="grid grid-cols-1 gap-4 px-5 mt-4 mb-4">
                  {akun_trading_demo
                    ? akun_trading_demo.map((at, index) => {
                      return (
                        <div
                          className="rounded-2xl border border-solid border-gray-300 text-left p-4"
                          style={{ backgroundColor: "#F1F1F1" }}
                        >
                          <div className="grid grid-cols-2">
                            <div className="py-2">
                              <span className="text-bold text-md text-red-500">NO LOGIN: {at.login}</span>
                            </div>

                            <div className="box-bank__actions place-items-end text-right">
                              <Dropdown>
                                <Dropdown.Toggle size="sm" variant="secondary"
                                  style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: '#000', paddingLeft: "80%" }} id="dropdown-basic">
                                  <i className="fa fa-cog"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="my-dropdown-menu">
                                  <Dropdown.Item as="button" onClick={() => this.chg_pass(at)}>RESET PASSWORD</Dropdown.Item>
                                  <Dropdown.Item as="button" onClick={() => this.chg_pass2(at)}>RESET PHONE PASSWORD</Dropdown.Item>

                                </Dropdown.Menu>
                              </Dropdown>

                            </div>
                          </div>

                          <div className="grid grid-cols-2" style={{fontSize:"12px"}}>
                              <div className="font-bold">BALANCE</div>

                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.balance > 0 ? at.balance : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                              <div className="font-bold">FREE MARGIN</div>

                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                              <div className="font-bold">EQUITY</div>
                              <div style={{ textAlign: "right", paddingRight: "10px" }}><NumberFormat
                                value={at.equity > 0 ? at.equity : '0.00'}
                                thousandSeparator={true}
                                decimalScale={2}
                                displayType={'text'}
                              /></div>

                            </div>

                        </div>
                      );
                    })
                    : ""}
                </div>

               {akun_trading_demo.length <= 10 && (

                <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">
                  <div className="w-auto bg-hijau-forex rounded-xl text-white pt-2 pb-2 pb-20 grid grid-cols-1 place-items-center static" style={{ backgroundColor: "#C2252C" }}>
                    <a href="account-type" className="btn btn-lgreen btn-sm">
                      <span className="font-bold text-white">BUAT AKUN DEMO</span>
                    </a>
                  </div>

                </div>
                )}

              </div>

            </div>

          </div>
        </section>
        <AppModal
          size="xs"
          show={this.state.showFormResPass}
          form={frmUser}
          backdrop="static"
          keyboard={false}
          title={"RESET PASSWORD"}
          titleButton="Save change"
          themeButton="success"
          handleClose={this.handleClose.bind(this)}
          isLoading={
            this.props.isAddLoading
              ? this.props.isAddLoading
              : this.state.loadingForm
          }
          formSubmit={this.handleSubmit.bind(this)}
        />
        <AppModal
          size="xs"
          show={this.state.showFormResPhonePass}
          form={frmUser2}
          backdrop="static"
          keyboard={false}
          title={"RESET PHONE PASSWORD"}
          titleButton="Save change"
          themeButton="success"
          handleClose={this.handleClose.bind(this)}
          isLoading={
            this.props.isAddLoading
              ? this.props.isAddLoading
              : this.state.loadingForm
          }
          formSubmit={this.handleSubmit2.bind(this)}
        />
        <AppModalStatus
          show={myStatusDokumen}
          size="xs"
          form={contentDelete}
          handleClose={this.handleClose.bind(this)}
          backdrop="static"
          keyboard={false}
          title="Status"
          formSubmit={this.handleSubmit3.bind(this)}
          titleButton="Lengkapi"
          themeButton="success" />
		  
		  <AppModalStatus
                    show={myStatusDokumen2}
                    size="xs"
                    form={contentDelete2}
                    handleClose={this.handleClose2.bind(this)}
                    backdrop="static"
                    keyboard={false}
                    title="Status"
                    formSubmit={this.handleClose2A.bind(this)}
                    titleButton="Perbaiki Data"
                    themeButton="danger"
                  />

        {this.props.showFormSuccess ? (<AppSwalSuccess
          show={this.props.showFormSuccess}
          title={<div dangerouslySetInnerHTML={{ __html: this.props.contentMsg }} />}
          type={this.props.tipeSWAL}
          handleClose={this.handleCloseSwal.bind(this)}
        >
        </AppSwalSuccess>) : ''}
      </div>


    );
  }
}
const mapStateToProps = (state) => ({
  akun_trading: state.setoran.akunTrading || [],
  akun_trading_demo: state.setoran.akunTradingDemo || [],
  contentMsg: state.main.contentMsg,
  showFormSuccess: state.main.showFormSuccess,
  user: state.main.currentUser,
  tipeSWAL: state.main.tipeSWAL,
  profile: state.main.dtProfileUser,
  profile_perusahaan: state.companyProfile.profile_perusahaan || {},
});

const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(getDataPP());
      dispatch(profileUser());
      dispatch(getAkunTrading());
      dispatch(getAkunTradingDemo());
    },
    onChangePass: (param) => {
      dispatch(chgPass(param));
    },
    onChangePhonePass: (param) => {
      dispatch(chgPhonePass(param));
    },
    closeSwal: () => {
      dispatch(clearState());
    }
  }
};
export default connect(mapStateToProps, mapDispatchToPros)(Beranda);
