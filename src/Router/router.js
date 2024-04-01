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
import ItemList from '../Components/items/ItemList';
import BillList from '../Pages/BillList';
import Stock from '../Pages/Stock';
import ItemUpdate from '../Components/items/ItemUpdate';
import StockUpdate from '../Pages/StockUpdate';
import BillForm from '../Pages/BillForm';
import Dashboard from '../Components/Dashboard/Dashboard';




function MyRoute() {
    return (
        <Routes>
           
         
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path='/reset'  element={<Reset/>}/>
            <Route path="/dashboard" element={isLoggedIn()? <Sidebarmenu />:<Error/>}>
                <Route path=''  element={isLoggedIn()? <Dashboard /> : <Error/>}/>
                <Route path='profile'  element={isLoggedIn()? <Profile /> : <Error/>}/>
                <Route path='update-user'  element={isLoggedIn() ? <Update /> : <Error/>}/>
                <Route path="item" element={isLoggedIn() ? <ItemList /> : <Error/>} />
                <Route path="bill" element={isLoggedIn() ? <BillList /> : <Error/>} />
                <Route path='update-item'  element={isLoggedIn() ? <ItemUpdate /> : <Error/>}/>
                <Route path="bill-entry" element={isLoggedIn() ? <BillForm /> : <Error/>} />
                <Route path='update-stock'  element={isLoggedIn() ? <StockUpdate /> : <Error/>}/>
                <Route path="stock" element={isLoggedIn() ? <Stock /> : <Error/>} />
                <Route path="*" element={<Error/>} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default MyRoute;
