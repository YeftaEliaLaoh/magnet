import React, { Component } from "react";
import { connect } from "react-redux";
import AppButton from "../../components/button/Button";
import { getDataPP, chgProps, simpanDataPP, closeForm } from "./ppSlice";
import phone_red from "../../assets/phone_red.svg";
import wa_red from "../../assets/wa_red.svg";
import email_red from "../../assets/email_red.svg";
import location_red from "../../assets/location.svg";
import profilecompany from "../../assets/profilecompany.svg";
import { profileUser } from "../main/mainSlice";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";

class ProfilePerusahaan extends Component {
  constructor(props) {
    super(props);
    this.initData = {
      agree1: "",
    };
    this.state = {
      lastSegmentUrl: "",
      data_tipe_akun_id: "",
      act: "",
      errMsg1: this.initData,
    };
  }

  componentDidMount = async () => {
    const act = sessionStorage.getItem("act_tipe_akun_id");
    const selectedId = sessionStorage.getItem("data_tipe_akun_id");
    this.props.onLoad();
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({
      lastSegmentUrl: BaseName,
      act: act,
      data_tipe_akun_id: selectedId,
    });
  };

  handleChange(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    value = evt.target.checked ? "Y" : "N";

    const dt = {};
    dt["key"] = name;
    dt["value"] = value;
    this.props.changeProps(dt);
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  handleSubmit(action) {
    var errors = this.state.errMsg1;
    errors.agree1 =
      this.props.persetujuan.agree1 === "N" || !this.props.persetujuan.agree1
        ? "Kolom ini harus diisi"
        : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg1)) {
      const qs = {
        ...this.state,
        ...this.props.persetujuan,
        wakil_pialang_caller:
          this.props.profile_perusahaan.wakil_pialang_caller,
      };
      console.log(qs);
      this.props.onSave(qs);
    } else {
      console.error("Invalid Form");
    }
  }

  handleCloseSwal() {
    sessionStorage.removeItem("data_tipe_akun_id");
    this.props.history.push("/");
    this.props.closeSwal();
  }

  render() {
    const { lastSegmentUrl, errMsg1 } = this.state;
    const {
      wakil_pialang,
      persetujuan,
      akun_terpisah,
      susunan_pengurus,
      susunan_saham,
      legalitas_perusahaan,
      profile_perusahaan,
    } = this.props;

    return (
      <div className="content-wrapper">
        <div className="content-area__edge">
          <div className="px-3">
            <ul className="list-unstyled list-steps mb-0 flex flex-col lg:flex-row gap-3">
              <li
                className={
                  lastSegmentUrl === "personal"
                    ? "active default flex-1 p-3"
                    : "default flex-1 p-3"
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
                <a href="account-type">2. Tipe Akun</a>
              </li>
              <li
                className={
                  lastSegmentUrl === "decleration"
                    ? "active default flex-1 p-3"
                    : "default flex-1 p-3"
                }
              >
                <a href="decleration">3. Pernyataan</a>
              </li>
              <li
                className={
                  lastSegmentUrl === "trading_rules"
                    ? "active default flex-1 p-3"
                    : "default flex-1 p-3"
                }
              >
                <a href="trading_rules">4. Peraturan Trading</a>
              </li>
              <li
                className={
                  lastSegmentUrl === "company_profile"
                    ? "active default flex-1 p-3"
                    : "default flex-1 p-3"
                }
              >
                <a href="company_profile">5. Profil Perusahaan</a>
              </li>
            </ul>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="mobile-hide">
              <h1
                style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}
                className="text-gray-500"
              >
                Registrasi Akun Online
              </h1>
            </div>

            <div className="mobile-view">
              <h1
                style={{ marginBottom: 10, fontSize: 22, marginLeft: 10 }}
                className="text-gray-500"
              >
                Registrasi Akun Online
              </h1>
            </div>

            <div className="row">
              <div className="col-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg"
                  style={{ minHeight: "800px", borderRadius: "2rem" }}
                >
                  <div className="card-body">
                    <h3
                      style={{
                        marginBottom: 10,
                        marginLeft: 10,
                        color: "#2DB147",
                      }}
                    >
                      Profil Perusahaan
                    </h3>
                    <div
                      className="row"
                      style={{
                        paddingLeft: 15,
                        paddingTop: 25,
                        paddingRight: 15,
                      }}
                    >
                      <div className="col-sm-6">
                        <div className="row" style={{ padding: 0 }}>
                          <div className="col-sm-12  mb-4">
                            <div
                              className="alert-sm"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <div className="flex pt-2">
                                <div className="flex-none w-10  ...">
                                  <img src={wa_red} width="30px" />
                                </div>
                                <div className="flex-grow  ...">
                                  <p className="text-base font-bold text-black text-left ...">
                                    <a
                                      href="https://api.whatsapp.com/send?phone=6287835355526&text=Halo"
                                      title=""
                                    >
                                      <span className="text-black">
                                        {profile_perusahaan.telp}
                                      </span>
                                    </a>
                                  </p>
                                </div>
                              </div>

                              <div className="flex pt-5">
                                <div className="flex-none w-10  ...">
                                  <img src={phone_red} width="30px" />
                                </div>
                                <div className="flex-grow  ...">
                                  <p className="text-base font-bold text-gray-600 text-left ...">
                                    <a
                                      href={
                                        "tel:" +
                                        profile_perusahaan.telp_compliance
                                      }
                                      title=""
                                    >
                                      <span className="text-black">
                                        {profile_perusahaan.telp_compliance}
                                      </span>
                                    </a>
                                  </p>
                                </div>
                              </div>

                              <div className="flex pt-5">
                                <div className="flex-none w-10  ...">
                                  <img src={email_red} width="30px" />
                                </div>
                                <div className="flex-grow  ...">
                                  <p className="text-base font-bold text-gray-600 text-left ...">
                                    <a
                                      href="mailto:info@magnetfx.co.id"
                                      title=""
                                    >
                                      <span className="text-black">
                                        {profile_perusahaan.email}
                                      </span>
                                    </a>
                                  </p>
                                </div>
                              </div>

                              <div className="flex pt-5">
                                <div className="flex-none w-10  ...">
                                  <img src={location_red} width="30px" />
                                </div>
                                <div className="flex-grow  ...">
                                  <p className="text-base font-bold text-gray-600 text-left ...">
								  
                                    <a href="https://goo.gl/maps/GEDLiK8FinR6mzdx8">
                                      Gedung Sona Topas Tower - Lt. 18 Suite
                                      1804 Jl. Jend. Sudirman Kav. 26 Jakarta
                                      Selatan 12920 Indonesia
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert alert-sm"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                                border: "1px solid #2DB147",
                              }}
                            >
                              <h3
                                className="h6 mb-4 text-red-500"
                                style={{ fontWeight: "bold" }}
                              >
                                LEGALITAS
                              </h3>

                              <div>
                                <dl className="--style-data --style-horizontal">
                                  <dt>NOMOR IZIN USAHA BAPPEBTI</dt>
                                  <dd>
                                    {legalitas_perusahaan.nomer_izin_bappebti}
                                  </dd>
                                </dl>
                                <dl className="--style-data --style-horizontal">
                                  <dt>NOMOR KEANGGOTAAN BKDI</dt>
                                  <dd>
                                    {legalitas_perusahaan.nomer_anggota_bkdi}
                                  </dd>
                                </dl>
                                <dl className="--style-data --style-horizontal">
                                  <dt>NOMOR KEANGGOTAAN ICH</dt>
                                  <dd>
                                    {legalitas_perusahaan.nomer_anggota_ich}
                                  </dd>
                                </dl>
                                <dl className="--style-data --style-horizontal">
                                  <dt>
                                    NOMOR DAN TANGGAL PERSETUJUAN PESERTA
                                    PERDAGANGAN ALTERNATIF
                                  </dt>
                                  <dd>
                                    {
                                      legalitas_perusahaan.perdagangan_alternatif
                                    }
                                  </dd>
                                </dl>
                                <dl className="--style-data --style-horizontal">
                                  <dt>
                                    NAMA PENYELENGGARA SISTEM PERDAGANGAN
                                    ALTERNATIF
                                  </dt>
                                  <dd>
                                    {legalitas_perusahaan.nama_penyelenggara}
                                  </dd>
                                </dl>
                                <br />
                                <br />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert alert-sm"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                                border: "1px solid #2DB147",
                              }}
                            >
                              <h3
                                className="h6 mb-4 text-red-500"
                                style={{ fontWeight: "bold" }}
                              >
                                SUSUNAN PENGURUS PERUSAHAAN
                              </h3>
                              <div>
                                {susunan_pengurus
                                  ? susunan_pengurus.map(function (sp, i) {
                                      return (
                                        <dl
                                          key={
                                            sp.susunan_pengurus_perusahaan_id +
                                            "susunan" +
                                            i
                                          }
                                          className="--style-data --style-horizontal"
                                        >
                                          <dt>{sp.jabatan}</dt>
                                          <dd>{sp.nama}</dd>
                                        </dl>
                                      );
                                    })
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="row" style={{ padding: 0 }}>
                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert-sm"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <img src={profilecompany} />
                            </div>
                          </div>

                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert alert-sm"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                                border: "1px solid #2DB147",
                              }}
                            >
                              <h3
                                className="h6 mb-4 text-red-500"
                                style={{ fontWeight: "bold" }}
                              >
                                NAMA-NAMA WAKIL PIALANG PERUSAHAAN DITUNJUK
                                KHUSUS UNTUK VERIFIKASI
                              </h3>
                              <ol className="mb-0" style={{ padding: "1rem" }}>
                                {wakil_pialang
                                  ? wakil_pialang.map(function (wp, i) {
                                      return (
                                        <li
                                          key={wp.nama_depan + "nama-nama" + i}
                                        >
                                          {wp.nama_depan}
                                        </li>
                                      );
                                    })
                                  : ""}
                              </ol>
                            </div>
                          </div>
                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert alert-sm"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                                border: "1px solid #2DB147",
                              }}
                            >
                              <h3
                                className="h6 mb-4 text-red-500"
                                style={{ fontWeight: "bold" }}
                              >
                                SUSUNAN PEMEGANG SAHAM PERUSAHAAN
                              </h3>

                              <ol className="mb-0" style={{ padding: "1rem" }}>
                                {susunan_saham
                                  ? susunan_saham.map(function (ss, i) {
                                      return (
                                        <li
                                          key={
                                            ss.susunan_saham_perusahaan_id +
                                            "susnan" +
                                            i
                                          }
                                        >
                                          {ss.nama_susunan_saham_perusahaan}
                                        </li>
                                      );
                                    })
                                  : ""}
                              </ol>
                            </div>
                          </div>
                          <div className="col-sm-12 mb-4">
                            <div
                              className="alert alert-sm"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "20px",
                                border: "1px solid #2DB147",
                              }}
                            >
                              <h3
                                className="h6 mb-4 text-red-500"
                                style={{ fontWeight: "bold" }}
                              >
                                Akun Terpisah
                              </h3>
                              <ul style={{ padding: "1rem" }}>
                                {akun_terpisah
                                  ? akun_terpisah.map(function (ap, i) {
                                      return (
                                        <li
                                          key={
                                            ap.akun_terpisah_id +
                                            "akun terpisah" +
                                            i
                                          }
                                        >
                                          <dl className="--style-data">
                                            <dt>{ap.nama_akun_terpisah}</dt>
                                            <dd>
                                              No. Acc. : {ap.no_akun_terpisah}
                                            </dd>
                                          </dl>
                                        </li>
                                      );
                                    })
                                  : ""}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginTop: "3em" }}
                      ></div>
                    </div>

                    <div
                      className="container__box p-4"
                      style={{
                        backgroundColor: "#fbfbfd",
                        margin: "1em -1.5em -1.5em",
                      }}
                    >
                      <div className="grid grid-cols-1 place-items-center">
                        <div className="form-group lg:w-2/3">
                          <div className="form-check">
                            {errMsg1.agree1 ? (
                              <span className="text-error badge badge-danger">
                                {errMsg1.agree1}
                              </span>
                            ) : (
                              ""
                            )}
                            <label>
                              <input
                                checked={
                                  persetujuan.agree1 === "Y" ? true : false
                                }
                                onChange={this.handleChange.bind(this)}
                                className="form-check-input"
                                type="checkbox"
                                name="agree1"
                              />
                              <div className="form-check-text">
                                Dengan mencentang kotak ini, saya dengan ini
                                mengakui bahwa semua informasi dan dokumen yang
                                disediakan dalam aplikasi online untuk pembukaan
                                akun transaksi adalah benar dan valid. Saya
                                dengan ini bertanggung jawab penuh atas setiap
                                kerusakan / kerugian di masa depan sebagai
                                akibat dari informasi palsu dari dokumen yang
                                saya sediakan.
                              </div>
                            </label>
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
                                <span className="text-gray-700">serta</span>{" "}
                                <span className="label_merah font-extrabold">
                                  Kebijakan Privasi
                                </span>
                              </label>
                            </div>

                            <div className="form-group w-[100%] lg:w-[40%] text-center">
                              <AppButton
                                onClick={this.handleSubmit.bind(this)}
                                type="button"
                                size="lg"
                                theme=""
                                style={{
                                  backgroundColor: "#2FB24A",
                                  color: "#fff",
                                  marginRight: "2%",
                                }}
                              >
                                Submit Form
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

        {this.props.showFormFailed ? (
          <AppSwalSuccess
            show={this.props.showFormFailed}
            title={"Anda belum menyetujui peraturan trading"}
            type={this.props.tipeSWAL}
            handleClose={() => {
              this.props.history.push("/trading_rules");
            }}
          ></AppSwalSuccess>
        ) : (
          ""
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile_perusahaan: state.companyProfile.profile_perusahaan || {},
  legalitas_perusahaan: state.companyProfile.legalitas_perusahaan || {},
  susunan_saham: state.companyProfile.susunan_saham || [],
  susunan_pengurus: state.companyProfile.susunan_pengurus || [],
  akun_terpisah: state.companyProfile.akun_terpisah || [],
  wakil_pialang: state.companyProfile.wakil_pialang || [],
  persetujuan: state.companyProfile.persetujuan || {},
  contentMsg: state.companyProfile.contentMsg || null,
  showFormSuccess: state.companyProfile.showFormSuccess,
  showFormFailed: state.companyProfile.showFormFailed,
  errorMessage: state.companyProfile.errorMessage,
  tipeSWAL: state.companyProfile.tipeSWAL,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getDataPP());
    },
    onSave: (param) => {
      dispatch(profileUser());
      dispatch(simpanDataPP(param));
    },
    changeProps: (param) => {
      dispatch(chgProps(param));
    },
    closeSwal: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(ProfilePerusahaan);
