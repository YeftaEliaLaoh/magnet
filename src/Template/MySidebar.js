import React, { Component } from 'react'
import { Nav, Sidebar, Sidenav } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clickExpand, onLogout } from '../features/main/mainSlice';
import { Redirect } from "react-router";
import icon_akun from '../assets/icon/akun_white.svg';
import icon_finance from '../assets/icon/keuangan_white.svg';
import icon_logout from '../assets/icon/logout.svg';
import icon_hubungi from '../assets/icon/hubungi_kami_white.svg';
import icon_unduh from '../assets/icon/unduh_white.png';
import icon_belajar from '../assets/icon/yuk_belajar_white.svg';
import icon_autochartist from '../assets/icon/autochartist_white.svg';
import icon_pengaturan from '../assets/icon/pengaturan_white.png';
import icon_reject from '../assets/icon/reject_white.png';

import icon_penarikan from '../assets/icon/penarikan.svg';
import icon_setoran from '../assets/icon/setoran.png';
import icon_transfer from '../assets/icon/transfer_internal.png';
import icon_akun_bank from '../assets/icon/akun_bank.png';


import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import CreditCardMinusIcon from '@rsuite/icons/CreditCardMinus';

import GearIcon from '@rsuite/icons/Gear';
import SettingHorizontalIcon from '@rsuite/icons/SettingHorizontal';

import {
    FaDownload as FaDownloadIcon,
    FaPhoneAlt as FaPhoneAltIcon
  } from 'react-icons/fa';

import {
    BiTransferAlt as BiTransferAltIcon
} from "react-icons/bi";

import {
    AiFillBank as AiFillBankIcon
} from "react-icons/ai";


class MySidebar extends Component {

    constructor(props) {
        super(props);
        this.state = { lastSegmentUrl: "" }
    }

