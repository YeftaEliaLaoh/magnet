import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import AppButton from "../../components/button/Button";
import {
  getDataPP,
  action_contact_us,
  closeForm,
} from "../ProfilePerusahaan/ppSlice";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";

import phone_red from "../../assets/phone.svg";
import wa_red from "../../assets/wa.svg";
import email_red from "../../assets/email_white.svg";
import location_red from "../../assets/location_white.svg";
import { profileUser } from "../main/mainSlice";

import { Icon } from "@rsuite/icons";

import { FaPhoneAlt as FaPhoneAltIcon } from "react-icons/fa";

class HubungiKami extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      nama_depan: "",
      nama_belakang: "",
      email: "",
      phone: "",
      message: "",
      subject: "",
    };
    this.state = {
      lastSegmentUrl: "",
      selected: this.initSelected,
      errMsg: this.initSelected,
      loadingForm: false,
    };
  }

  componentDidMount = async () => {
    this.props.onLoad();
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };

  handleChange(evt) {
    const name = evt.target.name;
    var val = evt.target.value;
    this.setState({
      loadingForm: false,
      errMsg: { ...this.state.errMsg, [name]: "" },
      selected: {
        ...this.state.selected,
        nama_depan: this.props.user.nama_depan,
        nama_belakang: this.props.user.nama_belakang,
        email: this.props.profile.email,
        phone: this.props.user.handphone,
        [name]: val,
      },
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.selected);
  }

  handleCloseSwal() {
    this.setState({
      selected: {
        ...this.state.selected,
        message: "",
        subject: "",
      },
    });
    this.props.closeSwal();
  }

  render() {
    const { profile_perusahaan } = this.props;
    const { selected } = this.state;

    return (
      <div className="content-wrapper pr-2">
        <section className="content">
          <div className="container-fluid">
            <div className="mobile-hide">
              <h1 style={{ marginBottom: 10, fontSize: 30, color: "#2E2E2F" }}>
                <Icon as={FaPhoneAltIcon} size="35px" className="label_ijo" />
                &nbsp;Hubungi Kami
              </h1>
            </div>

            <div className="mobile-view">
              <h1 style={{ marginBottom: 10, fontSize: 20, color: "#2E2E2F" }}>
                <Icon as={FaPhoneAltIcon} size="35px" className="label_ijo" />
                &nbsp;Hubungi Kami
              </h1>
            </div>

            <div className="row">
              <div className="col-12 col-xs-12">
                {/* card start */}
                <div
                  className="card card-success shadow-lg"
                  style={{ paddingBottom: "35px", borderRadius: "20px" }}
                >
                  <div className="card-body p-0">
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 mt-10 px-4">
                      <div>
                        <div
                          className=" hub_kami alert alert-success alert-sm"
                          style={{
                            backgroundColor: "#1A9425",
                            paddingTop: 10,
                            color: "#fff",
                            borderRadius: "20px",
                            marginBottom: "0rem",
                          }}
                        >
                          <div>
                            <h2 style={{ color: "#fff" }}>
                              Contact Information
                            </h2>
                            <p className="text-base font-bold text-white text-left pt-2 pb-2 ...">
                              Fill up the form and our Team will get back to you
                              within 24 hours
                            </p>
                          </div>

                          <div className="mb-3">
                            <div className="flex mt-3 items-center">
                              <div className="w-1/12">
                                <img src={wa_red} width="30px" />
                              </div>
                              <p className="w-11/12 text-base font-bold text-black text-left ...">
							  
                                <a
                                  href="https://api.whatsapp.com/send?phone=6287835355526&text=Halo"
                                  target="_blank"
                                  title=""
                                >
                                  <span className="text-white ml-3">
                                    {profile_perusahaan.telp}
                                  </span>
                                </a>
                              </p>
                            </div>

                            <div className="flex mt-3 items-center">
                              <div className="w-1/12">
                                <img src={phone_red} width="30px" />
                              </div>
                              <p className="w-11/12 text-base font-bold text-gray-600 text-left ...">
                                <a
                                  href={
                                    "tel:" + profile_perusahaan.telp_dealing
                                  }
                                  target="_blank"
                                  title=""
                                >
                                  <span className="text-white ml-3">
                                    {profile_perusahaan.telp_dealing}
                                  </span>
                                </a>
                              </p>
                            </div>

                            <div className="flex mt-3 items-center">
                              <div className="w-1/12">
                                <img src={email_red} width="30px" />
                              </div>
                              <p className="w-11/12 text-base font-bold text-gray-600 text-left ...">
                                <a
                                  href="mailto:info@magnetfx.co.id"
                                  target="_blank"
                                  title=""
                                >
                                  <span className="text-white ml-3">
                                    {profile_perusahaan.email}
                                  </span>
                                </a>
                              </p>
                            </div>

                            <div className="flex mt-3 items-center">
                              <div className="w-1/12">
                                <img src={location_red} width="25px" />
                              </div>
                              <p className=" w-11/12 text-base font-bold text-white text-left ... ml-3">
                                <a href="https://goo.gl/maps/GEDLiK8FinR6mzdx8" target="_blank" className="">
                                  <span className="text-base font-bold text-white text-left ...">
                                    Gedung Sona Topas Tower - Lt. 18 Suite 1804
                                    Jl. Jend. Sudirman Kav. 26 Jakarta Selatan
                                    12920 Indonesia
                                  </span>
                                </a>
                              </p>
                            </div>

                            <div className="flex mt-3 items-center">
                              <div className="w-1/12">
                                <img src={email_red} width="30px" />
                              </div>

                              <p className="pl-3 w-11/12 text-base font-bold text-gray-600 text-left ...">
                                <a
                                  href={profile_perusahaan.website}
                                  target="_blank"
                                  title=""
                                >
                                  <span className="text-white">
                                    {profile_perusahaan.website}
                                  </span>
                                </a>
                              </p>

                              {/* <p className="ml-3 w-11/12 text-base font-bold text-white text-left ...">
                                                            <a href="#" className=""><span className=" text-base font-bold text-white text-left ...">
                                                            {profile_perusahaan.website}
                                                                </span></a>
                                                                </p> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center lg:mt-0 mt-5 w-full px-3">
                        <Form className="w-full">
                          <Form.Group controlId="subjek">
                            <Form.Label>
                              <span
                                style={{ fontWeight: "bold", color: "#000" }}
                              >
                                Subjek
                              </span>
                            </Form.Label>
                            <Form.Control
                              autoComplete="off"
                              size="lg"
                              name="subject"
                              type="text"
                              onChange={this.handleChange.bind(this)}
                              value={selected.subject}
                              required
                              placeholder="Masukkan Subjek"
                            />
                          </Form.Group>
                          <Form.Group controlId="message">
                            <Form.Label>
                              <span
                                style={{ fontWeight: "bold", color: "#000" }}
                              >
                                Pesan
                              </span>
                            </Form.Label>

                            <Form.Control
                              autoComplete="off"
                              value={selected.message}
                              rows={5}
                              name="message"
                              as="textarea"
                              onChange={this.handleChange.bind(this)}
                              required
                              placeholder="Masukkan Pesan"
                            />
                          </Form.Group>
                          <div className="mt-2">
                            <div className="w-auto text-center">
                              <AppButton
                                disabled={
                                  selected.message && selected.subject
                                    ? false
                                    : true
                                }
                                style={{
                                  color: "#fff",
                                  marginTop: 10,
                                  backgroundColor: "#C3262A",
                                }}
                                onClick={this.handleSubmit.bind(this)}
                                type="button"
                                size="lg"
                                theme=""
                              >
                                HUBUNGI KAMI
                              </AppButton>
                            </div>
                          </div>
                        </Form>
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
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile_perusahaan: state.companyProfile.profile_perusahaan || {},
  contentMsg: state.companyProfile.contentMsg || null,
  showFormSuccess: state.companyProfile.showFormSuccess,
  tipeSWAL: state.companyProfile.tipeSWAL,
  profile: state.main.dtProfileUser,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getDataPP());
    },
    onSubmit: (param) => {
      dispatch(profileUser());
      dispatch(action_contact_us(param));
    },
    closeSwal: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(HubungiKami);
