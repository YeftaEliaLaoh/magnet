import React, { Component } from 'react'
import { Divider, Dropdown, Header, Icon, Nav, Navbar } from 'rsuite'
import MenuIcon from '@rsuite/icons/Menu';
import { connect } from 'react-redux';
import { clickExpand, onLogout, setDefaultOpenKeys, fetchUserBytoken } from '../features/main/mainSlice'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import logoa from '../assets/logo.svg';
import "../styles/custom_muis.css";
import icon_akun from '../assets/logo.svg';

import moment from 'moment';
import "moment/locale/id";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class MyHeader extends Component {

    componentDidMount() {
        this.fetchProfileAdmin();
    }

    fetchProfileAdmin = () => {        
        const token = localStorage.getItem(tokenLogin);       
        if (token !== '') {
            this.props.fetchDataAdmin();
        } else {
            this.props.logOut();
            // eslint-disable-next-line
            <Redirect to="/login" />
        }

    }

    handleToggle() {
        this.props.onClickExpand();
    }

    handleLogout() {
        this.props.logOut();
        // eslint-disable-next-line
        <Redirect to="/login" />
        
    }

    render() {

        return (

            <Header>
                <Navbar appearance="inverse" className="my-navbar1 text-black">
                    <Navbar.Header>
                        <div className="mobile-hide">
                        <Link to='/' className="navbar-brand logo float-center pt-3 px-5"><img src={logoa} width="130px" /></Link>
                        </div>
                        <div className="mobile-view ">
                        <Link to='/' className="navbar-brand logo float-center pt-3 px-2"><img src={logoa} width="130px" /></Link>
                        </div>
                        
                    </Navbar.Header>

                    
                    <Navbar.Body>
                        <Nav pullRight className="mobile-view">
                            <Nav.Item icon={<MenuIcon />} onClick={this.handleToggle.bind(this)} className="drawwer"></Nav.Item>
                        </Nav>
                        
                            <div className="grid grid-cols-2 text-black pt-0 mb-2">
                                
                                <div className="mobile-hide">

                                    <div className=" w-2/3 grid grid-cols-2 pt-2">
                                        <div className="font-bold grid-cols-1">
                                            <div className="pl-0">TOTAL DALAM AKUN</div>
                                            <div className="text-left">0.00</div>
                                        </div>
                                        <div className="font-bold ml-2">STATUS<br/>
                                            <h5 style={{ fontWeight: 600, fontSize: 14, marginLeft: 0 }}><span style={{ color: '#dc3545' }}>Belum Lengkap -</span> <a style={{ color: '#269647' }} href="personal">Lengkapi disini</a></h5>
                                        </div>

                                        
                                    </div>
                                </div>
                                
                                <div>
                                <Nav pullRight className="mobile-hide">

                                    <Dropdown className="show dr-logout text-black" style={{color:"#000"}} icon={<Icon icon="user-o" size="lg" />} title={this.props.user.nama_depan ? (this.props.user.nama_depan) : ("Account")}>
                                        <Dropdown.Item onClick={this.handleLogout.bind(this)} className="dropdown-menuu" icon={<Icon icon="sign-out" />}>Logout</Dropdown.Item>

                                    </Dropdown>
                                </Nav>

                                <Nav className="mobile-view ml-4">
                                    
                                    
                                        <Dropdown className="show dr-logout text-black" style={{color:"#000"}} icon={<Icon icon="user-o" size="lg" />} title={this.props.user.nama_depan ? (this.props.user.nama_depan) : ("Account")}>
                                        <Dropdown.Item onClick={this.handleLogout.bind(this)} className="dropdown-menuu" icon={<Icon icon="sign-out" />}>Logout</Dropdown.Item>

                                        </Dropdown>

                                    
                                    
                                </Nav>

                                </div>    
                            </div>
                        

                        

                    </Navbar.Body>
                </Navbar>

                

                

            </Header>


        )
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        onClickExpand: () => {
            dispatch(clickExpand());
        },
        logOut: () => {
            dispatch(onLogout());
        },
        onLoad: (dt) => {
            dispatch(setDefaultOpenKeys(dt));
        },
        fetchDataAdmin: (payload) => {
            dispatch(fetchUserBytoken(payload));
        }
    }
}
const mapStateToProps = (state) => ({
    user: state.main.currentUser,
    errFetchUserByToken:state.main.errFetchUserByToken
});
export default connect(mapStateToProps, mapDispatchToPros)(MyHeader);