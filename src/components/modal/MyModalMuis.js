import React from 'react';
import { Modal } from 'rsuite';
import Button from '../button/Button'

export const AppModalMuis = ({
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
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 400 }}>{form}</Modal.Body>

            {!noBtnAction ? (
                <Modal.Footer>
                    <Button  onClick={titleClose ? handleBack : handleClose} style={{ marginRight: 5,backgroundColor:"#C3262A",borderColor:"#fff" }}>
                        {titleClose ? titleClose : "Close"}
                    </Button>
                    <Button style={{ backgroundColor:"#28a745",color:"#fff" }}
                        disabled={isDisable}
                        isLoading={isLoading}
                        theme={themeButton}
                        onClick={formSubmit}
                    >
                        {titleButton ? titleButton : "Yes"}
                    </Button>
                </Modal.Footer>
            ) : null}


        </Modal>
    );
};



export default AppModalMuis;
