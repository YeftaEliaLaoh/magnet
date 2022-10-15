import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { getBankAkun, getAkunTrading, actionPenarikan, closeForm, getHistorySetor } from '../Penarikan/penarikanSlice';
import { profileUser } from '../main/mainSlice';
import AppModal from '../../components/modal/MyModal';
import NumberFormat from 'react-number-format';
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import moment from 'moment';
import "moment/locale/id";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import ReactDatatable from '@ashvin27/react-datatable';
import icon from '../../assets/penarikan_ijo.svg';
import CreditCardMinusIcon from '@rsuite/icons/CreditCardMinus';

var yesterday = moment();
var valid_startDate = function (current) {
    return current.isBefore(yesterday);
};

class Penarikan extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            nominal: '',
            akun_trading: '',
            akun_bank: '',
            penarikan_dana_id: '',
			jml_nominal:''
        }
        this.state = {
            validSd: valid_startDate,
            validEd: valid_startDate,
            formMT5: false,
            nextStep: false,
            nextStep1: false,
            selected: this.initSelected,
            errMsg: this.initSelected,
            start_date: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            end_date: moment().format('YYYY-MM-DD'),
            start: 1,
            limit: 10,
            search: ''
        }
    }

    componentDidMount = async () => {
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoad();
        this.props.onLoadHistory(queryString);
    }

    editRecord = (record) => {
        this.setState({
            formMT5: true,
            nextStep: false,
            loadingForm: false,
            errMsg: this.initSelected,
            selected: {
                ...this.state.selected,
                ...record,
                akun_bank: record.akun_bank_id
            }
        });

    }

    onClickRow = (record) => {
		let val = this.state.selected.nominal ? this.state.selected.nominal : 0;
		let rate = record.rate > 0 ? record.rate : 1;
        this.setState({
            errMsg: this.initSelected,
            selected: {
                ...this.state.selected,
                ...record,
                akun_trading: record.login,
				jml_nominal: val * rate,
            }
        });
    }

    handleNext = () => {
        var errors = this.state.errMsg;
        if (this.state.nextStep) {
            errors.nominal = !this.state.selected.nominal ? "Required" : '';
			errors.nominal = errors.nominal === '' &&  parseInt(this.state.selected.nominal) <= 0 ? "Jumlah penarikan dana harus lebih besar dari 0" : errors.nominal;
        }
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg)) {
            this.setState({
                nextStep: true,
                nextStep1: this.state.nextStep ? true : this.state.nextStep1,
            });
        } else {
            console.error('Invalid Form')
        }

    }

    handleBack = () => {
        this.setState({
            nextStep: this.state.nextStep1 ? true : false,
            nextStep1: false,
        });

    }

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
        var errors = this.state.errMsg;
        errors.nominal = !this.state.selected.nominal ? "Required" : '';
		errors.nominal = errors.nominal === '' &&  parseInt(this.state.selected.nominal) <= 0 ? "Jumlah penarikan dana harus lebih besar dari 0" : errors.nominal;
        this.setState({ errors });
        if (this.validateForm(this.state.errors)) {
            this.setState({
                ...this.state,
                loadingForm: true,
            });
            //console.log(this.state.selected);
            this.props.onSetor(this.state.selected);
        } else {
            console.error('Invalid Form')
        }

    }

    handleChange(event) {
        const { name, value } = event.target
        var val = value;
        this.setState({ errMsg: this.initSelected });

        if (event.target.name === "img") {
            val = event.target.files[0];
            this.setState({ selected: { ...this.state.selected, imgUpload: "", img: "" } });
            if (!val) return;
            if (!val.name.match(/\.(jpg|jpeg|png)$/)) {
                this.setState({ loadingForm: true, errMsg: { ...this.state.errMsg, img: "Please select valid image(.jpg .jpeg .png)" } });

                //setLoading(true);
                return;
            }
            if (val.size > 2099200) {
                this.setState({ loadingForm: true, errMsg: { ...this.state.errMsg, img: "File size over 2MB" } });

                //setLoading(true);
                return;
            }
            let reader = new FileReader();
            reader.readAsDataURL(val);
            reader.onloadend = () => {
                this.setState({ loadingForm: false, selected: { ...this.state.selected, imgUpload: reader.result, file: val } });
            };
        }
        this.setState({
            selected: {
                ...this.state.selected,
                [name]: val
            }
        });
		if (name === "nominal") {
		  let rate = this.state.selected.rate > 0 ? this.state.selected.rate : 1;
		  this.setState({
			loadingForm: false,
			selected: { ...this.state.selected, jml_nominal: val * rate, nominal: val },
		  });
		}
    }

    handleSearch(event) {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
        const queryString = "?search=" + event.target.value + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(queryString);
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
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
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(queryString);
    }

    handleChangeEndDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({ end_date: _date })
        const queryString = "?search=" + this.state.limit + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + _date;
        this.props.onLoadHistory(queryString);
    }

    handleChangeStartDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({ start_date: _date });
        const queryString = "?search=" + this.state.search + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + _date + "&end_date=" + this.state.end_date;
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

        const Qs = "?search=" + this.state.search + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(Qs);
    }

    render() {

        const { data_bank, akun_trading, data_history } = this.props;
        const { selected, errMsg } = this.state;

        const contentNext = <Fragment>
            {!this.state.nextStep1 ? (
                <div className="modal-box mb-1">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <div className="form-group">
                                    <label className="frm_lbl">Login</label>
                                    <div>
                                        <strong className="font-weight-bold text-black">{selected.login}</strong>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <div className="form-group">
                                    <label className="frm_lbl">Nama</label>
                                    <div>
                                        <strong className="font-weight-bold text-black">{selected.name}</strong>
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
                                                value={selected.margin_free > 0 ? selected.margin_free : '0.00'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                displayType={'text'}
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
                                                value={selected.equity > 0 ? selected.equity : '0.00'}
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                displayType={'text'}
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
                                <div className="form-group">
                                    <label className="frm_lbl">Jumlah Penarikan (USD)</label>
                                    <div className="flex flex-row">
                        <div className="flex justify-center items-center" style={{width:'35px',height:'33.5px',border: "1px solid #ced4da",background:"#e9ecef",borderRight:0}}>&#36;</div>
                                    <div>
                                        <input name="nominal" value={selected.nominal} onChange={this.handleChange.bind(this)} type="number" className="form-control" style={{borderRadius:0}} />
                                    </div>
                                    </div>
                                    {errMsg.nominal ?
                                        (<span className="text-error badge badge-danger">{errMsg.nominal}</span>) : null}
                                </div>
                            </div>
                        </div>

                    </div>
					
					{selected.rate !== "0" && (
						<div className="row">
							<div className="col-sm-10">
							  <div className="form-group">
								<div className="form-group">
								  <label className="frm_lbl">Jumlah Penarikan (IDR)</label>
                                  <div className="flex flex-row" style={{paddingRight:'5px'}}>
                                    <div className="flex justify-center items-center" style={{width:'42px',height:'29.5px',border: "1px solid #ced4da",background:"#e9ecef",borderRight:0}}>Rp</div>
                                   
                                        <NumberFormat
                                        disabled={true}
                                        name="jml_setor"
                                        className="form-control form-control-sm"
                                        value={
                                            selected.jml_nominal ? selected.jml_nominal : "0,00"
                                        }
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        inputMode="numeric"
                                        autoComplete="off"
                                        placeholder="Jumlah Penarikan"
                                        style={{borderRadius:0}}
                                        />
								  </div>
								</div>
							  </div>
							</div>
						</div>
					)}
                    <p className="text-red-500 mt-2 mb-2 text-justify text-sm text-semi-bold">*Harap perhatikan margin level akun kamu. Saldo kamu akan langsung terpotong dari akun MT5. Permintaan penarikan dana di atas jam 11.00 WIB, akan di-transfer di hari kerja berikutnya</p>




                </div>
            ) : ''}




        </Fragment>;


        const contentDelete = <table className="table table-hover">
            <thead>
                <tr>
                    <th>-</th>
                    <th>Login</th>
                    <th>Free Margin</th>
                    <th>Equity</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                {akun_trading ? (
                    akun_trading.map((at, index) => {
                        return (
                            <Fragment key={index}>
                                <tr onClick={e => this.onClickRow(at)} className={this.state.selected.login === at.login ? "active-row" : ''}>
                                    <td>
                                        <input type="radio"
                                            onChange={e => this.onClickRow(at)}
                                            checked={this.state.selected.login === at.login ? true : false}
                                            name="account-selection" value={at.login} />
                                    </td>
                                    <td>{at.login}
                                    </td>
                                    <td>
                                        <NumberFormat
                                            value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            displayType={'text'}
                                        />
                                    </td>
                                    <td>
                                        <NumberFormat
                                            value={at.equity > 0 ? at.equity : '0.00'}
                                            thousandSeparator={true}
                                            decimalScale={2}
                                            displayType={'text'}
                                        />
                                    </td>
                                    <td>
                                        {at.rate === 0 || at.rate === '0' ? 'USD' : at.rate}
                                    </td>
                                </tr>
                            </Fragment>
                        );
                    })
                ) : ''}

            </tbody>
        </table >;
        const columns = [
            {
                key: "nama_bank",
                text: "Bank",
                width: 100,
                align: "center",
                sortable: true,

            },
            {
                key: "akun_bank_id",
                text: "Akun Bank",
                width: 150,
                align: "center",
                sortable: true,

            },
            {
                key: "login",
                text: "Login",
                align: "center",
                width: 100,
                sortable: true
            },
            {
                key: "-",
                text: "Tanggal Penarikan",
                width: 150,
                align: "center",
                sortable: true,
				cell: (record) => {
					return moment(new Date(record.created_at)).format("DD-MM-YYYY HH:mm");	
				}					
            },
            {
                key: "nominal",
                text: "Jumlah",
                align: "center",
                width: 100,
                sortable: true,
                cell: record => {
                    return (<div style={{ textAlign: "right" }}><Fragment>
                        <NumberFormat
                            value={record.nominal}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={'text'}
                        />
                    </Fragment></div>)
                }
            },
            {
                key: "status",
                text: "Status",
                align: "center",
                width: 100,
                sortable: true
            },
            {
                key: "keterangan",
                text: "Keterangan",
                align: "center",
                sortable: true
            },
        ];

        const columns_mobile = [
            {
                key: "nama_bank",
                text: "Bank",
                width: 100,
                align: "center",
                sortable: true,

            },
            {
                key: "akun_bank_id",
                text: "Akun Bank",
                width: 60,
                align: "center",
                sortable: true,

            },
            {
                key: "nominal",
                text: "Jumlah",
                align: "center",
                width: 100,
                sortable: true,
                cell: record => {
                    return (<div style={{ textAlign: "right" }}><Fragment>
                        <NumberFormat
                            value={record.nominal}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={'text'}
                        />
                    </Fragment></div>)
                }
            }
        ];

        const config = {
            key_column: 'penarikan_dana_id',
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
            show_length_menu: false,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            },
            language: {
                loading_text: "Please be patient while data loads..."
            }
        }
        return (

            <div className="content-wrapper pr-1">

                <section className="content">
                    <div className="container-fluid">
                        
                        <div className="mobile-hide">
                        <h1 style={{ marginBottom: 10, fontSize: 30,color:"#2E2E2F"}}><CreditCardMinusIcon size="35px" className="label_ijo"/>&nbsp;Penarikan Dana</h1>
                        </div>

                        <div className="mobile-view">
                        <h1 style={{ marginBottom: 10, fontSize: 20,color:"#2E2E2F"}}><CreditCardMinusIcon size="35px" className="label_ijo"/>&nbsp;Penarikan Dana</h1>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg w-[100%] lg:w-[100%] " style={{ "minHeight": "500px",borderRadius:"20px" }}>
                                    <div className="card-body">
                                  
                                        <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
                                        <div className="mobile-hide">
                                                <h3 style={{ color:"#2E2E2F" }}>Pilih No. Rekening Tujuan:</h3>
                                            </div>

                                            <div className="mobile-view">
                                                <h3 style={{ color:"#2E2E2F",fontSize:"18px" }}>Pilih No. Rekening Tujuan:</h3>
                                            </div>  
                                            <div className="row my-0 mx-0">
                                                {data_bank ? (
                                                    data_bank.map((dp, index, arr) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                 <div className="grid grid-cols-1 lg:grid-cols-2 w-full py-4 px-1 lg:px-4 rounded-2xl mt-4" style={{ border:"2px solid #ddd",color:"#2E2E2F", cursor: "pointer" }}onClick={e => this.editRecord(dp)} >
                                                                        
                                                                        <div className="px-2 flex items-center justify-center">
                                                                            <img className="w-3/12" alt={dp.nama_bank} src={dp.file} width="150px" />
                                                                        </div>
                                                                        
                                                                        <div className="px-2 text-center lg:text-left">
                                                                            <h3 className="box-bank__title" style={{ fontSize: 30 }}>{dp.nama_bank}</h3>
                                                                            <p style={{ fontSize: 25 }}>{dp.nama_pemilik}</p><br/>
                                                                            <p style={{ fontSize: 25 }}>{dp.no_rek}</p>
                                                                        </div>

                                                                        
                                                                    </div>
                                                                
                                                            </Fragment>
                                                        )
                                                    })

                                                ) : ''}



                                            </div>


                                            <div className="mobile-hide">
                                                <h3 style={{ color:"#2E2E2F" }}>Daftar Penarikan</h3>
                                            </div>

                                            <div className="mobile-view">
                                                <h3 style={{ color:"#2E2E2F",fontSize:"18px" }}>Daftar Penarikan</h3>
                                            </div>        
                                            
                                            <div className="row mt-2 mb-4">
                                                <div className="col-md-12 col-12">
                                                    <div className="mb-3">
                                                        <div className="pull-left margin-left-0  col-md-6  col-12 pl-0 pt-2">
                                                            <label style={{ color:"#2E2E2F" }}>Tanggal: Awal</label>
                                                            <Datetime
                                                                closeOnSelect={true}
                                                                timeFormat={false}
                                                                setViewDate={moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                value={moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                onChange={this.handleChangeStartDate.bind(this)}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    autoComplete: "off",
                                                                    placeholder: 'Tanggal Awal',
                                                                    name: 'start_date',
                                                                    className: 'form-control form-control-lg'
                                                                }}

                                                                locale="id" isValidDate={this.state.validSd}
                                                            />
                                                        </div>
                                                        <div className="pull-left col-md-6  col-12 pl-0 pt-2">
                                                            <label style={{ color:"#2E2E2F" }}>Tanggal: Akhir</label>
                                                            <Datetime
                                                                closeOnSelect={true}
                                                                timeFormat={false}
                                                                setViewDate={moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                value={moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                onChange={this.handleChangeEndDate.bind(this)}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    autoComplete: "off",
                                                                    placeholder: 'Tanggal Awal',
                                                                    name: 'end_date',
                                                                    className: 'form-control form-control-lg'
                                                                }}

                                                                locale="id" isValidDate={this.state.validSd}
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
                                            ) : (<p>No Data ...</p>)}
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
                                            ) : (<p>No Data ...</p>)}
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
                    title={this.state.nextStep ? "Penarikan" : "Akun Trading MT5"}
                    titleButton={this.state.nextStep ? "Submit" : "Selanjutnya"}
                    themeButton="success"
                    isDisable={this.state.selected.login ? false : true}
                    isLoading={this.state.loadingForm}
                    formSubmit={this.state.nextStep ? this.handleSubmit.bind(this) : this.handleNext.bind(this)}
                ></AppModal>
                {this.props.showFormSuccess ? (<AppSwalSuccess
                    show={this.props.showFormSuccess}
                    title={<div dangerouslySetInnerHTML={{ __html: this.props.contentMsg }} />}
                    type={this.props.tipeSWAL}
                    handleClose={this.handleCloseSwal.bind(this)}
                >
                </AppSwalSuccess>) : ''}
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    data_bank: state.penarikan.dataBank || [],
    akun_trading: state.penarikan.akunTrading || [],
    data_history: state.penarikan.dataHistory || [],
    totalData: state.penarikan.totalData,
    contentMsg: state.penarikan.contentMsg || null,
    showFormSuccess: state.penarikan.showFormSuccess,
    tipeSWAL: state.penarikan.tipeSWAL,
    isLoading: state.penarikan.isFetching,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(profileUser());
            dispatch(getBankAkun());
            dispatch(getAkunTrading());
        },
        onLoadHistory: (param) => {
            dispatch(getHistorySetor(param));
        },
        onSetor: (param) => {
            dispatch(profileUser());
            dispatch(actionPenarikan(param));
        },
        closeSwalError: () => {			
            dispatch(closeForm());
			dispatch(getAkunTrading());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Penarikan);