import React, { Component } from 'react'
import AppButton from '../../components/button/Button';
import { connect } from 'react-redux';
import { getSetting, getKT, chgProps, simpanDataKT } from './ktSlice';
import { profileUser } from '../main/mainSlice'

class KetentuanTrading extends Component {
    constructor(props) {
        super(props);
        this.initDataPribadi = {
            agree: '',
        }
        this.state = {
            lastSegmentUrl: "",
            errMsg: this.initDataPribadi,
        }
    }

    componentDidMount = async () => {        
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit1() {
        var errors = this.state.errMsg;
        errors.agree = this.props.dataKetentuanTrading.agree != 'Y' ? "Kolom ini harus diisi" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg)) {
            this.props.saveDataKT(this.props.dataKetentuanTrading);
            this.props.history.push("/company_profile");
        } else {
            console.error('Invalid Form')
        }
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        sessionStorage.setItem('data_tipe_akun_id', this.props.dataKetentuanTrading.data_tipe_akun_id);
        const dt = {};
        if (name === "agree") {
            value = evt.target.checked ? 'Y' : 'N';
        }
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    render() {
        const { lastSegmentUrl, errMsg } = this.state;
        const { dataSetting, dataKetentuanTrading } = this.props;

        return (

            <div className="content-wrapper">
                <div className="content-area__edge">
                    <div className="px-3">
                        <ul className="list-unstyled list-steps mb-0 flex flex-col lg:flex-row gap-3">
                            <li
                                className={
                                    lastSegmentUrl === "personal" ? "active default flex-1 p-3" : "default flex-1 p-3"
                                }
                            >
                                <a href="personal">1. Informasi Pribadi</a>
                            </li>
                            <li
                                className={
                                    lastSegmentUrl === "account-type"
                                        ? "active default flex-1 p-3"
                                        : "default flex-1 p-3"
                                }
                            >
                                <a href="account-type">
                                    2. Tipe Akun
                                </a>
                            </li>
                            <li
                                className={
                                    lastSegmentUrl === "decleration"
                                        ? "active default flex-1 p-3"
                                        : "default flex-1 p-3"
                                }
                            >
                                <a href="decleration">
                                    3. Pernyataan
                                </a>
                            </li>
                            <li
                                className={
                                    lastSegmentUrl === "trading_rules"
                                        ? "active default flex-1 p-3"
                                        : "default flex-1 p-3"
                                }
                            >
                                <a href="trading_rules">
                                    4. Peraturan Trading
                                </a>
                            </li>
                            <li
                                className={
                                    lastSegmentUrl === "company_profile"
                                        ? "active default flex-1 p-3"
                                        : "default flex-1 p-3"
                                }
                            >
                                <a href="company_profile">
                                    5. Profil Perusahaan
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="mobile-hide">
                            <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Registrasi Akun Online</h1>
                        </div>
                        <div className="mobile-view">
                            <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10, fontSize: "20px" }}>Registrasi Akun Online</h1>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body" style={{ padding: "0" }}>
                                        <div className="alert alert-default alert-sm" style={{ backgroundColor: '#fbfbfd' }} >
                                            <div className="mobile-hide" style={{ padding: "1" }}>
                                                <h3 className="label_ijo">Peraturan Trading</h3>
                                            </div>
                                        </div>



                                        <div >
                                            <div className="alert alert-default alert-sm" style={{ backgroundColor: '#fbfbfd' }} >
                                                <div className="mobile-view" style={{ fontSize: "20px", paddingLeft: "5%" }}>
                                                    <h3 className="label_ijo">Peraturan Trading</h3>
                                                </div>
<div dangerouslySetInnerHTML={{ __html: dataKetentuanTrading.ketentuan }} />
                                               
                                            </div>
                                        </div>



                                        <div
                                            className="container__box p-4"
                                            style={{
                                                backgroundColor: "#fbfbfd"

                                            }}
                                        >
                                            <div className="grid grid-cols-1 place-items-center">
                                                <div className="form-group lg:w-[50%]">
                                                    <div className="form-check">
                                                        {errMsg.agree ? (
                                                            <span className="text-error badge badge-danger">
                                                                {errMsg.agree}
                                                            </span>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <label>
                                                            <input
                                                                checked={dataKetentuanTrading.agree === 'Y' ? true : false}
                                                                onChange={this.handleChange.bind(this)}
                                                                value={1}
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                name="agree"
                                                            />
                                                            <div className="form-check-text">
                                                                Dengan mencentang kotak ini, saya dengan
                                                                ini mengakui bahwa semua informasi dan
                                                                dokumen yang disediakan dalam aplikasi
                                                                online untuk pembukaan akun transaksi
                                                                adalah benar dan valid. Saya dengan ini
                                                                bertanggung jawab penuh atas setiap
                                                                kerusakan / kerugian di masa depan sebagai
                                                                akibat dari informasi palsu dari dokumen
                                                                yang saya sediakan.
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="grid grid-cols-1 place-items-center">
                                                        <div className="form-group lg:w-[60%] text-center mt-4">
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
                                                                onClick={this.handleSubmit1.bind(this)}
                                                                type="button"
                                                                size="lg"
                                                                theme=""
                                                                style={{
                                                                    backgroundColor: "#28a745",
                                                                    color: "#fff",
                                                                    marginRight: "2%",
                                                                }}
                                                            >
                                                                Selanjutnya
                                                            </AppButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    dataSetting: state.dtSetting.dataSetting || [],
    dataKetentuanTrading: state.dtSetting.dataKetentuanTrading || {},
    isError: state.dtSetting.isError,
    errorMessage: state.dtSetting.errorMessage,
    isFetching: state.dtSetting.isFetching,
    isSuccess: state.dtSetting.isSuccess,
    user: state.main.currentUser,
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(profileUser());
            dispatch(getSetting());
            dispatch(getKT());
        },
        changeProps: (param) => {
            dispatch(chgProps(param));
        },
        saveDataKT: (param) => {
            dispatch(profileUser());
            dispatch(simpanDataKT(param));
            dispatch(getKT());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(KetentuanTrading);