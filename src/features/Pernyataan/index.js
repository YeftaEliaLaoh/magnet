import React, { Component, createRef } from 'react'
import { Col, Input, Panel, PanelGroup, Row } from 'rsuite';
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import Pernyataan3 from "../../components/modal/Pernyataan3";
import moment from 'moment';
import "moment/locale/id";
import { Form } from 'react-bootstrap'
import { getDataPernyataan, chgProps, simpanDataPernyataan,getSelectAkun,getBankPerusahaan } from './pernyataanSlice';
import { profileUser } from '../main/mainSlice';
import { getAkunTradingDemo } from '../Setoran/setoranSlice';
import { getDataPP } from "../ProfilePerusahaan/ppSlice";

class Pernyataan extends Component {
    constructor(props) {
        super(props);
		this.scrollDiv = createRef();
        this.initData = {
            pernyataan1: '',
            pernyataan2: '',
            pernyataan3: '',
            pernyataan4: '',
            badan_abritase: '',
            pengadilan: '',
            wakil_pialang: '',
            agree: '',
        }
        this.state = {
            lastSegmentUrl: "",
            defaultActiveKey: 1,
            show: false,
            errMsg1: this.initData,
            data_tipe_akun_id: ''
        }
    }
	
    componentDidMount = async () => {
        const dt = {};
        const selectedId = sessionStorage.getItem('tipe_akun');
        if (selectedId) {
            const location = window.location.href;
            const BaseName = location.substring(location.lastIndexOf("/") + 1);
            this.props.onLoad(selectedId);
            await this.setState({ lastSegmentUrl: BaseName })
        } else {
			alert("Silahkan pilih tipe akun terlebih dulu");
            this.props.history.push("/account-type");
        }
    }

    handleBack() {
        this.props.history.push("/account-type");
    }

    handleChange(evt) {
        const name = evt.target.name;
        let value = evt.target.value;
        if (name === "agree") {
            value = evt.target.checked ? 'Y' : 'N';
        }
        console.log(name,value)
		if(name === "pernyataan1" && value === "Y"){
            console.log("asdas")
			this.setState({ defaultActiveKey: 2 },()=>{setTimeout(()=>{this.scrollDiv.current.scrollIntoView(false);},500)	});
					
		}
		if(name === "pernyataan2" && value === "Y"){
			this.setState({ defaultActiveKey: 3 },()=>{setTimeout(()=>{this.scrollDiv.current.scrollIntoView(false);},500)	});
		
		}
		if(name === "pernyataan3" && value === "Y"){
            let errors = this.state.errMsg1;
            errors.badan_abritase = this.props.dataPernyataan.badan_abritase === '' || this.props.dataPernyataan.badan_abritase === null ? "Kolom ini harus diisi" : '';
		
        if (!errors.badan_abritase) errors.badan_abritase = this.props.dataPernyataan.badan_abritase === 'N' && !this.props.dataPernyataan.pengadilan ? "Silakan Pilih Pengadilan Negeri" : errors.badan_abritase;
        this.setState({ errors });
        if (!this.validateForm(this.state.errMsg1)) {
            this.scrollToError()
        } else {
			this.setState({ defaultActiveKey: 4 },()=>{setTimeout(()=>{this.scrollDiv.current.scrollIntoView(false);},500)	});
        }
		}
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;

        console.log(evt.target.checked)
        this.props.changeProps(dt);
    }

    scrollToError = () => {
        const items = document.getElementsByClassName('badge-danger');
    const visible = [...items].filter((el) => {
      // jQuery-like :visible selector
      return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
    });
    
    if (visible.length > 0) {
      window.scrollTo({
        top: items[0].offsetTop,
        behavior: 'smooth'
      });
    }
      }

    handlesubmit(action) {
        var errors = this.state.errMsg1;
		console.log(this.props.dataPernyataan.pernyataan1);
        errors.pernyataan1 = this.props.dataPernyataan.pernyataan1 !== 'Y' ? "Pilihan ini harus disetujui" : '';
        errors.pernyataan2 = this.props.dataPernyataan.pernyataan2 !== 'Y' ? "Pilihan ini harus disetujui" : '';
        errors.pernyataan3 = this.props.dataPernyataan.pernyataan3 !== 'Y' ? "Pilihan ini harus disetujui" : '';
        errors.badan_abritase = this.props.dataPernyataan.badan_abritase === '' || this.props.dataPernyataan.badan_abritase === null ? "Silakan Pilih Pilihan Resolusi Konflik" : '';
        

        this.setState({ errors });
        if (!this.validateForm(this.state.errMsg1)) {
      
            if (errors.pernyataan1 !== '') {
                this.setState({ defaultActiveKey: 1 },()=>{setTimeout(()=>{this.scrollDiv.current?.scrollIntoView(false);},500)});
            } else if(errors.pernyataan2 !== '') {
                this.setState({ defaultActiveKey: 2 },()=>{setTimeout(()=>{this.scrollDiv.current?.scrollIntoView(false);},500)});
            } else if(errors.pernyataan3 !== '') {
                this.setState({ defaultActiveKey: 3 },()=>{setTimeout(()=>{this.scrollDiv.current?.scrollIntoView(false);},500)});
            } else {
                this.setState({ defaultActiveKey: 3 },()=>{setTimeout(()=>{this.scrollDiv.current?.scrollIntoView(false);},500)});
            }

        } else {
            this.props.onSave(this.props.dataPernyataan);
            if (action) this.props.history.push("/trading_rules");
        }
      
    }

