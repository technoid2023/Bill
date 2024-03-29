import React, { useState ,useEffect} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import './Error.css'
import Cookies from 'js-cookie';
import Layout from '../Components/Layout/Layout';
const Error = () => {
  const[checkuser,setCheckuser]=useState(false)
  const[checkSession,setCheckSession]=useState(false)
  const [msg,setMsg]=useState('Error : PAGE NOT FOUND !')

  useEffect(() => {
    // Check if user is logged in
    const user = Cookies.get('_UR');
    console.log(user);
    if (user) {
      setCheckuser(true)
      setMsg('Warning : PAGE RESTRICTED !!')
    } else {
      setCheckuser(false)
      setMsg('Error : PAGE NOT FOUND !')
    }
    
    
  }, [1]);
  return (
    <Layout>
      <div style={{
     backgroundColor: 'silver',
      borderRadius: '10px',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', 
      padding: '10px',
      margin: '10px',
      position: 'relative',
      minHeight:'40rem',
      // minWidth:'100%'
    }}>
    <MDBContainer className="my-5 py-5 text-center">
      <MDBRow>
        <MDBCol>
          <div className="fadeInDown">
            <h1 className="font-weight-bold" style={{color:'red', fontSize:'15rem', fontWeight:'bolder'}}>404 !</h1>
          </div>
          <div className="fadeInDown">
            <h2 className="text-uppercase">{msg}</h2>
          </div>
          <div className="fadeInDown">
            <p className="mt-4" style={{color:'red',fontWeight:'bolder'}}>The page you are looking for might have been removed or you don't have access to visit, had its name changed, or is temporarily unavailable.</p>
          </div>
          <div className="fadeInDown">
           {checkuser===true?<MDBBtn href="/dashboard" color="primary" className="mt-4">Go to Dashboard</MDBBtn>:<MDBBtn href="/" color="primary" className="mt-4">Go to Home</MDBBtn>}
            
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    </Layout>

  );
};

export default Error;
