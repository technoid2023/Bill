import React, { useState } from 'react';
import { Sidebar, MenuItem ,Menu} from 'react-pro-sidebar';
import Layout from '../Components/Layout/Layout';


import './SidebarMenu.css';
import {faUserTie,faPeopleGroup,faLandmark,faStore ,faIndustry,faCubesStacked,faSignOut,faBars} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const Sidebarmenu = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate=useNavigate();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
        Cookies.remove('_UR');
        toast.success('Logged Out !');
        Cookies.remove('_TK')
        setTimeout(() => {
            navigate('/login');
        }, 500);
    }
};


const menuItems = [
    { name: 'Profile', icon: faUserTie, link: 'profile' },
    { name: 'Inventory', icon: faPeopleGroup, link: '/human-resource' },
    { name: 'Billing', icon: faLandmark, link: '/finance' },
    { name: 'Orders', icon: faStore, link: '/marketing' },
    { name: 'Help Desk', icon: faCubesStacked, link: '/material-management' },
    { name: 'Notifiation', icon: faIndustry, link: '/production-development' },
];

    
        return (
            <Layout>
                <div className="sidebar-menu-container">
                  
                    <div className={`sidebar-container ${sidebarCollapsed ? 'collapsed' : ''}`}>
                        <Sidebar className="sidebar" collapsed={sidebarCollapsed}>
                        <Menu>
                        {menuItems.map((item, index) => (
                            <MenuItem key={index} icon={<FontAwesomeIcon icon={item.icon} size='1x' style={{ color: 'saddlebrown', marginRight: '10px' }} />}>
                                <Link to={item.link} >
                                    {item.name}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>

                           
                            <div style={{display:'flex',alignItems:'center'}} onClick={handleLogout}>
                                <Link style={{marginLeft:'9rem',marginTop:'1rem'}}>
                                    <FontAwesomeIcon icon={faSignOut} size='1x' style={{ color: 'red', marginRight: '10px' }}/>
                                </Link>
                                <Link style={{marginTop:'1rem',color:'red'}}>Log Out</Link>
                            </div>
                        </Sidebar>
                    </div>
                    <div
                        className="sidebar-toggler"
                        onClick={toggleSidebar}
                        style={{
                            top: sidebarCollapsed ? '1rem' : '1rem',
                            left: sidebarCollapsed ? '1rem' : '1rem',
                        }}
                    >
                    <Link> <FontAwesomeIcon icon={faBars} size='1x' style={{ color: 'white' }} /> </Link>
                    </div>
                    <main className="main" style={{
                        backgroundColor: 'papayawhip',
                        // backgroundImage: `url(${background})`,
                        borderRadius: '10px',
                        boxShadow: 'rgba(0, 0, 0, 0.6) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(0, 0, 0, 0.4) 0px -2px 6px 0px inset',
                        padding: '5px',
                        margin: '25px',
                        maxHeight:'45rem'
                    }}><Outlet />
                    </main>
                </div>
            </Layout>
        );
    
};


export default Sidebarmenu;
