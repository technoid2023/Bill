import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Footer=()=> {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </Link>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </Link>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </Link>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </Link>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </Link>
          <Link to='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </Link>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>SMPK Head Office</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                15 Strand Road,
                Kolkata-700001
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />

              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 033 2230 3451
              </p>
              
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>KDS IT Department</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Subhas Bhavan,1st Floor,
                Circular Garden Reach Road,
                Kolkata-700043
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                nabadeyroy@kolkataporttrust.gov.in

              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 033 2230 3451
              </p>
              
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>NIC-POMS Helpdesk</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Subhas Bhavan,1st Floor,
                Circular Garden Reach Road,
                Kolkata-700043
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                nic@kolkataporttrust.gov.in
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />033-71003362/77
              </p>
              
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Project Enquiry</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                National Informatics Centre,
                Webel STP-2,
                Salt Lake Electronic Complex,
                Kolkata-700091
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                nicstp2.poms@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Copyright By © SMPK-KDS
        <Link className='text-reset fw-bold' to='https://www.nic.in/' style={{ marginLeft: '50px' }}>
          Developed By POMS Creative Team (NIC)
        </Link>
      </div>
    </MDBFooter>
  );
}
export default Footer;