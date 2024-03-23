import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { decrypt } from '../Auth/PrivateRoute';



const Profile = () => {
    console.log("okkk profile");
    const navigate = useNavigate();
    let encryptUser = Cookies.get('_UR');
    let User;
    if (encryptUser === undefined) {
        return;
    } else {
        User = decrypt(encryptUser);
        User = JSON.parse(User);
    }
    let encryptToken = Cookies.get('_TK');
    let Token;
    if (encryptToken === undefined) {
        return;
    } else {
        Token = decrypt(encryptToken);
        Token = JSON.parse(Token);
    }
    const logout = () => {
        if (Token === null) {
            toast.error("Session Time Out !");
        }
        else {

            axios.post('https://edu-tech-bwe5.onrender.com/v1/logout', {}, {
                headers: {
                    'token': Token
                }
            }).then(res => {
                console.log(res);
                if (res.data.Success === true) {

                    Cookies.remove('_UR')
                    Cookies.remove('_TK')

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
    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.7rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', background: 'linear-gradient(45deg, #ffcc00, #ff9900)' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    <MDBTypography tag="h5">{User.name}</MDBTypography>
                                    {/* Wrap the icon inside Link component */}
                                    <Link className="fas fa-pen-to-square fa-2x" color='dark' to='/dashboard/update-user'/>
                                    <MDBRow style={{ marginTop: '150px' }}>
                                        <MDBTypography tag="h6">Log Out</MDBTypography>
                                        <Link className="fas fa-right-from-bracket fa-2x" onClick={logout} color='dark' />
                                    </MDBRow>
                                </MDBCol>

                                <MDBCol md="8">

                                    <MDBCardBody className="p-4" style={{ width: '100%', background: 'linear-gradient(90deg, #f0f0f0, #e0e0e0)' }}>
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{User.email}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{User.mobile}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6">Education</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">College</MDBTypography>
                                                <MDBCardText className="text-muted">{User.college}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Course</MDBTypography>
                                                <MDBCardText className="text-muted">{User.course}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBTypography tag="h6">Address</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">City</MDBTypography>
                                                <MDBCardText className="text-muted">{User.city}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Pin Code</MDBTypography>
                                                <MDBCardText className="text-muted">{User.pin_code}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <div className="d-flex justify-content-start">
                                            <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                            <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>

    );
};

export default Profile;
