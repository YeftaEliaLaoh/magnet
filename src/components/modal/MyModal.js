import React from 'react';
import { Modal } from 'rsuite';
import Button from '../button/Button'

export const AppModal = ({
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
            <Modal.Header closeButton={myCloseButton}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 400 }}>{form}</Modal.Body>

            {!noBtnAction ? (
                <Modal.Footer>
                    <Button theme="info" onClick={titleClose ? handleBack : handleClose} style={{ marginRight: 5,backgroundColor:"#17a2b8" }}>
                        {titleClose ? titleClose : "Close"}
                    </Button>
                    <Button style={{ backgroundColor:"#28a745" }}
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



export default AppModal;
