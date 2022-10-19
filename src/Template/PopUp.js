import React, { Component } from 'react'
import { Container, Content } from 'rsuite'
import { MyHeader, MySidebar } from '../Template';
import { connect } from 'react-redux';
import { onLogout, fetchUserBytoken, profileUser } from '../features/main/mainSlice'
import { Redirect } from 'react-router';
import photo_ktp from "../assets/ktp-01.png";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class PopUp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        const {
            user,
        } = this.props;

        return (
            <div>
                <div className="show-container">
                    <Container>
                        <Container style={{marginTop:"5px"}}>
                        <img style={{maxWidth:"100%"}}
                            src={
                                this.props.user.photo_ktp_download ? this.props.user.photo_ktp_download : (user.photo_ktp ? user.photo_ktp: photo_ktp)
                            }
                        />
                        </Container>

                    </Container>
                </div>
            </div>
        )
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
          dispatch(profileUser());
          dispatch(fetchUserBytoken());
        }
    }
}
const mapStateToProps = (state) => ({
    user: state.main.currentUser,
});
export default connect(mapStateToProps, mapDispatchToPros)(PopUp);
