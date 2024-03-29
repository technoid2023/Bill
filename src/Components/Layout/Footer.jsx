import React from 'react';
import { MDBFooter} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Footer=()=> {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Copyright By © Technoid
        <Link className='text-reset fw-bold' to='https://www.nic.in/' style={{ marginLeft: '50px' }}>
          Developed By Technoid
        </Link>
      </div>
    </MDBFooter>
  );
}
export default Footer;