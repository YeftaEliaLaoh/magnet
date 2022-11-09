import React, { Component } from 'react'
import { Container } from 'rsuite'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import {  verifikasiTokenLogin } from '../features/main/mainSlice'

class Verification extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    const location = window.location.href;
    const baseName = location.substring(location.lastIndexOf("?") + 1);

    console.log(baseName)
    this.props.onLoad(baseName);
    if (this.props.isSuccess) 
      this.props.history.push('/')
    else
      this.props.history.push('register')
    console.log(this.props)
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
  isSuccess: state.main.isSuccess, 
});
export default connect(mapStateToProps, mapDispatchToPros)(Verification);
