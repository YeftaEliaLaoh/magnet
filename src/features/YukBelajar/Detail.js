import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getDTDetail } from '../YukBelajar/ybSlice'
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import { Figure } from 'react-bootstrap';

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            

            loadingForm: false
        }
    }

    componentDidMount = async () => {
		const idArtikelMagnet = sessionStorage.getItem("idArtikelMagnet");  
		console.log(idArtikelMagnet);
        this.props.onLoad('/'+idArtikelMagnet);
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
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
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Yuk Belajar!</h1>
                        <div className="row">
						
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
                                            
                                            <div className="row">
												<div className="col-sm-12">
													<Figure>
														<Figure.Image
															
															width={800}
															height={400}
															src={data.file}
														/>

													</Figure>
													
													<h3>{data.title}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.content }} />	
                                                </div>
                                            </div>




                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                

            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    data: state.yukBelajar.dataDetail || {},
   
    profile: state.main.dtProfileUser,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: (param) => {
            dispatch(getDTDetail(param));
        }
       
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Detail);