import React, { useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
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
    const [loading, setLoading] = useState(false);
    const [showList, setShowList] = useState(false); // State variable for list visibility
    const [listData, setListData] = useState([]); // State variable to store the list items

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
      setLoading(true);
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
      setLoading(false);
  };

  const toggleList = async () => {
    setShowList(prevState => !prevState); // Toggle list visibility

    if (!showList) {
      try {
        const response = await axios.get('https://edu-tech-bwe5.onrender.com/v1/due-bill', {
          headers: {
            'token': Token
          }
        });

        if (response.data.Success === true) {
          setListData(response.data.Data);
        } else {
          // Handle API error
          toast.error(response.data.Message);
        }
      } catch (error) {
        // Handle network error
        console.error('Error fetching list data:', error);
      }
    }
  };
    
  return (
    <section style={{ backgroundColor: 'white' }}>
      <Toaster position="top-center" reverseOrder={false} />
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
                  fluid
                />
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
                <MDBBtn onClick={() => handleStore()}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating Store...
                    </>
                  ) : (
                    "Update Store"
                  )}
                </MDBBtn>
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
            <MDBBtn onClick={toggleList} className="mb-3">
              {showList ? "Hide List" : "Show List"} <p> DUE BILLS FOR TODAY </p>
            </MDBBtn>
            {showList && (
              <MDBListGroup>
                {listData.map((item, index) => (
                  <MDBListGroupItem key={index}>{item}</MDBListGroupItem>
                ))}
              </MDBListGroup>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