    handleSelect(evt) {
        console.log(evt)
        this.setState({ defaultActiveKey: evt })
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    render() {
        const { lastSegmentUrl, defaultActiveKey, errMsg1 } = this.state;
        const { user, dataPernyataan, profile_perusahaan,legalitas_perusahaan,dataBankPerusahaan, } = this.props;
        const { arr_wakil_pialang } = dataPernyataan;
        const tgl_lhir = user && user.tanggal_lahir ? moment(new Date(user.tanggal_lahir)).format('DD/MM/YYYY') : '';
		
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
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Registrasi Akun Online</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px",borderRadius:"2rem" }}>
                                    <div className="card-body ">
                                        <div style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                                                    <h3 className="label_ijo">Pernyataan</h3>
                                            <br />

                                            <PanelGroup accordion activeKey={defaultActiveKey} defaultActiveKey={1} onSelect={this.handleSelect.bind(this)}>
                                           
                                                <Panel eventKey={1} expanded={true} className="w-accordion__header__title shadow-lg px-2 py-1 my-2 mx-2" header="1. Pernyataan Telah Melakukan Simulasi Perdagangan Berjangka Komoditi">
                                                        <br/>
                                                        <strong><span className="label_hitam">Yang mengisi formulir di bawah ini: </span></strong>
                                                        <br /><br/>
                                                        <Row>
                                                            
                                                            <Col xs={12} lg={6}><label style={{ color: '#6b798f', marginTop: 8 }}><span className="label_merah">Nama Lengkap</span></label></Col>
                                                            <Col xs={24} lg={6}>
                                                                <Input readOnly size="lg" value={user ? user.nama_depan : ''} />
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            
                                                        </Row>
                                                        <br />
                                                        <Row>    
                                                            <Col xs={24} lg={6}>
                                                                <label style={{ color: '#6b798f', marginTop: 8 }}><span className="label_merah">Kota Lahir</span></label></Col>
                                                            
                                                            <Col xs={24} lg={6}>
                                                                <Input readOnly size="lg" value={user && user.kota_lahir ? user.kota_lahir : ''} />
                                                            </Col>

                                                        </Row>
                                                        
                                                        <br />
                                                        
                                                        <Row>
                                                            <Col xs={24} lg={6}>
                                                                <label style={{ color: '#6b798f', marginTop: 8 }}><span className="label_merah">Alamat Rumah</span></label></Col>
                                                                <Col xs={24} lg={6}>
                                                                <Input readOnly size="lg" value={user && user.alamat ? user.alamat : ''} />
                                                            </Col>
                                                        </Row>
                                                        
                                                        <br />
                                                        <Row>
                                                            <Col xs={24} lg={6}>
                                                                <label style={{ color: '#6b798f', marginTop: 8 }}><span className="label_merah">No.Identitas</span></label></Col>
                                                           
                                                            <Col xs={24} lg={6}>
                                                                <Input readOnly size="lg" value={user && user.no_identitas ? user.no_identitas : ''} />
                                                            </Col>
                                                            
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            
                                                            <Col xs={24} lg={6}>
                                                                <label style={{ color: '#6b798f', marginTop: 8 }}><span className="label_merah">No.Demo Acc.</span></label></Col>
                                                            <Col xs={24} lg={6}>
                                                                <Input readOnly size="lg" value={localStorage.getItem('loginDemo') ? localStorage.getItem('loginDemo') : ''} />
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <center>
                                                            <span className="label_hitam">
                                                            Dengan mengisi kolom "YA" di bawah ini, saya menyatakan bahwa saya telah melakukan simulasi bertransaksi di bidang Perdagangan Berjangka Komoditi pada {profile_perusahaan.perusahaan}, dan telah memahami tentang tata cara bertransaksi di bidang Perdagangan Berjangka Komoditi.
                                                            <br />
                                                            <br />
                                                            Demikian Pernyataan ini dibuat dengan sebenarnya dalam keadaan sadar, sehat jasmani dan rohani serta tanpa paksaan apapun dari pihak manapun
                                                            </span>
                                                        </center>
                                                        <br />
                                                        <br />
                                                        <div className="form-group row align-items-center">
                                                            <div className="col" style={{fontWeight: "normal"}}>
                                                                Pernyataan Menerima / Tidak
                                                                {errMsg1.pernyataan1 ? (<span className="text-error badge badge-danger">{errMsg1.pernyataan1}</span>) : ''}
                                                            </div>
                                                            <div className="col-sm-6 col-md-9">
                                                                    <Form.Check
                                                                        inline
                                                                        onChange={this.handleChange.bind(this)}
                                                                        checked={dataPernyataan.pernyataan1 === 'Y' ? true : false}
                                                                        value='Y'
                                                                        type='radio'
                                                                        id="check-pernyataan-penerima-ya"
                                                                        name='pernyataan1'
                                                                        label='Ya'
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        onChange={this.handleChange.bind(this)}
                                                                        checked={dataPernyataan.pernyataan1 === 'N' ? true : false}
                                                                        value='N'
                                                                        type='radio'
                                                                        id="check-pernyataan-penerima-tidak"
                                                                        name='pernyataan1'
                                                                        label='Tidak'
                                                                    />
                                                            </div>
                                                        </div>

                                                        <div className="form-group row align-items-center">
                                                            <div className="col">
                                                                Pernyataan Pada Tanggal
                                                            </div>
                                                            <div className="col-sm-6 col-md-9">
                                                                {moment(new Date()).format('YYYY-MM-DD')}
                                                            </div>
                                                        </div>
                                                    
                                                </Panel>
                                                <Panel eventKey={2} expanded={true} className="w-accordion__header__title label_hitam shadow-lg px-2 py-1 my-2 mx-2" header="2. Dokumen Pemberitahuan Adanya Risiko yang harus disampaikan oleh Pialang Berjangka untuk Transaksi Kontrak Derivatif dalam Sistem Perdagangan Alternatif">
                                                    <br/>
                                                    <p style={{ textAlign: "justify", color: "#000", fontSize: "1rem", fontWeight: 300 }}>Dokumen Pemberitahuan Adanya Risiko ini disampaikan kepada Anda sesuai dengan Pasal 50 ayat (2) Undang-Undang Nomor 32 Tahun 1997 tentang Perdagangan Berjangka Komoditi sebagaimana telah diubah dengan Undang-Undang Nomor 10 Tahun 2011 tentang Perubahan Atas Undang-Undang Nomor 32 Tahun 1997 Tentang Perdagangan Berjangka Komoditi.</p>
                                                    <p style={{ textAlign: "justify", color: "#000", fontSize: "1rem", fontWeight: 300 }}>Maksud dokumen ini adalah memberitahukan bahwa kemungkinan kerugian atau keuntungan dalam perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif bisa mencapai jumlah yang sangat besar.Oleh karena itu, Anda harus berhati-hati dalam memutuskan untuk melakukan transaksi, apakah kondisi keuangan Anda mencukupi.</p>
                                                    <ol style={{ listStyle:"auto" }}>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif belum tentu layak bagi semua investor.</strong></p>
                                                            <p>Anda dapat menderita kerugian dalam jumlah besar dan dalam jangka waktu singkat.Jumlah kerugian uang dimungkinkan dapat melebihi jumlah uang yang pertama kali Anda setor (Margin Awal) ke Pialang Berjangka Anda.</p>
                                                            <p>Anda mungkin menderita kerugian seluruh Margin dan Margin tambahan yang ditempatkan pada Pialang Berjangka untuk mempertahankan posisi Kontrak Derivatif dalam Sistem Perdagangan Alternatif Anda.</p>
                                                            <p>Hal ini disebabkan Perdagangan Berjangka sangat dipengaruhi oleh mekanisme leverage, dimana dengan jumlah investasi dalam bentuk yang relatif kecil dapat digunakan untuk membuka posisi dengan aset yang bernilai jauh lebih tinggi.Apabila Anda tidak siap dengan risiko seperti ini, sebaiknya Anda tidak melakukan perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif.</p>

                                                        </li>
                                                        
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif mempunyai risiko dan mempunyai kemungkinan kerugian yang tidak terbatas yang jauh lebih besar dari jumlah uang yang disetor (Margin) ke Pialang Berjangka.</strong></p>
                                                            <p>Kontrak Derivatif dalam Sistem Perdagangan Alternatif sama dengan produk keuangan lainnya yang mempunyai risiko tinggi, Anda sebaiknya tidak menaruh risiko terhadap dana yang Anda tidak siap untuk menderita rugi, seperti tabungan pensiun, dana kesehatan atau dana untuk keadaan darurat, dana yang disediakan untuk pendidikan atau kepemilikan rumah, dana yang diperoleh dari pinjaman pendidikan atau gadai, atau dana yang digunakan untuk memenuhi kebutuhan sehari-hari.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Berhati-hatilah terhadap pernyataan bahwa Anda pasti mendapatkan keuntungan besar dari perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif.</strong></p>
                                                            <p>Meskipun perdagangan Kontrak Derivatif dalam Sistem Perdagangan Alternatif dapat memberikan keuntungan yang besar dan cepat, namun hal tersebut tidak pasti, bahkan dapat menimbulkan kerugian yang besar dan cepat juga.Seperti produk keuangan lainnya, tidak ada yang dinamakan "pasti untung".
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Disebabkan adanya mekanisme leverage dan sifat dari transaksi Kontrak Derivatif dalam Sistem Perdagangan Alternatif, Anda dapat merasakan dampak bahwa Anda menderita kerugian dalam waktu cepat.</strong></p><p>
                                                                Keuntungan maupun kerugian dalam transaksi akan langsung dikredit atau didebet ke rekening Anda, paling lambat secara harian.Apabila pergerakan di pasar terhadap Kontrak Derivatif dalam Sistem Perdagangan Alternatif menurunkan nilai posisi Anda dalam Kontrak Derivatif dalam Sistem Perdagangan Alternatif, dengan kata lain berlawanan dengan posisi yang Anda ambil, Anda diwajibkan untuk menambah dana untuk pemenuhan kewajiban Margin ke perusahaan Pialang Berjangka.Apabila rekening Anda berada dibawah minimum Margin yang telah ditetapkan Lembaga Kliring Berjangka atau Pialang Berjangka, maka posisi Anda dapat dilikuidasi pada saat rugi, dan Anda wajib menyelesaikan defisit (jika ada) dalam rekening Anda.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Pada saat pasar dalam keadaan tertentu, Anda mungkin akan sulit atau tidak mungkin melikuidasi posisi.</strong></p><p>
                                                                Pada umumnya Anda harus melakukan transaksi mengambil posisi yang berlawanan dengan maksud melikuidasi posisi (offset) jika ingin melikuidasi posisi dalam Kontrak Derivatif dalam Sistem Perdagangan Alternatif.Apabila Anda tidak dapat melikuidasi posisi Kontrak Derivatif dalam Sistem Perdagangan Alternatif, Anda tidak dapat merealisasikan keuntungan pada nilai posisi tersebut atau mencegah kerugian yang lebih tinggi.Kemungkinan tidak dapat melikuidasi dapat terjadi, antara lain: jika perdagangan berhenti dikarenakan aktivitas perdagangan yang tidak lazim pada Kontrak Derivatif atau subjek Kontrak Derivatif, atau terjadi kerusakan sistem pada Pialang Berjangka Peserta Sistem Perdagangan Alternatif atau Pedagang Berjangka Penyelenggara Sistem Perdagangan Alternatif.Bahkan apabila Anda dapat melikuidasi posisi tersebut, Anda mungkin terpaksa melakukannya pada harga yang menimbulkan kerugian besar.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Pada saat pasar dalam keadaan tertentu, Anda mungkin akan sulit atau tidak mungkin mengelola risiko atas posisi terbuka Kontrak Derivatif dalam Sistem Perdagangan Alternatif dengan cara membuka posisi dengan nilai yang sama namun dengan posisi yang berlawanan dalam kontrak bulan yang berbeda, dalam pasar yang berbeda atau dalam "subjek Kontrak Derivatif dalam Sistem Perdagangan Alternatif" yang berbeda.</strong>
                                                            </p>
                                                            <p>Kemungkinan untuk tidak dapat mengambil posisi dalam rangka membatasi risiko yang timbul, contohnya; jika perdagangan dihentikan pada pasar yang berbeda disebabkan aktivitas perdagangan yang tidak lazim pada Kontrak Derivatif dalam Sistem Perdagangan Alternatif atau "Kontrak Derivatif dalam Sistem Perdagangan Alternatif".</p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Anda dapat menderita kerugian yang disebabkan kegagalan sistem informasi.</strong></p><p>
                                                                Sebagaimana yang terjadi pada setiap transaksi keuangan, Anda dapat menderita kerugian jika amanat untuk melaksanakan transaksi Kontrak Derivatif dalam Sistem Perdagangan Alternatif tidak dapat dilakukan karena kegagalan sistem informasi di Bursa Berjangka, Pedagang Penyelenggara Sistem Perdagangan Alternatif, maupun sistem di Pialang Berjangka Peserta Sistem Perdagangan Alternatif yang mengelola posisi Anda.Kerugian Anda akan semakin besar jika Pialang Berjangka yang mengelola posisi Anda tidak memiliki sistem informasi cadangan atau prosedur yang layak.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Semua Kontrak Derivatif dalam Sistem Perdagangan Alternatif mempunyai risiko, dan tidak ada strategi berdagang yang dapat menjamin untuk menghilangkan risiko tersebut.</strong></p><p>
                                                                Strategi dengan menggunakan kombinasi posisi seperti spread, dapat sama berisiko seperti posisi long atau short.Melakukan Perdagangan Berjangka memerlukan pengetahuan mengenai Kontrak Derivatif dalam Sistem Perdagangan Alternatif dan pasar berjangka.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Strategi perdagangan harian dalam Kontrak Derivatif dalam Sistem Perdagangan Alternatif dan produk lainnya memiliki risiko khusus.</strong></p><p>
                                                                Seperti pada produk keuangan lainnya, pihak yang ingin membeli atau menjual Kontrak Derivatif dalam Sistem Perdagangan Alternatif yang sama dalam satu hari untuk mendapat keuntungan dari perubahan harga pada hari tersebut ("day traders") akan memiliki beberapa risiko tertentu antara lain jumlah komisi yang besar, risiko terkena efek pengungkit ("exposure to leverage"), dan persaingan dengan pedagang profesional.Anda harus mengerti risiko tersebut dan memiliki pengalaman yang memadai sebelum melakukan perdagangan harian ("day trading").
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Menetapkan amanat bersyarat, Kontrak Derivatif dalam Sistem Perdagangan Alternatif dilikuidasi pada keadaan tertentu untuk membatasi rugi (stop loss), mungkin tidak akan dapat membatasi kerugian Anda sampai jumlah tertentu saja.</strong></p><p>
                                                                Amanat bersyarat tersebut mungkin tidak dapat dilaksanakan karena terjadi kondisi pasar yang tidak memungkinkan melikuidasi Kontrak Derivatif dalam Sistem Perdagangan Alternatif.
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Anda harus membaca dengan seksama dan memahami Perjanjian Pemberian Amanat Nasabah dengan Pialang Berjangka Anda sebelum melakukan transaksi Kontrak Derivatif dalam Sistem Perdagangan Alternatif.</strong>
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Pernyataan singkat ini tidak dapat memuat secara rinci seluruh risiko atau aspek penting lainnya tentang Perdagangan Berjangka.Oleh karena itu Anda harus mempelajari kegiatan Perdagangan Berjangka secara cermat sebelum memutuskan melakukan transaksi.</strong>
                                                            </p>

                                                        </li>
                                                        <li tabIndex="1">
                                                            <p>
                                                                <strong>Dokumen Pemberitahuan Adanya Risiko (Risk Disclosure) ini dibuat dalam Bahasa Indonesia.</strong>
                                                            </p>

                                                        </li>
                                                    </ol>

                                                    <p style={{ textAlign: 'center' }}>PERNYATAAN MENERIMA PEMBERITAHUAN ADANYA RISIKO</p>
                                                    <p style={{ textAlign: 'center' }}>Dengan mengisi kolom "YA" di bawah, saya menyatakan bahwa saya telah menerima<br />"DOKUMEN PEMBERITAHUAN ADANYA RISIKO"<br />mengerti dan menyetujui isinya.</p>

                                                    <div className="form-group row align-items-center">
                                                        <div className="col" style={{fontWeight: "normal"}}>
                                                            Pernyataan Menerima / Tidak
                                                            {errMsg1.pernyataan2 ? (<span className="text-error badge badge-danger">{errMsg1.pernyataan2}</span>) : ''}
                                                        </div>
                                                        <div className="col-sm-6 col-md-9">
                                                                <Form.Check
                                                                    inline
                                                                    onChange={this.handleChange.bind(this)}
                                                                    checked={dataPernyataan.pernyataan2 === 'Y' ? true : false}
                                                                    value='Y'
                                                                    type='radio'
                                                                    name='pernyataan2'
                                                                    id="check-pernyataan2-penerima-ya"
                                                                    label='Ya'
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    onChange={this.handleChange.bind(this)}
                                                                    checked={dataPernyataan.pernyataan2 === 'N' ? true : false}
                                                                    value='N'
                                                                    type='radio'
                                                                    id="check-pernyataan2-penerima-tidak"
                                                                    name='pernyataan2'
                                                                    label='Tidak'
                                                                />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row align-items-center">
                                                        <div className="col">
                                                            Pernyataan Pada Tanggal
                                                        </div>
                                                        <div className="col-sm-6 col-md-9">
                                                            {moment(new Date()).format('YYYY-MM-DD')}
                                                        </div>
                                                    </div>

                                                </Panel>

                                                <Panel eventKey={3} expanded={true} className="w-accordion__header__title shadow-lg px-2 py-1 my-2 mx-2" header="3. Perjanjian Pemberian Amanat secara Elektronik On-line untuk Transaksi Kontrak Derivatif dalam Sistem Perdagangan Alternatif">
                                                    <br/>
                                                    <div className="form-group text-center">
                                                        <div className="alert alert-danger kolom_merah" style={{ background: '#C2252C',color:'#fff',borderRadius:'10px'}}>
                                                            <div className="alert-heading">PERHATIAN !!!</div>
                                                            PERJANJIAN INI MERUPAKAN KONTRAK HUKUM.HARAP DIBACA DENGAN SEKSAMA.
                                                        </div>
                                                    </div>

                                                    <p>Pada hari ini<strong> {moment(new Date()).format('dddd')}</strong>, tanggal <strong>{moment(new Date()).format('DD')} </strong> bulan <strong>{moment(new Date()).format('MMMM')}</strong> <strong>{moment(new Date()).format('YYYY')}</strong>, kami yang mengisi perjanjian di bawah ini: </p>

                                                    <ol className="list_aja">
                                                        <li tabIndex={1}>
                                                            <p>Nama: <b className="declaration_name_html">{user ? user.nama_depan + ' ' + user.nama_belakang : ''}</b></p>
                                                            <p>Pekerjaan/Jabatan: <b className="declaration_employment_status_html">{user.status_pekerjaan}</b>
                                                            </p>
                                                            <p>Alamat: <b className="declaration_address_html">{user ? user.alamat + ' ' + user.rt + ' ' + user.rw + ' ' + user.provinsi : ''}</b></p>
                                                            <p>Dalam hal ini bertindak untuk dan atas nama  sendiri yang selanjutnya disebut <b>Nasabah</b>.</p>
                                                        </li>
                                                        <li tabIndex={1}>

                                                            <p>Nama: <b className="declaration_name_html">{arr_wakil_pialang &&
															(arr_wakil_pialang.map((awp, index)=>{
																if(index > 0){
																	return (
																		', '+awp.nama_depan						
																	)
																}else{
																	return (
																		awp.nama_depan					
																	)
																}
															}))}</b></p>
                                                            <p>Pekerjaan/Jabatan: <b className="declaration_employment_status_html">Wakil Pialang</b>
                                                                <br clear="all" />
                                                            </p>
															<p style={{ display: 'flex', flexDirection: "row" }}>
                                                                <span style={{ marginRight: 5 }}>Alamat:{" "}</span>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: profile_perusahaan.alamat,
                                                                    }}
                                                                />
                                                            </p>
                                                            <p>Dalam hal ini bertindak untuk dan atas nama  <b>{profile_perusahaan.perusahaan}</b> yang selanjutnya disebut <b>Pialang Berjangka</b>, </p>
                                                            <p>Nasabah dan Pialang Berjangka secara bersama-sama selanjutnya disebut <b>Para Pihak</b>.</p>
                                                        </li>
                                                    </ol>
                                                    <p>Para Pihak sepakat untuk mengadakan Perjanjian Pemberian Amanat untuk melakukan transaksi penjualan maupun pembelian Kontrak Derivatif dalam Sistem Perdagangan Alternatif dengan ketentuan sebagai berikut: </p>
                                                    <ol className="list_aja">

