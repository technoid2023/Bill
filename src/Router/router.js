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
    
    const PrivateRoute=({element})=>{
        let loggedIn=isLoggedIn();
        console.log("lllo",isLoggedIn());
        
        console.log("log check",loggedIn);
        
        return isLoggedIn()?element:(<Navigate to='/error'/>)

    }


    return (
        <Routes>
           
         
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path='/reset'  element={<Reset/>}/>
            <Route path="/dashboard" element={<PrivateRoute element={<Sidebarmenu/>}/>}>
                <Route path=''  element={<PrivateRoute element={<Dashboard/>}/>}/>
                <Route path='profile'  element={<PrivateRoute element={<Profile/>}/>}/>
                <Route path='update-user'  element={<PrivateRoute element={<Update/>}/>}/>
                <Route path="item" element={<PrivateRoute element={<ItemList/>}/>} />
                <Route path="bill" element={<PrivateRoute element={<BillList/>}/>} />
                <Route path='update-item'  element={<PrivateRoute element={<ItemUpdate/>}/>}/>
                <Route path="bill-entry" element={<PrivateRoute element={<BillForm/>}/>} />
                <Route path='update-stock'  element={<PrivateRoute element={<StockUpdate/>}/>}/>
                <Route path="stock" element={<PrivateRoute element={<Stock/>}/>} />
                <Route path="*" element={<Error/>} />
            </Route>
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
}

export default MyRoute;
