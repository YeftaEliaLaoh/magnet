import React, { Component } from 'react'
import { Panel } from 'rsuite';
import icon from '../../assets/autochartist_ijo.svg';

export default class Autochartist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSegmentUrl: "",
        }
    }

    componentDidMount = async () => {

        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    render() {

        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid mt-3">
                        
                        <div className="mobile-hide">
                        <img src={icon} width="35px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Autochartist</h1>
                        </div>

                        <div className="mobile-view">
                        <img src={icon} width="25px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 20, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Autochartist</h1>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg rounded-xl" style={{ "minHeight": "800px","borderRadius":"20px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>

                                        <div className="row mb-4 lg:mb-10">
                                            <div className="col-md-6 text-center mb-4 lg:mb-0">
                                                <div className="rounded-xl border py-5">
                                                <a href="https://victoryif.autochartist.com/aclite/VictoryIFMain?username=20001&account_type=LIVE&expire=1640024599&logintoken=3e5ba40216dd7aae171386000903f846&locale=in_ID" target="_blank">
                                                    <h2 className='ahref-autochartist font_custom'>Autochartist Web Version</h2><br />
                                                    
                                                    <div classname="col-md-12">
                                                        <center><img src="https://victoryif.autochartist.com/aclite/images/logo.png"/></center>
                                                    </div>
                                                
                                                </a>
                                                </div>        
                                            </div>

                                            <div className="col-md-6 text-center">
                                                <div className="rounded-xl border py-5">
                                                    <a href="https://reports.autochartist.com/mr/?broker_id=489&rid=367&user=20001&demo=0&token=3e5ba40216dd7aae171386000903f846&expire=1640024599&css=https://www.autochartist.com/components-css/victory-mr.css" target="_blank">
                                                        
                                                        <h2 className='ahref-autochartist font_custom'>Autochartist Market Report</h2><br />
                                                        
                                                        <div className="col-md-12">
                                                            <center><img src="https://victoryif.autochartist.com/aclite/images/logo.png" /></center>
                                                        </div>
                                                        
                                                    </a>
                                                </div>
                                            </div>

                                        </div>
                                            
                                            
                                             
                                        <div className="row mb-4 lg:mb-10">
                                            
                                            <div className="rounded-xl border py-5 w-full mx-3">
                                                <h2 style={{ color: '#C31F27',textAlign:"center" }} className="font_custom">Download Autochartist Mobile Apps</h2>
                                                <div className="grid grid-cols-1 place-items-center mt-10">
                                                     <div className="w-[90%] lg:w-[40%]">

                                                     <div className="grid grid-cols-2 gap-2 place-items-center">

                                                        <div>
                                                            <a href="https://play.google.com/store/apps/details?id=com.autochartist.mobile" target="_blank"><div className="download-box-item" style={{ background: '#FFF' }}><img src="https://vifx.co.id/assets/cabinet/_ui/media/black_android.svg" className="header-logo" /></div></a>
                                                        </div>
                                                        
                                                        <div>
                                                            <a href="https://itunes.apple.com/us/app/autochartist/id903348229?mt=8" target="_blank"><div className="download-box-item" style={{ background: '#FFF' }}><img src="https://vifx.co.id/assets/cabinet/_ui/media/black_appstore.svg" className="header-logo" /></div></a>
                                                        </div>

                                                     </div>   
                                                     
                                                     </div>
                                                </div>
                                                

                                            </div>
                                            
                                        </div>

                                        <div className="row mb-4  lg:mb-10">
                                            
                                            <div className="rounded-xl border py-5 w-full mx-3">
                                                <h2 style={{ color: '#C31F27',textAlign:"center" }} className="font_custom">Mobile App Activation QR Code</h2>
                                                <div className="grid grid-cols-1 place-items-center mt-10">
                                                     <div className="w-full">

                                                     <div className="grid grid-cols-1 place-items-center">

                                                        <div>
                                                        <img style={{ maxWidth: '100%' }} src="https://component.autochartist.com/to/resources/mobile/qr/image/?broker_id=489&account_type=LIVE&user=20001&token=5bc54a31de77e909d7d45846373dbca8&expire=1640025142" />
                                                        </div>
                                                        
                                                        

                                                     </div>   
                                                     
                                                     </div>
                                                </div>
                                                

                                            </div>
                                            
                                        </div>

                                        <div className="row mb-10">
                                            
                                            <div className="rounded-xl border py-5 w-full mx-3">
                                            <a href="https://component.autochartist.com/to/?broker_id=489&account_type=LIVE&user=20001&token=3e5ba40216dd7aae171386000903f846&expire=1640024599&trade_now=n&layout=horizontal&locale=id&css=https://www.autochartist.com/components-css/victory-to.css" target="_blank">
                                            
                                                <h2 style={{ color: '#C31F27',textAlign:"center" }} className="font_custom">Autochartist Trading Opportunities</h2>
                                                <div className="grid grid-cols-1 place-items-center mt-10">
                                                     <div className="w-full">

                                                     <div className="grid grid-cols-1 place-items-center">

                                                        <div>
                                                        <img src="https://victoryif.autochartist.com/aclite/images/logo.png" className="header-logo" />
                                                        </div>
                                                        
                                                        

                                                     </div>   
                                                     
                                                     </div>
                                                </div>
                                                
                                            </a>
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
