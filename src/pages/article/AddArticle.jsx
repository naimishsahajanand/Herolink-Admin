import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { authImageHeader } from '../../helper/axios';

const initialState = {
    title: "",
    description: "",
    image: '',
    status: "active",
    uploadedBy: ""
}

const AddArticle = () => {
    const token = localStorage.getItem("adminToken");

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const [editorData, setEditorData] = useState('');

    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;

        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChangeEditor = (event, editor) => {
        const data = editor.getData();

        setEditorData(data);
        setFormData((prev) => ({
            ...prev,
            description: data
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            title: formData?.title,
            description: formData?.description,
            image: formData?.image,
            status: formData?.status,
            uploadedBy: formData?.uploadedBy
        }

        try {

            const data = await axiosInstance.post(`/admin/article/add`, payload, authImageHeader());
            if (data?.data?.status === true) {
                toast.success("Successfully Article Added!");
                setFormData(initialState);
                setEditorData('');

                navigate('/admin/article');
            } else {
                toast.error(data?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate("/admin/article")
    }

    return (
        <>
            <div>
                <div class="col-md-12 mt-5 ms-3">
                    <div style={{ marginTop: 15 }}>
                        <div className='back-btn' onClick={handleBack}>
                            <p>
                                Back
                            </p>
                        </div>
                    </div>
                </div>
                <section class="view-section  mt-5">
                    <div class="content-new">
                        <div class="row">
                            <div class="d-flex align-items-center justify-content-between gap-3">
                                <h2 class="mb-0">Add Article</h2>
                            </div>

                            <form class="row g-3" onSubmit={handleSubmit}>
                                {/* <div class="row g-3 step-box"> */}
                                {/* <p className='step-title'>Register Details</p> */}
                                <div class="col-md-12 mb-2">
                                    <label htmlFor="title" className="form-label">Title: *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div class="col-md-12 col-sm-6 mb-2">
                                    <label htmlFor="image" className="form-label">Image: *</label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        id="image"
                                        accept="image/*"
                                        required
                                        onChange={handleInputChange}
                                    />
                                    {formData.image && (
                                        <div className="mt-3 mb-0">
                                            <img
                                                src={URL.createObjectURL(formData?.image)}
                                                alt="Slide Preview img-fluid"
                                                style={{
                                                    // width: '100%', 
                                                    // height: '280px' ,
                                                    width: '350px',
                                                    height: '200px'
                                                }}
                                            />
                                        </div>
                                    )}
                                    <span className='recomanded-text'>Recommended size: 1000 X 700px</span>
                                </div>
                                {/* </div> */}

                                <div class="col-md-12 mb-2">
                                    <label htmlFor="description" className="form-label">Description: *</label>
                                    <CKEditor
                                        name="description"
                                        id="description"
                                        editor={ClassicEditor}
                                        data={editorData}
                                        className="form-control"
                                        required
                                        onChange={handleChangeEditor}
                                        style={{
                                            padding: '15px'
                                        }}
                                    />
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label htmlFor="uploadedBy" className="form-label">Uploaded By: *</label>
                                    <div>
                                        <input
                                            type="text"
                                            name="uploadedBy"
                                            className="form-control"
                                            id="uploadedBy"
                                            placeholder="Enter Uploaded By"
                                            value={formData.uploadedBy}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
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
                                    <button type="submit" className="back-btn submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AddArticle