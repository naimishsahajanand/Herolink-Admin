import React from 'react';
import './LogoutModal.scss';
import Modal from "react-bootstrap/Modal";

const Logout = ({ show, handleClose, handleLogOut, loading }) => {
    return (
        <>
            <Modal centered show={show} onHide={handleClose} className="logout-modal ">
                <div className="model-header">

                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
                </div>
                <div className="modal-body text-center">
                    {/* <div className="icon">
                        <i className="fa-solid fa-circle-xmark"></i>
                    </div> */}
                    <div className='text'>
                        <h4>Logout Confirmation                        </h4>
                    </div>
                    <div className="text">
                        <h3>Are you sure you want to logout this admin?</h3>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="close-btn" onClick={handleClose}>No</button>
                    <button
                        type="button"
                        className={`delete-btn ${loading ? 'btn-loading' : ''}`}
                        onClick={handleLogOut}
                    >
                        {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                        {!loading && "Yes"}
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default Logout;