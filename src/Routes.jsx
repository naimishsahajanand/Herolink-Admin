import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Users from './pages/users/Users';
import ViewUsers from './pages/users/ViewUsers';
import Category from './pages/category/Category';
import Industry from './pages/Industry/Industry';
import Business from './pages/business/Business';
import Consumer from './pages/consumer/Consumer';
import Startupstage from './pages/startupstage/StartupStage';
import BusinessRightNow from './pages/businessRightNow/BusinessRightNow';
import Plan from './pages/plan/Plan';
import Article from './pages/article/Article';
import News from './pages/news/News';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/users/view" element={<ViewUsers />} />

                <Route path="/admin/category" element={<Category />} />
                <Route path="/admin/industry" element={<Industry />} />
                <Route path='/admin/business' element={<Business />} />
                <Route path='/admin/consumer-segment' element={<Consumer />} />
                <Route path='/admin/startup-stage' element={<Startupstage />} />
                <Route path='/admin/your-business-right-now' element={<BusinessRightNow />} />
                <Route path='/admin/plan' element={<Plan />} />
                <Route path='/admin/article' element={<Article />} />
                <Route path='/admin/news' element={<News />} />




            </Route>
        </Routes>
    )
}

export default AppRoutes; 