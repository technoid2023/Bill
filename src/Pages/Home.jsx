import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import poms1 from '../Assests/1.png';
import poms2 from '../Assests/2.png';
import poms3 from '../Assests/3.png';

import Layout from '../Components/Layout/Layout';


const Home=()=> {
 
 
  

  return (
    <Layout title={'BillBuddy'}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      
        <div style={{
          backgroundColor: 'wheat',
          borderRadius: '10px',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', // Adjust shadow properties as needed
          padding: '2px',
          margin: '2px',
          position: 'relative',
        }}>
          <MDBCarousel showControls fade>
            
            <MDBCarouselItem itemId={1}>
            
              <img src={poms1} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <img src={poms2} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
              <img src={poms3} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
         
          </MDBCarousel>
        
        </div>
      </div>
    </Layout>
  );
}

export default  Home;