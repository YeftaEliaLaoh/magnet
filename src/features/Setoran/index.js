import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AppButton from "../../components/button/Button";
import {
  getBankCompany,
  getAkunTrading,
  actionSetor,
  closeForm,
  getHistorySetor,
} from "../Setoran/setoranSlice";
import { profileUser } from "../main/mainSlice";
import AppModal from "../../components/modal/MyModal";
import NumberFormat from "react-number-format";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";
import moment from "moment";
import "moment/locale/id";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import ReactDatatable from "@ashvin27/react-datatable";
import icon from "../../assets/setoran_ijo.svg";

import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';

var yesterday = moment();
var valid_startDate = function (current) {
  return current.isBefore(yesterday);
};

class Setoran extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      login: "",
      phonepass: "",
      setor: "",
      akun_trading: "",
      img: "",
      jml_setor: "",
    };
    this.state = {
      validSd: valid_startDate,
      validEd: valid_startDate,
      lastSegmentUrl: "",
      formMT5: false,
      nextStep: false,
      nextStep1: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
      start_date: moment().subtract(1, "month").format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      start: 1,
      limit: 10,
      search: "",
    };
  }

  componentDidMount = async () => {
    const queryString =
      "?search&limit=" +
      this.state.limit +
      "&start=" +
      (this.state.start - 1) +
      "&start_date=" +
      this.state.start_date +
      "&end_date=" +
      this.state.end_date;
    this.props.onLoad();
    this.props.onLoadHistory(queryString);
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };

  editRecord = (record) => {
    this.setState({
      formMT5: true,
      nextStep: false,
      loadingForm: false,
      errMsg: this.initSelected,
      selected: {
        ...this.state.selected,
        ...record,
        bank_perusahaan: record.data_bank_perusahaan_id,
      },
    });
  };

  onClickRow = (record) => {
    let val = this.state.selected.setor ? this.state.selected.setor : 0;
    let rate = record.rate > 0 ? record.rate : 1;
    this.setState({
      errMsg: {},
      selected: {
        ...this.state.selected,
        ...record,
        akun_trading: record.login,
        jml_setor: val * rate,
      },
    });
  };

  handleNext = () => {
    var errors = this.state.errMsg;
    if (this.state.nextStep) {
      errors.setor = !this.state.selected.setor ? "Harus diisi!" : "";
      errors.setor = errors.setor === '' &&  parseInt(this.state.selected.setor) <= 0 ? "Jumlah setor harus lebih besar dari 0" : errors.setor;
      errors.img = !this.state.selected.img ? "Harus diisi!" : '';
      if (this.state.selected.img) {
        var fileSize = this.state.selected.img.size;
        if (fileSize > 2099200) {
          // satuan bytes 2099200 => 2MB
          errors.img = "File size over 2MB";
        }
      }
	  this.setState({
        selected: {...this.state.selected,jml_setor: parseFloat(this.state.selected.setor).toFixed(2) * this.state.selected.rate }
      });
	  
	  
    }
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
		
      this.setState({
        nextStep: true,
        nextStep1: this.state.nextStep ? true : this.state.nextStep1		
      });
    } else {
      console.error("Invalid Form");
    }
  };

  handleBack = () => {
	   var errors = this.state.errMsg;
    this.setState({
      nextStep: this.state.nextStep1 ? true : false,
      nextStep1: false,
	  errMsg: {},
	  errors: {},
    });
  };

  handleClose = () => {
    this.setState({
      errMsg: {},
      selected: this.initSelected,
      loadingForm: false,
      nextStep1: false,
      nextStep: false,
      formMT5: false,
    });
  };

  handleSubmit() {
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    this.props.onSetor(this.state.selected);
  }

  handleChange(event) {
    const { name, value } = event.target;
    var val = value;
    this.setState({ errMsg: this.initSelected });

    if (event.target.name === "img") {
      val = event.target.files[0];
      this.setState({
        selected: { ...this.state.selected, imgUpload: "", img: "" },
      });
      if (!val) return;
      if (!val.name.match(/\.(jpg|jpeg|png)$/)) {
        this.setState({
          loadingForm: true,
          errMsg: {
            ...this.state.errMsg,
            img: "Please select valid image(.jpg .jpeg .png)",
          },
        });

        //setLoading(true);
        return;
      }
      if (val.size > 2099200) {
        this.setState({
          loadingForm: true,
          errMsg: { ...this.state.errMsg, img: "File size over 2MB" },
        });

        //setLoading(true);
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(val);
      reader.onloadend = () => {
        this.setState({
          loadingForm: false,
          selected: {
            ...this.state.selected,
            imgUpload: reader.result,
            file: val,
          },
        });
      };
    }

    this.setState({
      selected: {
        ...this.state.selected,
        [name]: val,
      },
    });
	
	if (name === "jml_setor") {
      let rate = this.state.selected.rate > 0 ? this.state.selected.rate : 1;
	  const myArray = val.split(",");		
		if(myArray.length > 0){
			val ='';
			for(var i=0;i<myArray.length;i++){
			  val +=myArray[i];
			}
		}
      this.setState({
        loadingForm: false,
        selected: { ...this.state.selected, setor: (val / rate).toFixed(2), jml_setor: val },
      });
    }
    if (name === "setor") {
      let rate = this.state.selected.rate > 0 ? this.state.selected.rate : 1;
      this.setState({
        loadingForm: false,
        selected: { ...this.state.selected, jml_setor: val * rate, setor: val },
      });
    }
  }

  handleSearch(event) {
    this.setState({
      ...this.state,
      search: event.target.value,
    });
    const queryString =
      "?search=" +
      event.target.value +
      "&limit=" +
      this.state.limit +
      "&start=" +
      (this.state.start - 1) +
      "&start_date=" +
      this.state.start_date +
      "&end_date=" +
      this.state.end_date;
    this.props.onLoadHistory(queryString);
  }

  validateForm(errors) {    
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  handleCloseSwal() {
    this.setState({
      errMsg: {},
      selected: this.initSelected,
      loadingForm: false,
      nextStep1: false,
      nextStep: false,
      formMT5: false,
    });
    this.props.closeSwalError();
  }

  handleChangeEndDate(date) {
    const selectedDate = new Date(date);
    const _date = moment(selectedDate).format("YYYY-MM-DD");
    this.setState({ end_date: _date });
    const queryString =
      "?search=" +
      this.state.limit +
      "&limit=" +
      this.state.limit +
      "&start=" +
      (this.state.start - 1) +
      "&start_date=" +
      this.state.start_date +
      "&end_date=" +
      _date;
    this.props.onLoadHistory(queryString);
  }

  handleChangeStartDate(date) {
    const selectedDate = new Date(date);
    const _date = moment(selectedDate).format("YYYY-MM-DD");
    this.setState({ start_date: _date });
    const queryString =
      "?search=" +
      this.state.search +
      "&limit=" +
      this.state.limit +
      "&start=" +
      (this.state.start - 1) +
      "&start_date=" +
      _date +
      "&end_date=" +
      this.state.end_date;
    this.props.onLoadHistory(queryString);
  }

  tableChangeHandler = (data) => {
    let queryString = this.state;
    Object.keys(data).map((key) => {
      if (key === "sort_order" && data[key]) {
        queryString.sort_order = data[key].order;
        queryString.sort_column = data[key].column;
      }
      if (key === "page_number") {
        queryString.start = data[key];
      }
      if (key === "page_size") {
        queryString.limit = data[key];
      }

      return true;
    });
    const Qs =
      "?search=" +
      this.state.search +
      "&limit=" +
      this.state.limit +
      "&start=" +
      (this.state.start - 1) +
      "&start_date=" +
      this.state.start_date +
      "&end_date=" +
      this.state.end_date;
    this.props.onLoadHistory(Qs);
  };

  render() {
    const { data_bank, akun_trading, data_history } = this.props;
    const { selected, errMsg } = this.state;
    const myRate = selected.rate === "0" ? 1 : selected.rate;

    const contentNext = (
      <Fragment>
        <div className="modal-box mb-1">
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <div className="form-group">
                  <div>
                    <strong className="text-black">
                      {selected.nama_bank} CAB. {selected.cabang}, A/N.{" "}
                      {selected.atas_nama}
                    </strong>
                  </div>
                  <div>
                    No. Acc. :{" "}
                    <strong className="font-weight-bold text-black">
                      {" "}
                      {selected.no_rek}
                    </strong>
                  </div>
                  <div>
                    No. Acc. USD :{" "}
                    <strong className="font-weight-bold text-black">
                      {" "}
                      {selected.no_rek_usd}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.nextStep1 ? (
            <Fragment>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-group">
                      <label>Rate</label>
                      <div>
                        <strong
                          className="font-weight-bold text-black"
                          data-binder="rate"
                          id="divid-rate"
                        >
						{(selected.rate > 0 || selected.rate > '0') &&
                          <NumberFormat
                            value={selected.rate > 0 ? selected.rate : "0.00"}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={"text"}
                          />
						}
						{(selected.rate === 0 || selected.rate === "0") && 'USD'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-group">
                      <div>
                        <label>Jumlah Setor (USD)</label>
                      </div>
                      <div>
                        <strong className="font-weight-bold text-black">
                          <NumberFormat
                            value={selected.setor > 0 ? selected.setor : "0.00"}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={"text"}
                          />
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-group">
                      <label>Jumlah Setor</label>
                      <div>
                        <strong
                          className="font-weight-bold text-black"
                          data-binder="rate"
                        >
                          {selected.rate > "0" ? "IDR" : "USD"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
				
				{(selected.rate > "0" || selected.rate > 0) && (
                <div className="col-sm-10">
                  <div className="form-group">
                    <div className="form-group">
                      <div>
                        <label>Jumlah Setor (IDR)</label>
                      </div>
                      <div>
                        <strong className="font-weight-bold text-black">
                          {selected.jml_setor ? (
                            <NumberFormat
                              value={selected.jml_setor}
                              thousandSeparator={true}
                              decimalScale={2}
                              displayType={"text"}
                            />
                          ) : (
                            ""
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>)}
				
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </div>
        {!this.state.nextStep1 ? (
          <div className="modal-box mb-1">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Login</label>
                    <div>
                      <strong className="font-weight-bold text-black">
                        {selected.login}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Nama</label>
                    <div>
                      <strong className="font-weight-bold text-black">
                        {selected.name}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Free Margin</label>
                    <div>
                      <strong className="font-weight-bold text-black">
                        <NumberFormat
                          value={
                            selected.margin_free > 0
                              ? selected.margin_free
                              : "0.00"
                          }
                          thousandSeparator={true}
                          decimalScale={2}
                          displayType={"text"}
                        />
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Equity</label>
                    <div>
                      <strong className="font-weight-bold text-black">
                        <NumberFormat
                          value={selected.equity > 0 ? selected.equity : "0.00"}
                          thousandSeparator={true}
                          decimalScale={2}
                          displayType={"text"}
                        />
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Rate</label>
					
                    <div>
                      <strong className="font-weight-bold text-black">
						{selected.rate > 0 &&
                        <NumberFormat
                          value={selected.rate > 0 ? selected.rate : "0.00"}
                          thousandSeparator={true}
                          decimalScale={2}
                          displayType={"text"}
                        />}
						{selected.rate === 0 || selected.rate === '0' && 'USD' }
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-10">
                <div className="form-group">
                  <div className="form-group mb-1">
                    <label className="frm_lbl">Jumlah Setor (USD)</label>
                   

                      <div className="flex flex-row">
                        <div className="flex justify-center items-center" style={{width:'35px',height:'33.5px',border: "1px solid #ced4da",background:"#e9ecef",borderRight:0}}>&#36;</div>
                      <input
                        style={{borderRadius:0}}
                        name="setor"
                        value={selected.setor}
                        onChange={this.handleChange.bind(this)}
                        type="number"
                        className="form-control"
                      />
					  
                    </div>
					{errMsg.setor ? (
                      <span className="float-right text-error badge badge-danger">
                        {errMsg.setor}
                      </span>
                    ) : null}
                  </div>
                  
                </div>
              </div>
            </div>

            {selected.rate !== "0" && (
              <div className="row">
                <div className="col-sm-10">
                  <div className="form-group">
                    <div className="form-group">
                      <label className="frm_lbl">Jumlah Setor (IDR)</label>
                      <div className="flex flex-row">
                        <div className="flex justify-center items-center" style={{width:'35px',height:'29.5px',border: "1px solid #ced4da",background:"#e9ecef",borderRight:0}}>Rp</div>
                        <NumberFormat
                          style={{borderRadius:0}}
                          
                          name="jml_setor"
                          className="form-control form-control-sm"
                          value={
                            selected.jml_setor ? selected.jml_setor : ""
                          }
						  onChange={this.handleChange.bind(this)}
                          thousandSeparator={true}
                          decimalScale={2}
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="Jumlah Setor"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <div className="form-group">
                    <label className="frm_lbl">Unggah Bukti Transfer</label>
                    {errMsg.img ? (
                      <span className="float-right text-error badge badge-danger">
                        {errMsg.img}
                      </span>
                    ) : null}
                    <div>
                      <input
                        style={{ padding: "0.2rem 1rem" }}
                        setfieldvalue={selected.img ? selected.img.name : ""}
                        type="file"
                        name="img"
                        onChange={this.handleChange.bind(this)}
                        className="form-control"
                      />
                      {selected.img ? (
                        <em>
                          <strong>Filename : {selected.img.name}</strong>
                        </em>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );

    const contentDelete = (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>-</th>
              <th>Login</th>

              <th style={{ textAlign: "right" }}>Free Margin</th>
              <th style={{ textAlign: "right" }}>Equity</th>
              <th style={{ textAlign: "right" }}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {akun_trading
              ? akun_trading.map((at, index) => {
                  return (
                    <Fragment key={index}>
                      <tr
                        onClick={(e) => this.onClickRow(at)}
                        className={
                          this.state.selected.login === at.login
                            ? "active-row"
                            : ""
                        }
                      >
                        <td>
                          <input
                            type="radio"
                            onChange={(e) => this.onClickRow(at)}
                            checked={
                              this.state.selected.login === at.login
                                ? true
                                : false
                            }
                            name="account-selection"
                            value={at.login}
                          />
                        </td>
                        <td>{at.login}</td>

                        <td align="right">
                          <NumberFormat
                            value={at.margin_free > 0 ? at.margin_free : "0.00"}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={"text"}
                          />
                        </td>
                        <td align="right">
                          <NumberFormat
                            value={at.equity > 0 ? at.equity : "0.00"}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={"text"}
                          />
                        </td>
                        <td align="right">{at.rate === 0 || at.rate === '0' ? 'USD' : at.rate}</td>
                      </tr>
                    </Fragment>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    );
    const columns = [
      {
        key: "akun_trading_id",
        text: "No. Akun",
        width: 100,
        align: "center",
        sortable: true,
      },
      {
        key: "-",
        text: "Waktu Penyetoran",
        width: 150,
        align: "center",
        sortable: true,
		cell: (record) => {
					return moment(new Date(record.created_at)).format("DD-MM-YYYY HH:mm");	
				}	
      },
      {
        key: "rate",
        text: "Rate",
        align: "center",
        width: 100,
        sortable: true,
		cell: (record) => {
          return (
		  
            <div style={{ textAlign: "right" }}>
			{record.rate > 0 || record.rate > '0' ? record.rate : 'USD'}
            </div>
          );
        },
      },
      {
        key: "setor",
        text: "Setor",
        align: "center",
        width: 100,
        sortable: true,
        cell: (record) => {
          return (
            <div style={{ textAlign: "right" }}>
              <Fragment>
                <NumberFormat
                  value={record.setor}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
              </Fragment>
            </div>
          );
        },
      },
      {
        key: "status",
        text: "Status",
        align: "center",
        width: 170,
        sortable: true,
      },
      {
        key: "keterangan",
        text: "Keterangan",
        align: "center",
        sortable: true,
      },
    ];

    const columns_mobile = [
      {
        key: "akun_trading_id",
        text: "No. Akun",
        width: 100,
        align: "center",
        sortable: true,
      },
      {
        key: "-",
        text: "Waktu",
        width: 150,
        align: "center",
        sortable: true,
      },
      {
        key: "rate",
        text: "Rate",
        align: "center",
        width: 100,
        sortable: true,
      },
      {
        key: "setor",
        text: "Setor",
        align: "center",
        width: 100,
        sortable: true,
        cell: (record) => {
          return (
            <div style={{ textAlign: "right" }}>
              <Fragment>
                <NumberFormat
                  value={record.setor}
                  thousandSeparator={true}
                  decimalScale={2}
                  displayType={"text"}
                />
              </Fragment>
            </div>
          );
        },
      },
      {
        key: "status",
        text: "Status",
        align: "center",
        width: 170,
        sortable: true,
      },
    ];

    const config = {
      key_column: "file_bukti_setor",
      page_size: 10,
      length_menu: [10, 20, 50],
      show_filter: false,
      show_length_menu: false,
      show_pagination: true,
      pagination: "advance",
      button: {
        excel: false,
        print: false,
      },
      language: {
        loading_text: "Please be patient while data loads...",
      },
    };
    return (
      <div className="content-wrapper pr-1">
        <section className="content">
          <div className="container-fluid">
            <div className="mobile-hide">
              <h1
                style={{
                  marginBottom: 10,
                  fontSize: 30,
                  color: "#2E2E2F",
                }}
              >
                <CreditCardPlusIcon size="35px" className="label_ijo"/>&nbsp;Setor Dana
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
                <CreditCardPlusIcon size="35px" className="label_ijo"/>&nbsp;Setor Dana
              </h1>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg"
                  style={{ minHeight: "500px", borderRadius: "20px" }}
                >
                  <div className="card-body">
                    <div style={{ paddingTop: 5 }} className="px-0">
                      <div className="my-4 mx-1">
                        {data_bank
                          ? data_bank.map((dp, index, arr) => {
                              return (
                                <Fragment key={dp.data_bank_perusahaan_id}>
                                  <div
                                    className="grid grid-cols-1 lg:grid-cols-3 place-items-center py-4 px-4 rounded-2xl border-gray-700 mt-4"
                                    style={{ border: "2px solid #ddd" }}
                                    onClick={(e) => this.editRecord(dp)}
                                  >
                                    <div className="px-2">
                                      <img
                                        alt={dp.nama_bank}
                                        width="150px"
                                        src={dp.file}
                                      />
                                    </div>

                                    <div className=" mt-4 mb-3 text-center w-full">
                                      <AppButton
                                        onClick={(e) => this.editRecord(dp)}
                                        style={{
                                          color: "#ffffff",
                                          marginTop: 25,
                                          minHeight: 50,
                                          backgroundColor: "#C3262A",
                                          color: "#fff",
                                        }}
                                        className="w-1/2 md:w-3/4 lg:w-3/4"
                                        type="button"
                                        size="lg"
                                        theme=""
                                      >
                                        Setor Melalui Bank {dp.nama_bank}
                                      </AppButton>
                                    </div>

                                    <div
                                      className="px-2"
                                      style={{
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        marginTop: 15,
                                        color: "#2E2E2F"
                                      }}
                                    >
                                      <div>
                                        {dp.nama_bank} CAB. {dp.cabang}, A/N.{" "}
                                        {dp.atas_nama}
                                      </div>
                                      <div className="flex flex-row">
                                        <span>No. Acc IDR :{" "}</span>
                                        <strong>{dp.no_rek}</strong>
                                      </div>
                                      <div className="flex flex-row">
                                        <span>No. Acc USD :{" "}</span>
                                        <strong>{dp.no_rek_usd}</strong>
                                      </div>
                                      <div className="mt-3">
                                        <p className="text-red-500">*Cantumkan no login MT5 kamu pada kolom berita</p>
                                      </div>
                                    </div>
                                  </div>

                                  {index === arr.length - 1 ? "" : ""}
                                </Fragment>
                              );
                            })
                          : ""}
                      </div>

                      <div className="mobile-hide">
                        <h3 style={{ color: "#2E2E2F" }}>Daftar Setoran</h3>
                      </div>
                      <div className="mobile-view">
                        <h3 style={{ color: "#2E2E2F", fontSize: "20px" }}>
                          Daftar Setoran
                        </h3>
                      </div>

                      <div className="row mt-3 mb-4">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="pull-left col-12 col-md-4 pl-0">
                              <label style={{ color: "#2E2E2F" }}>
                                Tanggal: Awal
                              </label>
                              <Datetime
                                closeOnSelect={true}
                                timeFormat={false}
                                setViewDate={moment(
                                  this.state.start_date
                                ).format("DD/MM/YYYY")}
                                value={moment(this.state.start_date).format(
                                  "DD/MM/YYYY"
                                )}
                                onChange={this.handleChangeStartDate.bind(this)}
                                inputProps={{
                                  readOnly: true,
                                  autoComplete: "off",
                                  placeholder: "Tanggal Awal",
                                  name: "start_date",
                                  className: "form-control form-control-lg",
                                }}
                                locale="id"
                                isValidDate={this.state.validSd}
                              />
                            </div>
                            <div className="pull-left col-12 col-md-4 pl-0">
                              <label style={{ color: "#2E2E2F" }}>
                                Tanggal: Akhir
                              </label>
                              <Datetime
                                closeOnSelect={true}
                                timeFormat={false}
                                setViewDate={moment(this.state.end_date).format(
                                  "DD/MM/YYYY"
                                )}
                                value={moment(this.state.end_date).format(
                                  "DD/MM/YYYY"
                                )}
                                onChange={this.handleChangeEndDate.bind(this)}
                                inputProps={{
                                  readOnly: true,
                                  autoComplete: "off",
                                  placeholder: "Tanggal Awal",
                                  name: "end_date",
                                  className: "form-control form-control-lg",
                                }}
                                locale="id"
                                isValidDate={this.state.validSd}
                              />
                            </div>
                            <div className="pull-left col-7 mt-2 pl-0">
                              <label style={{ color: "#2E2E2F" }}>Cari</label>
                            </div>
                            <div className="pull-left col-7 pl-0">
                              <input
                                name="search"
                                value={this.state.search}
                                onChange={this.handleSearch.bind(this)}
                                type="text"
                                placeholder="cari nomor akun atau jumlah setor"
                                className="form-control form-control-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mobile-hide">
                        {data_history ? (
                          <ReactDatatable
                            config={config}
                            records={data_history}
                            columns={columns}
                            dynamic={true}
                            onChange={this.tableChangeHandler}
                            loading={this.props.isLoading}
                            total_record={this.props.totalData}
                          />
                        ) : (
                          <p>No Data ...</p>
                        )}
                      </div>

                      <div className="mobile-view">
                        {data_history ? (
                          <ReactDatatable
                            config={config}
                            records={data_history}
                            columns={columns_mobile}
                            dynamic={true}
                            onChange={this.tableChangeHandler}
                            loading={this.props.isLoading}
                            total_record={this.props.totalData}
                          />
                        ) : (
                          <p>No Data ...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppModal
          show={this.state.formMT5}
          size={this.state.nextStep ? "xs" : "xs"}
          form={this.state.nextStep ? contentNext : contentDelete}
          handleClose={this.handleClose}
          handleBack={this.state.nextStep ? this.handleBack : this.handleClose}
          titleClose={this.state.nextStep ? "Kembali" : "Tutup"}
          backdrop="static"
          keyboard={false}
          title={this.state.nextStep ? "Transfer Bank" : "Akun Trading MT5"}
          titleButton={this.state.nextStep1 ? "Submit" : "Selanjutnya"}
          themeButton="success"
          isDisable={this.state.selected.login ? false : true}
          isLoading={this.state.loadingForm}
          formSubmit={
            this.state.nextStep1
              ? this.handleSubmit.bind(this)
              : this.handleNext.bind(this)
          }
        ></AppModal>
        {this.props.showFormSuccess ? (
          <AppSwalSuccess
            show={this.props.showFormSuccess}
            title={
              <div
                dangerouslySetInnerHTML={{ __html: this.props.contentMsg }}
              />
            }
            type={this.props.tipeSWAL}
            handleClose={this.handleCloseSwal.bind(this)}
          ></AppSwalSuccess>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data_bank: state.setoran.dataBank || [],
  akun_trading: state.setoran.akunTrading || [],
  data_history: state.setoran.dataHistory || [],
  totalData: state.setoran.totalData,
  contentMsg: state.setoran.contentMsg || null,
  showFormSuccess: state.setoran.showFormSuccess,
  tipeSWAL: state.setoran.tipeSWAL,
  isLoading: state.setoran.isFetching,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getBankCompany());
      dispatch(getAkunTrading());
    },
    onLoadHistory: (param) => {
      dispatch(getHistorySetor(param));
    },
    onSetor: (param) => {
      dispatch(profileUser());
      dispatch(actionSetor(param));
    },
    closeSwalError: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Setoran);
