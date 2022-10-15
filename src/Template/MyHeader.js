import React, { Component } from "react";
import { Divider, Dropdown, Header, Nav, Navbar } from "rsuite";
import MenuIcon from '@rsuite/icons/Menu';
import { Icon } from '@rsuite/icons';
import { connect } from "react-redux";
import {
  clickExpand,
  onLogout,
  setDefaultOpenKeys,
  fetchUserBytoken,
} from "../features/main/mainSlice";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import logoa from "../assets/logo.svg";
import "../styles/custom_muis.css";
import "moment/locale/id";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class MyHeader extends Component {
  componentDidMount() {
    this.fetchProfileAdmin();
  }

  fetchProfileAdmin = () => {
    const token = localStorage.getItem(tokenLogin);
    if (token !== "") {
      this.props.fetchDataAdmin();
    } else {
      this.props.logOut();
      // eslint-disable-next-line
      <Redirect to="/login" />;
    }
  };

  handleToggle() {
    this.props.onClickExpand();
  }

  handleLogout() {
    this.props.logOut();
    // eslint-disable-next-line
    <Redirect to="/login" />;
  }

  render() {
    const { profile } = this.props;

    return (
      <Header>
        <Navbar className="my-navbar1 text-black">
          <Navbar.Brand>
              <Link to="/" className="px-1">
                <img src={logoa} width="105px" />
              </Link>
          </Navbar.Brand>

          <Navbar style={{background:"#f1f1f1"}}>
            <Nav pullRight>
              <Nav.Item
                icon={<MenuIcon />}
                onClick={()=> this.handleToggle()}
                className="drawwer"
                style={{ fontSize: "20px" }}
              ></Nav.Item>
            </Nav>

            <div className="flex justify-end ">
              <div className="flex flex-col">
                  <div className="font-bold pl-3 pr-3 bg-transparant status-header" style={{height: "50px",width:"max-content"}}>
                    {
                      <h5
                        style={{ fontWeight: 600, width:"max-content" }}
                      >
                        <span style={{color:"#2b2b2b"}}>STATUS</span>
                        <br />
                        <span style={{ color: "#449246" }}>
                          {profile.status_dokumen_name }{" "}
                        </span>
                        {profile.status_dokumen === "Belum Lengkap" && (
                          <a style={{ color: "#269647" }} href="personal">
                            - Lengkapi disini
                          </a>
                        )}
                        {profile.status_dokumen === "Reject" && (
                          <a style={{ color: "#269647" }} href="rej-doc">
                            - Disini
                          </a>
                        )}
                      </h5>
                    }
                  </div>
                </div>

            </div>

            {/* <div className="grid grid-cols-2 text-black pt-0">
              <div className="mobile-hide">
                
              </div>

              <div>
                <Nav pullRight className="mobile-hide">
                  <Dropdown
                    className="show dr-logout text-black"
                    style={{ color: "#000" }}
                  >
                    <Dropdown.Item
                      onClick={this.handleLogout.bind(this)}
                      className="dropdown-menuu"
                      icon={<Icon icon="sign-out" />}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>

                <Nav className="mobile-view">
                  <Dropdown
                    className="show dr-logout text-black"
                    style={{ color: "#000" }}
                    icon={<Icon icon="user-o" size="lg" />}
                    title={
                      this.props.user.nama_depan
                        ? this.props.user.nama_depan
                        : "Account"
                    }
                  >
                    <Dropdown.Item>
                      {
                        <h5
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            marginLeft: 8,
                          }}
                        >
                          STATUS
                          <br />
                          <span style={{ color: "#dc3545" }}>
                            {profile.status_dokumen}{" "}
                          </span>
                          {profile.status_dokumen === "Belum Lengkap" && (
                            <a style={{ color: "#269647" }} href="personal">
                              <br /> Daftar disini
                            </a>
                          )}
                        </h5>
                      }
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={this.handleLogout.bind(this)}
                      className="dropdown-menuu"
                      icon={<Icon icon="sign-out" />}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              </div>
            </div> */}
          </Navbar>
        </Navbar>
      </Header>
    );
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
    },
  };
};
const mapStateToProps = (state) => ({
  user: state.main.currentUser,
  profile: state.main.dtProfileUser,
  errFetchUserByToken: state.main.errFetchUserByToken,
});
export default connect(mapStateToProps, mapDispatchToPros)(MyHeader);
