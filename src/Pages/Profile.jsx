import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
 
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import { decrypt } from '../Auth/PrivateRoute';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
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
                    if(res.data.Message==="Session Time Out, Login Again !"){
                      navigate("/");
                    }
                    toast.error(res.data.Message)
                }
            })
        }
    }
    const handleStore=async()=>{ 
      console.log(Token);
      const response = await axios.post('https://edu-tech-bwe5.onrender.com/v1/store', {},{
        headers: {
          'token': Token
        }
      });
      // console.log(response);
      if (response.data.Success === true) {
        toast.success('Store Updated !')
        Cookies.remove('_ST')
        const response2 = await axios.get('https://edu-tech-bwe5.onrender.com/v1/store',{
        headers: {
          'token': Token
        }
      });
      console.log(response2);
      if (response2.data.Success === true) {
        const backgroundData = response2.data.Data[0];
        Cookies.set("_ST", JSON.stringify(backgroundData));
      }
        setTimeout(() => {
          navigate("/dashboard");
        }, 100);
      } else { 
        if(response.data.Message==="Session Time Out, Login Again !"){
          navigate("/");
          Cookies.remove('_UR')
          Cookies.remove('_TK')
        }
        toast.error(response.data.Message);
      }
    
  };

    
  return (
    <section style={{ backgroundColor: 'white' }}>
         <Toaster
                position="top-center"
                reverseOrder={false}
            />
      <MDBContainer className="py-3">
        

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{User.name}</p>
                <p className="text-muted mb-4">{User.email}</p>
                <div className="d-flex justify-content-center mb-2">
                 <Link to='/dashboard/update-user'>{<MDBBtn>Edit</MDBBtn>}</Link> 
                  <MDBBtn outline className="ms-1" onClick={logout}>Logout</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBBtn onClick={() => handleStore()}>Update Store</MDBBtn>
               </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.mobile}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Company</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.company}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Designation</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.designation}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr/>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{User.city}, Pin {User.pin_code}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}