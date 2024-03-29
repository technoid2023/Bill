import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import { decrypt, encrypt } from '../Auth/PrivateRoute';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function Update() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id:'',
    name: '',
    email: '',
    mobile: '',
    company: '',
    designation: '',
    city: '',
    pin_code: ''
  });
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const encryptUser = Cookies.get('_UR');
    const encryptToken = Cookies.get('_TK');

    if (encryptUser && encryptToken) {
      const decryptedUser = decrypt(encryptUser);
      const decryptedToken = decrypt(encryptToken);
      const userd=JSON.parse(decryptedUser)
      setUserData(JSON.parse(decryptedUser));
      setToken(JSON.parse(decryptedToken));
      setUser({
        _id:userd._id||'',
        name: userd.name || '',
        email: userd.email || '',
        mobile: userd.mobile || '',
        company: userd.company || '',
        designation: userd.designation || '',
        city: userd.city || '',
        pin_code: userd.pin_code || ''
      });
    } else {
      // Handle case when cookies are not available
      // You may redirect user or show an error message
    }
  }, []);

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const updateData = () => {
    if (user.email === "" || user.mobile === "" || user.pin_code === "" || user.name === "") {
      toast.error("Email, Mobile, and Pin Code are needed to keep you active!");
    } else {
      console.log("user ",user);
      axios.put('https://edu-tech-bwe5.onrender.com/v1/user/update/' + userData._id, user, {
        headers: {
          'token': token
        }
      }).then(res => {
        if (res.data.Success === true) {

          const updatedUser = { ...user };
          console.log("new",updatedUser);
          // Cookies.remove('_UR');
          const encryptedUser = encrypt(JSON.stringify(updatedUser));
          Cookies.set('_UR', encryptedUser,{ expires: 1 });
          toast.success(res.data.Message);
          setTimeout(() => {
            navigate('/dashboard/profile');
          }, 1000);
        } else {
          toast.error(res.data.Message);
        }
      });
    }
  }

  return (
    <MDBContainer fluid>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <MDBRow className='justify-content-center align-items-center'>
        <MDBCard>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update User Details</h3>
            <MDBRow>
              <MDBCol md='3'>
                <MDBInput wrapperClass='mb-4' label='Name' size='lg' value={user.name} onChange={handleInput} name='name' type='text' />
              </MDBCol>
              <MDBCol md='9'>
                <MDBInput wrapperClass='mb-4' label='Company' size='lg' value={user.company} onChange={handleInput} name='company' type='text' />
              </MDBCol>
              
            </MDBRow>
            <MDBRow>
            <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Email' size='lg' value={user.email} onChange={handleInput} name='email' type='email' />
              </MDBCol>
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Mobile' size='lg' value={user.mobile} onChange={handleInput} name='mobile' type='number' />
              </MDBCol>
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Designation' size='lg' value={user.designation} onChange={handleInput} name='designation' type='text' />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='City' size='lg' value={user.city} onChange={handleInput} name='city' type='text' />
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Pin Code' size='lg' value={user.pin_code} onChange={handleInput} name='pin_code' type='number' />
              </MDBCol>
            </MDBRow>
            <MDBBtn className='mb-4' onClick={updateData} size='lg'>Submit</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default Update;
