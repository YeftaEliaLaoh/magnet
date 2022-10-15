import React, { Component, Fragment } from "react";
import { Nav, Placeholder } from "rsuite";
import { Icon } from '@rsuite/icons';
import IconButton from 'rsuite/IconButton';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import CloseIcon from '@rsuite/icons/Close';
import { Gear, AddOutline } from '@rsuite/icons';
import { connect } from "react-redux";
import { Button, Col, Figure, Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import photo_ktp from "../../assets/ktp-01.png";
import close1 from "../../assets/close1.svg";
import unduh_ijo from "../../assets/unduh1.svg";
import see_icon from "../../assets/see.svg";
import selfie_ktp from "../../assets/selfie-ktp.png";
import tabungan_book from "../../assets/tabungan-book.png";

import Compress from "compress.js";
import {
  getNegara,
  getProvinsi,
  getBank,
  getExpTrading,
  getKekayaan,
  getKontakDarurat,
  getPekerjaan,
  getAkunBank,
  chgPropsExpTrading,
  chgPropsKontakDarurat,
  chgPropsAkunBank,
  chgPropsKekayaan,
  chgPropsPekerjaan,
  chgPropsDPP,
  getDocPribadi,
  clearState,
  confirmDel,
  closeForm,
  uplDocPribadi,
  delDocPribadi,
  simpanDataPribadi,
  simpanDataExpTrading,
  simpanDataKekayaan,
  simpanKontakDarurat,
  simpanDataPekerjaan,
  simpanAkunBank,
  simpanDPP,
} from "./personalSlice";
import {
  fetchUserBytoken,
  chgProps,
  onLogout,
  profileUser,
  fetchUserKTP,
} from "../main/mainSlice";
import { getRejDoc } from "../RejectDocument/rejectDocSlice";
import moment from "moment";
import "moment/locale/id";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import AppModal from "../../components/modal/MyModal";
import AppButton from "../../components/button/Button";
import AppModalLoading from "../../components/modal/MyModalLoading";
var yesterday = moment().subtract(40, "years");
var valid_startDate = function (current) {
  return current.isAfter(yesterday);
};

class Personal extends Component {
  
  constructor(props) {
    super(props);
    this.initDataPribadi = {
      agreement1: "",
    };
    this.initDataExpTrading = {
      agreement2: "",
    };
    this.initDataKekayaan = {
      agreement3: "",
    };
    this.initDataKontakDarurat = {
      agreement4: "",
      nama: "",
      telp: "",
    };
    this.initPekerjaan = {
      agreement5: "",
    };
    this.initAkunBank = {
      agreement6: "",
    };
    this.initDPP = {
      agree: "",
    };

    this.state = {
      validSd: valid_startDate,
      validEd: valid_startDate,
      lastSegmentUrl: "",
      active_tab: "detil_pribadi",
      dokumen_id: "",
      errMsg1: this.initDataPribadi,
      errMsg2: this.initDataExpTrading,
      errMsg3: this.initDataKekayaan,
      errMsg4: this.initDataKontakDarurat,
      errMsg5: this.initPekerjaan,
      errMsg6: this.initAkunBank,
      errMsg7: this.initDPP,
      ktpTemp: "",
    };
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scrollDivFormDetilPribadi = React.createRef()
  }

  componentDidMount = async () => {
    sessionStorage.removeItem("data_tipe_akun_id");
    await sessionStorage.setItem("act_tipe_akun_id", "pendaftaran");
    this.props.onLoad();
    const location = window.location.href;
    const BaseName = location.substring(location.lastIndexOf("/") + 1);
    await this.setState({ lastSegmentUrl: BaseName });
    console.log("hello user", this.props.user);
    console.log(getRejDoc())
    console.log(this.props)
  };

  componentDidUpdate(){
    console.log(this.props)
  }

  handleSelect(activeKey) {
    this.setState({ active_tab: activeKey });
  }

  handleChangeStartDate(date) {
    const dt = {};
    if (date) {
      const selectedDate = new Date(date);
      const _date = moment(selectedDate).format("YYYY-MM-DD");
      dt["key"] = "tanggal_lahir";
      dt["value"] = _date;
    } else {
      dt["key"] = "tanggal_lahir";
      dt["value"] = "";
    }
    this.props.changeProps(dt);
    this.setState({
      ...this.state,
      errMsg1: {
        ...this.state.errMsg1,
        tanggal_lahir: "",
      },
    });
  }

  renderView(mode, renderDefault, name) {
    // Only for years, months and days view
    if (mode === "time") return renderDefault();

    return (
      <div className="wrapper">
        {renderDefault()}
        <div className="controls">
          <Button
            variant="warning"
            type="button"
            onClick={() => this.clear(name)}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }

  clear(name) {
    if (name === "tanggal_lahir") {
      this.handleChangeStartDate();
    }
  }

  handleChange(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    if (name === "agreement1") {
      value = evt.target.checked ? 1 : 0;
    }
    if (name === "jenis_identitas") {
      dt["key"] = "no_identitas";
      dt["value"] = "";
      this.props.changeProps(dt);
    }
    dt["key"] = name;
    dt["value"] = value;
    this.props.changeProps(dt);
    this.setState({
      ...this.state,
      errMsg1: {
        ...this.state.errMsg1,
        [name]: "",
      },
    });
  }

  handleChangeTrading(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    if (name === "agreement2") {
      value = evt.target.checked ? 1 : 0;
    }

    if (name === "pertanyaan1") {
      value = evt.target.checked ? "Y" : "N";
    }

    if (
      name === "pertanyaan5" ||
      name === "pertanyaan4" ||
      name === "pertanyaan3"
    ) {
      value = evt.target.checked ? "Y" : "N";
    }

    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsTrading(dt);
    this.setState({
      ...this.state,
      errMsg2: {
        ...this.state.errMsg2,
        [name]: "",
      },
    });
  }

  handleChangeKekayaan(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    if (name === "agreement3") {
      value = evt.target.checked ? 1 : 0;
    }
    const dt = {};
    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsKekayaan(dt);
    this.setState({
      ...this.state,
      errMsg3: {
        ...this.state.errMsg3,
        [name]: "",
      },
    });
  }

  handleChangeKontakDarurat(evt) {
    let name = evt.target.name;
    var value = evt.target.value;
    name = name === "alamatt" ? "alamat" : name;
    name = name === "telpp" ? "telp" : name;
    const dt = {};
    if (name === "agreement4") {
      value = evt.target.checked ? 1 : 0;
    }
    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsKontak(dt);
    this.setState({
      ...this.state,
      errMsg4: {
        ...this.state.errMsg4,
        [name]: "",
      },
    });
  }

  handleChangePekerjaan(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    if (name === "agreement5") {
      value = evt.target.checked ? 1 : 0;
    }
    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsPekerjaan(dt);
    this.setState({
      ...this.state,
      errMsg5: {
        ...this.state.errMsg5,
        [name]: "",
      },
    });
  }

  handleChangeAkunBank(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    if (name === "agreement6") {
      value = evt.target.checked ? "Y" : "N";
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

  handleChangeDPP(evt) {
    const name = evt.target.name;
    var value = evt.target.value;
    const dt = {};
    dt["key"] = name;
    dt["value"] = value;
    this.props.changePropsDPP(dt);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  handleChangePhoto = async (evt) => {
    const name = evt.target.name;
    const value = evt.target.files[0];
    this.setState({
      errMsg1: this.initDataPribadi,
    });
    var errors = this.state.errMsg1;
    if (name === "KTP") {
      // const compress = new Compress();
      // const resizedImage = await compress.compress([value], {
      // size: 0.5, // the max size in MB, defaults to 2MB
      // quality: 1, // the quality of the image, max is 1,
      // maxWidth: 400, // the max width of the output image, defaults to 1920px
      // maxHeight: 300, // the max height of the output image, defaults to 1920px
      // resize: true, // defaults to true, set false if you do not want to resize the image width and height
      // });
      // const img = resizedImage[0];
      // const base64str = img.data;
      // const imgExt = img.ext;
      //const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
      if (value.size > 20971520) {
        this.setState({
          loadingForm: true,
          errMsg1: {
            ...this.state.errMsg1,
            photo_ktp_download: "File size over 20MB",
          },
        });
        return;
      }
      const dtKTP = {
        file: value,
        data_pribadi_id: this.props.user.data_pribadi_id,
      };
      await this.props.onUploadKTP(dtKTP);
    }

    if (value) {
      if (value.size > 20971520) {
        this.setState({
          loadingForm: true,
          errMsg1: { ...this.state.errMsg1, [name]: "File size over 20MB" },
        });
        return;
      }
      const dt = {
        file: value,
        tipe: name,
      };
      this.props.uploadFile(dt);
      await this.sleep(2000);
      this.props.getDPP();
      await this.sleep(2000);
      
      // if (name === "KTP") {
      //   errors.nama_depan = !this.props.user.nama_depan
      //     ? "Kolom ini harus diisi"
      //     : "";

      //   errors.kota_lahir = !this.props.user.kota_lahir
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.tanggal_lahir = !this.props.user.tanggal_lahir
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.jenis_identitas = !this.props.user.jenis_identitas
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.no_identitas = !this.props.user.no_identitas
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.npwp = !this.props.user.npwp ? "Kolom ini harus diisi" : "";
      //   errors.jenis_kelamin = !this.props.user.jenis_kelamin
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.status_pernikahan = !this.props.user.status_pernikahan
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.nama_pasangan =
      //     !this.props.user.nama_pasangan &&
      //     this.props.user.status_pernikahan === "Kawin"
      //       ? "Kolom ini harus diisi"
      //       : "";
      //   errors.nama_ibu_kandung = !this.props.user.nama_ibu_kandung
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.alamat = !this.props.user.alamat ? "Kolom ini harus diisi" : "";
      //   errors.rt = !this.props.user.rt ? "Kolom ini harus diisi" : "";
      //   errors.rw = !this.props.user.rw ? "Kolom ini harus diisi" : "";
      //   errors.provinsi = !this.props.user.provinsi
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.warga_negara = !this.props.user.warga_negara
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.telp = !this.props.user.telp ? "Kolom ini harus diisi" : "";
      //   errors.handphone = !this.props.user.handphone
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   errors.status_kepemilikan = !this.props.user.status_kepemilikan
      //     ? "Kolom ini harus diisi"
      //     : "";
      //   this.setState({
      //     ...this.state,
      //     ktpTemp: this.props.user.photo_ktp_download,
      //   });
      //   this.setState({ errors });
      // }
      // this.props.onLoad();
    }
  };

  hideAlert() {
    this.props.clearErr();
  }

  hideAlertToken() {
    this.props.logOut();
  }

  deleteRecordFile(record) {
    this.setState({
      dokumen_id: record,
    });
    this.props.showConfirmDel(true);
  }
  deleteKtp() {
    console.log('delete')
    this.setState({
      ktpTemp: "",
    });
  }
  handleDelete = async () => {
    this.props.onDelete(this.state.dokumen_id);
    await this.sleep(300);
    this.props.getDPP();
  };
  handleClose() {
    this.props.closeModal();
    this.setState({
      dokumen_id: "",
    });
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  handleSubmit1 = async (action) => {
    var errors = this.state.errMsg1;

    errors.nama_depan = !this.props.user.nama_depan
      ? "Kolom ini harus diisi"
      : "";

    errors.kota_lahir = !this.props.user.kota_lahir
      ? "Kolom ini harus diisi"
      : "";
    errors.tanggal_lahir = !this.props.user.tanggal_lahir
      ? "Kolom ini harus diisi"
      : "";
    errors.jenis_identitas = !this.props.user.jenis_identitas
      ? "Kolom ini harus diisi"
      : "";
    errors.no_identitas = !this.props.user.no_identitas
      ? "Kolom ini harus diisi"
      : "";
    errors.npwp = !this.props.user.npwp ? "Kolom ini harus diisi" : "";
    errors.jenis_kelamin = !this.props.user.jenis_kelamin
      ? "Kolom ini harus diisi"
      : "";
    errors.status_pernikahan = !this.props.user.status_pernikahan
      ? "Kolom ini harus diisi"
      : "";
    errors.nama_pasangan =
      !this.props.user.nama_pasangan &&
      this.props.user.status_pernikahan === "Kawin"
        ? "Kolom ini harus diisi"
        : "";
    errors.nama_ibu_kandung = !this.props.user.nama_ibu_kandung
      ? "Kolom ini harus diisi"
      : "";
      errors.photo_ktp_download = !this.props.user.photo_ktp_download
      ? (!this.props.user.photo_ktp ? "Kolom ini harus diisi" : "" )
      : "";
    errors.alamat = !this.props.user.alamat ? "Kolom ini harus diisi" : "";
    errors.rt = !this.props.user.rt ? "Kolom ini harus diisi" : "";
    errors.rw = !this.props.user.rw ? "Kolom ini harus diisi" : "";
    errors.provinsi = !this.props.user.provinsi ? "Kolom ini harus diisi" : "";
    errors.warga_negara = !this.props.user.warga_negara
      ? "Kolom ini harus diisi"
      : "";
    errors.telp = !this.props.user.telp ? "Kolom ini harus diisi" : "";
    errors.handphone = !this.props.user.handphone
      ? "Kolom ini harus diisi"
      : "";
    errors.status_kepemilikan = !this.props.user.status_kepemilikan
      ? "Kolom ini harus diisi"
      : "";
    errors.agreement1 =
      !this.props.user.agreement1 || !this.props.user.no_identitas
        ? "Kolom ini harus diisi"
        : "";

    errors.npwp =
      this.props.user.npwp && this.props.user.npwp.length < 15
        ? "NPWP harus 15 digit"
        : errors.npwp;
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg1)) {
      const saveData = {
        ...this.props.user,
        data_pribadi_id: this.props.user.data_pribadi_id,
        agree: "Y",
      };

      this.props.onSaveDataPribadi(saveData);
      await this.sleep(150);
      this.props.getDataPribadi();
      if (action === "detil_pribadi")
        this.setState({ active_tab: "exp_trading" });
    } else {
      this.scrollToError()
      console.error("Invalid Form");
    }
  };

  handleSubmit2 = async (action) => {
    var errors = this.state.errMsg2;
	errors.tujuan_pembukaan_rekening = !this.props.dataExpTrading.tujuan_pembukaan_rekening
      ? "Kolom ini harus diisi"
      : "";
    errors.agreement2 = !this.props.dataExpTrading.agreement2
      ? "Kolom ini harus diisi"
      : "";
    errors.pertanyaan2 =
      this.props.dataExpTrading.pertanyaan1 === "Y" &&
      this.props.dataExpTrading.pertanyaan2 === ""
        ? "Kolom ini harus diisi"
        : "";
    errors.pertanyaan4 =
      this.props.dataExpTrading.pertanyaan4 === "Y" ? "maaf" : "";
    errors.pertanyaan3 =
      this.props.dataExpTrading.pertanyaan3 === "Y" ? "maaf" : "";
    if (errors.pertanyaan4 || errors.pertanyaan3) {
      alert(
        "Maaf, berdasarkan peraturan anda tidak diperbolehkan membuka rekening pada perusahaan pialang berjangka"
      );
    }
    errors.pertanyaan6 =
      this.props.dataExpTrading.pertanyaan5 === "Y" &&
      this.props.dataExpTrading.pertanyaan6 === ""
        ? "Kolom ini harus diisi"
        : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg2)) {
      const saveData = {
        tujuan_pembukaan_rekening: this.props.dataExpTrading
          .tujuan_pembukaan_rekening
          ? this.props.dataExpTrading.tujuan_pembukaan_rekening
          : "",
        pertanyaan1: this.props.dataExpTrading.pertanyaan1
          ? this.props.dataExpTrading.pertanyaan1
          : "N",
        pertanyaan2: this.props.dataExpTrading.pertanyaan2
          ? this.props.dataExpTrading.pertanyaan2
          : "",
        pertanyaan3: this.props.dataExpTrading.pertanyaan3
          ? this.props.dataExpTrading.pertanyaan3
          : "N",
        pertanyaan4: this.props.dataExpTrading.pertanyaan4
          ? this.props.dataExpTrading.pertanyaan4
          : "N",
        pertanyaan5: this.props.dataExpTrading.pertanyaan5
          ? this.props.dataExpTrading.pertanyaan5
          : "N",
        pertanyaan6: this.props.dataExpTrading.pertanyaan6
          ? this.props.dataExpTrading.pertanyaan6
          : "",
        pengalaman_trading_id: this.props.dataExpTrading.pengalaman_trading_id
          ? this.props.dataExpTrading.pengalaman_trading_id
          : "",
        agree: "Y",
      };
      await this.props.onSaveDataTrading(saveData);
      this.props.getDataTrading();
      if (action === "detil_pribadi") this.setState({ active_tab: "kekayaan" });
    } else {
     
      this.scrollToError()
      console.error("Invalid Form");
    }
  };

  scrollToError = () => {
    const items = document.getElementsByClassName('badge-danger');
const visible = [...items].filter((el) => {
  // jQuery-like :visible selector
  return !!( el.offsetWidth || el.offsetHeight );
});

if (visible.length > 0) {
  window.scrollTo({
    top: items[0].offsetHeight,
    behavior: 'smooth'
  });
}
  }

  handleSubmit3 = async (action) =>{
    var errors = this.state.errMsg3;
    errors.pendapatan_pertahun = !this.props.dataKekayaan.pendapatan_pertahun
      ? "Kolom ini harus diisi"
      : "";
    errors.lokasi = !this.props.dataKekayaan.lokasi
      ? "Kolom ini harus diisi"
      : "";
    errors.agreement3 = !this.props.dataKekayaan.agreement3
      ? "Kolom ini harus diisi"
      : "";
    errors.njop = !this.props.dataKekayaan.njop ? "Kolom ini harus diisi" : "";
    errors.deposit_bank = !this.props.dataKekayaan.deposit_bank
      ? "Kolom ini harus diisi"
      : "";
    var njop = parseInt(
      this.props.dataKekayaan.njop
        ? this.props.dataKekayaan.njop.replace(/,/g, "")
        : 0
    );
    var deposit_bank = parseInt(
      this.props.dataKekayaan.deposit_bank
        ? this.props.dataKekayaan.deposit_bank.replace(/,/g, "")
        : 0
    );
    errors.njop =
      errors.njop === "" && njop < 100000000 ? "Min. 100.000.000" : errors.njop;

    errors.deposit_bank =
      errors.deposit_bank === "" && deposit_bank < 10000000
        ? "Min. 10.000.000"
        : errors.deposit_bank;

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg3)) {
      const saveData = {
        ...this.props.dataKekayaan,
        lainnya: parseInt(
          this.props.dataKekayaan.lainnya
            ? this.props.dataKekayaan.lainnya.replace(/,/g, "")
            : 0
        ),
        njop: parseInt(
          this.props.dataKekayaan.njop
            ? this.props.dataKekayaan.njop.replace(/,/g, "")
            : 0
        ),
        deposit_bank: parseInt(
          this.props.dataKekayaan.deposit_bank
            ? this.props.dataKekayaan.deposit_bank.replace(/,/g, "")
            : 0
        ),
      };
      await this.props.onSaveDataKekayaan(saveData);
	  this.props.getDataKekayaan();
      if (action === "detil_pribadi")
        this.setState({ active_tab: "kontak_darurat" });
    } else {
      this.scrollToError()
      console.error("Invalid Form");
    }
  }

  handleSubmit4 = async (action) => {
    var errors = this.state.errMsg4;
    var nama = this.props.user.nama_depan + " " + this.props.user.nama_belakang;
    nama = nama.toString().toLowerCase();
    errors.nama = !this.props.dataKontakDarurat.nama ? "Nama harus diisi" : "";
    errors.alamat = !this.props.dataKontakDarurat.alamat
      ? "Alamat harus diisi"
      : "";
    errors.kode_pos = !this.props.dataKontakDarurat.kode_pos
      ? "Kode Pos harus diisi"
      : "";
    errors.handphone = !this.props.dataKontakDarurat.handphone
      ? "Handphone harus diisi"
      : "";
    errors.hubungan = !this.props.dataKontakDarurat.hubungan
      ? "Hubungan harus diisi"
      : "";
    errors.telp = !this.props.dataKontakDarurat.telp ? "Telp. harus diisi" : "";
    errors.agreement4 = !this.props.dataKontakDarurat.agreement4
      ? "Kolom ini harus diisi"
      : "";
    if (errors.nama === "")
      errors.nama =
        this.props.dataKontakDarurat.nama === nama
          ? "Nama tidak boleh sama dengan informasi detail"
          : "";
    if (errors.telp === "")
      errors.telp =
        this.props.dataKontakDarurat.telp === this.props.user.telp
          ? "Telp tidak boleh sama dengan informasi detail"
          : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg4)) {
      const saveData = {
        ...this.props.dataKontakDarurat,
        agree: "Y",
      };
      await this.props.onSaveKontakDarurat(saveData);
      this.props.getDataKontakDarurat();
      if (action === "detil_pribadi")
        this.setState({ active_tab: "pekerjaan" });
    } else {
      this.scrollToError()
      console.error("Invalid Form");
    }
  };

  handleSubmit5 = async (action) => {
    var errors = this.state.errMsg5;
    errors.status_pekerjaan = !this.props.dataPekerjaan.status_pekerjaan
      ? "Harus diisi"
      : "";
    errors.nama_perusahaan = !this.props.dataPekerjaan.nama_perusahaan
      ? "Harus diisi"
      : "";
    errors.jenis_bisnis = !this.props.dataPekerjaan.jenis_bisnis
      ? "Harus diisi"
      : "";
    errors.jabatan = !this.props.dataPekerjaan.jabatan ? "Harus diisi" : "";
    errors.lama_bekerja = !this.props.dataPekerjaan.lama_bekerja
      ? "Harus diisi"
      : "";
    errors.alamat_kantor = !this.props.dataPekerjaan.alamat_kantor
      ? "Harus diisi"
      : "";
    errors.telp_kantor = !this.props.dataPekerjaan.telp_kantor
      ? "Harus diisi"
      : "";
    errors.agreement5 = !this.props.dataPekerjaan.agreement5
      ? "Kolom ini harus diisi"
      : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg5)) {
      const saveData = {
        ...this.props.dataPekerjaan,
        agree: "Y",
      };
      await this.props.onSaveDataPekerjaan(saveData);
      this.props.getDataPekerjaan();
      if (action === "detil_pribadi")
        this.setState({ active_tab: "detil_bank" });
    } else {
      console.error("Invalid Form");
    }
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
    errors.jenis_akun_bank = !this.props.dataAkunBank.jenis_akun_bank
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
      };
      await this.props.onSaveAkunBank(saveData);
      this.props.getDataAKunBank();
      if (action === "detil_pribadi")
        this.setState({ active_tab: "unggah_file" });
    } else {
      console.error("Invalid Form");
    }
  };

  handleSubmit7() {
    var errors = this.state.errMsg7;
    errors.agree =
      this.props.dokumenPribadiPernyataan.agree !== "Y"
        ? "Pilihan harus disetujui"
        : "";
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg7)) {
      const saveData = {
        data_pribadi_pernyataan_id:
          this.props.dokumenPribadiPernyataan.data_pribadi_pernyataan_id,
        agree: "Y",
      };
      this.props.onSaveDPP(saveData);
      this.props.history.push("/account-type");
    } else {
      this.scrollToError()
      console.error("Invalid Form");
    }
  }

  render() {
    const { Paragraph } = Placeholder;
    const {
      lastSegmentUrl,
      active_tab,
      errMsg1,
      errMsg2,
      errMsg3,
      errMsg4,
      errMsg5,
      errMsg6,
      errMsg7,
      ktpTemp,
    } = this.state;
    const {
      dataNegara,
      dataProvinsi,
      dataBank,
      docPribadi,
      user,
      dataKekayaan,
      dataExpTrading,
      dataKontakDarurat,
      dataPekerjaan,
      dataAkunBank,
      errorMessage,
      errUplFileMsg,
      isFetchingUpl,
      errFetchUserByToken,
      dokumenPribadiPernyataan,
      isUploadingKTP,
      unggahFileName,
    } = this.props;
    const nilai_njop = dataKekayaan.njop
      ? parseInt(dataKekayaan.njop.replace(/,/g, ""))
      : 0;
    const deposit_bank = dataKekayaan.deposit_bank
      ? parseInt(dataKekayaan.deposit_bank.replace(/,/g, ""))
      : 0;

    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan menghapus file ini ?</div>',
        }}
      />
    );

    return (
      <div className="content-wrapper pr-2">
        <section className="content">
          <div className="max-w-full px-3">
            <div className="content-area__edge">
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

            <div class="mobile-hide">
              <h1
                style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}
                className="text-gray-500"
              >
                Registrasi Akun Online
              </h1>
            </div>

            <div class="mobile-view">
              <h1
                style={{ marginBottom: 10, fontSize: 22, marginLeft: 10 }}
                className="text-gray-500"
              >
                Registrasi Akun Online
              </h1>
            </div>

            {errFetchUserByToken ? (
              <div
                className="alert alert-danger alert-sm"
                style={{ marginTop: ".3rem" }}
              >
                <button
                  onClick={this.hideAlertToken.bind(this)}
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <span className="fw-semi-bold">{errFetchUserByToken}</span>
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-12">
                {/* card start */}

                <div
                  className="card card-success shadow-lg"
                  style={{ borderRadius: "2rem" }}
                >
                  <div className="card-body">
                    <Nav
                      appearance="subtle"
                      activeKey={active_tab}
                      justified
                      className="tab_personal"
                    >
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "detil_pribadi" ? true : false}
                        eventKey="detil_pribadi"
                        className="default border   border-white"
                      >
                        Detil Pribadi
                      </Nav.Item>
                      <Nav.Item
                        eventKey="exp_trading"
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "exp_trading" ? true : false}
                        className="default"
                        disabled={
                          user.data_pribadi_id && user.agree === "Y"
                            ? false
                            : true
                        }
                      >
                        Pengalaman Trading
                      </Nav.Item>
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "kekayaan" ? true : false}
                        eventKey="kekayaan"
                        className="default"
                        disabled={
                          dataExpTrading.pengalaman_trading_id ? false : true
                        }
                      >
                        Kekayaan Pribadi
                      </Nav.Item>
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "kontak_darurat" ? true : false}
                        eventKey="kontak_darurat"
                        className="default"
                        disabled={dataKekayaan.kekayaan_id ? false : true}
                      >
                        Kontak Darurat
                      </Nav.Item>
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "pekerjaan" ? true : false}
                        eventKey="pekerjaan"
                        className="default"
                        disabled={dataKontakDarurat.kontak_id ? false : true}
                      >
                        Pekerjaan
                      </Nav.Item>
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "detil_bank" ? true : false}
                        eventKey="detil_bank"
                        className="default"
                        disabled={dataPekerjaan.pekerjaan_id ? false : true}
                      >
                        Detil Bank
                      </Nav.Item>
                      <Nav.Item
                        onSelect={this.handleSelect.bind(this)}
                        active={active_tab === "unggah_file" ? true : false}
                        eventKey="unggah_file"
                        className="default"
                        disabled={dataAkunBank.akun_bank_id ? false : true}
                      >
                        Unggah Dokumen
                      </Nav.Item>
                    </Nav>
                    {active_tab === "detil_pribadi" && (
                      <Fragment>
                        <div
                          className="grid lg:grid-cols-2 place-items-center py-2 px-2 rounded-2xl border-gray-700 mt-4 gap-4"
                          style={{ border: "2px solid #ddd" }}
                        >
                          <div className="w-full p-4 h-32 text-center justify-center font-bold text-lg text-black">
                            <div className="grid grid-cols-1 justify-items-center">
                              <div className="col-span-2">Unggah KTP/KITAS</div>
                              <div className="text-center mt-3 ">
                                <Form>
                                  <Form.Group controlId="KTP">
                                    <Form.File
                                      style={{ width: 118 }}
                                      className="custom-file-input3"
                                      size="lg"
                                      name="KTP"
                                      setfieldvalue=""
                                      onChange={this.handleChangePhoto.bind(
                                        this
                                      )}
                                    ></Form.File>
                                    {errMsg1.photo_ktp_download ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg1.photo_ktp_download}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Form.Group>
                                </Form>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 bg-zinc-100 p-4 rounded-2xl w-full h-auto justify-items-center">
                            <div className="w-[100%]">
                              <div className="grid lg:grid-cols-3 gap-3 lg:gap-10 ">
                                <div>
                                  <div className="grid grid-cols-1">
                                    <div className="font-bold text-black">
                                      FILE
                                    </div>
                                    <div className="pt-2">
                                      <img
                                        style={{maxWidth:"100%"}}
                                        src={
                                          this.props.user.photo_ktp_download ? this.props.user.photo_ktp_download : (user.photo_ktp ? user.photo_ktp: photo_ktp)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <div className="grid grid-cols-1 lg:justify-items-center">
                                    <div className="font-bold text-black">
                                      TIPE
                                    </div>
                                    <div className="text-bold pt-2">KTP</div>
                                  </div>
                                </div>

                                <div>
                                  <div className="grid grid-cols-1 ">
                                    <div className="font-bold text-black text-left">
                                      TINDAKAN
                                    </div>
                                    <div className="pt-2">
                                      <div className="mobile-hide">
                                        <div className="flex justify-start">
                                          {/* <div className="mr-3">
                                            
                                              <img
                                                src={close1}
                                                onClick={()=> this.deleteKtp()}
                                                style={{cursor:"pointer"}}
                                                width="25px"
                                              />
                                           
                                          </div> */}
                                          <div className="mr-3">
                                            <a
                                              href={
                                                user.photo_ktp || ktpTemp
                                              }
                                            >
                                              <img
                                                src={unduh_ijo}
                                                width="25px"
                                              />
                                            </a>
                                          </div>
                                          <div className="mr-3">
                                            <a
                                              href={
                                                user.photo_ktp || ktpTemp
                                              }
											
                        onClick={()=> {window.open(user.photo_ktp || ktpTemp,'_blank');return false;}}
                                            >
                                              <img
                                                src={see_icon}
                                                width="25px"
                                              />
                                            </a>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="mobile-view">
                                        <div className="flex justify-start">
                                          {/* <div className="mr-3">
                                            <img
                                              src={close1}
                                              width="25px"
                                              onClick={()=> this.deleteKtp()}
                                              style={{cursor:"pointer"}}
                                            />
                                          </div> */}
                                          <div className="mr-3">
                                            <a
                                              href={
                                                user.photo_ktp || ktpTemp
                                              }
                                            >
                                              <img
                                                src={unduh_ijo}
                                                width="25px"
                                              />
                                            </a>
                                          </div>
                                          <div className="mr-3">
                                            <a
                                              href={
                                                user.photo_ktp || ktpTemp
                                              }
                                            >
                                              <img
                                                src={see_icon}
                                                width="25px"
                                              />
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
                        </div>

                        <Form >
                          <div style={{ paddingLeft: 20, paddingRight: 20 }} >
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
                                    Detil Pribadi
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
                                    Detil Pribadi
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Form.Row ref={this.scrollDivFormDetilPribadi}>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="nama_depan"
                              >
                                <Form.Control
                                  value={user.nama_depan ? user.nama_depan : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="nama_depan"
                                  type="text"
                                  required
                                  placeholder="Nama Lengkap"
                                />
                                {errMsg1.nama_depan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.nama_depan}
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
                                controlId="kota_lahir"
                              >
                                <Form.Control
                                  value={user.kota_lahir ? user.kota_lahir : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="kota_lahir"
                                  type="text"
                                  required
                                  placeholder="Kota Kelahiran Sesuai Dengan Identitas"
                                />
                                {errMsg1.kota_lahir ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.kota_lahir}
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
                                lg={3}
                                controlId="tanggal_lahir"
                              >
                                <Datetime
                                  closeOnSelect={true}
                                  timeFormat={false}
                                  setViewDate={
                                    user.tanggal_lahir
                                      ? new Date(user.tanggal_lahir)
                                      : new Date()
                                  }
                                  value={
                                    user.tanggal_lahir
                                      ? new Date(user.tanggal_lahir)
                                      : ""
                                  }
                                  onChange={this.handleChangeStartDate}
                                  inputProps={{
                                    readOnly: true,
                                    autoComplete: "off",
                                    placeholder: "Tanggal Lahir",
                                    name: "tanggal_lahir",
                                    className: "form-control form-control-lg",
                                  }}
                                  renderView={(
                                    mode,
                                    renderDefault,
                                    tanggal_lahir
                                  ) =>
                                    this.renderView(
                                      mode,
                                      renderDefault,
                                      "tanggal_lahir"
                                    )
                                  }
                                  locale="id"
                                  isValidDate={this.state.validSd}
                                />
                                {errMsg1.tanggal_lahir ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.tanggal_lahir}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={3}
                                controlId="jenis_identitas"
                              >
                                <Form.Control
                                  name="jenis_identitas"
                                  size="lg"
                                  value={
                                    user.jenis_identitas
                                      ? user.jenis_identitas
                                      : ""
                                  }
                                  onChange={this.handleChange}
                                  as="select"
                                >
                                  <option value="">Nomor identifikasi</option>
                                  <option value="KTP">KTP</option>
                                  <option value="SIM">SIM</option>
                                  <option value="Passpor">Passport</option>
                                </Form.Control>
                                {errMsg1.jenis_identitas ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.jenis_identitas}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={3}
                                controlId="no_identitas"
                              >
                                <Form.Control
                                  maxLength={
                                    user.jenis_identitas === "KTP"
                                      ? "16"
                                      : user.jenis_identitas === "SIM"
                                      ? "15"
                                      : user.jenis_identitas === "Passpor"
                                      ? "20"
                                      : ""
                                  }
                                  value={
                                    user.no_identitas ? user.no_identitas : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="no_identitas"
                                  type="text"
                                  placeholder="No Identitas"
                                  required
                                />
                                {errMsg1.no_identitas ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.no_identitas}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={3}
                                controlId="handphone"
                              >
                                <NumberFormat
                                  value={user.handphone ? user.handphone : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="handphone"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="No Handphone"
                                />

                                {errMsg1.handphone ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.handphone}
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
                                      Jenis Kelamin
                                    </h5>
                                    </Form.Row>
                            <Form.Row style={{marginLeft:0,marginBottom:'.8rem'}}>
                            
                              
                                <Form.Check
                                  onChange={this.handleChange}
                                  inline
                                  checked={
                                    user.jenis_kelamin === "Laki-Laki" ||
                                    user.jenis_kelamin === "LAKI-LAKI"
                                      ? "checked"
                                      : ""
                                  }
                                  value="Laki-Laki"
                                  type="radio"
                                  id="jenis_kelamin_laki"
                                  name="jenis_kelamin"
                                  label="Laki-laki"
                                />
                                <Form.Check
                                  onChange={this.handleChange}
                                  inline
                                  value="Perempuan"
                                  id="jenis_kelamin_perempuan"
                                  type="radio"
                                  checked={
                                    user.jenis_kelamin === "Perempuan" ||
                                    user.jenis_kelamin === "WANITA" ||
                                    user.jenis_kelamin === "PEREMPUAN"
                                      ? "checked"
                                      : ""
                                  }
                                  name="jenis_kelamin"
                                  label="Perempuan"
                                />
                                {errMsg1.jenis_kelamin ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.jenis_kelamin}
                                  </span>
                                ) : (
                                  ""
                                )}
                            </Form.Row>

                            <Form.Row>
                              <Form.Group as={Col} controlId="alamat">
                                <Form.Control
                                  value={user.alamat ? user.alamat : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="alamat"
                                  type="textarea"
                                  required
                                  placeholder="Alamat"
                                />
                                {errMsg1.alamat ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.alamat}
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
                                lg={2}
                                controlId="rt"
                              >
                                <NumberFormat
                                  value={user.rt ? user.rt : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="rt"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="RT"
                                />

                                {errMsg1.rt ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.rt}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={2}
                                controlId="rw"
                              >
                                <NumberFormat
                                  value={user.rw ? user.rw : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="rw"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="RW"
                                />

                                {errMsg1.rw ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.rw}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={3}
                                controlId="provinsi"
                              >
                                <Form.Control
                                  value={user.provinsi ? user.provinsi : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="provinsi"
                                  type="text"
                                  required
                                  placeholder="Kota"
                                />
                                {errMsg1.provinsi ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.provinsi}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                controlId="status_kepemilikan"
                              >
                                <Form.Control
                                  name="status_kepemilikan"
                                  size="lg"
                                  value={
                                    user.status_kepemilikan
                                      ? user.status_kepemilikan
                                      : ""
                                  }
                                  onChange={this.handleChange}
                                  as="select"
                                >
                                  <option value="">
                                    Status Kepemilikan Rumah
                                  </option>
                                  <option value="Milik">Pribadi</option>
                                  <option value="Keluarga">Keluarga</option>
                                  <option value="Sewa/Kontrak">
                                    Sewa/Kontrak
                                  </option>
                                </Form.Control>
                                {errMsg1.status_kepemilikan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.status_kepemilikan}
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
                                lg={4}
                                controlId="warga_negara"
                              >
                                <Form.Control
                                  name="warga_negara"
                                  size="lg"
                                  value={
                                    user.warga_negara ? user.warga_negara : ""
                                  }
                                  onChange={this.handleChange}
                                  as="select"
                                >
                                  <option value="">Kewarganegaraan</option>
                                  {dataNegara
                                    ? dataNegara.map(function (neg) {
                                        return (
                                          <option
                                            value={neg.nama_negara}
                                            key={neg.nama_negara}
                                          >
                                            {neg.nama_negara}
                                          </option>
                                        );
                                      })
                                    : ""}
                                  <option value="Lainnya(Others)">
                                    Lainnya(Others)
                                  </option>
                                </Form.Control>
                                {errMsg1.warga_negara ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.warga_negara}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={4}
                                controlId="status_pernikahan"
                              >
                                <Form.Control
                                  name="status_pernikahan"
                                  size="lg"
                                  value={
                                    user.status_pernikahan
                                      ? user.status_pernikahan
                                      : ""
                                  }
                                  onChange={this.handleChange}
                                  as="select"
                                >
                                  <option value="">Status Pernikahan</option>
                                  <option value="Belum Kawin">
                                    Belum Kawin
                                  </option>
                                  <option value="Kawin">Kawin</option>
                                  <option value="Cerai">Cerai</option>
                                  <option value="Janda/Duda">Janda/Duda</option>
                                </Form.Control>
                                {errMsg1.status_pernikahan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.status_pernikahan}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              {user.status_pernikahan === "Kawin" && (
                                <Fragment>
                                  <Form.Group
                                    as={Col}
                                    xs={12}
                                    lg={4}
                                    controlId="nama_pasangan"
                                  >
                                    <Form.Control
                                      value={
                                        user.nama_pasangan
                                          ? user.nama_pasangan
                                          : ""
                                      }
                                      autoComplete="off"
                                      onChange={this.handleChange}
                                      size="lg"
                                      name="nama_pasangan"
                                      type="text"
                                      required
                                      placeholder="Nama Pasangan"
                                    />
                                    {errMsg1.nama_pasangan ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg1.nama_pasangan}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Form.Group>
                                </Fragment>
                              )}

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={4}
                                controlId="nama_ibu_kandung"
                              >
                                <Form.Control
                                  value={
                                    user.nama_ibu_kandung
                                      ? user.nama_ibu_kandung
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  size="lg"
                                  name="nama_ibu_kandung"
                                  type="text"
                                  required
                                  placeholder="Nama Gadis Ibu Kandung"
                                />
                                {errMsg1.nama_ibu_kandung ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.nama_ibu_kandung}
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
                                lg={4}
                                controlId="telp"
                              >
                                <NumberFormat
                                  value={user.telp ? user.telp : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="telp"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="Telepon Rumah"
                                />

                                {errMsg1.telp ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.telp}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={4}
                                controlId="fax"
                              >
                                <NumberFormat
                                  value={user.fax ? user.fax : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="fax"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="FAX"
                                />
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={4}
                                controlId="npwp"
                              >
                                <NumberFormat
                                  value={user.npwp ? user.npwp : ""}
                                  autoComplete="off"
                                  onChange={this.handleChange}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="npwp"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  maxLength={15}
                                  required
                                  placeholder="NPWP"
                                />
                                {errMsg1.npwp ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg1.npwp}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
                            </Form.Row>
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
                                  <label>
                                    <input
                                      checked={user.agreement1 ? true : false}
                                      onChange={this.handleChange}
                                      value={1}
                                      className="form-check-input"
                                      type="checkbox"
                                      name="agreement1"
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
                                  {errMsg1.agreement1 ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg1.agreement1}
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
                                      onClick={this.handleSubmit1.bind(
                                        this,
                                        "detil_pribadi"
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
                                      Selanjutnya
                                    </AppButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}
                    {active_tab === "exp_trading" && (
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
                                    Pengalaman Trading
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
                                    Pengalaman Trading
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Form.Row>
                              <Form.Group
                                as={Col}
                                controlId="tujuan_pembukaan_rekening"
                              >
                                <Form.Control
                                  name="tujuan_pembukaan_rekening"
                                  size="lg"
                                  value={
                                    dataExpTrading.tujuan_pembukaan_rekening
                                      ? dataExpTrading.tujuan_pembukaan_rekening
                                      : ""
                                  }
                                  onChange={this.handleChangeTrading.bind(this)}
                                  as="select"
                                >
                                  <option value="">
                                    Tujuan Pembukaan Rekening
                                  </option>
                                  <option value="Spekulasi">Spekulasi</option>
                                  <option value="Keuntungan">Keuntungan</option>
                                  <option value="Lindung Nilai">
                                    Lindung Nilai
                                  </option>
                                  <option value="Lainnya">Lainnya</option>
                                </Form.Control>
								{errMsg2.tujuan_pembukaan_rekening ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg2.tujuan_pembukaan_rekening}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                              </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={6}
                                lg={3}
                                controlId="pertanyaan1"
                              >
                                <Form.Label>Pengalaman Trading</Form.Label>
                                <br />

                                <Form.Check
                                  onChange={this.handleChangeTrading.bind(this)}
                                  inline
                                  type="switch"
                                  value="Y"
                                  label={
                                    dataExpTrading.pertanyaan1 === "Y"
                                      ? "Ya"
                                      : "Tidak"
                                  }
                                  id="pengalaman-trading-pertanyaan1"
                                  name="pertanyaan1"
                                  checked={
                                    dataExpTrading.pertanyaan1 === "Y"
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </Form.Group>
                              {dataExpTrading.pertanyaan1 === "Y" ? (
                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="pertanyaan2"
                                >
                                  <Form.Label>
                                    Pengalaman Trading anda Sebelumnya di
                                  </Form.Label>
                                  
                                  <Form.Control
                                    value={
                                      dataExpTrading.pertanyaan2
                                        ? dataExpTrading.pertanyaan2
                                        : ""
                                    }
                                    autoComplete="off"
                                    onChange={this.handleChangeTrading.bind(
                                      this
                                    )}
                                    size="lg"
                                    name="pertanyaan2"
                                    type="text"
                                    required
                                    placeholder="Nama Perusahaan/Brand"
                                  />

								{errMsg2.pertanyaan2 ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg2.pertanyaan2}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>
                              ) : (
                                ""
                              )}
                            </Form.Row>

                            <Form.Row>
                              <Form.Group as={Col} controlId="pertanyaan3">
                                <Form.Label>
                                  Apakah Anda memiliki keluarga yang bekerja di
                                  BAPPEBTI / BBJ / KBI / BKDI / ISI Clearing?
                                </Form.Label>
                                <br />

                                <Form.Check
                                  onChange={this.handleChangeTrading.bind(this)}
                                  inline
                                  type="switch"
                                  value="Y"
                                  id="memiliki-keluarga-pertanyaan3"
                                  label={
                                    dataExpTrading.pertanyaan3 === "Y"
                                      ? "Ya"
                                      : "Tidak"
                                  }
                                  name="pertanyaan3"
                                  checked={
                                    dataExpTrading.pertanyaan3 === "Y"
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group as={Col} controlId="pertanyaan4">
                                <Form.Label>
                                  Apakah Anda telah dinyatakan pailit oleh
                                  Pengadilan?
                                </Form.Label>
                                <br />
                                <Form.Check
                                  onChange={this.handleChangeTrading.bind(this)}
                                  inline
                                  type="switch"
                                  value="Y"
                                  id="pailit-pertanyaan4"
                                  label={
                                    dataExpTrading.pertanyaan4 === "Y"
                                      ? "Ya"
                                      : "Tidak"
                                  }
                                  name="pertanyaan4"
                                  checked={
                                    dataExpTrading.pertanyaan4 === "Y"
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={4}
                                controlId="pertanyaan5"
                              >
                                <Form.Label>
                                  Memiliki pengalaman perdagangan dalam
                                  Perdagangan Berjangka
                                </Form.Label>
                                <br />

                                <Form.Check
                                  onChange={this.handleChangeTrading.bind(this)}
                                  inline
                                  type="switch"
                                  value="Y"
                                  label={
                                    dataExpTrading.pertanyaan5 === "Y"
                                      ? "Ya"
                                      : "Tidak"
                                  }
                                  name="pertanyaan5"
                                  id="pengalaman-pertanyaan5"
                                  checked={
                                    dataExpTrading.pertanyaan5 === "Y"
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </Form.Group>
                              {dataExpTrading.pertanyaan5 === "Y" ? (
                                <Form.Group
                                  as={Col}
                                  xs={12}
                                  lg={6}
                                  controlId="pertanyaan6"
                                >
                                  <Form.Label>
                                    Pengalaman Trading Berjangka Anda Sebelumnya
                                    di
                                  </Form.Label>

                                  <Form.Control
                                    value={
                                      dataExpTrading.pertanyaan6
                                        ? dataExpTrading.pertanyaan6
                                        : ""
                                    }
                                    autoComplete="off"
                                    onChange={this.handleChangeTrading.bind(
                                      this
                                    )}
                                    size="lg"
                                    name="pertanyaan6"
                                    type="text"
                                    required
                                    placeholder="Nama Perusahaan/Brand"
                                  />
                                  {errMsg2.pertanyaan6 ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg2.pertanyaan6}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Form.Group>
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
                                          dataExpTrading.agreement2
                                            ? true
                                            : false
                                        }
                                        onChange={this.handleChangeTrading.bind(
                                          this
                                        )}
                                        value={1}
                                        className="form-check-input"
                                        type="checkbox"
                                        name="agreement2"
                                      />
                                      <div className="form-check-text">
                                        Dengan mencentang kotak ini, saya dengan
                                        ini mengakui bahwa semua informasi dan
                                        dokumen yang disediakan dalam aplikasi
                                        online untuk pembukaan akun transaksi
                                        adalah benar dan valid. Saya dengan ini
                                        bertanggung jawab penuh atas setiap
                                        kerusakan / kerugian di masa depan
                                        sebagai akibat dari informasi palsu dari
                                        dokumen yang saya sediakan.
                                      </div>
                                    </label>
                                    {errMsg2.agreement2 ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg2.agreement2}
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
                                        onClick={this.handleSubmit2.bind(
                                          this,
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}

                    {active_tab === "kekayaan" && (
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
                                    Kekayaan Pribadi
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
                                    Kekayaan Pribadi
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="pendapatan_pertahun"
                              >
                                <Form.Control
                                  name="pendapatan_pertahun"
                                  size="lg"
                                  value={
                                    dataKekayaan.pendapatan_pertahun
                                      ? dataKekayaan.pendapatan_pertahun
                                      : ""
                                  }
                                  onChange={this.handleChangeKekayaan.bind(
                                    this
                                  )}
                                  as="select"
                                >
                                  <option value="">Pendapatan Per Tahun</option>
                                  {
                                    this.props.dataRejDocument[0]?.data_field[0]?.option.map((el,key)=>(
                                      <option value={el.value} key={"pendapatan-pertahun-"+key}>
                                    {el.text}
                                  </option>
                                    ))
                                  }
                                
                                </Form.Control>
                                {errMsg3.pendapatan_pertahun ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg3.pendapatan_pertahun}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="lokasi"
                              >
                                <Form.Control
                                  value={
                                    dataKekayaan.lokasi
                                      ? dataKekayaan.lokasi
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKekayaan.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="lokasi"
                                  type="text"
                                  required
                                  placeholder="Lokasi Rumah"
                                />
                                {errMsg3.lokasi ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg3.lokasi}
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
                                controlId="njop"
                              >
                                <NumberFormat
                                  value={
                                    dataKekayaan.njop ? dataKekayaan.njop : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKekayaan.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="njop"
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  inputMode="numeric"
                                  placeholder="Nilai NJOP Rumah"
                                />
                                {errMsg3.njop ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg3.njop}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="deposit_bank"
                              >
                                <NumberFormat
                                  value={
                                    dataKekayaan.deposit_bank
                                      ? dataKekayaan.deposit_bank
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKekayaan.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="deposit_bank"
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  inputMode="numeric"
                                  placeholder="Jumlah Simpanan Bank"
                                />
                                {errMsg3.deposit_bank ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg3.deposit_bank}
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
                                controlId="jml_total"
                              >
                                <NumberFormat
                                  value={nilai_njop + deposit_bank}
                                  autoComplete="off"
                                  size="lg"
                                  name="jml_total"
                                  className="form-control form-control-lg"
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  inputMode="numeric"
                                  readOnly
                                  placeholder="Jumlah Total"
                                />
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="lainnya"
                              >
                                <NumberFormat
                                  value={
                                    dataKekayaan.lainnya
                                      ? dataKekayaan.lainnya
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKekayaan.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="lainnya"
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  inputMode="numeric"
                                  placeholder="Jumlah Kekayaan Lainnya"
                                />
                              </Form.Group>
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
                                          dataKekayaan.agreement3 ? true : false
                                        }
                                        onChange={this.handleChangeKekayaan.bind(
                                          this
                                        )}
                                        value={1}
                                        className="form-check-input"
                                        type="checkbox"
                                        name="agreement3"
                                      />
                                      <div className="form-check-text">
                                        Dengan mencentang kotak ini, saya dengan
                                        ini mengakui bahwa semua informasi dan
                                        dokumen yang disediakan dalam aplikasi
                                        online untuk pembukaan akun transaksi
                                        adalah benar dan valid. Saya dengan ini
                                        bertanggung jawab penuh atas setiap
                                        kerusakan / kerugian di masa depan
                                        sebagai akibat dari informasi palsu dari
                                        dokumen yang saya sediakan.
                                      </div>
                                    </label>
                                    {errMsg3.agreement3 ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg3.agreement3}
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
                                        onClick={this.handleSubmit3.bind(
                                          this,
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}

                    {active_tab === "kontak_darurat" && (
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
                                    Kontak Darurat
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
                                    Kontak Darurat
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="nama"
                              >
                                <Form.Control
                                  value={
                                    dataKontakDarurat.nama
                                      ? dataKontakDarurat.nama
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="nama"
                                  type="text"
                                  required
                                  placeholder="Nama"
                                />
                                {errMsg4.nama ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.nama}
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
                                lg={12}
                                controlId="alamatt"
                              >
                                <Form.Control
                                  value={
                                    dataKontakDarurat.alamat
                                      ? dataKontakDarurat.alamat
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="alamatt"
                                  type="text"
                                  required
                                  placeholder="Alamat"
                                />
                                {errMsg4.alamat ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.alamat}
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
                                controlId="kode_pos"
                              >
                                <NumberFormat
                                  value={
                                    dataKontakDarurat.kode_pos
                                      ? dataKontakDarurat.kode_pos
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="kode_pos"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="Kode Pos"
                                />
                                {errMsg4.kode_pos ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.kode_pos}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="telpp"
                              >
                                <NumberFormat
                                  value={
                                    dataKontakDarurat.telp
                                      ? dataKontakDarurat.telp
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="telp"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="No. Telepon"
                                />

                                {errMsg4.telp ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.telp}
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
                                controlId="handphone"
                              >
                                <NumberFormat
                                  value={
                                    dataKontakDarurat.handphone
                                      ? dataKontakDarurat.handphone
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="handphone"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="No. Handphone"
                                />
                                {errMsg4.handphone ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.handphone}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="hubungan"
                              >
                                <Form.Control
                                  name="hubungan"
                                  size="lg"
                                  value={
                                    dataKontakDarurat.hubungan
                                      ? dataKontakDarurat.hubungan
                                      : ""
                                  }
                                  onChange={this.handleChangeKontakDarurat.bind(
                                    this
                                  )}
                                  as="select"
                                >
                                  <option value="">Hubungan</option>
                                  <option value="Keluarga">Keluarga</option>
                                  <option value="Teman">Teman</option>
                                </Form.Control>
                                {errMsg4.hubungan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg4.hubungan}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>
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
                                          dataKontakDarurat.agreement4
                                            ? true
                                            : false
                                        }
                                        onChange={this.handleChangeKontakDarurat.bind(
                                          this
                                        )}
                                        value={1}
                                        className="form-check-input"
                                        type="checkbox"
                                        name="agreement4"
                                      />
                                      <div className="form-check-text">
                                        Dengan mencentang kotak ini, saya dengan
                                        ini mengakui bahwa semua informasi dan
                                        dokumen yang disediakan dalam aplikasi
                                        online untuk pembukaan akun transaksi
                                        adalah benar dan valid. Saya dengan ini
                                        bertanggung jawab penuh atas setiap
                                        kerusakan / kerugian di masa depan
                                        sebagai akibat dari informasi palsu dari
                                        dokumen yang saya sediakan.
                                      </div>
                                    </label>
                                    {errMsg4.agreement4 ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg4.agreement4}
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
                                        onClick={this.handleSubmit4.bind(
                                          this,
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}

                    {active_tab === "pekerjaan" && (
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
                                    Pekerjaan
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
                                    Pekerjaan
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="status_pekerjaan">
                                
                                <Form.Control
                                  name="status_pekerjaan"
                                  size="lg"
                                  value={
                                    dataPekerjaan.status_pekerjaan
                                      ? dataPekerjaan.status_pekerjaan
                                      : ""
                                  }
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  as="select"
                                >
                                  <option value="">Status Pekerjaan</option>
                                  <option value="Swasta">Swasta</option>
                                  <option value="Wiraswasta">Wiraswasta</option>
                                  <option value="Profesional">
                                    Profesional
                                  </option>
                                  <option value="Pegawai Negeri">
                                    Pegawai Negeri
                                  </option>
                                  <option value="BUMN">BUMN</option>
                                  <option value="Lainnya">Lainnya</option>
                                </Form.Control>
                                {errMsg5.status_pekerjaan ? (
                                  <span
                                    className="text-error badge badge-danger"
                                  >
                                    {errMsg5.status_pekerjaan}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="nama_perusahaan"
                              >
                                <Form.Control
                                  value={
                                    dataPekerjaan.nama_perusahaan
                                      ? dataPekerjaan.nama_perusahaan
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="nama_perusahaan"
                                  type="text"
                                  required
                                  placeholder="Nama Perusahaan"
                                />
                                {errMsg5.nama_perusahaan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.nama_perusahaan}
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
                                controlId="jenis_bisnis"
                              >
                                <Form.Control
                                  value={
                                    dataPekerjaan.jenis_bisnis
                                      ? dataPekerjaan.jenis_bisnis
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="jenis_bisnis"
                                  type="text"
                                  required
                                  placeholder="Jenis Bisnis"
                                />
                                {errMsg5.jenis_bisnis ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.jenis_bisnis}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="jabatan"
                              >
                                <Form.Control
                                  value={
                                    dataPekerjaan.jabatan
                                      ? dataPekerjaan.jabatan
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="jabatan"
                                  type="text"
                                  required
                                  placeholder="Posisi/Jabatan"
                                />
                                {errMsg5.jabatan ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.jabatan}
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
                                controlId="lama_bekerja"
                              >
                                <Form.Control
                                  name="lama_bekerja"
                                  size="lg"
                                  value={
                                    dataPekerjaan.lama_bekerja
                                      ? dataPekerjaan.lama_bekerja
                                      : ""
                                  }
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  as="select"
                                >
                                  <option value="">Lama Bekerja</option>
                                  <option value="1 Tahun">1 Tahun</option>
                                  <option value="1 - 5 Tahun">
                                    1 - 5 Tahun
                                  </option>
                                  <option value="> 5 Tahun">
                                    {" "}
                                    {">"} 5 Tahun
                                  </option>
                                </Form.Control>
                                {errMsg5.lama_bekerja ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.lama_bekerja}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={6}
                                controlId="pekerjaan_sebelumnya"
                              >
                                <Form.Control
                                  name="pekerjaan_sebelumnya"
                                  size="lg"
                                  value={
                                    dataPekerjaan.pekerjaan_sebelumnya
                                      ? dataPekerjaan.pekerjaan_sebelumnya
                                      : ""
                                  }
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  as="select"
                                >
                                  <option value="">
                                    Lama Bekerja Sebelumnya
                                  </option>
                                  <option value="1 Tahun">1 Tahun</option>
                                  <option value="1 - 5 Tahun">
                                    1 - 5 Tahun
                                  </option>
                                  <option value="> 5 Tahun">
                                    {" "}
                                    {">"} 5 Tahun
                                  </option>
                                </Form.Control>
                              </Form.Group>
                            </Form.Row>

                            <Form.Row>
                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={12}
                                controlId="alamat_kantor"
                              >
                                <Form.Control
                                  value={
                                    dataPekerjaan.alamat_kantor
                                      ? dataPekerjaan.alamat_kantor
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  size="lg"
                                  name="alamat_kantor"
                                  type="text"
                                  required
                                  placeholder="Alamat kantor"
                                />
                                {errMsg5.alamat_kantor ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.alamat_kantor}
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
                                lg={12}
                                controlId="telp_kantor"
                              >
                                <NumberFormat
                                  value={
                                    dataPekerjaan.telp_kantor
                                      ? dataPekerjaan.telp_kantor
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="telp_kantor"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="Nomor Telepon Kantor"
                                />
                                {errMsg5.telp_kantor ? (
                                  <span className="text-error badge badge-danger">
                                    {errMsg5.telp_kantor}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </Form.Group>

                              <Form.Group
                                as={Col}
                                xs={12}
                                lg={12}
                                controlId="fax_kantor"
                              >
                                <NumberFormat
                                  value={
                                    dataPekerjaan.fax_kantor
                                      ? dataPekerjaan.fax_kantor
                                      : ""
                                  }
                                  autoComplete="off"
                                  onChange={this.handleChangePekerjaan.bind(
                                    this
                                  )}
                                  className="form-control form-control-lg"
                                  size="lg"
                                  name="fax_kantor"
                                  thousandSeparator={false}
                                  decimalScale={0}
                                  inputMode="numeric"
                                  required
                                  placeholder="Nomor Fax Kantor"
                                />
                              </Form.Group>
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
                                          dataPekerjaan.agreement5
                                            ? true
                                            : false
                                        }
                                        onChange={this.handleChangePekerjaan.bind(
                                          this
                                        )}
                                        value={1}
                                        className="form-check-input"
                                        type="checkbox"
                                        name="agreement5"
                                      />
                                      <div className="form-check-text">
                                        Dengan mencentang kotak ini, saya dengan
                                        ini mengakui bahwa semua informasi dan
                                        dokumen yang disediakan dalam aplikasi
                                        online untuk pembukaan akun transaksi
                                        adalah benar dan valid. Saya dengan ini
                                        bertanggung jawab penuh atas setiap
                                        kerusakan / kerugian di masa depan
                                        sebagai akibat dari informasi palsu dari
                                        dokumen yang saya sediakan.
                                      </div>
                                    </label>
                                    {errMsg5.agreement5 ? (
                                      <span className="text-error badge badge-danger">
                                        {errMsg5.agreement5}
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
                                        onClick={this.handleSubmit5.bind(
                                          this,
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}

                    {active_tab === "detil_bank" && (
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
                            </Form.Row>

                            {/*  <Form.Row>
                                                        <Form.Group as={Col} controlId="no_telp">
                                                            <Form.Label>Nomor Telepon Bank</Form.Label>
                                                            <Form.Control
                                                                value={dataAkunBank.no_telp ? dataAkunBank.no_telp : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                size="lg"
                                                                name="no_telp"
                                                                type="text"
                                                                required
                                                                placeholder="Nomor Telepon Bank" />
                                                        </Form.Group>
                                                    </Form.Row> */}
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
                            <Form.Row  style={{marginLeft:0}}>
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
                                  id="jenis_akun_bank-pertanyaan5-1"
                                  value="Giro"
                                  type="radio"
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
                                  id="jenis_akun_bank-pertanyaan5-2"
                                  checked={
                                    dataAkunBank.jenis_akun_bank ===
                                    "Rekening tabungan"
                                      ? "checked"
                                      : ""
                                  }
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
                                  id="jenis_akun_bank-pertanyaan5-3"
                                  checked={
                                    dataAkunBank.jenis_akun_bank === "Lainnya"
                                      ? "checked"
                                      : ""
                                  }
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
                                        Dengan mencentang kotak ini, saya dengan
                                        ini mengakui bahwa semua informasi dan
                                        dokumen yang disediakan dalam aplikasi
                                        online untuk pembukaan akun transaksi
                                        adalah benar dan valid. Saya dengan ini
                                        bertanggung jawab penuh atas setiap
                                        kerusakan / kerugian di masa depan
                                        sebagai akibat dari informasi palsu dari
                                        dokumen yang saya sediakan.
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
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </Fragment>
                    )}

                    {active_tab === "unggah_file" && (
                      <Fragment>
                        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                          <br />
                          <span
                            className="text-2xl label_ijo"
                            style={{ fontSize: "28px", fontWeight: "bold" }}
                          >
                            Unggah Dokumen
                          </span>
                          <br />
                          <br />
                          <div className="row">
                            <div className="col-md-4">
                              <div
                                className="alert alert-success alert-sm"
                                style={{ backgroundColor: "#effbf3" }}
                              >
                                <h6 className="text-uppercase text-green mb-4">
                                  Catatan Penting
                                </h6>
                                <ul className="list-check">
                                  <li>KTP / SIM / Paspor</li>
                                  <li>Foto Selfie dengan KTP</li>
                                  <li className="with-no-style">
                                    <img src={selfie_ktp} style={{maxWidth:"100%"}}/>
                                  </li>
                                  <li>Foto Buku Tabungan</li>
                                  <li className="with-no-style">
                                    <img src={tabungan_book} style={{maxWidth:"100%"}}/>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div
                                className="alert alert-sm"
                                style={{
                                  backgroundColor: "#efefef",
                                  color: "#505f79",
                                  fontSize: "1rem",
                                  lineHeight: 1.5,
                                  fontWeight: 300,
                                }}
                              >
                                <div className="flex flex-col">
                                  <div className="mb-0">
                                    <h5
                                      style={{
                                        marginBottom: ".8rem",
                                        marginTop: ".8rem",
                                      }}
                                    >
                                      Unggah Foto Selfie
                                    </h5>
                                  </div>
                                  <div className="self-center">
                                    <Form>
                                      <Form.Group controlId="PHOTO">
                                        <Form.File
                                          style={{ width: 118 }}
                                          className="custom-file-input2"
                                          size="lg"
                                          name="PHOTO"
                                          setfieldvalue=""
                                          onChange={this.handleChangePhoto.bind(
                                            this
                                          )}
                                        ></Form.File>
                                      </Form.Group>
                                    </Form>
                                  </div>
                                </div>

                                <div className="flex flex-col">
                                  <div className="mb-0">
                                    <h5
                                      style={{
                                        marginBottom: "1.2rem",
                                        marginTop: ".8rem",
                                      }}
                                    >
                                      Cover Buku Tabungan
                                    </h5>
                                  </div>
                                  <div className="self-center mb-4">
                                    <Form>
                                      <Form.Group controlId="OTHER">
                                        <Form.File
                                          className="custom-file-input2"
                                          size="lg"
                                          style={{ width: 118 }}
                                          name="OTHER"
                                          setfieldvalue=""
                                          onChange={this.handleChangePhoto.bind(
                                            this
                                          )}
                                        ></Form.File>
                                      </Form.Group>
                                    </Form>
                                  </div>
                                </div>

                                
                              </div>
                              <br />

                              <div className="table-responsive" style={{width:"100%"}}>
                                <div className="mobile-hide ">
                                <table className="table table__document">
                                  <thead>
                                    <tr>
                                    <th style={{ width: "35%" }}>File</th>
                                        <th style={{ width: "15%" }}>Tipe</th>
                                        <th style={{ width: "25%" }}>Ukuran</th>
                                        <th style={{ width: "25%" }}>Tindakan</th>
                                      
                                    </tr>
                                  </thead>

                                  {isFetchingUpl ? (
                                    <tbody>
                                      <tr>
                                        <td colSpan="5">
                                          <Paragraph
                                            rowHeight={20}
                                            rowMargin={7}
                                            rows={1}
                                            active
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="5">
                                          <Paragraph
                                            rowHeight={20}
                                            rowMargin={7}
                                            rows={1}
                                            active
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  ) : (
                                    <Fragment>
                                      <tbody>
                                        {docPribadi
                                          ? docPribadi.map((dp, index) => {
                                              return (
                                                <tr key={dp.dokumen_id}>
                                                  <td>
                                                    <Figure>
                                                      <Figure.Image
                                                        width={150}
                                                        height={100}
                                                        alt=""
                                                        src={dp.file}
                                                      />
                                                    </Figure>
                                                  </td>
                                                  <td>
                                                    {dp.tipe === "OTHER"
                                                      ? "BUKU TABUNGAN"
                                                      : dp.tipe}
                                                  </td>
                                                  <td>{dp.size}kb</td>
                                                  <td align="center">
                                                    <IconButton
                                                      disabled={
                                                        dp.tipe === "KTP"
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={
                                                        dp.tipe !== "KTP"
                                                          ? this.deleteRecordFile.bind(
                                                              this,
                                                              dp.dokumen_id
                                                            )
                                                          : this.deleteRecordFile.bind(
                                                              this
                                                            )
                                                      }
                                                      icon={
                                                        <CloseIcon />
                                                      }
                                                    />
                                                    <br />
                                                    <a href={dp.file}>
                                                      <IconButton
                                                        style={{ marginTop: 5 }}
                                                        icon={
                                                          <FileDownloadIcon />
                                                        }
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              );
                                            })
                                          : ""}
                                      </tbody>
                                    </Fragment>
                                  )}
                                </table>
                                  </div>
                                  <div className="mobile-view ">
                                  <table className="table table__document">
                                  <thead>
                                    <tr>
                                        <th style={{ width: "45%" }}>Tipe</th>
                                        <th style={{ width: "25%" }}>Tindakan</th>
                                      
                                    </tr>
                                  </thead>

                                  {isFetchingUpl ? (
                                    <tbody>
                                      <tr>
                                        <td colSpan="5">
                                          <Paragraph
                                            rowHeight={20}
                                            rowMargin={7}
                                            rows={1}
                                            active
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="5">
                                          <Paragraph
                                            rowHeight={20}
                                            rowMargin={7}
                                            rows={1}
                                            active
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  ) : (
                                    <Fragment>
                                      <tbody>
                                        {docPribadi
                                          ? docPribadi.map((dp, index) => {
                                              return (
                                                <tr key={dp.dokumen_id}>
                                                
                                                  <td>
                                                    {dp.tipe === "OTHER"
                                                      ? "BUKU TABUNGAN"
                                                      : dp.tipe}
                                                  </td>
                                                  
                                                  <td align="center">
                                                    <IconButton
                                                      disabled={
                                                        dp.tipe === "KTP"
                                                          ? true
                                                          : false
                                                      }
                                                      onClick={
                                                        dp.tipe !== "KTP"
                                                          ? this.deleteRecordFile.bind(
                                                              this,
                                                              dp.dokumen_id
                                                            )
                                                          : this.deleteRecordFile.bind(
                                                              this
                                                            )
                                                      }
                                                      icon={
                                                        <CloseIcon />
                                                      }
                                                    />
                                                    <br />
                                                    <a href={dp.file}>
                                                      <IconButton
                                                        style={{ marginTop: 5 }}
                                                        icon={
                                                          <FileDownloadIcon />
                                                        }
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              );
                                            })
                                          : ""}
                                      </tbody>
                                    </Fragment>
                                  )}
                                </table>
                                  </div>
                              
                              </div>
                              {!unggahFileName ? (
                                <div className="alert alert-danger alert-sm">
                                  <span className="fw-semi-bold">
                                    Silahkan upload semua photo dengan lengkap
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="container__box p-4"
                          style={{
                            backgroundColor: "#fbfbfd",
                            margin: "1em -1.5em -1.5em",
                          }}
                        >
                          <div className="form-group">
                            <div className="form-check">
                              <div
                                style={{
                                  textAlign: "center",
                                  fontSize: "1.7rem",
                                  fontWeight: 600,
                                }}
                              >
                                <h2>PERNYATAAN KEBENARAN DAN TANGGUNG JAWAB</h2>
                              </div>

                              <div className="form-check-text">
                                Dengan mengisi kolom "YA" di bawah ini, saya
                                menyatakan bahwa semua informasi dan semua
                                dokumen yang saya lampirkan dalam{" "}
                                <b style={{ color: "#000" }}>
                                  APLIKASI PEMBUKAAN REKENING TRANSAKSI SECARA
                                  ELEKTRONIK ON-LINE
                                </b>{" "}
                                adalah benar dan tepat, Saya akan bertanggung
                                jawab penuh apabila dikemudian hari terjadi
                                sesuatu hal sehubungan dengan ketidakbenaran
                                data yang saya berikan.
                              </div>

                              <br />
                              <div className="form-group row align-items-center">
                                <div className="col-sm-6 col-md-3 ">
                                  Pernyataan Kebenaran Dan Tanggung Jawab
                                </div>
                                <div className="col-sm-6 col-md-9">
                               
                                  <Form.Group>
                                    <Form.Check
                                      inline
                                      onChange={this.handleChangeDPP.bind(this)}
                                      checked={
                                      
                                        dokumenPribadiPernyataan.agree == "Y"
                                          ? "checked"
                                          : ""
                                      }
                                      value="Y"
                                      type="radio"
                                      id="agree-ya"
                                      name="agree"
                                      label="Ya"
                                    />
                                    <Form.Check
                                      inline
                                      checked={
                                
                                        dokumenPribadiPernyataan.agree === "N"
                                          ? "checked"
                                          : ""
                                      }
                                      onChange={this.handleChangeDPP.bind(this)}
                                      value="N"
                                      type="radio"
                                      id="agree-tidak"
                                      name="agree"
                                      label="Tidak"
                                    />
                                  </Form.Group>
                                  {errMsg7.agree ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg7.agree}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>

                              <div className="form-group row align-items-center">
                                <div className="col">
                                  Menyatakan Pada Tanggal
                                </div>
                                <div className="col-sm-6 col-md-9">
                                  {dokumenPribadiPernyataan.tanggal
                                    ? dokumenPribadiPernyataan.tanggal
                                    : moment(new Date()).format("YYYY-MM-DD")}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 place-items-center">
                                <div className="form-group lg:w-2/3">
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

                                    <div className="form-group lg:w-[40%] text-center">
                                      <AppButton
                                        disabled={!unggahFileName}
                                        onClick={this.handleSubmit7.bind(
                                          this,
                                          "detil_pribadi"
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
                                        Selanjutnya
                                      </AppButton>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
                <AppModal
                  show={this.props.showFormDelete}
                  size="xs"
                  form={contentDelete}
                  handleClose={this.handleClose.bind(this)}
                  backdrop="static"
                  keyboard={false}
                  title="Delete"
                  titleButton="Delete"
                  themeButton="danger"
                  isLoading={this.props.isLoading}
                  formSubmit={this.handleDelete.bind(this)}
                ></AppModal>
                <AppModalLoading
                  show={isUploadingKTP}
                  size="sm"
                  backdrop="static"
                  keyboard={false}
                  title="Uploading . . ."
                ></AppModalLoading>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dataProvinsi: state.personal.dataProvinsi || [],
  dataNegara: state.personal.dataNegara || [],
  dataBank: state.personal.dataBank || [],
  docPribadi: state.personal.docPribadi || [],
  unggahFileName: state.personal.unggahFileName || false,
  dataExpTrading: state.personal.dataExpTrading || {},
  dataKekayaan: state.personal.dataKekayaan || {},
  dataKontakDarurat: state.personal.dataKontakDarurat || {},
  dataPekerjaan: state.personal.dataPekerjaan || {},
  dataAkunBank: state.personal.dataAkunBank || {},
  dokumenPribadiPernyataan: state.personal.dokumenPribadiPernyataan || {},
  isError: state.personal.isError,
  isFetchingUpl: state.personal.isFetchingUpl,
  errorMessage: state.personal.errorMessage,
  errUplFileMsg: state.personal.errUplFileMsg,
  showFormDelete: state.personal.showFormDelete,
  isLoading: state.personal.isLoading,
  errFetchUserByToken: state.main.errFetchUserByToken,
  dataRejDocument: state.rejDoc.dataRejDoc,
  isUploadingKTP: state.main.isUploadingKTP,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(fetchUserBytoken());
      dispatch(getExpTrading());
      dispatch(getKekayaan());
      dispatch(getKontakDarurat());
      dispatch(getPekerjaan());
      dispatch(getAkunBank());
      dispatch(getNegara());
      dispatch(getProvinsi());
      dispatch(getBank());
      dispatch(getDocPribadi());
      dispatch(getRejDoc());
    },
    changeProps: (data) => {
      dispatch(chgProps(data));
    },
    changePropsTrading: (data) => {
      dispatch(chgPropsExpTrading(data));
    },
    changePropsKekayaan: (data) => {
      dispatch(chgPropsKekayaan(data));
    },
    changePropsKontak: (data) => {
      dispatch(chgPropsKontakDarurat(data));
    },
    changePropsPekerjaan: (data) => {
      dispatch(chgPropsPekerjaan(data));
    },
    changePropsAkunBank: (data) => {
      dispatch(chgPropsAkunBank(data));
    },
    changePropsDPP: (data) => {
      dispatch(chgPropsDPP(data));
    },
    uploadFile: (data) => {
      dispatch(uplDocPribadi(data));
    },
    clearErr: () => {
      dispatch(clearState());
    },
    logOut: () => {
      dispatch(onLogout());
    },
    showConfirmDel: (data) => {
      dispatch(confirmDel(data));
    },
    closeModal: () => {
      dispatch(closeForm());
    },
    onDelete: (param) => {
      dispatch(delDocPribadi(param));
    },
    onSaveDataPribadi: (param) => {
      dispatch(profileUser());
      dispatch(simpanDataPribadi(param));
    },
    getDataPribadi: (param) => {
      dispatch(profileUser());
      dispatch(fetchUserBytoken());
    },
    onSaveDataTrading: async (param) => {
      dispatch(profileUser());
      await dispatch(simpanDataExpTrading(param));
    },
    getDataTrading: async () => {
      dispatch(profileUser());
      await dispatch(getExpTrading());
    },
    onSaveDataKekayaan: (param) => {
      dispatch(profileUser());
      dispatch(simpanDataKekayaan(param));      
    },
	getDataKekayaan: (param) => {      
      dispatch(getKekayaan());
    },
    onSaveKontakDarurat: (param) => {
      dispatch(profileUser());
      dispatch(simpanKontakDarurat(param));
    },
    getDataKontakDarurat: async () => {
      dispatch(profileUser());
      await dispatch(getKontakDarurat());
    },
    onSaveDataPekerjaan: async (param) => {
      dispatch(profileUser());
      await dispatch(simpanDataPekerjaan(param));
    },
    getDataPekerjaan: async () => {
      dispatch(profileUser());
      await dispatch(getPekerjaan());
    },
    onSaveAkunBank: async (param) => {
      dispatch(profileUser());
      await dispatch(simpanAkunBank(param));
    },
    getDataAKunBank: async () => {
      dispatch(profileUser());
      await dispatch(getAkunBank());
    },
    onSaveDPP: (param) => {
      dispatch(profileUser());
      dispatch(simpanDPP(param));
    },
    getDPP: async () => {
      dispatch(profileUser());
      await dispatch(getDocPribadi());
    },
    onUploadKTP: async (param) => {
      dispatch(fetchUserKTP(param));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Personal);