                                                        <li tabIndex={1}>
                                                            <p><b>Margin dan Pembayaran Lainnya</b></p>
                                                            <p>(1) <b>Nasabah menempatkan sejumlah dana </b>(<i>Margin</i>) ke Rekening Terpisah <i>(segregated account) </i>Pialang Berjangka sebagai Margin awal dan wajib mempertahankannya sebagaimana ditetapkan.</p>
                                                            <p>(2) Membayar biaya-biaya yang diperlukan untuk transaksi yaitu biaya transaksi, pajak, komisi, dan biaya pelayanan, biaya bunga sesuai tingkat yang berlaku, dan biaya lainnya yang dapat dipertanggungjawabkan berkaitan dengan transaksi sesuai amanat Nasabah, maupun biaya rekening Nasabah.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pelaksanaan Transaksi</b></p>
                                                            <p>(1) Setiap transaksi Nasabah dilaksanakan secara elektronik on-line oleh Nasabah yang bersangkutan; </p>
                                                            <p>(2) Setiap amanat Nasabah yang diterima dapat langsung dilaksanakan sepanjang nilai Margin yang tersedia pada rekeningnya mencukupi dan eksekusinya dapat menimbulkan perbedaan waktu terhadap proses pelaksanaan transaksi tersebut.Nasabah harus mengetahui posisi Margin dan posisi terbuka sebelum memberikan amanat untuk transaksi berikutnya.</p>
                                                            <p>
                                (3) Setiap transaksi Nasabah secara bilateral
                                dilawankan dengan Penyelenggara Sistem
                                Perdagangan Alternatif{" "}
                                {legalitas_perusahaan.nama_penyelenggara} yang
                                bekerjasama dengan Pialang Berjangka.
                              </p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Kewajiban Memelihara Margin</b></p>
                                                            <p>(1) Nasabah wajib memelihara/memenuhi tingkat <i>Margin</i> yang harus tersedia di rekening pada Pialang Berjangka sesuai dengan jumlah yang telah ditetapkan baik diminta ataupun tidak oleh Pialang Berjangka</p>
                                                            <p>(2) Apabila jumlah <i>Margin</i> memerlukan penambahan maka Pialang Berjangka wajib memberitahukan dan memintakan kepada Nasabah untuk menambah <i>Margin</i> segera..</p>
                                                            <p>(3) Apabila jumlah Margin memerlukan tambahan (<i>Call margin</i>) maka Nasabah wajib melakukan penyerahan <i>Call margin </i>selambat-lambatnya sebelum dimulai hari perdagangan berikutnya.Kewajiban Nasabah sehubungan dengan penyerahan <i>Call margin </i> tidak terbatas pada jumlah Margin awal.</p>
                                                            <p>(4) Pialang Berjangka tidak berkewajiban melaksanakan amanat untuk melakukan transaksi yang baru dari Nasabah sebelum <i>Call margin </i>dipenuhi..</p>
                                                            <p>(5) Untuk memenuhi kewajiban <i>Call margin </i> dan keuangan lainnya dari Nasabah, Pialang Berjangka dapat mencairkan dana Nasabah yang ada di Pialang Berjangka</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Hak Pialang Berjangka Melikuidasi Posisi Nasabah</b></p>
                                                            <p>Nasabah bertanggung jawab memantau/mengetahui posisi terbukanya secara terus- menerus dan memenuhi kewajibannya.Apabila dalam jangka waktu tertentu dana pada rekening Nasabah kurang dari yang dipersyaratkan, Pialang Berjangka dapat menutup posisi terbuka Nasabah secara keseluruhan atau sebagian, membatasi transaksi, atau tindakan lain untuk melindungi diri dalam pemenuhan <i>Margin</i> tersebut dengan terlebih dahulu memberitahu atau tanpa memberitahu Nasabah dan Pialang Berjangka tidak bertanggung jawab atas kerugian yang timbul akibat tindakan tersebut.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Penggantian Kerugian Tidak Adanya Penutupan Posisi</b></p>
                                                            <p>Apabila Nasabah tidak mampu melakukan penutupan atas transaksi yang jatuh tempo, Pialang Berjangka dapat melakukan penutupan atas transaksi Nasabah yang terjadi.Nasabah wajib membayar biaya-biaya, termasuk biaya kerugian dan premi yang telah dibayarkan oleh Pialang Berjangka, dan apabila Nasabah lalai untuk membayar biaya-biaya tersebut, Pialang Berjangka berhak untuk mengambil pembayaran dari dana Nasabah.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pialang Berjangka Dapat Membatasi Posisi</b></p>
                                                            <p>Nasabah mengakui hak Pialang Berjangka untuk membatasi posisi terbuka Kontrak dan Nasabah tidak melakukan transaksi melebihi batas yang telah ditetapkan tersebut.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Tidak Ada Jaminan atas Informasi atau Rekomendasi</b></p>
                                                            <p>Nasabah mengakui bahwa: </p>
                                                            <p>(1) Informasi dan rekomendasi yang diberikan oleh Pialang Berjangka kepada Nasabah tidak selalu lengkap dan perlu diverifikasi.</p>
                                                            <p>(2) Pialang Berjangka tidak menjamin bahwa informasi dan rekomendasi yang diberikan merupakan informasi yang akurat dan lengkap.</p>
                                                            <p>(3) Informasi dan rekomendasi yang diberikan oleh Wakil Pialang Berjangka yang satu dengan yang lain mungkin berbeda karena perbedaan analisis fundamental atau teknikal.Nasabah menyadari bahwa ada kemungkinan Pialang Berjangka dan pihak terafiliasinya memiliki posisi di pasar dan memberikan rekomendasi tidak konsisten kepada Nasabah.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pembatasan Tanggung Jawab Pialang Berjangka</b></p>
                                                            <p>(1) Pialang Berjangka tidak bertanggung jawab untuk memberikan penilaian kepada Nasabah mengenai iklim, pasar, keadaan politik dan ekonomi nasional dan internasional, nilai Kontrak Derivatif, kolateral, atau memberikan nasihat mengenai keadaan pasar.Pialang Berjangka hanya memberikan pelayanan untuk melakukan transaksi secara jujur serta memberikan laporan atas transaksi tersebut.</p>
                                                            <p>(2) Perdagangan sewaktu-waktu dapat dihentikan oleh pihak yang memiliki otoritas (Bappebti/Bursa Berjangka) tanpa pemberitahuan terlebih dahulu kepada Nasabah.Atas posisi terbuka yang masih dimiliki oleh Nasabah pada saat perdagangan tersebut dihentikan, maka akan diselesaikan (likuidasi) berdasarkan pada peraturan/ketentuan yang dikeluarkan dan ditetapkan oleh pihak otoritas tersebut, dan semua kerugian serta biaya yang timbul sebagai akibat dihentikannya transaksi oleh pihak otoritas perdagangan tersebut, menjadi beban dan tanggung jawab Nasabah sepenuhnya.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Transaksi Harus Mematuhi Peraturan Yang Berlaku</b></p>
                                                            <p>Semua transaksi dilakukan sendiri oleh Nasabah dan wajib mematuhi peraturan perundang-undangan dibidang Perdagangan Berjangka, kebiasaan dan interpretasi resmi yang ditetapkan oleh Bappebti atau Bursa Berjangka.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pialang Berjangka tidak Bertanggung jawab atas Kegagalan Komunikasi</b></p>
                                                            <p>Pialang Berjangka tidak bertanggung jawab atas keterlambatan atau tidak tepat waktunya pengiriman amanat atau informasi lainnya yang disebabkan oleh kerusakan fasilitas komunikasi atau sebab lain diluar kontrol Pialang Berjangka.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Konfirmasi</b></p>
                                                            <p>(1) Konfirmasi dari Nasabah dapat berupa surat, telex, media lain, surat elektronik, secara tertulis ataupun rekaman suara.</p>
                                                            <p>(2) Pialang Berjangka berkewajiban menyampaikan konfirmasi transaksi, laporan rekening, permintaan <i>Call margin</i>, dan pemberitahuan lainnya kepada Nasabah secara akurat, benar dan secepatnya pada alamat (email) Nasabah sesuai dengan yang tertera dalam rekening Nasabah.Apabila dalam jangka waktu 2 x 24 jam setelah amanat jual atau beli disampaikan, tetapi Nasabah belum menerima konfirmasi melalui alamat email Nasabah dan/atau sistem transaksi, Nasabah segera memberitahukan hal tersebut kepada Pialang Berjangka melalui telepon dan disusul dengan pemberitahuan tertulis.</p>
                                                            <p>(3) Jika dalam waktu 2 x 24 jam sejak tanggal penerimaan konfirmasi tertulis tersebut tidak ada sanggahan dari Nasabah maka konfirmasi Pialang Berjangka dianggap benar dan sah.</p>
                                                            <p>(4) Keliruan atas konfirmasi yang diterbitkan Pialang Berjangka akan diperbaiki oleh Pialang Berjangka sesuai keadaan yang sebenarnya dan demi hukum konfirmasi yang lama batal.</p>
                                                            <p>(5) Nasabah tidak bertanggung jawab atas transaksi yang dilaksanakan atas rekeningnya apabila konfirmasi tersebut tidak disampaikan secara benar dan akurat.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Kebenaran Informasi Nasabah</b></p>
                                                            <p>Nasabah memberikan informasi yang benar dan akurat mengenai data Nasabah yang diminta oleh Pialang Berjangka dan akan memberitahukan paling lambat dalam waktu 3 (tiga) hari kerja setelah terjadi perubahan, termasuk perubahan kemampuan keuangannya untuk terus melaksanakan transaksi.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Komisi Transaksi</b></p>
                                                            <p>Nasabah mengetahui dan menyetujui bahwa Pialang Berjangka berhak untuk memungut komisi atas transaksi yang telah dilaksanakan, dalam jumlah sebagaimana akan ditetapkan dari waktu ke waktu oleh Pialang Berjangka.Perubahan beban (fees) dan biaya lainnya harus disetujui secara tertulis oleh Para Pihak.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pemberian Kuasa</b></p>
                                                            <p>Nasabah memberikan kuasa kepada Pialang Berjangka untuk menghubungi bank, lembaga keuangan, Pialang Berjangka lain, atau institusi lain yang terkait untuk memperoleh keterangan atau verifikasi mengenai informasi yang diterima dari Nasabah.Nasabah mengerti bahwa penelitian mengenai data hutang pribadi dan bisnis dapat dilakukan oleh Pialang Berjangka apabila diperlukan.Nasabah diberikan kesempatan untuk memberitahukan secara tertulis dalam jangka waktu yang telah disepakati untuk melengkapi persyaratan yang diperlukan.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pemindahan Dana</b></p>
                                                            <p>Pialang Berjangka dapat setiap saat mengalihkan dana dari satu rekening ke rekening lainnya berkaitan dengan kegiatan transaksi yang dilakukan Nasabah Seperti pembayaran komisi, pembayaran biaya transaksi, kliring, dan keterlambatan dalam memenuhi kewajibannya, tanpa terlebih dahulu memberitahukan kepada Nasabah.Transfer yang telah dilakukan akan segera diberitahukan secara tertulis kepada Nasabah.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Pemberitahuan</b></p>
                                                            <p>(1) Semua komunikasi, uang, surat berharga, dan kekayaan lainnya harus dikirimkan langsung ke alamat Nasabah seperti tertera dalam rekeningnya atau alamat lain yang ditetapkan/diberitahukan secara tertulis oleh Nasabah.</p>
                                                            <p>(2) Semua uang harus disetor atau ditransfer langsung oleh Nasabah ke Rekening Terpisah <i>(Segregated Account)</i>Pialang Berjangka: </p>
                                                            <table cellSpacing={0} cellPadding={0} className="flat">
                                                                <tbody>
                                                                    <tr>
                                                                        <td><p>Nama</p></td>
                                                                        <td style={{ width: 50 }}><p>: </p></td>
                                                                        <td><p><b>{profile_perusahaan.perusahaan}</b></p></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><p>Alamat</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td><p><strong>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: profile_perusahaan.alamat,
                                          }}
                                        />
                                      </strong></p></td>
                                                                    </tr>
                                                                    {dataBankPerusahaan
                                    ? dataBankPerusahaan.map(function (bp) {
                                        return (
                                          <Pernyataan3
                                            namaBank={bp.nama_bank}
                                            atasNama={bp.atas_nama}
                                            cabang={bp.cabang}
                                            noRek={bp.no_rek}
                                            noRekUSD={bp.no_rek_usd}
                                          />
                                        );
                                      })
                                    : ""}
                                                                </tbody>
                                                            </table>
                                                            <b>dan dianggap sudah diterima oleh Pialang Berjangka apabila sudah ada tanda terima bukti setor atau transfer dari pegawai Pialang Berjangka.</b><br /><br />
                                                            <p>(3) Semua surat berharga, kekayaan lainnya, atau komunikasi harus dikirim
                                                                kepada Pialang Berjangka: </p>
                                                            <table cellSpacing={0} cellPadding={0} style={{ width: '100%' }}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td><p>Nama</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td style={{ verticalAlign: 'top' }}><strong>{profile_perusahaan.perusahaan}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><p>Alamat</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td><strong>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: profile_perusahaan.alamat,
                                          }}
                                        />
                                      </strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><p>Telepon</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td><strong>{profile_perusahaan.telp}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><p>Fax</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td><strong>{profile_perusahaan.fax}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><p>Email</p></td>
                                                                        <td><p>: </p></td>
                                                                        <td><strong>{profile_perusahaan.email}</strong></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <b>dan dianggap sudah diterima oleh Pialang Berjangka apabila sudah ada tanda bukti penerimaan dari pegawai Pialang Berjangka.</b><br /><br />
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Dokumen Pemberitahuan Adanya Risiko</b></p>
                                                            <p>Nasabah mengakui menerima dan mengerti Dokumen Pemberitahuan Adanya Risiko.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Jangka Waktu Perjanjian dan Pengakhiran</b></p>
                                                            <p />
                                                            <p>(1) Perjanjian ini mulai berlaku terhitung sejak tanggal dilakukan konfirmasi oleh Pialang Berjangka dengan diterimanya Bukti Konfirmasi Penerimaan Nasabah dan Pialang Berjangka oleh Nasabah.</p>
                                                            <p>(2) Nasabah dapat mengakhiri Perjanjian ini hanya jika Nasabah sudah tidak lagi memiliki posisi terbuka dan tidak ada kewajiban Nasabah yang diemban oleh atau terhutang kepada Pialang Berjangka.</p>
                                                            <p>(3) Pengakhiran tidak membebaskan salah satu Pihak dari tanggung jawab atau kewajiban yang terjadi sebelum pemberitahuan tersebut.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Berakhirnya Perjanjian</b></p>
                                                            <p>Perjanjian dapat berakhir dalam hal Nasabah: </p>
                                                            <p>(1) Dinyatakan pailit, memiliki hutang yang sangat besar, dalam proses peradilan, menjadi hilang ingatan, mengundurkan diri atau meninggal; </p>
                                                            <p>(2) Tidak dapat memenuhi atau mematuhi perjanjian ini dan/atau melakukan pelanggaran terhadapnya; </p>
                                                            <p>(3) Berkaitan dengan butir (1) dan (2) tersebut di atas, Pialang Berjangka dapat: </p>
                                                            <p>i.Meneruskan atau menutup posisi Nasabah tersebut setelah mempertimbangkannya secara cermat dan jujur, dan</p>
                                                            <p>ii.Menolak transaksi dari Nasabah atau kuasanya.</p>
                                                            <p>(4) Pengakhiran Perjanjian sebagaimana dimaksud dengan angka (1) dan (2) tersebut diatas tidak melepaskan kewajiban dari Para Pihak yang berhubungan dengan penerimaan atau kewajiban pembayaran atau pertanggung jawaban kewajiban lainnya yang timbul dari Perjanjian.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Force Majeur</b></p>
                                                            <p>Tidak ada satupun pihak didalam Perjanjian dapat diminta pertanggungjawabannya untuk suatu keterlambatan atau terhalangnya memenuhi kewajiban berdasarkan Perjanjian yang diakibatkan oleh suatu sebab yang berada diluar kemampuannya atau kekuasaannya <i>(force majeur)</i>, sepanjang pemberitahuan tertulis mengenai sebab itu disampaikannya kepada pihak lain dalam Perjanjian dalam waktu tidak lebih dari 24 (dua puluh empat) jam sejak timbulnya sebab itu.</p>
                                                            <p>Yang dimaksud dengan <i>Force Majeur </i> dalamPerjanjian adalah peristiwa kebakaran, bencana alam (seperti gempabumi, banjir, angin topan, petir), pemogokan umum, huru hara,peperangan, perubahan terhadap peraturan perundang-undangan yang berlakudan kondisi dibidang ekonomi, keuangan dan Perdagangan Berjangka,pembatasan yang dilakukan oleh otoritas Perdagangan Berjangka dan BursaBerjangka serta terganggunya sistem perdagangan, kliring danpenyelesaian transaksi Kontrak Berjangka dimana transaksi dilaksanakanyang secara langsung mempengaruhi pelaksanaan pekerjaan berdasarkanPerjanjian.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Perubahan atas Isian dalam Perjanjian Pemberian Amanat</b></p>
                                                            <p>Perubahan atas isian dalam Perjanjian ini hanya dapat dilakukan atas persetujuan Para Pihak, atau Pialang Berjangka telah memberitahukan secara tertulis perubahan yang diinginkan, dan Nasabah tetap memberikan perintah untuk transaksi dengan tanpa memberikan tanggapan secara tertulis atas usul perubahan tersebut.Tindakan Nasabah tersebut dianggap setuju atas usul perubahan tersebut.</p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Penyelesaian Perselisihan</b></p>
                                                            <p>(1) Semua perselisihan dan perbedaan pendapat yang timbul dalam pelaksanaan Perjanjian ini wajib diselesaikan terlebih dahulu secara musyawarah untuk mencapai mufakat antara Para Pihak.</p>
                                                            <p>(2) Apabila perselisihan dan perbedaan pendapat yang timbul tidak dapat diselesaikan secara musyawarah untuk mencapai mufakat, Para Pihak wajib memanfaatkan sarana penyelesaian perselisihan yang tersedia di Bursa Berjangka.</p>
                                                            <p>(3) Apabila perselisihan dan perbedaan pendapat yang timbul tidak dapat diselesaikan melalui cara sebagaimana dimaksud pada angka (1) dan angka (2), maka Para Pihak sepakat untuk menyelesaikan perselisihan melalui: <br />
                                                            </p>
                                                            <br />
                                                            <label>Pilihan Resolusi Konflik</label>
                                                                <Form.Check
                                                                    style={{ color: "#333", fontWeight: "bold", paddingLeft: 35 }}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    checked={dataPernyataan.badan_abritase === 'Y' ? true : false}
                                                                    value="Y"
                                                                    type='radio'
                                                                    name='badan_abritase'
                                                                    id="badan_abritase-1"
                                                                    label='Badan Arbitrase Perdagangan Berjangka Komoditi (BAKTI) berdasarkan Peraturan dan Prosedur Badan Arbitrase Perdagangan Berjangka Komoditi (BAKTI)'
                                                                />
                                                                <Form.Check
                                                                    style={{ color: "#333", fontWeight: "bold", paddingLeft: 35 }}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    checked={dataPernyataan.badan_abritase === 'N' ? true : false}
                                                                    value='N'
                                                                    type='radio'
                                                                    name='badan_abritase'
                                                                    id="badan_abritase-2"
                                                                    label='Pengadilan Negeri'
                                                                />
                                                            <Form.Group controlId="pengadilan">
                                                                <Form.Control
                                                                    style={{ marginLeft: 35, width: "30%" }}
                                                                    name="pengadilan"
                                                                    size="lg"
                                                                    value={dataPernyataan.pengadilan ? dataPernyataan.pengadilan : ''}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    as="select">
                                                                    <option value="">Pilih</option>
                                                                    <option value="Jakarta BahasaPenyelesaian PerselisihanSelatan">Jakarta Selatan</option>
                                                                    
                                                                </Form.Control>
																{errMsg1.pernyataan3 ? (<span className="text-error badge badge-danger">{errMsg1.pernyataan3}</span>) : ''}
                                                                {errMsg1.badan_abritase ? (<span style={{ marginLeft: 40 }} className="text-error badge badge-danger">{errMsg1.badan_abritase}</span>) : ''}
                                                            </Form.Group>
                                                            <br />

                                                            <p>(4) Kantor atau kantor cabang Pialang Berjangka terdekat dengan domisili Nasabah tempat penyelesaian dalam hal terjadi perselisihan.</p>
                                                            <p style={{ display: 'flex', flexDirection: "row" }}>
                                                                <span style={{ marginRight: 5 }}>Alamat:{" "}</span>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: profile_perusahaan.alamat,
                                                                    }}
                                                                />
                                                            </p>
                                                        </li>
                                                        <li tabIndex={1}>
                                                            <p><b>Bahasa</b></p>
                                                            <p>Perjanjian ini dibuat dan ditanda tangani dalam Bahasa Indonesia.</p>
                                                        
                                                        <p>Demikian Perjanjian Pemberian Amanat ini dibuat oleh Para Pihak dalam keadaan sadar, sehat jasmani rohani dan tanpa unsur paksaan dari pihak manapun</p>
                                                        <p style={{ textAlign: 'center', fontSize: '.97rem' }}><b>"Saya telah membaca, mengerti dan setuju terhadap semua ketentuan yang tercantum dalam perjanjian ini".</b></p>
                                                        <p style={{ textAlign: 'center' }}>Dengan mengisi kolom <i>"YA"</i> di bawah, saya menyatakan bahwa saya telah menerima<br /><b>"PERJANJIAN PEMBERIAN AMANAT TRANSAKSI KONTRAK DERIVATIF SISTEM PERDAGANGAN ALTERNATIF"</b><br />mengerti dan menyetujui isinya.</p>
                                                        </li>
                                                        <div className="form-group row align-items-center">
                                                            <div className="col" style={{fontWeight: "normal"}}>
                                                                Pernyataan Menerima / Tidak
                                                                {errMsg1.pernyataan3 ? (<span className="text-error badge badge-danger">{errMsg1.pernyataan3}</span>) : ''}
                                                            </div>
                                                            <div className="col-sm-6 col-md-9">
                                                                
                                                                    <Form.Check
                                                                        inline
                                                                        onClick={this.handleChange.bind(this)}
                                                                        checked={dataPernyataan.pernyataan3 === 'Y' ? true : false}
                                                                        value='Y'
                                                                        type='radio'
                                                                        name='pernyataan3'
                                                                        id="check-pernyataan3-penerima-ya"
                                                                        label='Ya'
                                                                        style={{fontWeight: "normal"}}
                                                                    />
                                                                    <Form.Check
                                                                        inline
                                                                        onClick={this.handleChange.bind(this)}
                                                                        checked={dataPernyataan.pernyataan3 === 'N' ? true : false}
                                                                        value='N'
                                                                        type='radio'
                                                                        name='pernyataan3'
                                                                        id="check-pernyataan3-penerima-tidak"
                                                                        label='Tidak'
                                                                        style={{fontWeight: "normal"}}
                                                                    />
                                                               
                                                            </div>
                                                        </div>

                                                        <div className="form-group row align-items-center">
                                                            <div className="col" style={{fontWeight: "normal"}}>
                                                                Pernyataan Pada Tanggal
                                                            </div>
                                                            <div className="col-sm-6 col-md-9" style={{fontWeight: "normal"}}> 
                                                                {moment(new Date()).format('YYYY-MM-DD')}
                                                            </div>
                                                        </div>



                                                    </ol>
                                                </Panel>
                                            

                                                <Panel eventKey={4} expanded={true} className="w-accordion__header__title shadow-lg px-2 py-1 my-2 mx-2" header="4. Pernyataan Bertanggung Jawab atas Kode Akses Transaksi Nasabah (Personal Access Password)">
                                                    <br/>
                                                    <strong>Yang mengisi formulir di bawah ini: </strong>
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                            <div><label style={{ color: '#D77175', marginTop: 8 }}>Nama Lengkap</label></div>
                                                        </Col>
                                                        <Col xs={24} lg={6}>

                                                            <Input readOnly size="lg" value={user ? user.nama_depan + ' ' + user.nama_belakang : ''} />
                                                        </Col>
                                                    </Row> 
                                                    
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                        <div><label style={{ color: '#D77175', marginTop: 8 }}>Tanggal Lahir</label></div>
                                                        </Col>
                                                        <Col xs={24} lg={6}>
                                                        <Input readOnly size="lg" value={user ? tgl_lhir : ''} />
                                                        </Col>
                                                    </Row> 
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                        <div><label style={{ color: '#D77175', marginTop: 8 }}>Kota Lahir</label></div>
                                                        </Col>
                                                        <Col xs={24} lg={6}>
                                                        <Input readOnly size="lg" value={user && user.kota_lahir ? user.kota_lahir : ''} />
                                                        </Col>
                                                    </Row> 
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                        <div><label style={{ color: '#D77175', marginTop: 8 }}>Alamat Rumah</label></div>
                                                        </Col>
                                                        <Col xs={24} lg={6}>
                                                        <Input readOnly size="lg" value={user && user.alamat ? user.alamat : ''} />
                                                        </Col>
                                                    </Row> 
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                        <label style={{ color: '#D77175', marginTop: 8 }}>No.Identitas</label>
                                                        </Col>
                                                        <Col xs={24} lg={6}>
                                                        <Input readOnly size="lg" value={user && user.no_identitas ? user.no_identitas : ''} />
                                                        </Col>
                                                    </Row> 
                                                    <br />
                                                    <Row>
                                                        <Col xs={24} lg={6}>
                                                            <label style={{ color: '#D77175', marginTop: 8 }}>No.Demo Acc</label>
                                                        </Col>
                                                        <Col xs={24} lg={6}> 
                                                            <Input readOnly size="lg" value={localStorage.getItem('loginDemo') ? localStorage.getItem('loginDemo') : ''} />
                                                        </Col>
                                                    </Row> 
                                                    
                                                    <br />
                                                    <center>
                                                    Dengan mengisi kolom "YA" di bawah ini, saya menyatakan bahwa saya bertanggungjawab sepenuhnya terhadap kode akses transaksi Nasabah (Personal Access Password) dan tidak menyerahkan kode akses transaksi Nasabah (Personal Access Password) ke pihak lain, terutama kepada pegawai Pialang Berjangka atau pihak yang memiliki kepentingan dengan Pialang Berjangka.
                                                     </center>       
                                                    <div className="form-group text-center">
                                                        <div className="alert alert-danger kolom_merah" style={{ background: '#C2252C',color:'#fff',borderRadius:'10px'}}>
                                                            <div className="alert-heading">PERHATIAN !!!</div>
                                                            Pialang Berjangka, Wakil Pialang, Tenaga Pemasar Perusahaan, atau pihak apapun yang berhubungan dengan Pialang Berjangka tidak diperkenankan untuk menerima atau meminta kode akses transaksi nasabah (Password)
                                                        </div>
                                                    </div>
                                                    <p>
                                                        Demikian Pernyataan ini dibuat dengan sebenarnya dalam keadaan sadar, sehat jasmani dan rohani serta tanpa paksaan apapun dari pihak manapun.
                                                    </p>

                                                    <div className="form-group row align-items-center">
                                                        <div className="col" style={{fontWeight: "normal"}}>
                                                            Pernyataan Menerima / Tidak
                                                            {errMsg1.pernyataan4 ? (<span className="text-error badge badge-danger">{errMsg1.pernyataan4}</span>) : ''}
                                                        </div>
                                                        <div className="col-sm-6 col-md-9" style={{fontWeight: "normal"}}>
                                                           
                                                                <Form.Check
                                                                    inline
                                                                    checked={dataPernyataan.pernyataan4 === 'Y' ? true : false}
                                                                    onChange={this.handleChange.bind(this)}
                                                                    value='Y'
                                                                    type='radio'
                                                                    name='pernyataan4'
                                                                    id="check-pernyataan4-penerima-ya"
                                                                    label='Ya'
                                                                    style={{fontWeight: "normal"}}
                                                                />
                                                                <Form.Check
                                                                    inline
                                                                    value='N'
                                                                    onChange={this.handleChange.bind(this)}
                                                                    checked={dataPernyataan.pernyataan4 === 'N' ? true : false}
                                                                    type='radio'
                                                                    name='pernyataan4'
                                                                    id="check-pernyataan4-penerima-tidak"
                                                                    label='Tidak'
                                                                    style={{fontWeight: "normal"}}
                                                                />
                                                        </div>
                                                    </div>

                                                    <div className="form-group row align-items-center">
                                                        <div className="col">
                                                            Pernyataan Pada Tanggal
                                                        </div>
                                                        <div className="col-sm-6 col-md-9" style={{fontWeight: "normal"}}>
                                                            {moment(new Date()).format('YYYY-MM-DD')}
                                                        </div>
                                                    </div>
                                                </Panel>
                                                
                                            </PanelGroup>
                                        </div>

                        <div
                            className="container__box p-4"
                            style={{
                              backgroundColor: "#fbfbfd"
                            }}
                          >
                            <div className="grid grid-cols-1 place-items-center">
                              <div className="form-group lg:w-2/3">
                                <div className="form-check">
                                  {errMsg1.agree ? (
                                    <span className="text-error badge badge-danger">
                                      {errMsg1.agree}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  <label>
                                    <input
                                      checked={dataPernyataan.agree === 'Y' ? true : false}
                                      onChange={this.handleChange.bind(this)}
                                      value={'Y'}
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

                                  

                                    
                                    <AppButton
                                        onClick={this.handlesubmit.bind(this, 'act')}
                                        type="button"
                                        size="lg"
                                        theme=""
                                        style={{ backgroundColor:"#28A745",color:"#fff",marginRight:"2%"}}>Selanjutnya</AppButton>
                                    
                                    </div>
                                </div>
                              </div>
                            </div>
                            

                            <div ref={this.scrollDiv} className="form-group w-[100%] lg:w-[40%] text-center">
                          </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                   
                </section >
            </div >



        )
    }
}
const mapStateToProps = (state) => ({
    dataPernyataan: state.dtPernyataan.dataPernyataan || {},
	profile_perusahaan: state.companyProfile.profile_perusahaan || {},
	legalitas_perusahaan: state.companyProfile.legalitas_perusahaan || {},
	dataBankPerusahaan: state.dtPernyataan.dataBankPerusahaan || [],
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (param) => {
			dispatch(profileUser());
			dispatch(getDataPP());			
            dispatch(getDataPernyataan(param));	
			dispatch(getSelectAkun(param));	
			dispatch(getBankPerusahaan());
			dispatch(getAkunTradingDemo());			
        },
        changeProps: (param) => {
            dispatch(chgProps(param));
			
        },
        onSave: (param) => {
			dispatch(profileUser());
            dispatch(simpanDataPernyataan(param));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Pernyataan);