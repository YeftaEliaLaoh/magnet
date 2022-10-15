import React, { Component } from 'react'
import { Container, Content } from 'rsuite'
import { MyHeader, MySidebar } from '../Template';
import { connect } from 'react-redux';
import { onLogout, fetchUserBytoken, profileUser } from '../features/main/mainSlice'
import { Redirect } from 'react-router';

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class Main extends Component {

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

    render() {
        const { children } = this.props;

        document.getElementById('root').classList.remove('login-page');
        document.getElementById('root').classList.remove('hold-transition');
        document.getElementById('root').classList.add('bg-sidebar');
        document.getElementById('root').className += ' sidebar-mini';
        return (

            <div>
                <div className="show-container">
                    <Container>
                        <MyHeader></MyHeader>
                        <Container style={{marginTop:"5px"}}>
                            <MySidebar />
                            <Content style={{background:"white"}}>
                                {children}
                            </Content>
                        </Container>

                    </Container>
                </div>
            </div>
        )
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        fetchDataAdmin: () => {
            dispatch(fetchUserBytoken());
            dispatch(profileUser());
        },
        logOut: () => {
            dispatch(onLogout());
        }
    }
}
const mapStateToProps = (state) => ({
    user: state.main.currentUser,
    errFetchUserByToken: state.main.errFetchUserByToken
});
export default connect(mapStateToProps, mapDispatchToPros)(Main);