    componentDidMount = async () => {
        const location = window.location.href;
        this.props.onLoad();
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName },()=>console.log(this.state.lastSegmentUrl))
    }



    handleMenu = async (dt) => {
        await (this.setState({ lastSegmentUrl: dt },()=>console.log(this.state.lastSegmentUrl)));
    }

    handleToggle() {
        this.props.onClickExpand();
    }

    handleLogout() {
        this.props.logOut();
        // eslint-disable-next-line
        <Redirect to="/login" />;
    }

    render() {
        const { expandMenu } = this.props.main;
        const { profile } = this.props;
        const { lastSegmentUrl } = this.state;


        const MyLink = React.forwardRef((props, ref) => {
            const { href, as, ...rest } = props;
            return (
                <Link href={href} as={as}>
                    <div ref={ref} {...rest} />
                </Link>
            );
        });

        return (
            <div style={{background: 'white'}}>
                <div className='absolute mobile-view w-full' style={{ zIndex: '1000', paddingTop: '7px',height:'100%',width:expandMenu ? '100%' : 0,overflow: 'hidden'}} >
                    <Sidebar
                        style={{ flexDirection: 'column', height:'100%', backgroundColor:'#ffffff' }}
                        width={expandMenu ? '100%' : 0}
                        collapsible
                    >
                        <Sidenav
                            expanded={expandMenu}
                            //defaultOpenKeys={[`${defaultOpenKeys}`]}
                            appearance="subtle">

                            <Sidenav.Body>
                                <Nav>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        {
                                            expandMenu && (
                                                <Nav.Item
                                                    onSelect={e => this.handleMenu("/")}
                                                    componentClass={Link}
                                                    to='/personal'
                                                    eventKey='/'
                                                    exact='/'
                                                    className={"my-dropdown"}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="pl-3">
                                                            <span className="text-black text-lg">Hi, {this.props.user.nama_depan}</span>
                                                        </div>
                                                    </div>
                                                </Nav.Item>
                                            )
                                        }
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu("/")}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/'
                                            eventKey='/'
                                            exact='/'
                                            className={lastSegmentUrl === "/" || lastSegmentUrl === "" || lastSegmentUrl === "personal" || lastSegmentUrl === "account-type" || lastSegmentUrl === "decleration" || lastSegmentUrl === "trading_rules" || lastSegmentUrl === "company_profile" || lastSegmentUrl === "cooljek" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}

                                        >
                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <Icon as={AdminIcon}/>
                                                </div>
                                                <div>
                                                    Akun Saya
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item

                                            onSelect={e => this.handleMenu('deposit')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/deposit'
                                            exact='/deposit'
                                            eventKey='/deposit'
                                            className={lastSegmentUrl === "deposit" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <CreditCardPlusIcon />
                                                </div>
                                                <div>
                                                    Setoran
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item

                                            onSelect={e => this.handleMenu('bank-accounts')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/bank-accounts'
                                            exact='/bank-accounts'
                                            eventKey='/bank-accounts'
                                            className={lastSegmentUrl === "bank-accounts" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <Icon as={AiFillBankIcon} style={{transform: "scale(1.5)"}}/>
                                                </div>
                                                <div>
                                                    Akun Bank
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('withdrawal')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/withdrawal'
                                            exact='/withdrawal'
                                            eventKey='/withdrawal'
                                            className={lastSegmentUrl === "withdrawal" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <CreditCardMinusIcon />
                                                </div>
                                                <div>
                                                    Penarikan
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('internal-transfer')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/internal-transfer'
                                            exact='/internal-transfer'
                                            eventKey='/internal-transfer'
                                            className={lastSegmentUrl === "internal-transfer" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <Icon as={BiTransferAltIcon} style={{transform: "scale(1.5)"}}/>
                                                </div>
                                                <div>
                                                    Transfer Internal
                                                </div>
                                            </div>


                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('downloads')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/downloads'
                                            exact='/downloads'
                                            eventKey='/downloads'
                                            className={lastSegmentUrl === "downloads" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <Icon as={FaDownloadIcon} />
                                                </div>
                                                <div>
                                                    Unduh
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('contact')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/contact'
                                            exact='/contact'
                                            eventKey='/contact'
                                            className={lastSegmentUrl === "contact" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <Icon as={FaPhoneAltIcon} />
                                                </div>
                                                <div>
                                                    Hubungi Kami
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    {/* <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('autochartist')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            to='/autochartist'
                                            exact='/autochartist'
                                            eventKey='/autochartist'
                                            className={lastSegmentUrl === "autochartist" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <img src={icon_autochartist} width={18} className="float-left" />
                                                </div>
                                                <div>
                                                    Autochartist
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('education')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            to='/education'
                                            exact='/education'
                                            eventKey='/education'
                                            className={lastSegmentUrl === "education" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex">
                                                <div className="px-3">
                                                    <img src={icon_belajar} width={18} className="float-left" />
                                                </div>
                                                <div>
                                                    Yuk Belajar!
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div> */}
                                    <div className="menu_side mx-2 my-2 rounded-xl">

                                        <Nav.Item
                                            onSelect={e => this.handleMenu('setting')}
                                            onClick={this.handleToggle.bind(this)}
                                            componentClass={Link}
                                            as={Link}
                                            to='/setting'
                                            exact='/setting'
                                            eventKey='/setting'
                                            className={lastSegmentUrl === "setting" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                        >


                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <GearIcon />
                                                </div>
                                                <div>
                                                    Pengaturan
                                                </div>
                                            </div>

                                        </Nav.Item>
                                    </div>
                                    {
                                        profile.status_dokumen === "Reject" && (
                                            <div className="menu_side mx-2 my-2 rounded-xl">
                                                <Nav.Item
                                                    onSelect={e => this.handleMenu('rej-doc')}
                                                    onClick={this.handleToggle.bind(this)}
                                                    componentClass={Link}
                                                    as={Link}
                                                    to='/rej-doc'
                                                    exact='/rej-doc'
                                                    eventKey='/rej-doc'
                                                    className={lastSegmentUrl === "rej-doc" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                                >
        
                                                    <div className="flex items-center">
                                                        <div className="px-3">
                                                            <SettingHorizontalIcon />
                                                        </div>
                                                        <div>
                                                            Perbaiki Data
                                                        </div>
                                                    </div>
        
                                                </Nav.Item>
                                            </div>
                                        )
                                    }

                                    <div className="menu_side mx-2 my-2 rounded-xl">
                                        <Nav.Item
                                            className={"my-dropdown"}
                                            onSelect={e => this.handleLogout()}

                                        >
                                            <div className="flex items-center">
                                                <div className="px-3">
                                                    <ExitIcon />
                                                </div>
                                                {
                                                    expandMenu &&
                                                    (
                                                        <div>
                                                            Keluar Akun
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </Nav.Item>
                                    </div>

                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>


                    </Sidebar>

                </div>
                <div className="mobile-hide" style={{paddingTop:'7px',width:expandMenu ? 230 : "auto",overflow: 'hidden'}}>
                
                        <Sidenav
                            expanded={expandMenu}
                          
                            //defaultOpenKeys={[`${defaultOpenKeys}`]}
                            appearance="subtle">

                            <Sidenav.Body>
                                <Nav className="magnet-sidenav">
                                   
                                  
                                        {
                                            expandMenu && (
                                                <Nav.Item to='/'as={Link} onSelect={e => this.handleMenu('')} active={lastSegmentUrl === ""}>
                                                    <span className="text-black text-lg">Hi, {this.props.user.nama_depan}</span>
                                                </Nav.Item>
                                            )
                                        }
                               
                                        <Nav.Item
                                            onSelect={e => this.handleMenu("/")}
                                            as={Link}
                                            to='/'
                                            icon={<Icon as={AdminIcon}/>}
                                        > 
                                            Akun Saya
                                        </Nav.Item>
                                   
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('deposit')}
                                            to='/deposit'
                                            as={Link}
                                            icon={<CreditCardPlusIcon />}
                                            active={lastSegmentUrl === "deposit"}
                                        >
                                            Setoran

                                        </Nav.Item>
										{profile.status_dokumen === 'Approve' &&
                                        (<Nav.Item

                                            onSelect={e => this.handleMenu('bank-accounts')}
                                            as={Link}
                                            to='/bank-accounts'
                                            icon={<Icon as={AiFillBankIcon} style={{transform: "scale(1.5)"}}/>}
                                            active={lastSegmentUrl === "bank-accounts"}
                                        >
                                            Akun Bank

                                        </Nav.Item>)}
                                   
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('withdrawal')}
                                            as={Link}
                                            to='/withdrawal'
                                            icon={<CreditCardMinusIcon />}
                                            active={lastSegmentUrl === "withdrawal"}
                                        > 
                                            Penarikan

                                        </Nav.Item>
                             
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('internal-transfer')}
                                            as={Link}
                                            to='/internal-transfer'
                                            icon={<Icon as={BiTransferAltIcon} style={{transform: "scale(1.5)"}}/>}
                                            active={lastSegmentUrl === "internal-transfer"}
                                        >
                                            Transfer Internal
                                        </Nav.Item>
                               
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('downloads')}
                                            as={Link}
                                            to='/downloads'
                                            icon={<Icon as={FaDownloadIcon} />}
                                            active={lastSegmentUrl === "downloads"}
                                        >
                                            Unduh
                                        </Nav.Item>
                                 
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('contact')}
                                            as={Link}
                                            to='/contact'
                                            icon={<Icon as={FaPhoneAltIcon} />}
                                            active={lastSegmentUrl === "contact"}
                                        >
                                            Hubungi Kami
                                        </Nav.Item>
                                 
                                
                                        <Nav.Item
                                            onSelect={e => this.handleMenu('setting')}
                                            as={Link}
                                            to='/setting'
                                            icon={<GearIcon />}
                                            active={lastSegmentUrl === "setting"}
                                        >
                                            Pengaturan
                                        </Nav.Item>
                                        {
                                            profile.status_dokumen === "Reject" && (
                                                <Nav.Item
                                                    onSelect={e => this.handleMenu('rej-doc')}
                                                    as={Link}
                                                    to='/rej-doc'
                                                    icon={<SettingHorizontalIcon />}
                                                    active={lastSegmentUrl === "rej-doc"}
                                                >
                                                    Perbaiki Data
                                                </Nav.Item>
                                            )
                                        }
                                        <Nav.Item
                                            onSelect={e => this.handleLogout()}
                                            icon={<ExitIcon />}
                                        >
                                            Keluar Akun
                                        </Nav.Item>
                                

                                </Nav>
                            </Sidenav.Body>
                        </Sidenav>


                </div>
            </div>
        )
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onClickExpand: () => {
            dispatch(clickExpand());
        },
        onLoad: (dt) => {
            dispatch(clickExpand());
        },
        logOut: () => {
            dispatch(onLogout());
        },
    }
}

const mapStateToProps = (state) => {

    return {
        user: state.main.currentUser,
        main: state.main,
        profile: state.main.dtProfileUser
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(MySidebar);