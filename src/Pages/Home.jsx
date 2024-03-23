import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import poms1 from '../Assests/poms1.jpg';
import poms2 from '../Assests/poms2.jpg';
import poms3 from '../Assests/poms3.jpg';
import poms4 from '../Assests/poms4.jpg';
import poms5 from '../Assests/poms5.jpg';
import poms6 from '../Assests/poms6.jpg';
import card1 from '../Assests/card1.png';
import card2 from '../Assests/card2.png';
import card3 from '../Assests/card3.png';
import card4 from '../Assests/card4.png';
import card5 from '../Assests/card5.png';
import card6 from '../Assests/card6.png';
import card7 from '../Assests/card7.png';
import card8 from '../Assests/card8.png';
import card9 from '../Assests/card9.png';
import card10 from '../Assests/card10.png';
import card11 from '../Assests/card11.png';
import card12 from '../Assests/card12.png';
import Layout from '../Components/Layout/Layout';


const Home=()=> {
  const cardDetails = [
    { icon: card1, title: 'Vessel Operated', description: 'POMS keeps track of Vessel & Barge operations deploying Pilot & Tug.' },
    { icon: card2, title: 'Cargo Handled', description: 'POMS captures Import-Export Cargo handling detail to generate Invoices & Reports for Management.' },
    { icon: card3, title: 'Bills Generated', description: 'POMS generates 20 different types of Bills for Port Services. Implemented 4 Scale of Rate (SoR) and many Trade Circulars.' },
    { icon: card4, title: 'Customs-EDI Message', description: 'POMS processes 924 messages per day approximately on an average.' },
    { icon: card5, title: 'Rake Handled', description: 'POMS assists in managing Wagon operation, Rake formation and movement.' },
    { icon: card6, title: 'Import Containers', description: 'POMS manages Import Operation Cycle starting from Landing to Delivery including documentation & Customs-EDI.' },
    { icon: card7, title: 'PDA accounts', description: 'POMS manages Port Deposit Accounts of Stakeholder and share real-time transaction in website with Trust & Confidence.' },
    { icon: card8, title: 'IPA-PCS Message', description: 'POMS exchanges 1265 messages per day approximately on an average.' },
    { icon: card9, title: 'Vehicle Entered', description: 'POMS manages 1200 Vehicles In-out, Loading-Unloading operation per day.' },
    { icon: card10, title: 'Export Containers', description: 'POMS controls Export Operation Cycle starting from Export-Opening, Receiving to Shipment.' },
    { icon: card11, title: 'Transaction Value', description: 'POMS captures huge volume of Financial Transaction and provides inputs for Accounts, Audit and GST authority.' },
    { icon: card12, title: 'Internal Message', description: `POMS shares real-time business data to it's Business Partner (BKCT, Weighbridge & DLDS-LDB).` },
  ];
 
  

  return (
    <Layout title={'POMS'}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      
        <div style={{
          backgroundColor: 'wheat',
          borderRadius: '10px',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', // Adjust shadow properties as needed
          padding: '10px',
          margin: '10px',
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
            <MDBCarouselItem itemId={4}>
              <img src={poms4} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={5}>
              <img src={poms5} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId={6}>
              <img src={poms6} className='d-block w-100' alt='...' />
              <MDBCarouselCaption>

              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarousel>
          <h2 style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center', color: 'black' }}>POMS Statistics</h2>
        
          <p style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center', color: 'black' }}>Statistics of Port Operation through POMS.
(Since 1st April 2010 and Revenue & Cargo from 1st October 2010)</p>
          <MDBRow className='justify-content-center'>
            {cardDetails.map((card, index) => (
              <MDBCol key={index} size='auto'>
                <MDBCard style={{ width: '18rem', marginBottom: '20px', height: '15rem' }}>
                  <MDBCardBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={card.icon} alt={card.title} style={{ width: '3rem', height: '3rem', marginBottom: '1rem' }} />
                    <MDBCardTitle>{card.title}</MDBCardTitle>
                    <MDBCardText>
                      {card.description}
                    </MDBCardText>
                  </MDBCardBody>

                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      </div>
    </Layout>
  );
}

export default  Home;