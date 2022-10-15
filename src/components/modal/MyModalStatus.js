import React from 'react';
import { Modal } from 'rsuite';
import Button from '../button/Button'
import icon_status from '../../assets/status_icon.png';
import status_banner from '../../assets/status_banner.png';
import "../../styles/modal_custom_status.css";

const AppModalStatus = ({
    children,
    handleClose,
    titleClose,
    title,
    isLoading,
    isDisable,
    handleBack,
    form,
    formSubmit,
    titleButton,
    themeButton,
    noBtnAction,
	myCloseButton,
    show,
    ...otherProps
}) => {
    return (
        // eslint-disable-next-line react/button-has-type
        <Modal
            style={{ overflowY: 'auto' }}
            {...otherProps}
            open={show}
            onClose={handleClose}
        >
            <Modal.Header closeButton={myCloseButton && myCloseButton}>
                <Modal.Title>

                    <div class="flex ...">
                        <div class="flex-none pt-3 ...">
                        <img src={icon_status} width="25px" className="float-left" />
                        </div>
                        <div class="flex-auto pl-2 w-64 ...">
                            <span style={{fontWeight:"bold"}}>{title}</span><br/><span style={{color:"#95282D",fontSize:"15px"}}>User Status</span>
                        </div>
                    </div>
                    
                
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 500 }}>
                <div className="card card-success shadow-lg rounded-2xl" style={{borderRadius:"1rem" }}>
                    <div className="card-body" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        {form}
                    </div>
                    <img src={status_banner} className="float-left" style={{padding:10}} />

                </div>
            </Modal.Body>

            {!noBtnAction ? (
                <Modal.Footer>
                    
                    <Button
                        disabled={isDisable}
                        isLoading={isLoading}
                        theme=""
                        style={{
                            backgroundColor: "#218838",
                            color: "#fff",
                            marginRight: "2%",
                        }}
                        onClick={formSubmit}
                    >
                        {titleButton ? titleButton : "Yes"}
                    </Button>
                </Modal.Footer>
            ) : null}


        </Modal>
    );
};

export default AppModalStatus;
