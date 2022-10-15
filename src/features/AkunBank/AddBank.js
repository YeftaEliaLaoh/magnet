import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Col, Figure, Form } from "react-bootstrap";
import AppButton from "../../components/button/Button";
import icon from "../../assets/akun_bank_ijo.svg";
import NumberFormat from "react-number-format";
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import { profileUser } from "../main/mainSlice";
import {
  getBank,
  simpanAkunBank,
  chgPropsAkunBank,
  closeSwal,
} from "../Personal/personalSlice";

class AddBank extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      nominal: "",
      akun_trading: "",
      akun_bank: "",
      penarikan_dana_id: "",
    };
    this.initAkunBank = {
      agreement6: "",
    };
    this.state = {
      lastSegmentUrl: "",
      formMT5: false,
      nextStep: false,
      nextStep1: false,
      selected: this.initSelected,
      errMsg6: this.initAkunBank,
      start: 1,
      limit: 10,
      search: "",
    };
  }

  componentDidMount = async () => {
    this.props.onLoad();
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };

  handleSubmit6 = async (action) => {
    var errors = this.state.errMsg6;
    var nama_pemilik =
      this.props.user.nama_depan + " " + this.props.user.nama_belakang;
    errors.nama_pemilik =
      !this.props.dataAkunBank.nama_pemilik && nama_pemilik === ""
        ? "Kolom ini harus diisi"
        : "";
    errors.bank = !this.props.dataAkunBank.bank_id
      ? "Kolom ini harus diisi"
      : "";
    // errors.cabang = !this.props.dataAkunBank.cabang
      // ? "Kolom ini harus diisi"
      // : "";
    errors.no_rek = !this.props.dataAkunBank.no_rek
      ? "Kolom ini harus diisi"
      : "";

      errors.cabang = !this.props.dataAkunBank.cabang
      ? "Kolom ini harus diisi"
      : "";
    errors.jenis_akun_bank = !this.props.dataAkunBank.jenis_akun_bank
      ? "Kolom ini harus diisi"
      : "";
	errors.file = !this.props.dataAkunBank.file
      ? "Kolom ini harus diisi"
      : "";
    errors.agreement6 =
      !this.props.dataAkunBank.agreement6 ||
      this.props.dataAkunBank.agreement6 !== "Y"
        ? "Kolom ini harus diisi"
        : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg6)) {
      const saveData = {
		flag : 1,
        akun_bank_id: this.props.dataAkunBank.akun_bank_id
          ? this.props.dataAkunBank.akun_bank_id
          : "",
        jenis_akun_bank: this.props.dataAkunBank.jenis_akun_bank
          ? this.props.dataAkunBank.jenis_akun_bank
          : "",
        cabang: this.props.dataAkunBank.cabang
          ? this.props.dataAkunBank.cabang
          : "",
        no_rek: this.props.dataAkunBank.no_rek
          ? this.props.dataAkunBank.no_rek
          : "",
        bank: this.props.dataAkunBank.bank_id
          ? this.props.dataAkunBank.bank_id
          : "",
        nama_pemilik:
          this.props.user.nama_depan + " " + this.props.user.nama_belakang,
        agree: "Y",
        agreement6: "Y",
		file: this.props.dataAkunBank.file
          ? this.props.dataAkunBank.file
          : "",
      };
      await this.props.onSaveAkunBank(saveData);
      
	}
      
  };

  handleChangeAkunBank(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    if (name === "agreement6") {
      value = evt.target.checked ? "Y" : "N";
    }
	if(name === "file"){
		value = evt.target.files[0];
	}
    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsAkunBank(dt);
    this.setState({
      ...this.state,
      errMsg6: {
        ...this.state.errMsg6,
        [name]: "",
      },
    });
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }
  
	handleCloseSwal() {        
        this.props.closeSwal();
		 this.props.history.push("/bank-accounts");
    }
	
	deleteRecord(record) {
    this.setState({
      dokumen_id: record,
    });
    this.props.showConfirmDel(true);
  }

  render() {
    const { user, dataAkunBank, dataBank } = this.props;
    const { errMsg6 } = this.state;
    return (
      <div className="content-wrapper pr-1">
        <section className="content">
          <div className="container-fluid mt-3">
            <img src={icon} width="35px" className="float-left mt-3" />

            <div className="mobile-hide">
              <h1
                style={{
                  marginBottom: 10,
                  fontSize: 30,
                  marginLeft: 20,
                  color: "#2E2E2F",
                  paddingLeft: "20px",
                }}
              >
                &nbsp;Akun Bank Saya
              </h1>
            </div>

            <div className="mobile-view">
              <h1
                style={{
                  marginBottom: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  color: "#2E2E2F",
                  paddingLeft: "20px",
                }}
              >
                &nbsp;Akun Bank Saya
              </h1>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg w-[100%] lg:w-[100%]"
                  style={{ minHeight: "500px", borderRadius: "20px" }}
                >
                  <div className="card-body">
                    <div style={{ paddingTop: 0 }} className="px-0 lg:px-3">
                      <div className="row my-0 mx-0">
                        <Fragment>
                          <Form>
                            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                              <div className="mobile-hide ">
                                <div className="grid grid-cols-1 py-4">
                                  <div>
                                    <span
                                      className="text-2xl label_ijo"
                                      style={{
                                        fontSize: "28px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Detil Bank
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mobile-view ">
                                <div className="grid grid-cols-1 py-4">
                                  <div>
                                    <span
                                      className="text-2xl label_ijo"
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Detil Bank
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="nama_pemilik"
                                >
                                  <Form.Control
                                    disabled
                                    value={
                                      user.nama_depan
                                        ? user.nama_depan +
                                          " " +
                                          user.nama_belakang
                                        : ""
                                    }
                                    autoComplete="off"
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    size="lg"
                                    name="nama_pemilik"
                                    type="text"
                                    required
                                    placeholder="Nama Pemilik Rekening"
                                  />
                                  {errMsg6.nama_pemilik ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.nama_pemilik}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>

                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="bank_id"
                                >
                                  <Form.Control
                                    name="bank_id"
                                    size="lg"
                                    value={
                                      dataAkunBank.bank_id
                                        ? dataAkunBank.bank_id
                                        : ""
                                    }
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    as="select"
                                  >
                                    <option value="">Nama Bank</option>
                                    {dataBank
                                      ? dataBank.map(function (bnk) {
                                          return (
                                            <option
                                              value={bnk.bank_id}
                                              key={bnk.bank_id}
                                            >
                                              {bnk.nama_bank}
                                            </option>
                                          );
                                        })
                                      : ""}
                                  </Form.Control>
                                  {errMsg6.bank ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.bank}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>
                                
                              </Form.Row>

                              <Form.Row>
                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="no_rek"
                                >
                                  <NumberFormat
                                    value={
                                      dataAkunBank.no_rek
                                        ? dataAkunBank.no_rek
                                        : ""
                                    }
                                    autoComplete="off"
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    className="form-control form-control-lg"
                                    size="lg"
                                    name="no_rek"
                                    thousandSeparator={false}
                                    decimalScale={0}
                                    inputMode="numeric"
                                    placeholder="Nomor Rekening Bank"
                                  />
                                  {errMsg6.no_rek ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.no_rek}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>

                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="cabang"
                                >
                                 

                                  <Form.Control
                                    value={
                                      dataAkunBank.cabang
                                        ? dataAkunBank.cabang
                                        : ""
                                    }
                                    autoComplete="off"
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    size="lg"
                                    name="cabang"
                                    type="text"
                                    required
                                    placeholder="Cabang"
                                  />
                                  {errMsg6.cabang ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.cabang}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>

                               
                              </Form.Row>
                              
							  
							  <Form.Row>
                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="file"
                                >
								<h5
                                      style={{
                                        marginBottom: ".5rem",
                                        marginTop: ".8rem",
                                      }}
                                    >
                                      Buku Tabungan
                                    </h5>
                                  <Form.File
                                          className=""
                                          size="lg"
                                          name="file"
                                          setfieldvalue=""
                                          onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                        ></Form.File>
                                  {errMsg6.file ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.file}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>

                               
                              </Form.Row>
                                    <Form.Row style={{marginLeft:0}}>
                                    <h5
                                      style={{
                                        marginBottom: ".5rem",
                                        marginTop: ".8rem",
                                      }}
                                    >
                                      Jenis akun
                                    </h5>
                                    </Form.Row>
                              <Form.Row style={{marginLeft:0}}>
                               
                           
                               
                                  <Form.Check
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    inline
                                    checked={
                                      dataAkunBank.jenis_akun_bank === "Giro"
                                        ? "checked"
                                        : ""
                                    }
                                    value="Giro"
                                    type="radio"
                                    id="jenis_akun_bank_giro"
                                    name="jenis_akun_bank"
                                    label="Giro"
                                  />
                                  <Form.Check
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    inline
                                    value="Rekening tabungan"
                                    type="radio"
                                    checked={
                                      dataAkunBank.jenis_akun_bank ===
                                      "Rekening tabungan"
                                        ? "checked"
                                        : ""
                                    }
                                    id="jenis_akun_bank_tabungan"
                                    name="jenis_akun_bank"
                                    label="Rekening tabungan"
                                  />
                                  <Form.Check
                                    onChange={this.handleChangeAkunBank.bind(
                                      this
                                    )}
                                    inline
                                    value="Lainnya"
                                    type="radio"
                                    checked={
                                      dataAkunBank.jenis_akun_bank === "Lainnya"
                                        ? "checked"
                                        : ""
                                    }
                                    id="jenis_akun_bank_lainnya"
                                    name="jenis_akun_bank"
                                    label="Lainnya"
                                  />
                                  {errMsg6.jenis_akun_bank ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg6.jenis_akun_bank}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                              </Form.Row>
                            </div>
                            <div
                              className="container__box p-4"
                              style={{
                                backgroundColor: "#fbfbfd",
                                margin: "1em -1.5em -1.5em",
                              }}
                            >
                              <div className="form-group">
                                <div className="grid grid-cols-1 place-items-center">
                                  <div className="form-group lg:w-2/3">
                                    <div className="form-check">
                                      <label>
                                        <input
                                          checked={
                                            dataAkunBank.agreement6 === "Y"
                                              ? true
                                              : false
                                          }
                                          onChange={this.handleChangeAkunBank.bind(
                                            this
                                          )}
                                          value={"Y"}
                                          className="form-check-input"
                                          type="checkbox"
                                          name="agreement6"
                                        />
                                        <div className="form-check-text">
                                          Dengan mencentang kotak ini, saya
                                          dengan ini mengakui bahwa semua
                                          informasi dan dokumen yang disediakan
                                          dalam aplikasi online untuk pembukaan
                                          akun transaksi adalah benar dan
                                          valid. Saya dengan ini bertanggung
                                          jawab penuh atas setiap kerusakan /
                                          kerugian di masa depan sebagai akibat
                                          dari informasi palsu dari dokumen yang
                                          saya sediakan.
                                        </div>
                                      </label>
                                      {errMsg6.agreement6 ? (
                                        <span className="text-error badge badge-danger">
                                          {errMsg6.agreement6}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>

                                    <div className="grid grid-cols-1 place-items-center">
                                      <div className="form-group lg:w-[50%] text-center mt-4">
                                        <label>
                                          <span className="text-gray-700">
                                            Dengan mendaftar, saya menyetujui
                                          </span>{" "}
                                          <br />
                                          <span className="text-black font-extrabold">
                                            Syarat dan ketentuan
                                          </span>{" "}
                                          <span className="text-gray-700">
                                            serta
                                          </span>{" "}
                                          <span className="label_merah font-extrabold">
                                            Kebijakan Privasi
                                          </span>
                                        </label>
                                      </div>

                                      <div className="form-group w-[100%] lg:w-[40%] text-center">
                                        <AppButton
                                          onClick={this.handleSubmit6.bind(
                                            this,
                                           
                                          )}
                                          type="button"
                                          size="lg"
                                          theme=""
                                          style={{
                                            backgroundColor: "#28a745",
                                            color: "#fff",
                                            marginRight: "2%",
                                          }}
                                        >
                                          Simpan
                                        </AppButton>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form>
                        </Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
  dataBank: state.personal.dataBank || [],
  dataAkunBank: state.personal.dataAkunBank || {},
  contentMsg: state.personal.contentMsg || null,
  showFormSuccess: state.personal.showFormSuccess,
  tipeSWAL: state.personal.tipeSWAL,
  isLoading: state.personal.isFetching,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getBank());
    },
    changePropsAkunBank: (data) => {
      dispatch(chgPropsAkunBank(data));
    },
    onSaveAkunBank: async (param) => {
      dispatch(profileUser());
      await dispatch(simpanAkunBank(param));
    },
    closeSwal: () => {
      dispatch(closeSwal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToPros)(AddBank);
