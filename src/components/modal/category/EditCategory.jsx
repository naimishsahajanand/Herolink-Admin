import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import axiosInstance, { authHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';
import Modal from "react-bootstrap/Modal";
import './Form.scss';

const initialState = {
    id: "",
    name: "",
    status: "active"
};

const EditCategory = ({ show, handleClose, editData, fetchCategoryData }) => {


    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData?.id,
                name: editData?.name,
                status: editData?.status
            });
        }
    }, [editData]);

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                id: formData?.id,
                name: formData?.name,
                status: formData?.status
            }
            const data = await axiosInstance.put(`/admin/category/edit/${formData?.id}`, payload, authHeader());


            if (data?.data?.status === true) {
                toast.success("Category edited successfully!");
                setFormData(initialState);
                handleClose();
                fetchCategoryData();
            } else {
                toast.error(data?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal centered show={show} onHide={handleClose} className="form-modal">
            <div className="modal-header" closeButton>
                <h5 className="modal-title" id="deleteModalLabel">Edit Category</h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>

            </div>
            <div className="modal-body">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name: *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                placeholder="Enter Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Status: *</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        id="assignmentTrue"
                                        value="active"
                                        checked={formData.status === "active"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="assignmentTrue">Active</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        id="assignmentFalse"
                                        value="inactive"
                                        checked={formData.status === "inactive"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="assignmentFalse">InActive</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            {/* <button type="button" className="delete-btn" onClick={handleClose} >Close</button> */}

                            <button type="submit" className="back-btn submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditCategory