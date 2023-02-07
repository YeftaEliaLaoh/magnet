import React, { Component } from 'react'

import { connect } from 'react-redux';
import {profileUser,} from "../features/main/mainSlice";
import AppModalStatus from "../components/modal/MyModalStatus";
import provider_mt5 from '../assets/mt5.png';
import AdminIcon from '@rsuite/icons/Admin';

class UnVerified extends Component {
  constructor(props) {
      super(props);
    }

  componentDidMount() {
    const location = window.location.href;
    const baseName = location.substring(location.lastIndexOf("?") + 1);
    const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

    localStorage.setItem(tokenLogin, baseName);
    this.props.onLoad()
  }

handleClose() {
  this.props.history.push("/login");
}

  render() {     
    const { profile } = this.props;
    const nama_depan = profile.nama_depan===undefined ? "," : ", "+profile.nama_depan

    const contentDelete2 = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px; text-align:left;">Hi'+ nama_depan +' selamat datang di Magnet, kami sangat senang kamu bergabung bersama kami, agar bisa menggunakan cabinet silahkan lengkapi verifikasi akun kamu. Silahkan cek email kamu untuk melakukan verifikasi.</div>',
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

                  <div className="mobile-hide relative bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10   ...">

                    <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN REAL MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>  

                    <div className="grid grid-cols-3 gap-4 px-3 mt-4 mb-4">

                    </div>
                    <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">

                    </div>
                  </div>
                </div>

                <div className="mobile-hide relative  text-black text-center    py-0 w-full mt-0 ..." >

                  <div className="mobile-hide relative    bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10   ...">

                    <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN DEMO MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>

                  </div>

                </div>

                <div className="mobile-view  relative mt-[0rem] bg-white text-black text-center rounded-2xl shadow-lg  py-4 w-[100%] ..." >
                      
                  <div className="flex justify-center items-center">
                      <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN REAL MT5</span>
                      <img width="45" className="pl-2" src={provider_mt5}/>
                    </div>  
                 
                  <div className="grid grid-cols-1 gap-4 px-5 mt-4 mb-4">

                  </div>
                  <div className="grid grid-col2-1 place-items-center mb-4 pl-5 pr-5">

                  </div>

                </div>
              </div>

              <div className="mobile-view relative mt-[0rem]  bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10 mx-1 ...">
                
                <div className="flex justify-center items-center">
                  <span className="font-bold text-red-700" style={{ fontSize: "17px" }}>AKUN DEMO MT5</span>
                  <img width="45" className="pl-2" src={provider_mt5} />
                </div>

              </div>

            </div>

          </div>
        </section>
        <AppModalStatus
                    show={true}
                    size="xs"
                    form={contentDelete2}
                    handleClose={this.handleClose.bind(this)}
                    backdrop="static"
                    keyboard={false}
                    title="Status"
                    noBtnAction={true}
                    themeButton="danger"
                  />
      </div>
    );
  }
}
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      },
  }
}

const mapStateToProps = (state) => ({
  profile: state.main.dtProfileUser,
});
export default connect(mapStateToProps, mapDispatchToPros)(UnVerified);
