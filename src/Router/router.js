import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import Error from '../Pages/Error';
import UserLogin from '../Pages/Login';
import Sidebarmenu from '../Pages/Menubar';
import Reset from '../Pages/ResetPassword';
import Profile from '../Pages/Profile';
import Register from '../Pages/Registration';
import Update from '../Pages/UserUpdate';

import { isLoggedIn } from '../Auth/PrivateRoute';
import ItemList from '../Pages/ItemList';
import BillList from '../Pages/BillList';




function MyRoute() {
    return (
        <Routes>
         
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path='/reset'  element={<Reset/>}/>
            <Route path="/dashboard" element={isLoggedIn ? <Sidebarmenu /> : <Navigate to="/reset" />}>
                <Route path='profile'  element={isLoggedIn() ? <Profile /> : <Navigate to="/error" />}/>
                <Route path='update-user'  element={isLoggedIn() ? <Update /> : <Navigate to="/error" />}/>
                <Route path="item" element={isLoggedIn() ? <ItemList /> : <Navigate to="/error" />} />
                <Route path="bill" element={isLoggedIn() ? <BillList /> : <Navigate to="/error" />} />
                <Route path="*" element={<Navigate to="/error" />} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default MyRoute;
