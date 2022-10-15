import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AppButton from "../../components/button/Button";
import icon from "../../assets/akun_bank_ijo.svg";
import icon_delete from "../../assets/delete-red.png";
import {
  getBankAkun,
  getAkunTrading,
  actionPenarikan,

} from "../Penarikan/penarikanSlice";

import {
  AiFillBank as AiFillBankIcon
} from "react-icons/ai";
import { profileUser } from "../main/mainSlice";
import AppModal from "../../components/modal/MyModal";
import { confirmDel, closeForm, delAkunBankKu } from "../Personal/personalSlice";

class AkunBank extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {

      akun_bank_id: "",
    };
    this.state = {
      lastSegmentUrl: "",
      formMT5: false,
      nextStep: false,
      nextStep1: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
      start: 1,
      limit: 10,
      search: "",
      akun_bank_id: ""
    };
  }

  componentDidMount = async () => {
    this.props.onLoad();
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
  };

  componentDidUpdate(){
    console.log(this.props.showFormDelete)
  }

  deleteRecord(record) {
    this.setState({
      akun_bank_id: record,
    });
    this.props.showConfirmDel(true);
  }

  handleClose() {
    console.log('close')
    this.props.closeSwalError();
  }

  handleDelete = async () => {
    this.props.onDelete(this.state.akun_bank_id);
    this.props.closeSwalError();
    this.props.onLoad();
  };

  render() {
    const { data_bank, profileUser } = this.props;
	console.log(this.props);
    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style=padding-bottom:20px;">Apakah kamu yakin <br/>akan menghapus data ini ?</div>',
        }}
      />
    );
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
                <AiFillBankIcon size="35px" className="label_ijo" />&nbsp;Akun Bank Saya
              </h1>
            </div>

            <div className="mobile-view">
            
              <h1
                style={{
                  marginBottom: 10,
                  fontSize: 20,
                  color: "#2E2E2F",
                }}
              >
                  <AiFillBankIcon size="35px" className="label_ijo" />&nbsp;Akun Bank Saya
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
                        {data_bank
                          ? data_bank.map((dp, index, arr) => {
							var nama_pemilik = dp.nama_pemilik.split(" ");
                            return (
							
                              <Fragment key={index}>
                                <div className="mobile-hide w-full">
                                  <div
                                    className="grid grid-cols-3 place-items-center  py-4 px-1 lg:px-4 rounded-2xl mt-4"
                                    style={{
                                      border: "2px solid #ddd",
                                      color: "#2E2E2F",
                                    }}
                                  >
                                    <div className="px-2 lg:w-1/2">
                                      <img alt={dp.nama_bank} src={dp.file} style={{maxWidth:"100%"}}/>
                                    </div>

                                    <div className="px-2 text-left col-span-2 w-full">
                                      <div
                                        className="flex box-bank__title text-bold mb-2"
                                        style={{ fontSize: 18 }}
                                      >
                                        <div style={{ width: "120px" }}>
                                          Nama Bank
                                        </div>{" "}
                                        <div className="hidden-colon">
                                          {dp.nama_bank}
                                        </div>
                                      </div>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        className="col-span-2 float-right mt-2 mr-3"
                                      >
                                        {/* <IconButton
                                            onClick={this.deleteRecord.bind(
                                              this,
                                              dp.akun_bank_id
                                            )}
                                            icon={<Icon icon="close" />}
                                          /> */}
                                        <img src={icon_delete} width="30" onClick={()=> this.deleteRecord(dp.akun_bank_id)} />
                                      </div>
                                      <div
                                        className="flex mb-1"
                                        style={{ fontSize: 15 }}
                                      >
                                        <div style={{ width: "120px" }}>
                                          Nama Pemilik
                                        </div>{" "}
                                        <div className="hidden-colon">
                                          {nama_pemilik[0]}
                                        </div>
                                      </div>
                                      <div
                                        className="flex mb-1"
                                        style={{ fontSize: 15 }}
                                      >
                                        <div style={{ width: "120px" }}>
                                          No. Rekening
                                        </div>{" "}
                                        <div className="hidden-colon">
                                          {dp.no_rek}
                                        </div>
                                      </div>
                                     
                                    </div>
                                  </div>
                                </div>

                                <div className="mobile-view w-full">
                                  
                                  <div
                                    className="grid grid-cols-2 place-items-center  py-4 px-1  lg:px-4 rounded-2xl mt-4"
                                    style={{
                                      border: "2px solid #ddd",
                                      color: "#2E2E2F",
                                    }}
                                  >
                                   
                                    
                                    <div className="px-2 col-span-2 text-center">
                                      <img alt={dp.nama_bank} src={dp.file} />
                                      
                                    </div>

                                    <div className="px-2 text-left w-full col-span-2 mt-4">
                                      <div className="grid grid-cols-3">
                                        <div className="col-span-1">
                                          Nama bank
                                        </div>
                                        <div className="col-span-2">
                                          :{" "}
                                          <span className="font-semibold">
                                            {dp.nama_bank}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-3">
                                        <div className="col-span-1">
                                          Nama Pemilik
                                        </div>
                                        <div className="col-span-2">
                                          :{" "}
                                          <span className="font-semibold">
                                            {dp.nama_pemilik}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-3">
                                        <div className="col-span-1">
                                          No Rekening
                                        </div>
                                        <div className="col-span-2">
                                          :{" "}
                                          <span className="font-semibold">
                                            {dp.no_rek}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      style={{ fontSize: 30 }}
                                      className="px-2 pt-4 lg:pt-0 col-span-2 flex flex-row items-center"
                                    >
                                      <AppButton
                                        className="btn-akun-bank"
                                        type="button"
                                        size="lg"
                                        theme=""
                                        style={{
                                          backgroundColor: "#C3262A",
                                          color: "#ffffff",
                                        }}
                                      >
                                        {dp.no_rek}
                                      </AppButton>

                                      <div
                                      style={{ cursor: "pointer"}}
                                      className="ml-3"
                                    >
                                      <img src={icon_delete} width="30" onClick={()=> this.deleteRecord(dp.akun_bank_id)} />
                                    </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </Fragment>
                            );
                          })
                          : ""}
                        <div className="grid grid-col2-1 place-items-center mb-0 mt-4 pl-5 pr-5 w-full">
                          
                            
                            
                         
                              <div className="w-auto rounded-xl text-white pt-2 pb-2 grid grid-cols-1 place-items-center static" style={{ backgroundColor: (profileUser.status_dokumen === "Approve" ? "#C2252C" : "#ff757b") }} onClick={()=> profileUser.status_dokumen === "Approve" && this.props.history.push('/add-bank-accounts')}>
                                <a className="btn btn-lgreen btn-sm">
                                  <span className="font-bold text-white">TAMBAH AKUN BANK</span>
                                </a>
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

        <AppModal
          show={this.props.showFormDelete}
          size="xs"
          form={contentDelete}
          handleClose={()=> this.handleClose()}
          backdrop="static"
          keyboard={false}
          title="Delete"
          titleButton="Delete"
          themeButton="danger"
          isLoading={this.props.isLoading}
          formSubmit={()=>this.handleDelete()}
        ></AppModal>
      </div>
    );
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
  showFormDelete: state.personal.showFormDelete,
  profileUser: state.main.dtProfileUser,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getBankAkun());
      // dispatch(getAkunTrading());
    },
    showConfirmDel: (data) => {

      dispatch(confirmDel(data));
    },
    onDelete: (param) => {
      dispatch(delAkunBankKu(param));
    },
    onSetor: (param) => {
      dispatch(profileUser());
      dispatch(actionPenarikan(param));
    },
    closeSwalError: () => {
      dispatch(closeForm());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(AkunBank);
