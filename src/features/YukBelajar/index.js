import React, { Component, Fragment } from 'react'
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getDT } from '../YukBelajar/ybSlice'
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import icon from '../../assets/yukbelajar2.svg';

class YukBelajar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            

            loadingForm: false
        }
    }

    componentDidMount = async () => {
        this.props.onLoad('?tipe=Education&start=0&limit=100');
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

	detail = async (record) => {
        sessionStorage.removeItem("idArtikelMagnet");        
        if (record) await sessionStorage.setItem('idArtikelMagnet', record.news_id);
        this.props.history.push("detail-artikel");
    }


    handleSelect(activeKey) {
        this.setState({ active_tab: activeKey });
    }

    render() {

        const { data } = this.props;
        const { active_tab } = this.state;

        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid  mt-3">
                        
                        <div className="mobile-hide">
                        <img src={icon} width="35px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Yuk Belajar</h1>
                        </div>

                        <div className="mobile-view">
                        <img src={icon} width="25px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 20, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Yuk Belajar</h1>
                        </div>

                        <div className="row">
						
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}>
                                            
                                            <div className="row">
												{data && (data.map((at, index) => {
													return (
														<Fragment>
															<div className="col-sm-4">
																<Card className="card_yb" onClick={e => this.detail(at)}>
																  <img src={at.file} height={200} alt=""/>
																  <Card.Body>
																	<Card.Title>{at.title}</Card.Title>
																	<Card.Text>{at.subtitle}</Card.Text>
																	 
																	
																   
																  </Card.Body>
																</Card>
															</div>
														</Fragment>
													);}
												))}
                                                
                                                

                                                
                                            </div>




                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {this.props.showFormSuccess ? (<AppSwalSuccess
                    show={this.props.showFormSuccess}
                    title={<div dangerouslySetInnerHTML={{ __html: this.props.contentMsg }} />}
                    type={this.props.tipeSWAL}
                    handleClose={this.handleCloseSwal.bind(this)}
                >
                </AppSwalSuccess>) : ''}

            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    data: state.yukBelajar.data || [],
   
    profile: state.main.dtProfileUser,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (param) => {
            dispatch(getDT(param));
        }
       
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(YukBelajar);