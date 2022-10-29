import React, { Component } from 'react'
import { Container } from 'rsuite'
import { connect } from 'react-redux';
import {  verifikasiTokenLogin } from '../features/main/mainSlice'


class Verification extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    const location = window.location.href;
    const baseName = location.substring(location.lastIndexOf("?") + 1);
    this.props.onLoad(baseName);
  }

  render() {

      return (

          <div>
              <div className="show-container">
                  <Container>
                      <Container style={{marginTop:"5px"}}>

                      </Container>

                  </Container>
              </div>
          </div>
      )
  }
}
const mapDispatchToPros = (dispatch) => {
  return {
      onLoad: (baseName) => {
        dispatch(verifikasiTokenLogin(baseName));
      }
  }
}
const mapStateToProps = (state) => ({
  user: state.main.currentUser,
});
export default connect(mapStateToProps, mapDispatchToPros)(Verification);
