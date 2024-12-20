// import Modal from 'react-bootstrap/Modal';

// const DeleteModal = ({ show, handleClose, handleDelete }) => {
//     return (
//         <Modal show={show} onHide={handleClose} centered  >
//             <div className='modal'>
//                 <div className="modal-header" closeButton>
//                     <h5 className="modal-title" id="deleteModalLabel">Delete</h5>
//                 </div>
//                 <div className="modal-body">
//                     <p>Are you sure you want to delete?</p>
//                 </div>
//                 <div className="modal-footer">
//                     <button type="button" className="close-btn" onClick={handleClose}>
//                         Close
//                     </button>
//                     <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
//                 </div>
//             </div>
//         </Modal>
//     )
// }

// export default DeleteModal
import React from 'react';
import './DeleteModal.scss';
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ show, handleClose, handleDelete, text }) => {
    return (
        <>
            <Modal centered show={show} onHide={handleClose} className="delete-modal">
                <div className="">
                    <h5 className="delete-modal-title" id="deleteModalLabel">Delete Confirmation</h5>

                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button> */}
                </div>
                <div className="modal-body text-center">

                    <div className="text">
                        {/* <h3>Are you sure ?</h3> */}
                        <p>{`Are you sure you want to delete this ${text}?`}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="close-btn" onClick={handleClose} >No</button>
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Yes
                    </button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteModal;