import React from 'react';
import {  useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,    
    MDBIcon,
    MDBCheckbox,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter
}
    from 'mdb-react-ui-kit';

const Registration = () => {
    const navigate = useNavigate();  
    const [varyingModal, setVaryingModal] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = Array.from({ length: 6 }, () => React.createRef());

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: null,
        college: "",
        course: "",
        city: "",
        pin_code: null,
        password: ""
    })
    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
   
    const userSubmit = (e) => {

        e.preventDefault();
        const data = {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            college: user.college,
            course: user.course,
            city: user.city,
            pin_code: user.pin_code,
            password: user.password,
        }
        console.log(data);
        axios.post('https://edu-tech-bwe5.onrender.com/v1/registration', data).then(res => {
            console.log(res);
            if (res.data.Success === true) {
                toast.success(res.data.Message)
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else {
                toast.error(res.data.Message)
            }

        })
    }

    
    const GetOtp = () => {
        console.log("call")
        let mail = { email: user.email }
        if (mail.email === "") {
            toast.error("Enter Your Mail")
            console.log("error")
        }
        else {            
            
            console.log(mail)
            axios.post('https://edu-tech-bwe5.onrender.com/v1/sendotp', mail).then(res => {
                console.log(res);
                if (res.data.Success === true) { 
                    setVaryingModal(!varyingModal);                   
                    setIsButtonEnabled(true)
                    toast.success(res.data.Message)
                }
                else {
                    toast.error(res.data.Message)
                }
            })
        }

    }
    const handleInputChange = (index, event) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);

        if (event.target.value !== '' && otpInputs[index + 1]) {
            otpInputs[index + 1].current.focus();
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        let otpData = {
            email: user.email,
            otp: enteredOtp
        }
         if(otpData.email!=="" || otpData.otp!==0 || otpData.otp!==""){
          console.log(otpData); 
          axios.post('https://edu-tech-bwe5.onrender.com/v1/verifyotp',otpData).then(res=>{ 
            console.log(res); 
          if(res.data.Success===true){
            setVaryingModal(!varyingModal)

            toast.success(res.data.Message)        
          }
          else{
              toast.error(res.data.Message)
          }

        })
         }
         else{
          toast.error("Enter OTP and Email")

         }
        console.log(otpData);

    };
    useEffect(() => {
        if (otpInputs[0] && otpInputs[0].current) {
            otpInputs[0].current.focus();
        }
    }, []);

    return (
        <MDBContainer fluid>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />            
            <MDBModal open={varyingModal} setOpen={setVaryingModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>ENTER OTP</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setVaryingModal(!varyingModal)}></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmit}>
                            <MDBModalBody>
                                <MDBContainer className="py-5">
                                    <MDBRow className="justify-content-center">
                                        <MDBCol lg="10">
                                            <div
                                                style={{
                                                    backgroundColor: 'rgba(120, 70, 70, 0.8)',
                                                    padding: '20px',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',                                                    
                                                }}>
                                                <div className="d-flex justify-content-center align-items-center mb-5">
                                                    {otp.map((digit, index) => (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            className="form-control text-center mx-2 otp-input"
                                                            maxLength="1"
                                                            value={digit}
                                                            onChange={(e) => handleInputChange(index, e)}
                                                            ref={otpInputs[index]}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color='secondary' type="reset" onClick={() => setVaryingModal(!varyingModal)}>
                                    Close
                                </MDBBtn>
                                <MDBBtn type="submit">Send</MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <form onSubmit={userSubmit}>
                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput label='Your Name' name='name' type='text' onChange={handleInput} className='w-100' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput label='Your Email' name='email' onChange={handleInput} type='email' />
                                    <div className=''><Link className='link-primary' onClick={GetOtp}>Verify</Link></div>
                                </div>                                    
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="phone me-3" size='lg' />
                                    <MDBInput label='Your Mobile Number' name='mobile' onChange={handleInput} type='number' />
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="university me-3" size='lg' />
                                    <MDBInput label='Your College' name='college' type='text' onChange={handleInput} className='w-100' />
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="laptop me-3" size='lg' />
                                    <MDBInput label='Your Course' name='course' type='text' onChange={handleInput} className='w-100' />
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="city me-3" size='lg' />
                                    <MDBInput label='Your City' name='city' type='text' onChange={handleInput} className='w-100' />
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="map-marked-alt me-3" size='lg' />
                                    <MDBInput label='Your Pin Code' name='pin_code' type='number' onChange={handleInput} className='w-100' />
                                </div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput label='Password' name='password' onChange={handleInput} type='password' />
                                </div>
                                <div className='mb-4'>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                                </div>
                                <MDBBtn className='mb-4' type="submit" size='lg' disabled={!isButtonEnabled}>Register</MDBBtn>
                            </MDBCol>
                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </form>
        </MDBContainer>
    );
}

export default Registration