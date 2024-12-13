import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ mobileToggle, setMobileToggle }) => {

    const handleLogOut = () => {
        localStorage.removeItem("adminToken");
    }

    return (
        <div className="nav navbar navbar-expand-xl navbar-light iq-navbar">
            <div className="container-fluid navbar-inner">
                <h5 className="site-menu-title">Admin Panel</h5>
                <button id="btn-toggle" className="sidebar-toggler break-point-sm" onClick={() => setMobileToggle(!mobileToggle)}>
                    <i className="ri-menu-line ri-xl" />
                </button>
            </div>
        </div>
    )
}

export default Header