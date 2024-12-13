import React, { useState } from 'react'
import axiosInstance, { authHeader } from '../../helper/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [isPassword, setIsPassword] = useState("password")
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        setEmailError('');
        setPasswordError('');
    }

    const handleSubmit = async (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        e.preventDefault();
        if (!formData.email) {
            setEmailError('Email is required');
            return;
        }
        else if (!emailRegex.test(formData.email)) {
            setEmailError('Invalid email address');
            return;
        }
        else if (!formData.password) {
            setPasswordError('Password is required');
            return;
        } else {
            setEmailError('');
            setPasswordError('');
        }

        try {
            const res = await axiosInstance.post("/admin/login", formData, authHeader())
            console.log("res:-------", res);

            if (res?.data?.status === true) {
                toast.success("Successfully logged in!");
                localStorage.setItem("Admin-Token-Herolinks", res?.data?.data?.token);
                navigate("/admin/dashboard");
                setEmailError('');
                setPasswordError('');
                setFormData({
                    email: "",
                    password: ""
                })
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <section className="login-section">
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row  shadow login-box">
                    <div className="col-lg-6 left-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                {/* <img src="/images/ksm-logo.svg" alt="logo" className="img-fluid mb-3" draggable="false" /> */}
                                <h4 className="mb-2">Welcome Back ! <span>👋</span></h4>
                                <h4 className="mb-2">Sign In </h4>
                                <p>Please provide the required details for further proceed</p>

                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Your Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete='off' />
                                    <p className='text-danger'>{emailError}</p>

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="form-label">Password:</label>
                                    <div className='position-relative'>
                                        <input
                                            type={isPassword}
                                            name='password'
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            value={formData.password}
                                            autoComplete='off'
                                        />
                                        <a className='eye-btn'>
                                            {
                                                isPassword === "password" ?
                                                    <i className="ri-eye-fill" onClick={() => setIsPassword("text")}></i>
                                                    :
                                                    <i className="ri-eye-off-fill" onClick={() => setIsPassword("password")}></i>
                                            }
                                        </a>
                                        <p className='text-danger'>{passwordError}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button className="login-btn">Login Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 right-box">
                        <div className="glass-effect">
                            {/* <h2>Very Good Works Are Watting For You 😉</h2>
                            <h5 className="mt-3">Login Now 🤞</h5> */}
                            <h2>Herolinks</h2>
                            <h5 className="mt-3">Because Every Hero Needs a Link! 😉</h5>
                            {/* <img src="/images/ksm-logo.svg" alt="vector" className="img-fluid vector-img" draggable="false" /> */}
                        </div>
                    </div>
                </div >
            </div >
        </section >
    )
}

export default Login