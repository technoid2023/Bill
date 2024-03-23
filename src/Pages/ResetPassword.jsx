import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage
}
from 'mdb-react-ui-kit';
import toast ,{Toaster} from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Reset() {
    const[femail,setFemail]=useState(false)
    const[fotp,setFotp]=useState(true)
    
    
    const[resetdisable,setResetdisable]=useState(true);
    const[otpdisable,setOtpdisable]=useState(false);
    const navigate=useNavigate();
    const [user,setUser]=useState({
       
        email:"",
        confirmpassword:null,
        newpassword:null,
        otp:null

    })
    const handleInput=(e)=>{
        e.persist();
        setUser({...user,[e.target.name]:e.target.value})
    }
    const SendOtp=()=>{
        console.log(user.newpassword);
        let mail={email:user.email}
        if(user.email==="" ){
      toast.error("Fill all Data First")
        }
        if(user.newpassword!==user.confirmpassword){
            toast.error("Password Missmatch !!")
        }
        else{
          axios.post('https://edu-tech-bwe5.onrender.com/v1/sendotp',mail).then(res=>{ 
            console.log(res); 
          if(res.data.Success===true){
           setFotp(false)
           setResetdisable(false)
           setFemail(true)
           
          
           setOtpdisable(true)
      
            toast.success(res.data.Message)

            
            
          }
          else{
              toast.error(res.data.Message)
          }
        })
        }
        
      }

const resetPassword=()=>{
    if(user.otp===null){
        toast.error('Enter OTP ')
    }
    else{
       let data={
            email:user.email,
            new_password:user.newpassword
        }
        axios.put('https://edu-tech-bwe5.onrender.com/v1/reset-password',data).then(res=>{ 
            console.log(res); 
          if(res.data.Success===true){
           
      
            toast.success(res.data.Message)
            setTimeout(() => {
                navigate('/login');
              }, 1000);
            
          }
          else{
              toast.error(res.data.Message)
          }
        })
    }
}

  return (



    <MDBContainer fluid className='p-4'>
        
                <Toaster
                position="top-center"
                reverseOrder={false}
                />
      <MDBRow>
      
      <MDBCol md='6'>
            <MDBCardImage src='https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?w=740&t=st=1705078107~exp=1705078707~hmac=41bc8195db32f9e0dc0803cad28612da83fb81fb50c9a1cbb0d148f1bb1e2497' alt="login form" className='rounded-start w-100' height={500}/>
          </MDBCol>
   
        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' disabled={femail} label='Email Address' onChange={handleInput} name='email' type='email'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' disabled={fotp} label='OTP' name='otp' onChange={handleInput} type='number'/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='New Password' name='newpassword' onChange={handleInput} type='password'/>
              <MDBInput wrapperClass='mb-4' label='Confirm Password' name='confirmpassword' onChange={handleInput} type='text'/>

              <MDBBtn className='mb-4'  type="button" disabled={otpdisable} onClick={SendOtp} size='lg'>Send OTP</MDBBtn>
              <MDBBtn className='w-100 mb-4' type="button" color='success'disabled={resetdisable} onClick={resetPassword} size='lg'>Reset</MDBBtn>

            

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
        
      </MDBRow>
    
    </MDBContainer>
  );
}

export default Reset;
