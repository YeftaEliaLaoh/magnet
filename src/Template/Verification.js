import React, { Component } from 'react'
import { Container } from 'rsuite'
import { connect } from 'react-redux';
import { verifikasiTokenLogin } from '../features/main/mainSlice'
import {clearState,} from "../features/main/mainSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

class Verification extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    const location = window.location.href;
    const baseName = location.substring(location.lastIndexOf("?") + 1);

    console.log(baseName)
    this.props.onLoad(baseName)
    setTimeout(() => { this.checkData(); }, 2000);
  }

  checkData(){
    try {
      console.log(this.props.isSuccess)
      if (this.props.isSuccess) {
        this.props.onClear();
        this.props.history.push('/')
      }
      else
        this.props.history.push('register')
    } catch(e){
      console.log(e)
    }
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
      },
      onClear: (baseName) => {
        dispatch(clearState());
      }
  }
}

const mapStateToProps = (state) => ({
  isSuccess: state.main.isSuccess, 
});
export default connect(mapStateToProps, mapDispatchToPros)(Verification);
