import React from 'react';
import Modal from 'rsuite/Modal';
import Button from '../button/Button'

const AppModalLoading = ({
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
            <Modal.Header closeButton={false}>
                <Modal.Title style={{fontSize: '18px'}}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: 300 }}>
				<div id="loader" style={{ left: 'calc(48%)' }}></div>
                                           
			</Modal.Body>

            


        </Modal>
    );
};

export default AppModalLoading;
