import React, { useState } from 'react'
import Sidebar from './../sidebar/Sidebar';
import Header from '../header/Header';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
    const isAuthenticated = !!localStorage.getItem('Admin-Token-Herolinks');

    const [mobileToggle, setMobileToggle] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className='layout'>
            <section className="main-section">
                <div className="layout has-sidebar fixed-sidebar fixed-header">
                    <Sidebar mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
                    <div className="layout">
                        <main className="content">
                            <div>
                                <Header mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
                                <Outlet />
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Layout