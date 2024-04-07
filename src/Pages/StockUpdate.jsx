import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import { decrypt} from '../Auth/PrivateRoute';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function StockUpdate() {
    let item=Cookies.get('uitem')
    item=JSON.parse(item)
  console.log("item:: ", item._id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    item_cd: item.item_cd,
    name: item.name,
    category: item.category,
    subcategory: item.subcategory,
    source: item.source,
  
    
    qty: item.qty,
    
  });
 
  const [token, setToken] = useState(null);
  // Open the modal by default

  useEffect(() => {
    
    const encryptToken = Cookies.get('_TK');

    if ( encryptToken) {
      
      const decryptedToken = decrypt(encryptToken);
      
      setToken(JSON.parse(decryptedToken));
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
    console.log("item:: ", item._id);
    setLoading(true);
    if (user.item_cd === "" || user.name === "" || user.qty === "" ) {
      toast.error("Item Code, Name, and Quantity are needed !");
    } else {
        console.log(token);
      axios.put('http://127.0.0.1:8111/v1/item/' + item._id, user, {
        headers: {
          'token': token
        }
      }).then(res => {
        if (res.data.Success === true) {
          
          
          setLoading(false);
          toast.success(res.data.Message);
          setTimeout(() => {
            navigate('/dashboard/stock');
            Cookies.remove('uitem');
          }, 1000);
        } else {
          if(res.data.Message==="Session Time Out, Login Again !"){
            navigate("/");
          }
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
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Stock Data</h3>
            <MDBRow>
              <MDBCol md='2'>
                <MDBInput wrapperClass='mb-4' label='Item Code' size='lg' value={user.item_cd} onChange={handleInput} name='item_cd' type='text' />
              </MDBCol>
              <MDBCol md='4'>
                <MDBInput wrapperClass='mb-4' label='Name' size='lg' value={user.name} onChange={handleInput} name='name' type='text' />
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Source' size='lg' value={user.source} onChange={handleInput} name='source' type='text' />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='3'>
                <MDBInput wrapperClass='mb-4' label='Category' size='lg' value={user.category} onChange={handleInput} name='category' type='text' />
              </MDBCol>
              <MDBCol md='3'>
                <MDBInput wrapperClass='mb-4' label='Sub Category' size='lg' value={user.subcategory} onChange={handleInput} name='subcategory' type='text' />
              </MDBCol>
              
            </MDBRow>
            
            <MDBRow>
              
              <MDBCol md='2'>
                <MDBInput wrapperClass='mb-4' label='Quantity' size='lg' value={user.qty} onChange={handleInput} name='qty' type='number' />
              </MDBCol>
              
            </MDBRow>
            <MDBBtn className='mb-4' onClick={updateData} size='lg'>{loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Stock"
                  )}</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default StockUpdate;
