
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axiosInstance, { authHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';

const initialState = {
    name: "",
    status: "active"
}

const AddIndustry = ({ show, handleClose, fetchIndustryData }) => {
    const token = localStorage.getItem("adminToken");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;

        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            name: formData?.name,
            status: formData?.status
        }

        try {

            const data = await axiosInstance.post(`/admin/industry/add`, payload, authHeader());
            console.log('====================================');
            console.log("categorydata", data);
            console.log('====================================');
            if (data?.data?.status === true) {
                toast.success("Successfully Industry Added!");
                setFormData(initialState);
                handleClose();
                fetchIndustryData();
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
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end" className="add-offcanvas">
                <div className="offcanvas-header">
                    <h4 id="offcanvasAddorderLabel">Add Industry</h4>
                    <button type="button" className="btn-close text-reset" onClick={handleClose} />
                </div>
                <div className="offcanvas-body">
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
                                onChange={handleInputChange}
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
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                    />
                                    <label className="form-check-label" htmlFor="assignmentFalse">InActive</label>
                                </div>
                            </div>
                        </div>

                        <div className="text-end">
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default AddIndustry;

