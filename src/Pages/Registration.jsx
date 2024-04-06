import React from 'react';
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {
    MDBBtn,
    
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
} from 'mdb-react-ui-kit';


const Registration = () => {
    const navigate = useNavigate();
    const [varyingModal, setVaryingModal] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = Array.from({ length: 6 }, () => React.createRef());
    const [loading, setLoading] = useState(false);
    const [loadingo, setLoadingO] = useState(false);
    const [loadingr, setLoadingR] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: null,
        
        company: "",
        designation: "",
        city: "",
        pin_code: null,
        password: ""
    });

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const userSubmit = (e) => {
        setLoadingR(true);
        e.preventDefault();
        const data = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            mobile: user.mobile,
            
            company: user.company,
            designation: user.designation,
            city: user.city,
            pin_code: user.pin_code,
            password: user.password,
        };
        const isAllDataFilled = Object.values(data).every(val => val !== "" && val !== null);


        if(isAllDataFilled){
          axios.post('https://edu-tech-bwe5.onrender.com/v1/registration', data).then(res => {
            console.log(res);
            if (res.data.Success === true) {
                setLoadingR(false);
                toast.success(res.data.Message);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            else {
                toast.error(res.data.Message);
            }
        });
        }else{
          setLoadingR(false);
toast.error('Fill All Details !!')
        }
        
    };

    const GetOtp = () => {
        setLoading(true);
        let mail = { email: user.email };
        if (mail.email === "") {
            setLoading(false);
            toast.error("Enter Your Mail");
        } else {
            axios.post('https://edu-tech-bwe5.onrender.com/v1/sendotp', mail).then(res => {
                console.log(res);
                if (res.data.Success === true) {
                    setVaryingModal(!varyingModal);
                    setLoading(false);
                    toast.success(res.data.Message);
                } else {
                    setLoading(false);
                    toast.error(res.data.Message);
                }
            });
        }
    };

    const handleInputChange = (index, event) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);

        if (event.target.value !== '' && otpInputs[index + 1]) {
            otpInputs[index + 1].current.focus();
        }
    };

    const handleSubmit = (e) => {
        setLoadingO(true);
        e.preventDefault();
        const enteredOtp = otp.join('');
        let otpData = {
            email: user.email,
            otp: enteredOtp
        };
        if (otpData.email !== "" || otpData.otp !== 0 || otpData.otp !== "") {
            axios.post('https://edu-tech-bwe5.onrender.com/v1/verifyotp', otpData).then(res => {
                console.log(res);
                if (res.data.Success === true) {
                    setVaryingModal(!varyingModal);
                    setIsButtonEnabled(true);
                    setLoadingO(false);
                    toast.success(res.data.Message);
                } else {
                    setLoadingO(false);
                    toast.error(res.data.Message);
                }
            });
        } else {
            toast.error("Enter OTP and Email");
        }
    };

    useEffect(() => {
        if (otpInputs[0] && otpInputs[0].current) {
            otpInputs[0].current.focus();
        }
    }, []);

    return (
        <div className="container-fluid p-0">
            <Toaster position="top-center" reverseOrder={false} />

            <MDBModal open={varyingModal} setOpen={setVaryingModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>ENTER OTP</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={() => setVaryingModal(!varyingModal)}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <form onSubmit={handleSubmit}>
                            <MDBModalBody>
                                <div className="container py-1">
                                    <div className="row justify-content-start">
                                        <div className="col-lg-10">
                                            <div
                                                style={{
                                                    backgroundColor: 'rgba(120, 70, 70, 0.8)',
                                                    padding: '20px',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                                }}
                                            >
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
                                        </div>
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn
                                    color="secondary"
                                    type="reset"
                                    onClick={() => setVaryingModal(!varyingModal)}
                                >
                                    Close
                                </MDBBtn>
                                <MDBBtn type="submit">
                                    {loadingo ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </MDBBtn>
                            </MDBModalFooter>
                        </form>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <form onSubmit={userSubmit}>
                <div className="row justify-content-center align-items-center vh-100 m-0">
                    <div className="col-md-6">
                        {/* First row */}
                        <div className="row mb-4 align-items-center">
                            <div className="col-md-6">
                                <MDBIcon fas icon="user me-3" size="lg" />
                                <MDBInput
                                    label="First Name"
                                    name="firstName"
                                    type="text"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6">
                                <MDBIcon fas icon="user me-3" size="lg" />
                                <MDBInput
                                    label="Last Name"
                                    name="lastName"
                                    type="text"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                        </div>

                        {/* Second row */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <MDBIcon fas icon="envelope" size="lg" className="me-3" />
                                <div className="d-flex align-items-end">
                                    <MDBInput
                                        label="Your Email"
                                        name="email"
                                        onChange={handleInput}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon fas icon="phone me-3" size="lg" />
                                <MDBInput
                                    label="Your Mobile Number"
                                    name="mobile"
                                    onChange={handleInput}
                                    type="number"
                                />
                            </div>
                        </div>

                        {/* Third row */}
                        <div className="row mb-4">
                            <div className="col-md-8">
                                <MDBIcon fas icon="university me-3" size="lg" />
                                <MDBInput
                                    label="Your Company"
                                    name="company"
                                    type="text"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                            
                            <div className="col-md-4">
                                <MDBBtn onClick={GetOtp} type="button">
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Sending OTP...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                            Send OTP
                                        </>
                                    )}
                                </MDBBtn>
                            </div>
                        </div>

                        {/* Fourth row */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <MDBIcon fas icon="laptop me-3" size="lg" />
                                <MDBInput
                                    label="Your Designation"
                                    name="designation"
                                    type="text"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6">
                                <MDBIcon fas icon="city me-3" size="lg" />
                                <MDBInput
                                    label="Your Address"
                                    name="city"
                                    type="text"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                        </div>

                        {/* Fifth row */}
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <MDBIcon fas icon="map-marked-alt me-3" size="lg" />
                                <MDBInput
                                    label="Your Pin Code"
                                    name="pin_code"
                                    type="number"
                                    onChange={handleInput}
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6">
                                <MDBIcon fas icon="lock me-3" size="lg" />
                                <MDBInput
                                    label="Password"
                                    name="password"
                                    onChange={handleInput}
                                    type="password"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <MDBCheckbox
                                name="flexCheck"
                                value=""
                                id="flexCheckDefault"
                                label="Subscribe to our newsletter"
                            />
                        </div>

                        <MDBBtn
                            className="mb-4"
                            type="submit"
                            size="lg"
                            disabled={!isButtonEnabled}
                        >
                            {loadingr ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Wait...
                                </>
                            ) : (
                                'Register'
                            )}
                        </MDBBtn>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Registration;
