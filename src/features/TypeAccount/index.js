import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRate, getTA, chgPropsTA, closeForm, confirmDel, simpanDataTA } from './taSlice';
import { profileUser } from '../main/mainSlice';
import { Button, Col, Row, Form, Card, ListGroup } from 'react-bootstrap'
import AppModal from '../../components/modal/MyModalMuis';

class TypeAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSegmentUrl: "",
            rate: "",
            nama_rate: ""
        }
    }

    componentDidMount = async () => {
        sessionStorage.removeItem("data_tipe_akun_id");
        sessionStorage.removeItem("tipe_akun");
        const act = sessionStorage.getItem('act_tipe_akun_id');
        if (act) {
            const dt = {};
            dt['key'] = 'act';
            dt['value'] = act;
            this.props.changeProps(dt);
        }
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    handleChange(evt) {
        var index = evt.target.selectedIndex;

        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
        this.setState({ "nama_rate": evt.target[index].text });
    }

    handleClickBtn(record) {
        const dt = {};
        dt['key'] = 'tipe_akun';
        dt['value'] = record.tipe_akun_id;
        this.props.changeProps(dt);
        this.props.showConfirm(record.nama_tipe_akun);
    }

    handleNext = async () => {
        await sessionStorage.setItem('tipe_akun', this.props.dataSelect.tipe_akun);
        await this.props.onSave(this.props.dataSelect);
		await new Promise((resolve) => setTimeout(resolve, 800));
        this.props.history.push("/decleration");
        this.props.closeModal();
    }

    handleClose() {
        this.props.closeModal();
    };

    render() {
        const { lastSegmentUrl } = this.state;
        const { dataRate, dataTypeAccount, dataSelect } = this.props;
        const contentDelete = <div dangerouslySetInnerHTML={{ __html: '<div id="caption" style="padding-bottom:20px;">Kamu yakin memilih tipe akun <div class="mobile-hide" style="padding-top:15px;padding-bottom:15px"><strong><span style="font-size:25px">' + dataSelect.message + '</span></strong> <span style="font-size:25px">' + this.state.nama_rate + ' ?</span></div><div class="mobile-view" style="padding-top:20px;padding-bottom:15px"><strong><span style="font-size:20px">' + dataSelect.message + '</span></strong> <span style="font-size:20px">' + this.state.nama_rate + ' ?</span></div></div><br/>' }} />;

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
                                {sessionStorage.getItem('act_tipe_akun_id') === 'create_new_akun' ? '1. Informasi Pribadi' : <a href="personal">1. Informasi Pribadi</a>}
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
                            <h1 style={{ marginBottom: 10, fontSize: 20, marginLeft: 10 }}>Registrasi Akun Online</h1>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "600px", borderRadius: "2rem" }}>
                                    <div className="card-body">
                                     <div className="alert alert-default alert-sm" style={{ backgroundColor: '#fbfbfd' }} >
                                            <div className="mobile-hide" style={{ padding: "1" }}>
                                                <h3 className="label_ijo">Tipe Akun</h3>
                                            </div>
                                        </div>
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                                            <Form.Group as={Row} controlId="rate">
                                                <Form.Label column sm={2}><h5>Rate</h5></Form.Label>
                                                <Col sm={3}>
                                                    <Form.Control
                                                        name="rate"
                                                        size="lg"
                                                        value={dataSelect.rate ? dataSelect.rate : ''}
                                                        onChange={this.handleChange.bind(this)}
                                                        as="select">
                                                        <option value="">Pilih</option>
                                                        {dataRate ? (
                                                            dataRate.map(function (dr) {
                                                                return <option
                                                                    value={dr.rate_id}
                                                                    key={dr.rate_id}>{dr.nama_rate}
                                                                </option>
                                                            })

                                                        ) : ''}

                                                    </Form.Control>
                                                </Col>

                                            </Form.Group>
                                            <br />
                                            <Row>
                                                {dataTypeAccount ? (
                                                    dataTypeAccount.map((dta) => {
                                                        return <Col key={dta.tipe_akun_id} xs={12} lg={4}>
                                                            <Card
                                                                bg="light">
                                                                <Card.Header><strong>{dta.nama_tipe_akun}</strong></Card.Header>

                                                                <ListGroup variant="flush">
                                                                    <ListGroup.Item>Deposit Minimum <span className="pull-right"> {dta.deposit} </span> </ListGroup.Item>
                                                                    <ListGroup.Item>Leverage  <span className="pull-right"> {dta.leverage}</span></ListGroup.Item>
                                                                    <ListGroup.Item>Komisi <span className="pull-right"> {dta.komisi}</span></ListGroup.Item>
                                                                    <ListGroup.Item>Lot Minimum <span className="pull-right"> {dta.lot_minimum} lot/klik</span></ListGroup.Item>
                                                                    <ListGroup.Item>Lot Maximum <span className="pull-right"> {dta.lot_maximum} lot/klik</span></ListGroup.Item>
                                                                    <ListGroup.Item>Spread <span className="pull-right">{dta.spread}</span></ListGroup.Item>
                                                                </ListGroup>
                                                                <Card.Body style={{ padding: ".65rem" }}>
                                                                    <div className="grid grid-cols-1 place-items-center">
                                                                        <div>
                                                                            <Button
                                                                                onClick={this.handleClickBtn.bind(this, dta)}
                                                                                disabled={dataSelect.rate ? false : true}
                                                                                size="lg" variant="success">Daftar Akun</Button>
                                                                        </div>
                                                                    </div>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    })

                                                ) : ''}

                                            </Row>


                                        </div>

                                    </div>

                                </div>
                                <AppModal
                                    show={this.props.showFormDelete}
                                    size="xs"
                                    form={contentDelete}
                                    handleClose={this.handleClose.bind(this)}
                                    backdrop="static"
                                    keyboard={false}
                                    title="Confirm"
                                    titleButton="Selanjutnya"
                                    themeButton=""
                                    style={{ color: "#fff" }}
                                    isLoading={false}
                                    formSubmit={this.handleNext.bind(this)}
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
    dataRate: state.typeAcc.dataRate || [],
    dataTypeAccount: state.typeAcc.dataTypeAccount || [],
    dataSelect: state.typeAcc.dataSelect || {},
    isError: state.typeAcc.isError,
    errorMessage: state.typeAcc.errorMessage,
    isFetching: state.typeAcc.isFetching,
    isSuccess: state.typeAcc.isSuccess,
    showFormDelete: state.typeAcc.showFormDelete,
    user: state.main.currentUser,
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(profileUser());
            dispatch(getRate());
            dispatch(getTA());
        },
        onSave: (param) => {
            dispatch(profileUser());
            dispatch(simpanDataTA(param));
        },
        changeProps: (param) => {
            dispatch(chgPropsTA(param));
        },
        showConfirm: (data) => {
            dispatch(confirmDel(data));
        },
        closeModal: () => {
            dispatch(closeForm());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(TypeAccount);