import React, { Component, Fragment } from 'react'
import { Icon, IconButton, Nav, Placeholder } from 'rsuite';
import { connect } from 'react-redux';
import { Button, Col, Figure, Form } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import {
    getNegara, getProvinsi, getBank, getExpTrading, getKekayaan, getKontakDarurat, getPekerjaan, getAkunBank,
    chgPropsExpTrading, chgPropsKontakDarurat, chgPropsAkunBank, chgPropsKekayaan, chgPropsPekerjaan, chgPropsDPP,
    getDocPribadi, clearState, confirmDel, closeForm,
    uplDocPribadi, delDocPribadi, simpanDataPribadi, simpanDataExpTrading,
    simpanDataKekayaan, simpanKontakDarurat, simpanDataPekerjaan, simpanAkunBank, simpanDPP
} from './personalSlice'
import { fetchUserBytoken, chgProps, onLogout } from '../main/mainSlice'
import moment from 'moment';
import "moment/locale/id";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import AppModal from '../../components/modal/MyModal';
import AppButton from '../../components/button/Button';

var yesterday = moment().subtract(40, 'years');
var valid_startDate = function (current) {
    return current.isAfter(yesterday);
};

class Personal extends Component {
    constructor(props) {
        super(props);
        this.initDataPribadi = {
            agreement1: '',
        }
        this.initDataExpTrading = {
            agreement2: '',
        }
        this.initDataKekayaan = {
            agreement3: '',
        }
        this.initDataKontakDarurat = {
            agreement4: '',
            nama: '',
            telp: ''
        }
        this.initPekerjaan = {
            agreement5: '',
        }
        this.initAkunBank = {
            agreement6: '',
        }
        this.initDPP = {
            agree: '',
        }
		
        this.state = {
            validSd: valid_startDate,
            validEd: valid_startDate,
            lastSegmentUrl: "",
            active_tab: "detil_pribadi",
            dokumen_id: '',
            errMsg1: this.initDataPribadi,
            errMsg2: this.initDataExpTrading,
            errMsg3: this.initDataKekayaan,
            errMsg4: this.initDataKontakDarurat,
            errMsg5: this.initPekerjaan,
            errMsg6: this.initAkunBank,
            errMsg7: this.initDPP,
			
        }
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    handleSelect(activeKey) {
        this.setState({ active_tab: activeKey });		
    }
	
	

    handleChangeStartDate(date) {
        const dt = {};
        if (date) {
            const selectedDate = new Date(date);
            const _date = moment(selectedDate).format('YYYY-MM-DD');
            dt['key'] = "tanggal_lahir";
            dt['value'] = _date;
        } else {
            dt['key'] = "tanggal_lahir";
            dt['value'] = '';
        }
        this.props.changeProps(dt);
    }

    renderView(mode, renderDefault, name) {
        // Only for years, months and days view
        if (mode === "time") return renderDefault();

        return (
            <div className="wrapper">
                {renderDefault()}
                <div className="controls">
                    <Button variant="warning" type="button" onClick={() => this.clear(name)}>Clear</Button>
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
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleChangeTrading(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};

        if (name === "agreement2") {
            value = evt.target.checked ? 1 : 0;
        }

        dt['key'] = name;
        dt['value'] = value;

        this.props.changePropsTrading(dt);
    }

    handleChangeKekayaan(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        if (name === "agreement3") {
            value = evt.target.checked ? 1 : 0;
        }
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changePropsKekayaan(dt);
    }

    handleChangeKontakDarurat(evt) {
        let name = evt.target.name;
        var value = evt.target.value;
        name = name === 'alamatt' ? 'alamat' : name;
        name = name === 'telpp' ? 'telp' : name;
        const dt = {};
        if (name === "agreement4") {
            value = evt.target.checked ? 1 : 0;
        }
        dt['key'] = name;
        dt['value'] = value;
        this.props.changePropsKontak(dt);
    }

    handleChangePekerjaan(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        if (name === "agreement5") {
            value = evt.target.checked ? 1 : 0;
        }
        dt['key'] = name;
        dt['value'] = value;
        this.props.changePropsPekerjaan(dt);
    }

    handleChangeAkunBank(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        if (name === "agreement6") {
            value = evt.target.checked ? "Y" : "N";
        }
        dt['key'] = name;
        dt['value'] = value;
        this.props.changePropsAkunBank(dt);
    }

    handleChangeDPP(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changePropsDPP(dt);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleChangePhoto = async (evt) => {
        const name = evt.target.name;
        const value = evt.target.files[0];
        
        if (value) {			
            const dt = {
                file: value,
                tipe: name
            };
            this.props.uploadFile(dt);
            await this.sleep(2000);
            this.props.getDPP();
        }
    }

    hideAlert() {
        this.props.clearErr();
    }

    hideAlertToken() {
        this.props.logOut();
    }

    deleteRecordFile(record) {
        this.setState({
            dokumen_id: record
        });
        this.props.showConfirmDel(true);
    }
    handleDelete=async()=> {
        this.props.onDelete(this.state.dokumen_id);
		await this.sleep(300);
        this.props.getDPP();
    }
    handleClose() {
        this.props.closeModal();
        this.setState({
            dokumen_id: ''
        });
    };

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit1=async (action)=> {
        var errors = this.state.errMsg1;
		
        errors.nama_depan = !this.props.user.nama_depan ? "Kolom ini harus diisi" : '';
        errors.tempat_lahir = !this.props.user.tempat_lahir ? "Kolom ini harus diisi" : '';
        errors.kota_lahir = !this.props.user.kota_lahir ? "Kolom ini harus diisi" : '';
        errors.tanggal_lahir = !this.props.user.tanggal_lahir ? "Kolom ini harus diisi" : '';
        errors.jenis_identitas = !this.props.user.jenis_identitas ? "Kolom ini harus diisi" : '';
        errors.no_identitas = !this.props.user.no_identitas ? "Kolom ini harus diisi" : '';
        errors.npwp = !this.props.user.npwp ? "Kolom ini harus diisi" : '';
        errors.jenis_kelamin = !this.props.user.jenis_kelamin ? "Kolom ini harus diisi" : '';
        errors.status_pernikahan = !this.props.user.status_pernikahan ? "Kolom ini harus diisi" : '';
        errors.nama_pasangan = !this.props.user.nama_pasangan && this.props.user.status_pernikahan === 'Kawin'? "Kolom ini harus diisi" : '';
        errors.nama_ibu_kandung = !this.props.user.nama_ibu_kandung ? "Kolom ini harus diisi" : '';
        errors.alamat = !this.props.user.alamat ? "Kolom ini harus diisi" : '';
        errors.rt = !this.props.user.rt ? "Kolom ini harus diisi" : '';
        errors.rw = !this.props.user.rw ? "Kolom ini harus diisi" : '';
        errors.provinsi = !this.props.user.provinsi ? "Kolom ini harus diisi" : '';
        errors.warga_negara = !this.props.user.warga_negara ? "Kolom ini harus diisi" : '';
        errors.telp = !this.props.user.telp ? "Kolom ini harus diisi" : '';
        errors.handphone = !this.props.user.handphone ? "Kolom ini harus diisi" : '';
        errors.status_kepemilikan = !this.props.user.status_kepemilikan ? "Kolom ini harus diisi" : '';
        errors.agreement1 = !this.props.user.agreement1 || !this.props.user.no_identitas ? "Kolom ini harus diisi" : '';
		
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg1)) {
            this.props.onSaveDataPribadi(this.props.user);
			await this.sleep(150);
			this.props.getDataPribadi();
            if (action === 'detil_pribadi') this.setState({ active_tab: 'exp_trading' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit2 = async (action) => {
        var errors = this.state.errMsg2;
        errors.agreement2 = !this.props.dataExpTrading.agreement2 ? "Kolom ini harus diisi" : '';
        errors.pertanyaan4 = this.props.dataExpTrading.pertanyaan4 === 'Y' ? 'maaf' : '';
        errors.pertanyaan3 = this.props.dataExpTrading.pertanyaan3 === 'Y' ? 'maaf' : '';
        if (errors.pertanyaan4 || errors.pertanyaan3) {
            alert("Maaf, berdasarkan peraturan anda tidak diperbolehkan membuka rekening pada perusahaan pialang berjangka");
        }
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg2)) {
            const saveData = {
                tujuan_pembukaan_rekening: this.props.dataExpTrading.tujuan_pembukaan_rekening ? this.props.dataExpTrading.tujuan_pembukaan_rekening : "",
                pertanyaan1: this.props.dataExpTrading.pertanyaan1 ? this.props.dataExpTrading.pertanyaan1 : "N",
                pertanyaan2: this.props.dataExpTrading.pertanyaan2 ? this.props.dataExpTrading.pertanyaan2 : "",
                pertanyaan3: this.props.dataExpTrading.pertanyaan3 ? this.props.dataExpTrading.pertanyaan3 : "N",
                pertanyaan4: this.props.dataExpTrading.pertanyaan4 ? this.props.dataExpTrading.pertanyaan4 : "N",
                pertanyaan5: this.props.dataExpTrading.pertanyaan5 ? this.props.dataExpTrading.pertanyaan5 : "N",
                pertanyaan6: this.props.dataExpTrading.pertanyaan6 ? this.props.dataExpTrading.pertanyaan6 : "",
                pengalaman_trading_id: this.props.dataExpTrading.pengalaman_trading_id ? this.props.dataExpTrading.pengalaman_trading_id : '',
                agree: 'Y'
            }
            await this.props.onSaveDataTrading(saveData);
            this.props.getDataTrading();
            if (action === 'detil_pribadi') this.setState({ active_tab: 'kekayaan' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit3(action) {
        var errors = this.state.errMsg3;
		errors.pendapatan_pertahun = !this.props.dataKekayaan.pendapatan_pertahun ? "Kolom ini harus diisi" : '';
		errors.lokasi = !this.props.dataKekayaan.lokasi ? "Kolom ini harus diisi" : '';
        errors.agreement3 = !this.props.dataKekayaan.agreement3 ? "Kolom ini harus diisi" : '';
        errors.njop = !this.props.dataKekayaan.njop ? "Kolom ini harus diisi" : '';
        errors.deposit_bank = !this.props.dataKekayaan.njop ? "Kolom ini harus diisi" : '';
        var njop = parseInt(this.props.dataKekayaan.njop ? this.props.dataKekayaan.njop.replace(/,/g, '') : 0);
        var deposit_bank = parseInt(this.props.dataKekayaan.deposit_bank ? this.props.dataKekayaan.deposit_bank.replace(/,/g, '') : 0);
        errors.njop = njop < 100000000 ? "Min. 100.000.000" : '';
        errors.deposit_bank = deposit_bank < 10000000 ? "Min. 10.000.000" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg3)) {
            const saveData = {
                ...this.props.dataKekayaan,
                lainnya: parseInt(this.props.dataKekayaan.lainnya ? this.props.dataKekayaan.lainnya.replace(/,/g, '') : 0),
                njop: parseInt(this.props.dataKekayaan.njop ? this.props.dataKekayaan.njop.replace(/,/g, '') : 0),
                deposit_bank: parseInt(this.props.dataKekayaan.deposit_bank ? this.props.dataKekayaan.deposit_bank.replace(/,/g, '') : 0),
            }
            this.props.onSaveDataKekayaan(saveData);
            if (action === 'detil_pribadi') this.setState({ active_tab: 'kontak_darurat' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit4 = async (action) => {
        var errors = this.state.errMsg4;
        var nama = this.props.user.nama_depan + ' ' + this.props.user.nama_belakang;
        nama = nama.toString().toLowerCase();
        errors.nama = !this.props.dataKontakDarurat.nama ? "Nama harus diisi" : '';
        errors.alamat = !this.props.dataKontakDarurat.alamat ? "Alamat harus diisi" : '';
        errors.kode_pos = !this.props.dataKontakDarurat.kode_pos ? "Kode Pos harus diisi" : '';
        errors.handphone = !this.props.dataKontakDarurat.handphone ? "Handphone harus diisi" : '';
        errors.hubungan = !this.props.dataKontakDarurat.hubungan ? "Hubungan harus diisi" : '';
        errors.telp = !this.props.dataKontakDarurat.telp ? "Telp. harus diisi" : '';
        errors.agreement4 = !this.props.dataKontakDarurat.agreement4 ? "Kolom ini harus diisi" : '';
        if (errors.nama === '') errors.nama = this.props.dataKontakDarurat.nama === nama ? "Nama tidak boleh sama dengan informasi detail" : '';
        if (errors.telp === '') errors.telp = this.props.dataKontakDarurat.telp === this.props.user.telp ? "Telp tidak boleh sama dengan informasi detail" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg4)) {
            const saveData = {
                ...this.props.dataKontakDarurat,
                agree: 'Y'
            }
            await this.props.onSaveKontakDarurat(saveData);
            this.props.getDataKontakDarurat();
            if (action === 'detil_pribadi') this.setState({ active_tab: 'pekerjaan' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit5 = async (action) => {
        var errors = this.state.errMsg5;
        errors.status_pekerjaan = !this.props.dataPekerjaan.status_pekerjaan ? "Harus diisi" : '';
        errors.nama_perusahaan = !this.props.dataPekerjaan.nama_perusahaan ? "Harus diisi" : '';
        errors.jenis_bisnis = !this.props.dataPekerjaan.jenis_bisnis ? "Harus diisi" : '';
        errors.jabatan = !this.props.dataPekerjaan.jabatan ? "Harus diisi" : '';
        errors.lama_bekerja = !this.props.dataPekerjaan.lama_bekerja ? "Harus diisi" : '';
        errors.alamat_kantor = !this.props.dataPekerjaan.alamat_kantor ? "Harus diisi" : '';
        errors.telp_kantor = !this.props.dataPekerjaan.telp_kantor ? "Harus diisi" : '';
        errors.agreement5 = !this.props.dataPekerjaan.agreement5 ? "Kolom ini harus diisi" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg5)) {
            const saveData = {
                ...this.props.dataPekerjaan,
                agree: 'Y'
            }
            await this.props.onSaveDataPekerjaan(saveData);
            this.props.getDataPekerjaan();
            if (action === 'detil_pribadi') this.setState({ active_tab: 'detil_bank' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit6 = async (action) => {
        var errors = this.state.errMsg6;
		var nama_pemilik = this.props.user.nama_depan + ' ' + this.props.user.nama_belakang;
        errors.nama_pemilik = !this.props.dataAkunBank.nama_pemilik && nama_pemilik === ''? "Kolom ini harus diisi" : '';
        errors.bank = !this.props.dataAkunBank.bank_id ? "Kolom ini harus diisi" : '';
        errors.cabang = !this.props.dataAkunBank.cabang ? "Kolom ini harus diisi" : '';
        errors.no_rek = !this.props.dataAkunBank.no_rek ? "Kolom ini harus diisi" : '';
        errors.jenis_akun_bank = !this.props.dataAkunBank.jenis_akun_bank ? "Kolom ini harus diisi" : '';
        errors.agreement6 = !this.props.dataAkunBank.agreement6 || this.props.dataAkunBank.agreement6 !== 'Y' ? "Kolom ini harus diisi" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg6)) {
            const saveData = {
                akun_bank_id: this.props.dataAkunBank.akun_bank_id ? this.props.dataAkunBank.akun_bank_id : '',
                jenis_akun_bank: this.props.dataAkunBank.jenis_akun_bank ? this.props.dataAkunBank.jenis_akun_bank : '',
                cabang: this.props.dataAkunBank.cabang ? this.props.dataAkunBank.cabang : '',
                no_rek: this.props.dataAkunBank.no_rek ? this.props.dataAkunBank.no_rek : '',
                bank: this.props.dataAkunBank.bank_id ? this.props.dataAkunBank.bank_id : '',
                nama_pemilik: this.props.user.nama_depan + ' ' + this.props.user.nama_belakang,
                agree: 'Y',
                agreement6: 'Y'
            }
            await this.props.onSaveAkunBank(saveData);
            this.props.getDataAKunBank();
            if (action === 'detil_pribadi') this.setState({ active_tab: 'unggah_file' });
        } else {
            console.error('Invalid Form')
        }
    }

    handleSubmit7() {
        var errors = this.state.errMsg7;
        errors.agree = this.props.dokumenPribadiPernyataan.agree !== 'Y' ? "Pilihan harus disetujui" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg7)) {
            const saveData = {
                data_pribadi_pernyataan_id: this.props.dokumenPribadiPernyataan.data_pribadi_pernyataan_id,
                agree: 'Y'
            }
            this.props.onSaveDPP(saveData);
            this.props.history.push("/account-type");
        } else {
            console.error('Invalid Form')
        }

    }
	
	

    render() {
        const { Paragraph } = Placeholder;
        const { lastSegmentUrl, active_tab, errMsg1, errMsg2, errMsg3, errMsg4, errMsg5, errMsg6, errMsg7 } = this.state;
        const { dataNegara, dataProvinsi, dataBank, docPribadi, user, dataKekayaan, dataExpTrading,
            dataKontakDarurat, dataPekerjaan, dataAkunBank, errorMessage, errUplFileMsg,
            isFetchingUpl, errFetchUserByToken, dokumenPribadiPernyataan, unggahFileName } = this.props;
        const nilai_njop = dataKekayaan.njop ? parseInt(dataKekayaan.njop.replace(/,/g, '')) : 0;
        const deposit_bank = dataKekayaan.deposit_bank ? parseInt(dataKekayaan.deposit_bank.replace(/,/g, '')) : 0;

        const contentDelete = <div dangerouslySetInnerHTML={{ __html: '<div id="caption" style=padding-bottom:20px;">Apakah anda yakin <br/>akan menghapus file ini ?</div>' }} />;
		console.log(unggahFileName);
		
        return (
		
            <div className="content-wrapper">
                
                

                <section className="content">
                    <div className="container-fluid">
                    <div className="content-area__edge">
                        <ul className="list-unstyled list-steps mb-0">
                            <li className={lastSegmentUrl === "personal" ? "active default" : "default"}><a href="personal">1. Informasi Pribadi</a></li>
                            <li className={lastSegmentUrl === "account-type" ? "active default" : "default"}><a href="account-type"><span />2. Tipe Akun</a></li>
                            <li className={lastSegmentUrl === "decleration" ? "active default" : "default"}><a href="decleration"><span />3. Pernyataan</a></li>
                            <li className={lastSegmentUrl === "trading_rules" ? "active default" : "default"}><a href="trading_rules"><span />4. Peraturan Trading</a></li>
                            <li className={lastSegmentUrl === "company_profile" ? "active default" : "default"}><a href="company_profile"><span />5. Profil Perusahaan</a></li>
                        </ul>
                    </div>

                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }} className="text-gray-500">Registrasi Akun Online</h1>
                        {errFetchUserByToken ? (
                            <div className="alert alert-danger alert-sm" style={{ marginTop: '.3rem' }}>
                                <button onClick={this.hideAlertToken.bind(this)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <span className="fw-semi-bold">{errFetchUserByToken}</span>
                            </div>
                        ) : ''}
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}

                                <div className="card card-success shadow-lg">
                                    <div className="card-body">
                                        <Nav appearance="subtle" activeKey={active_tab} justified className="tab_personal">
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'detil_pribadi' ? true : false}
                                                eventKey="detil_pribadi"
                                                className="default border   border-white" >Detil Pribadi
                                            </Nav.Item>
                                            <Nav.Item
                                                eventKey="exp_trading"
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'exp_trading' ? true : false}
                                                className="default">Pengalaman Trading
                                            </Nav.Item>
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'kekayaan' ? true : false}
                                                eventKey="kekayaan"
                                                className="default">Kekayaan Pribadi
                                            </Nav.Item>
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'kontak_darurat' ? true : false}
                                                eventKey="kontak_darurat"
                                                className="default">Kontak Darurat
                                            </Nav.Item>
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'pekerjaan' ? true : false}
                                                eventKey="pekerjaan"
                                                className="default">Pekerjaan
                                            </Nav.Item>
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'detil_bank' ? true : false}
                                                eventKey="detil_bank"
                                                className="default">Detil Bank
                                            </Nav.Item>
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'unggah_file' ? true : false}
                                                eventKey="unggah_file"
                                                className="default">Unggah Dokumen
                                            </Nav.Item>
                                        </Nav>
                                        {active_tab === 'detil_pribadi' && (<Fragment>

                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Detil Pribadi</h3>
                                                    <br />
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="nama_depan">
                                                            <Form.Label>Nama Depan</Form.Label>
                                                            <Form.Control
                                                                value={user.nama_depan ? user.nama_depan : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="nama_depan"
                                                                type="text"
                                                                required
                                                                placeholder="Nama Depan" />
																{errMsg1.nama_depan ? (<span className="text-error badge badge-danger">{errMsg1.nama_depan}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="nama_belakang">
                                                            <Form.Label>Nama Belakang</Form.Label>
                                                            <Form.Control
                                                                value={user.nama_belakang ? user.nama_belakang : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="nama_belakang"
                                                                type="text"
                                                                required
                                                                placeholder="Nama Belakang" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="tempat_lahir">
                                                            <Form.Label>Tempat Lahir</Form.Label>
                                                            <Form.Control
                                                                name="tempat_lahir"
                                                                size="lg"
                                                                value={user.tempat_lahir ? user.tempat_lahir : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                {dataProvinsi ? (
                                                                    dataProvinsi.map(function (prov) {
                                                                        return <option
                                                                            value={prov.nama_provinsi}
                                                                            key={prov.provinsi_id}>{prov.nama_provinsi}
                                                                        </option>
                                                                    })

                                                                ) : ''}
                                                                <option value="Lainnya(Others)">Lainnya(Others)</option>
                                                            </Form.Control>
															{errMsg1.tempat_lahir ? (<span className="text-error badge badge-danger">{errMsg1.tempat_lahir}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="kota_lahir">
                                                            <Form.Label>Kota Kelahiran Sesuai Dengan Identitas</Form.Label>
                                                            <Form.Control
                                                                value={user.kota_lahir ? user.kota_lahir : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="kota_lahir"
                                                                type="text"
                                                                required
                                                                placeholder="Kota Kelahiran Sesuai Dengan Identitas" />
																{errMsg1.kota_lahir ? (<span className="text-error badge badge-danger">{errMsg1.kota_lahir}</span>) : ''}
                                                        </Form.Group>
														
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} xs={3} controlId="tanggal_lahir">
                                                            <Form.Label>Tanggal Lahir</Form.Label>
                                                            <Datetime
                                                                closeOnSelect={true}
                                                                timeFormat={false}
                                                                setViewDate={user.tanggal_lahir ? (new Date(user.tanggal_lahir)) : new Date()}
                                                                value={user.tanggal_lahir ? (new Date(user.tanggal_lahir)) : ''}
                                                                onChange={this.handleChangeStartDate}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    autoComplete: "off",
                                                                    placeholder: 'Tanggal Lahir',
                                                                    name: 'tanggal_lahir',
                                                                    className: 'form-control form-control-lg'
                                                                }}
                                                                renderView={(mode, renderDefault, tanggal_lahir) =>
                                                                    this.renderView(mode, renderDefault, 'tanggal_lahir')
                                                                }
                                                                locale="id" isValidDate={this.state.validSd}
                                                            />
															{errMsg1.tanggal_lahir ? (<span className="text-error badge badge-danger">{errMsg1.tanggal_lahir}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} xs={3} controlId="jenis_identitas">
                                                            <Form.Label>Nomor identifikasi</Form.Label>
                                                            <Form.Control
                                                                name="jenis_identitas"
                                                                size="lg"
                                                                value={user.jenis_identitas ? user.jenis_identitas : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                <option value="KTP">KTP</option>
                                                                <option value="SIM">SIM</option>
                                                                <option value="Passpor">Passport</option>
                                                            </Form.Control>
															{errMsg1.jenis_identitas ? (<span className="text-error badge badge-danger">{errMsg1.jenis_identitas}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="no_identitas">

                                                            <Form.Control
                                                                style={{ marginTop: 28 }}
                                                                value={user.no_identitas ? user.no_identitas : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="no_identitas"
                                                                type="text"
                                                                required
                                                            />
															{errMsg1.no_identitas ? (<span className="text-error badge badge-danger">{errMsg1.no_identitas}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} xs={3} controlId="npwp">
                                                            <Form.Label>NPWP</Form.Label>
                                                            <Form.Control
                                                                value={user.npwp ? user.npwp : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="npwp"
                                                                type="text"
                                                                required
                                                                placeholder="NPWP" />
																{errMsg1.npwp ? (<span className="text-error badge badge-danger">{errMsg1.npwp}</span>) : ''}
                                                        </Form.Group>
														
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} xs={3} controlId="jenis_kelamin">
                                                            <Form.Label>Jenis Kelamin</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChange}
                                                                inline
                                                                checked={user.jenis_kelamin === 'Laki-Laki' ? ("checked") : ""}
                                                                value='Laki-Laki'
                                                                type='radio'
                                                                name='jenis_kelamin'
                                                                label='Laki-laki'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChange}
                                                                inline
                                                                value='Perempuan'
                                                                type='radio'
                                                                checked={user.jenis_kelamin === 'Perempuan' ? ("checked") : ""}
                                                                name='jenis_kelamin'
                                                                label='Perempuan'
                                                            />
															{errMsg1.jenis_kelamin ? (<span className="text-error badge badge-danger">{errMsg1.jenis_kelamin}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    
                                                    
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="alamat">
                                                            <Form.Label>Alamat</Form.Label>
                                                            <Form.Control
                                                                value={user.alamat ? user.alamat : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="alamat"
                                                                type="text"
                                                                required
                                                                placeholder="Alamat" />
																{errMsg1.alamat ? (<span className="text-error badge badge-danger">{errMsg1.alamat}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} xs={2} controlId="rt">
                                                            <Form.Label>RT</Form.Label>
                                                            <Form.Control
                                                                value={user.rt ? user.rt : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="rt"
                                                                type="text"
                                                                required
                                                                placeholder="RT" />
																{errMsg1.rt ? (<span className="text-error badge badge-danger">{errMsg1.rt}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} xs={2} controlId="rw">
                                                            <Form.Label>RW</Form.Label>
                                                            <Form.Control
                                                                value={user.rw ? user.rw : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="rw"
                                                                type="text"
                                                                required
                                                                placeholder="RW" />
																 {errMsg1.rw ? (<span className="text-error badge badge-danger">{errMsg1.rw}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} xs={3} controlId="provinsi">

                                                            <Form.Control
                                                                style={{ marginTop: 28 }}
                                                                name="provinsi"
                                                                size="lg"
                                                                value={user.provinsi ? user.provinsi : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                {dataProvinsi ? (
                                                                    dataProvinsi.map(function (prov) {
                                                                        return <option
                                                                            value={prov.nama_provinsi}
                                                                            key={prov.provinsi_id}>{prov.nama_provinsi}
                                                                        </option>
                                                                    })

                                                                ) : ''}
                                                                <option value="Lainnya(Others)">Lainnya(Others)</option>
                                                            </Form.Control>
															 {errMsg1.provinsi ? (<span className="text-error badge badge-danger">{errMsg1.provinsi}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>

                                                    
                                                    <Form.Row>
                                                        
                                                        <Form.Group as={Col} xs={1} controlId="warga_negara">
                                                            <Form.Label>Kewarganegaraan</Form.Label>
                                                            <Form.Control
                                                                name="warga_negara"
                                                                size="lg"
                                                                value={user.warga_negara ? user.warga_negara : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                {dataNegara ? (
                                                                    dataNegara.map(function (neg) {
                                                                        return <option
                                                                            value={neg.nama_negara}
                                                                            key={neg.nama_negara}>{neg.nama_negara}
                                                                        </option>
                                                                    })

                                                                ) : ''}
                                                                <option value="Lainnya(Others)">Lainnya(Others)</option>
                                                            </Form.Control>
															 {errMsg1.warga_negara ? (<span className="text-error badge badge-danger">{errMsg1.warga_negara}</span>) : ''}
                                                        </Form.Group>

                                                        <Form.Group as={Col} xs={1} controlId="status_pernikahan">
                                                            <Form.Label>Status Pernikahan</Form.Label>
                                                            <Form.Control
                                                                name="status_pernikahan"
                                                                size="lg"
                                                                value={user.status_pernikahan ? user.status_pernikahan : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                <option value="Belum Kawin">Belum Kawin</option>
                                                                <option value="Kawin">Kawin</option>
                                                                <option value="Cerai">Cerai</option>
                                                                <option value="Janda/Duda">Janda/Duda</option>
                                                            </Form.Control>
															{errMsg1.status_pernikahan ? (<span className="text-error badge badge-danger">{errMsg1.status_pernikahan}</span>) : ''}
                                                        </Form.Group>


                                                        <Form.Group as={Col} xs={1}  controlId="nama_ibu_kandung">
                                                            <Form.Label>Nama Gadis Ibu Kandung</Form.Label>
                                                            <Form.Control
                                                                value={user.nama_ibu_kandung ? user.nama_ibu_kandung : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="nama_ibu_kandung"
                                                                type="text"
                                                                required
                                                                placeholder="Nama Gadis Ibu Kandung" />
																{errMsg1.nama_ibu_kandung ? (<span className="text-error badge badge-danger">{errMsg1.nama_ibu_kandung}</span>) : ''}
                                                        </Form.Group>



                                                    </Form.Row>
                                                    <Form.Row>
                                                        {user.status_pernikahan === "Kawin" && (
                                                            <Fragment>
                                                                <Form.Group controlId="nama_pasangan">
                                                                    <Form.Label>Nama Pasangan</Form.Label>
                                                                    <Form.Control
                                                                        value={user.nama_pasangan ? user.nama_pasangan : ''}
                                                                        autoComplete="off"
                                                                        onChange={this.handleChange}
                                                                        size="lg"
                                                                        name="nama_pasangan"
                                                                        type="text"
                                                                        required
                                                                        placeholder="Nama Pasangan" />
																		{errMsg1.nama_pasangan ? (<span className="text-error badge badge-danger">{errMsg1.nama_pasangan}</span>) : ''}
                                                                </Form.Group>
                                                            </Fragment>
                                                        )}
                                                        
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="telp">
                                                            <Form.Label>Telepon Rumah</Form.Label>
                                                            <Form.Control
                                                                value={user.telp ? user.telp : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="telp"
                                                                type="text"
                                                                required
                                                                placeholder="Telepon Rumah" />
																{errMsg1.telp ? (<span className="text-error badge badge-danger">{errMsg1.telp}</span>) : ''}
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="fax">
                                                            <Form.Label>FAX</Form.Label>
                                                            <Form.Control
                                                                value={user.fax ? user.fax : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="fax"
                                                                type="text"
                                                                required
                                                                placeholder="FAX" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="handphone">
                                                            <Form.Label>No Handphone</Form.Label>
                                                            <Form.Control
                                                                value={user.handphone ? user.handphone : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange}
                                                                size="lg"
                                                                name="handphone"
                                                                type="text"
                                                                required
                                                                placeholder="No Handphone" />
																 {errMsg1.handphone ? (<span className="text-error badge badge-danger">{errMsg1.handphone}</span>) : ''}
                                                        </Form.Group>
														
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="status_kepemilikan">
                                                            <Form.Label>Status Kepemilikan Rumah</Form.Label>
                                                            <Form.Control
                                                                name="status_kepemilikan"
                                                                size="lg"
                                                                value={user.status_kepemilikan ? user.status_kepemilikan : ''}
                                                                onChange={this.handleChange}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                <option value="Milik">Pribadi</option>
                                                                <option value="Keluarga">Keluarga</option>
                                                                <option value="Sewa/Kontrak">Sewa/Kontrak</option>

                                                            </Form.Control>
															 {errMsg1.status_kepemilikan ? (<span className="text-error badge badge-danger">{errMsg1.status_kepemilikan}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>

                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg1.agreement1 ? (<span className="text-error badge badge-danger">{errMsg1.agreement1}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={user.agreement1 ? true : false}
                                                                    onChange={this.handleChange} value={1} className="form-check-input" type="checkbox" name="agreement1" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>
                                                        </div>

                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit1.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>

                                                        <AppButton
                                                            onClick={this.handleSubmit1.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>
                                                </div>


                                            </Form>
                                        </Fragment>)}
                                        {active_tab === 'exp_trading' && (<Fragment>

                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Pengalaman Trading</h3>
                                                    <br />
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="tujuan_pembukaan_rekening">
                                                            <Form.Label>Tujuan Pembukaan Rekening</Form.Label>
                                                            <Form.Control
                                                                name="tujuan_pembukaan_rekening"
                                                                size="lg"
                                                                value={dataExpTrading.tujuan_pembukaan_rekening ? dataExpTrading.tujuan_pembukaan_rekening : ''}
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                <option value="Spekulasi">Spekulasi</option>
                                                                <option value="Keuntungan">Keuntungan</option>
                                                                <option value="Lindung Nilai">Lindung Nilai</option>
                                                                <option value="Lainnya">Lainnya</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} xs={3} controlId="pertanyaan1">
                                                            <Form.Label>Pengalaman Trading</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                checked={dataExpTrading.pertanyaan1 === 'Y' ? ("checked") : ""}
                                                                value='Y'
                                                                type='radio'
                                                                name='pertanyaan1'
                                                                label='Ya'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                value='N'
                                                                type='radio'
                                                                checked={dataExpTrading.pertanyaan1 !== 'Y' ? ("checked") : ""}
                                                                name='pertanyaan1'
                                                                label='Tidak'
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    {dataExpTrading.pertanyaan1 === 'Y' ? (
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="pertanyaan2">
                                                                <Form.Label>Pengalaman Trading anda Sebelumnya di</Form.Label>
                                                                <Form.Control
                                                                    value={dataExpTrading.pertanyaan2 ? dataExpTrading.pertanyaan2 : ''}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChangeTrading.bind(this)}
                                                                    size="lg"
                                                                    name="pertanyaan2"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Nama Perusahaan/Brand" />
                                                            </Form.Group>
                                                        </Form.Row>) : ''}

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="pertanyaan3">
                                                            <Form.Label>Apakah Anda memiliki keluarga yang bekerja di BAPPEBTI / BBJ / KBI / BKDI / ISI Clearing?</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                checked={dataExpTrading.pertanyaan3 === 'Y' ? ("checked") : ""}
                                                                value='Y'
                                                                type='radio'
                                                                name='pertanyaan3'
                                                                label='Ya'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                value='N'
                                                                type='radio'
                                                                checked={dataExpTrading.pertanyaan3 !== 'Y' ? ("checked") : ""}
                                                                name='pertanyaan3'
                                                                label='Tidak'
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="pertanyaan4">
                                                            <Form.Label>Apakah Anda telah dinyatakan pailit oleh Pengadilan?</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                checked={dataExpTrading.pertanyaan4 === 'Y' ? ("checked") : ""}
                                                                value='Y'
                                                                type='radio'
                                                                name='pertanyaan4'
                                                                label='Ya'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                value='N'
                                                                type='radio'
                                                                checked={dataExpTrading.pertanyaan4 !== 'Y' ? ("checked") : ""}
                                                                name='pertanyaan4'
                                                                label='Tidak'
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="pertanyaan5">
                                                            <Form.Label>Memiliki pengalaman perdagangan dalam Perdagangan Berjangka</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                checked={dataExpTrading.pertanyaan5 === 'Y' ? ("checked") : ""}
                                                                value='Y'
                                                                type='radio'
                                                                name='pertanyaan5'
                                                                label='Ya'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeTrading.bind(this)}
                                                                inline
                                                                value='N'
                                                                type='radio'
                                                                checked={dataExpTrading.pertanyaan5 !== 'Y' ? ("checked") : ""}
                                                                name='pertanyaan5'
                                                                label='Tidak'
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    {dataExpTrading.pertanyaan5 === 'Y' ? (
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="pertanyaan6">
                                                                <Form.Label>Pengalaman Trading Berjangka Anda Sebelumnya di</Form.Label>
                                                                <Form.Control
                                                                    value={dataExpTrading.pertanyaan6 ? dataExpTrading.pertanyaan6 : ''}
                                                                    autoComplete="off"
                                                                    onChange={this.handleChangeTrading.bind(this)}
                                                                    size="lg"
                                                                    name="pertanyaan6"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Nama Perusahaan/Brand" />
                                                            </Form.Group>
                                                        </Form.Row>) : ''}
                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg2.agreement2 ? (<span className="text-error badge badge-danger">{errMsg2.agreement2}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={dataExpTrading.agreement2 ? true : false}
                                                                    onChange={this.handleChangeTrading.bind(this)} value={1} className="form-check-input" type="checkbox" name="agreement2" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>

                                                        </div>
                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit2.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>

                                                        <AppButton
                                                            onClick={this.handleSubmit2.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>

                                                </div>
                                            </Form>
                                        </Fragment>)}

                                        {active_tab === 'kekayaan' && (<Fragment>
                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Daftar Kekayaan</h3>
                                                    <br />
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="pendapatan_pertahun">
                                                            <Form.Label>Pendapatan per Tahun</Form.Label>
                                                            <Form.Control
                                                                name="pendapatan_pertahun"
                                                                size="lg"
                                                                value={dataKekayaan.pendapatan_pertahun ? dataKekayaan.pendapatan_pertahun : ''}
                                                                onChange={this.handleChangeKekayaan.bind(this)}
                                                                as="select">
                                                                <option value="">-</option>
                                                                <option value="Antara 100-250 juta">Antara 100-250 juta</option>
                                                                <option value="Antara 250-500 juta">Antara 250-500 juta</option>
                                                                <option value="Di atas 500 juta">Di atas 500 juta</option>
                                                            </Form.Control>
															{errMsg3.pendapatan_pertahun ? (<span className="text-error badge badge-danger">{errMsg3.pendapatan_pertahun}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="lokasi">
                                                            <Form.Label>Lokasi</Form.Label>
                                                            <Form.Control
                                                                value={dataKekayaan.lokasi ? dataKekayaan.lokasi : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKekayaan.bind(this)}
                                                                size="lg"
                                                                name="lokasi"
                                                                type="text"
                                                                required
                                                                placeholder="Lokasi" />
																{errMsg3.lokasi ? (<span className="text-error badge badge-danger">{errMsg3.lokasi}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="njop">
                                                            <Form.Label>Nilai NJOP Rumah</Form.Label>
                                                            <NumberFormat
                                                                value={dataKekayaan.njop ? dataKekayaan.njop : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKekayaan.bind(this)}
                                                                className="form-control form-control-lg"
                                                                size="lg"
                                                                name="njop"
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                inputMode="numeric"
                                                                placeholder="Nilai NJOP Rumah" />
                                                            {errMsg3.njop ? (<span className="text-error badge badge-danger">{errMsg3.njop}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="deposit_bank">
                                                            <Form.Label>Deposit Bank</Form.Label>
                                                            <NumberFormat
                                                                value={dataKekayaan.deposit_bank ? dataKekayaan.deposit_bank : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKekayaan.bind(this)}
                                                                className="form-control form-control-lg"
                                                                size="lg"
                                                                name="deposit_bank"
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                inputMode="numeric"
                                                                placeholder="Deposit Bank" />
                                                            {errMsg3.deposit_bank ? (<span className="text-error badge badge-danger">{errMsg3.deposit_bank}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="jml_total">
                                                            <Form.Label>Jumlah Total</Form.Label>
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
                                                                placeholder="Jumlah Total" />

                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="lainnya">
                                                            <Form.Label>Lainnya</Form.Label>
                                                            <NumberFormat
                                                                value={dataKekayaan.lainnya ? dataKekayaan.lainnya : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKekayaan.bind(this)}
                                                                className="form-control form-control-lg"
                                                                size="lg"
                                                                name="lainnya"
                                                                thousandSeparator={true}
                                                                decimalScale={2}
                                                                inputMode="numeric"
                                                                placeholder="Lainnya" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg3.agreement3 ? (<span className="text-error badge badge-danger">{errMsg3.agreement3}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={dataKekayaan.agreement3 ? true : false}
                                                                    onChange={this.handleChangeKekayaan.bind(this)} value={1} className="form-check-input" type="checkbox" name="agreement3" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>
                                                        </div>

                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit3.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>

                                                        <AppButton
                                                            onClick={this.handleSubmit3.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>
                                                </div>
                                            </Form>

                                        </Fragment>)}

                                        {active_tab === 'kontak_darurat' && (<Fragment>
                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Kontak Darurat</h3>
                                                    <br />

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="nama">
                                                            <Form.Label>Nama</Form.Label>{' '}
                                                            {errMsg4.nama ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.nama}</span>) : ''}
                                                            <Form.Control
                                                                value={dataKontakDarurat.nama ? dataKontakDarurat.nama : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                size="lg"
                                                                name="nama"
                                                                type="text"
                                                                required
                                                                placeholder="Nama" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="alamatt">
                                                            <Form.Label>Alamat</Form.Label>
															{errMsg4.alamat ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.alamat}</span>) : ''}
                                                            <Form.Control
                                                                value={dataKontakDarurat.alamat ? dataKontakDarurat.alamat : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                size="lg"
                                                                name="alamatt"
                                                                type="text"
                                                                required
                                                                placeholder="Alamat" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="kode_pos">
                                                            <Form.Label>Kode Pos</Form.Label>
															{errMsg4.kode_pos ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.kode_pos}</span>) : ''}
                                                            <Form.Control
                                                                value={dataKontakDarurat.kode_pos ? dataKontakDarurat.kode_pos : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                size="lg"
                                                                name="kode_pos"
                                                                type="text"
                                                                required
                                                                placeholder="Kode Pos" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="telpp">
                                                            <Form.Label>No. Telepon</Form.Label>{' '}
                                                            {errMsg4.telp ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.telp}</span>) : ''}
                                                            <Form.Control
                                                                value={dataKontakDarurat.telp ? dataKontakDarurat.telp : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                size="lg"
                                                                name="telpp"
                                                                type="text"
                                                                required
                                                                placeholder="No. Telepon" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="handphone">
                                                            <Form.Label>No. Handphone</Form.Label>
															{errMsg4.handphone ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.handphone}</span>) : ''}
                                                            <Form.Control
                                                                value={dataKontakDarurat.handphone ? dataKontakDarurat.handphone : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                size="lg"
                                                                name="handphone"
                                                                type="text"
                                                                required
                                                                placeholder="No. Handphone" />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="hubungan">
                                                            <Form.Label>Hubungan</Form.Label>
															{errMsg4.hubungan ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg4.hubungan}</span>) : ''}
                                                            <Form.Control
                                                                name="hubungan"
                                                                size="lg"
                                                                value={dataKontakDarurat.hubungan ? dataKontakDarurat.hubungan : ''}
                                                                onChange={this.handleChangeKontakDarurat.bind(this)}
                                                                as="select">
                                                                <option value="">-</option>
                                                                <option value="Keluarga">Keluarga</option>
                                                                <option value="Teman">Teman</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg4.agreement4 ? (<span className="text-error badge badge-danger">{errMsg4.agreement4}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={dataKontakDarurat.agreement4 ? true : false}
                                                                    onChange={this.handleChangeKontakDarurat.bind(this)} value={1} className="form-check-input" type="checkbox" name="agreement4" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>
                                                        </div>
                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit4.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>
                                                        <AppButton
                                                            onClick={this.handleSubmit4.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>
                                                </div>
                                            </Form>

                                        </Fragment>)}


                                        {active_tab === 'pekerjaan' && (<Fragment>
                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Pekerjaan</h3>
                                                    <br />

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="status_pekerjaan">
                                                            <Form.Label>Status Pekerjaan</Form.Label>
                                                            {errMsg5.status_pekerjaan ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.status_pekerjaan}</span>) : ''}
                                                            <Form.Control
                                                                name="status_pekerjaan"
                                                                size="lg"
                                                                value={dataPekerjaan.status_pekerjaan ? dataPekerjaan.status_pekerjaan : ''}
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                as="select">
                                                                <option value="">-</option>
                                                                <option value="Swasta">Swasta</option>
                                                                <option value="Wiraswasta">Wiraswasta</option>
                                                                <option value="Profesional">Profesional</option>
                                                                <option value="Pegawai Negeri">Pegawai Negeri</option>
                                                                <option value="BUMN">BUMN</option>
                                                                <option value="Lainnya">Lainnya</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="nama_perusahaan">
                                                            <Form.Label>Nama Perusahaan</Form.Label>
                                                            {errMsg5.nama_perusahaan ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.nama_perusahaan}</span>) : ''}
                                                            <Form.Control
                                                                value={dataPekerjaan.nama_perusahaan ? dataPekerjaan.nama_perusahaan : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="nama_perusahaan"
                                                                type="text"
                                                                required
                                                                placeholder="Nama Perusahaan" />
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="jenis_bisnis">
                                                            <Form.Label>Jenis Bisnis</Form.Label>
                                                            {errMsg5.jenis_bisnis ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.jenis_bisnis}</span>) : ''}
                                                            <Form.Control
                                                                value={dataPekerjaan.jenis_bisnis ? dataPekerjaan.jenis_bisnis : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="jenis_bisnis"
                                                                type="text"
                                                                required
                                                                placeholder="Jenis Bisnis" />
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="jabatan">
                                                            <Form.Label>Posisi/Jabatan</Form.Label>
                                                            {errMsg5.jabatan ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.jabatan}</span>) : ''}
                                                            <Form.Control
                                                                value={dataPekerjaan.jabatan ? dataPekerjaan.jabatan : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="jabatan"
                                                                type="text"
                                                                required
                                                                placeholder="Posisi/Jabatan" />
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="lama_bekerja">
                                                            <Form.Label>Lama Bekerja</Form.Label>
                                                            {errMsg5.lama_bekerja ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.lama_bekerja}</span>) : ''}
                                                            <Form.Control
                                                                name="lama_bekerja"
                                                                size="lg"
                                                                value={dataPekerjaan.lama_bekerja ? dataPekerjaan.lama_bekerja : ''}
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                as="select">
                                                                <option value="">-</option>
                                                                <option value="1 Tahun">1 Tahun</option>
                                                                <option value="1 - 5 Tahun">1 - 5 Tahun</option>
                                                                <option value="> 5 Tahun"> {'>'} 5 Tahun</option>

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="pekerjaan_sebelumnya">
                                                            <Form.Label>Lama Bekerja Sebelumnya</Form.Label>
                                                            <Form.Control
                                                                name="pekerjaan_sebelumnya"
                                                                size="lg"
                                                                value={dataPekerjaan.pekerjaan_sebelumnya ? dataPekerjaan.pekerjaan_sebelumnya : ''}
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                as="select">
                                                                <option value="">-</option>
                                                                <option value="1 Tahun">1 Tahun</option>
                                                                <option value="1 - 5 Tahun">1 - 5 Tahun</option>
                                                                <option value="> 5 Tahun"> {'>'} 5 Tahun</option>

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="alamat_kantor">
                                                            <Form.Label>Alamat kantor</Form.Label>
                                                            {errMsg5.alamat_kantor ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.alamat_kantor}</span>) : ''}
                                                            <Form.Control
                                                                value={dataPekerjaan.alamat_kantor ? dataPekerjaan.alamat_kantor : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="alamat_kantor"
                                                                type="text"
                                                                required
                                                                placeholder="Alamat kantor" />
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="telp_kantor">
                                                            <Form.Label>Nomor Telepon Kantor.</Form.Label>
                                                            {errMsg5.telp_kantor ? (<span className="text-error badge badge-danger" style={{ float: 'right' }}>{errMsg5.telp_kantor}</span>) : ''}
                                                            <Form.Control
                                                                value={dataPekerjaan.telp_kantor ? dataPekerjaan.telp_kantor : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="telp_kantor"
                                                                type="text"
                                                                required
                                                                placeholder="Nomor Telepon Kantor." />
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="fax_kantor">
                                                            <Form.Label>Nomor Fax Kantor</Form.Label>
                                                            <Form.Control
                                                                value={dataPekerjaan.fax_kantor ? dataPekerjaan.fax_kantor : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangePekerjaan.bind(this)}
                                                                size="lg"
                                                                name="fax_kantor"
                                                                type="text"
                                                                required
                                                                placeholder="Nomor Fax Kantor" />
                                                        </Form.Group>
                                                    </Form.Row>

                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg5.agreement5 ? (<span className="text-error badge badge-danger">{errMsg5.agreement5}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={dataPekerjaan.agreement5 ? true : false}
                                                                    onChange={this.handleChangePekerjaan.bind(this)} value={1} className="form-check-input" type="checkbox" name="agreement5" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>
                                                        </div>
                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit5.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>
                                                        <AppButton
                                                            onClick={this.handleSubmit5.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>
                                                </div>
                                            </Form>

                                        </Fragment>)}

                                        {active_tab === 'detil_bank' && (<Fragment>
                                            <Form>
                                                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                    <br />
                                                    <h3>Akun Bank</h3>
                                                    <br />
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="nama_pemilik">
                                                            <Form.Label>Nama Pemilik Rekening</Form.Label>
                                                            <Form.Control
                                                                disabled
                                                                value={user.nama_depan ? user.nama_depan + ' ' + user.nama_belakang : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                size="lg"
                                                                name="nama_pemilik"
                                                                type="text"
                                                                required
                                                                placeholder="Nama Pemilik Rekening" />
																{errMsg6.nama_pemilik ? (<span className="text-error badge badge-danger">{errMsg6.nama_pemilik}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="bank_id">
                                                            <Form.Label>Nama Bank</Form.Label>
                                                            <Form.Control
                                                                name="bank_id"
                                                                size="lg"
                                                                value={dataAkunBank.bank_id ? dataAkunBank.bank_id : ''}
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                as="select">
                                                                <option value="">Pilih</option>
                                                                {dataBank ? (
                                                                    dataBank.map(function (bnk) {
                                                                        return <option
                                                                            value={bnk.bank_id}
                                                                            key={bnk.bank_id}>{bnk.nama_bank}
                                                                        </option>
                                                                    })

                                                                ) : ''}
                                                            </Form.Control>
															{errMsg6.bank ? (<span className="text-error badge badge-danger">{errMsg6.bank}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="no_rek">
                                                            <Form.Label>Nomor Rekening Bank</Form.Label>
                                                            <NumberFormat
                                                                value={dataAkunBank.no_rek ? dataAkunBank.no_rek : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                className="form-control form-control-lg"
                                                                size="lg"
                                                                name="no_rek"
                                                                thousandSeparator={false}
                                                                decimalScale={0}
                                                                inputMode="numeric"
                                                                placeholder="Nomor Rekening Bank" />
																{errMsg6.no_rek ? (<span className="text-error badge badge-danger">{errMsg6.no_rek}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="cabang">
                                                            <Form.Label>Cabang</Form.Label>
                                                            <Form.Control
                                                                value={dataAkunBank.cabang ? dataAkunBank.cabang : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                size="lg"
                                                                name="cabang"
                                                                type="text"
                                                                required
                                                                placeholder="Cabang" />
																{errMsg6.cabang ? (<span className="text-error badge badge-danger">{errMsg6.cabang}</span>) : ''}
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

                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="jenis_akun_bank">
                                                            <Form.Label>Jenis akun</Form.Label><br />
                                                            <Form.Check
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                inline
                                                                checked={dataAkunBank.jenis_akun_bank === 'Giro' ? ("checked") : ""}
                                                                value='Giro'
                                                                type='radio'
                                                                name='jenis_akun_bank'
                                                                label='Giro'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                inline
                                                                value='Rekening tabungan'
                                                                type='radio'
                                                                checked={dataAkunBank.jenis_akun_bank === 'Rekening tabungan' ? ("checked") : ""}
                                                                name='jenis_akun_bank'
                                                                label='Rekening tabungan'
                                                            />
                                                            <Form.Check
                                                                onChange={this.handleChangeAkunBank.bind(this)}
                                                                inline
                                                                value='Lainnya'
                                                                type='radio'
                                                                checked={dataAkunBank.jenis_akun_bank === 'Lainnya' ? ("checked") : ""}
                                                                name='jenis_akun_bank'
                                                                label='Lainnya'
                                                            />
															{errMsg6.jenis_akun_bank ? (<span className="text-error badge badge-danger">{errMsg6.jenis_akun_bank}</span>) : ''}
                                                        </Form.Group>
                                                    </Form.Row>

                                                </div>
                                                <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                    <div className="form-group">
                                                        <div className="form-check">
                                                            {errMsg6.agreement6 ? (<span className="text-error badge badge-danger">{errMsg6.agreement6}</span>) : ''}
                                                            <label>
                                                                <input
                                                                    checked={dataAkunBank.agreement6 === 'Y' ? true : false}
                                                                    onChange={this.handleChangeAkunBank.bind(this)} value={'Y'} className="form-check-input" type="checkbox" name="agreement6" />
                                                                <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid. Saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                            </label>
                                                        </div>
                                                        <AppButton
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit6.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>
                                                        <AppButton
                                                            onClick={this.handleSubmit6.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="success">
                                                            Simpan</AppButton>
                                                    </div>
                                                </div>
                                            </Form>

                                        </Fragment>)}

                                        {active_tab === 'unggah_file' && (<Fragment>

                                            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                                <br />
                                                <h3>Unggah Dokumen</h3>
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3' }} >
                                                            <h6 className="text-uppercase text-green mb-4">Catatan Penting</h6>
                                                            <ul className="list-check">
                                                                <li>KTP / SIM / Paspor</li>
                                                                <li>Foto Terkini</li>
                                                                <li>
                                                                    Pilih salah satu di bawah ini untuk dokumen lainnya
                                                                    <ul>
                                                                        <li>Rekening Koran Bank / Tagihan Kartu Kredit</li>
                                                                        <li>Rekening Listrik/ Telepon</li>
                                                                        <li>Tambahan Dokumen Lain 1 (Apabila Diperlukan)</li>
                                                                        <li>Tambahan Dokumen Lain 2 (Apabila Diperlukan)</li>
                                                                    </ul>
                                                                </li>
                                                            </ul>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="alert alert-sm" style={{ backgroundColor: '#efefef', color: '#505f79', fontSize: '1rem', lineHeight: 1.5, fontWeight: 300 }} >
                                                            <div className="row">
                                                                <div className="col-md-9">
                                                                    <h4 style={{ marginBottom: '.8rem', marginTop: '.8rem' }}>Unggah KTP/SIM/PASPOR</h4>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <Form>
                                                                        <Form.Group controlId="KTP">
                                                                            <Form.File
                                                                                className="custom-file-input2"
                                                                                size="lg"
                                                                                name="KTP" setfieldvalue="" onChange={this.handleChangePhoto.bind(this)} >

                                                                            </Form.File>

                                                                        </Form.Group>
                                                                    </Form>
                                                                </div>
																
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-9">
                                                                    <h4 style={{ marginBottom: '.8rem', marginTop: '.8rem' }}>Unggah Foto Terkini</h4>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <Form>
                                                                        <Form.Group controlId="PHOTO">
                                                                            <Form.File
                                                                                className="custom-file-input2"
                                                                                size="lg"
                                                                                name="PHOTO" setfieldvalue="" onChange={this.handleChangePhoto.bind(this)} >

                                                                            </Form.File>

                                                                        </Form.Group>
                                                                    </Form>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-9">
                                                                    <h4 style={{ marginBottom: '1.2rem', marginTop: '.8rem' }}>Cover Buku Tabungan</h4>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <Form>
                                                                        <Form.Group controlId="OTHER">
                                                                            <Form.File
                                                                                className="custom-file-input2"
                                                                                size="lg"
                                                                                name="OTHER" setfieldvalue="" onChange={this.handleChangePhoto.bind(this)} >

                                                                            </Form.File>

                                                                        </Form.Group>
                                                                    </Form>
                                                                </div>
                                                            </div>



                                                            {errUplFileMsg ? (
                                                                <div className="alert alert-info alert-sm" style={{ marginTop: '.3rem' }}>
                                                                    <button onClick={this.hideAlert.bind(this)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                                    <span className="fw-semi-bold">{errUplFileMsg}</span>
                                                                </div>
                                                            ) : ''}
                                                        </div>
                                                        <br />


                                                        <div className="table-responsive">
                                                            <table className="table table__document">
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: '15%' }}>File</th>
                                                                        <th style={{ width: '40%' }}>Nama File</th>
                                                                        <th style={{ width: '15%' }}>Tipe</th>
                                                                        <th style={{ width: '10%' }}>Ukuran</th>
                                                                        <th style={{ width: '20%' }}>Tindakan</th>
                                                                    </tr>
                                                                </thead>

                                                                {isFetchingUpl ? (
                                                                    <tbody>
                                                                        <tr><td colSpan="5"><Paragraph rowHeight={20} rowMargin={7} rows={1} active /></td></tr>
                                                                        <tr><td colSpan="5"><Paragraph rowHeight={20} rowMargin={7} rows={1} active /></td></tr>

                                                                    </tbody>) : (
                                                                    <Fragment>
                                                                        <tbody>
                                                                            {docPribadi ? (
                                                                                docPribadi.map((dp, index) => {
																															
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
                                                                                            <td></td>
                                                                                            <td>{dp.tipe}</td>
                                                                                            <td>{dp.size}kb</td>
                                                                                            <td align="center">
                                                                                                <IconButton onClick={this.deleteRecordFile.bind(this, dp.dokumen_id)} icon={<Icon icon="close" />} />
                                                                                                <br />
                                                                                                <a href={dp.file}><IconButton style={{ marginTop: 5 }} icon={<Icon icon="download2" />} /></a>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            ) : ''}

                                                                        </tbody>

                                                                    </Fragment>
                                                                )}

                                                            </table>
															
                                                        </div>


                                                    </div>
													{!unggahFileName ? (
                                                                <div className="alert alert-danger alert-sm">
                                                                   
                                                                    <span className="fw-semi-bold">Silahkan upload semua photo dengan lengkap</span>
                                                                </div>
                                                            ) : ''}
                                                </div>
												
                                            </div>
                                            <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                                <div className="form-group">
                                                    <div className="form-check">

                                                        <div style={{ textAlign: 'center', fontSize: '1.7rem', fontWeight: 600 }}><h2>PERNYATAAN KEBENARAN DAN TANGGUNG JAWAB</h2></div>

                                                        <div className="form-check-text">
                                                            Dengan mengisi kolom "YA" di bawah ini, saya menyatakan bahwa semua informasi dan semua dokumen yang saya lampirkan dalam <b style={{ color: '#000' }}>APLIKASI PEMBUKAAN REKENING TRANSAKSI SECARA ELEKTRONIK ON-LINE</b> adalah benar dan tepat, Saya akan bertanggung jawab penuh apabila dikemudian hari terjadi sesuatu hal sehubungan dengan ketidakbenaran data yang saya berikan.


                                                        </div>

                                                        <br />
                                                        <div className="form-group row align-items-center">
                                                            <div className="col">
                                                                Pernyataan Kebenaran Dan Tanggung Jawab
                                                                {errMsg7.agree ? (<span className="text-error badge badge-danger">{errMsg7.agree}</span>) : ''}
                                                            </div>
                                                            <div className="col-sm-6 col-md-9">
                                                                <Form.Group controlId="agree">
                                                                    <Form.Check
                                                                        inline
                                                                        onChange={this.handleChangeDPP.bind(this)}
                                                                        checked={dokumenPribadiPernyataan && dokumenPribadiPernyataan.agree !== 'N' ? true : false}
                                                                        value='Y'
                                                                        type='radio'
                                                                        name='agree'
                                                                        label='Ya'
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        checked={dokumenPribadiPernyataan && dokumenPribadiPernyataan.agree === 'N' ? true : false}
                                                                        onChange={this.handleChangeDPP.bind(this)}
                                                                        value='N'
                                                                        type='radio'
                                                                        name='agree'
                                                                        label='Tidak'
                                                                    />
                                                                </Form.Group>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row align-items-center">
                                                            <div className="col">
                                                                Menyatakan Pada Tanggal
                                                            </div>
                                                            <div className="col-sm-6 col-md-9">
                                                                {dokumenPribadiPernyataan.tanggal ? dokumenPribadiPernyataan.tanggal : moment(new Date()).format('YYYY-MM-DD')}

                                                            </div>
                                                        </div>

                                                        <AppButton
														disabled={!unggahFileName}
                                                            style={{ color: '#ffffff', marginRight: 5 }}
                                                            onClick={this.handleSubmit7.bind(this, 'detil_pribadi')}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">Selanjutnya</AppButton>
                                                    </div>

                                                </div>
                                            </div>

                                        </Fragment>)}
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

                            </div>
                        </div>
                    </div>
                </section>
            </div>



        )
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
    user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
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
            dispatch(simpanDataPribadi(param));
            
        },
		getDataPribadi:(param)=>{
			dispatch(fetchUserBytoken());
		},
        onSaveDataTrading: async (param) => {
            await dispatch(simpanDataExpTrading(param));
        },
        getDataTrading: async () => {
            await dispatch(getExpTrading());
        },
        onSaveDataKekayaan: (param) => {
            dispatch(simpanDataKekayaan(param));
            dispatch(getKekayaan());
        },
        onSaveKontakDarurat: (param) => {
            dispatch(simpanKontakDarurat(param));
        },
        getDataKontakDarurat: async () => {
            await dispatch(getKontakDarurat());
        },
        onSaveDataPekerjaan: async (param) => {
            await dispatch(simpanDataPekerjaan(param));
        },
        getDataPekerjaan: async () => {
            await dispatch(getPekerjaan());
        },
        onSaveAkunBank: async (param) => {
            await dispatch(simpanAkunBank(param));
        },
        getDataAKunBank: async () => {
            await dispatch(getAkunBank());
        },
        onSaveDPP: (param) => {
            dispatch(simpanDPP(param));
        },
        getDPP: async () => {
            await dispatch(getDocPribadi());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Personal);