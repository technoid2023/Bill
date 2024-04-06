import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { decrypt } from '../Auth/PrivateRoute';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import Load from './Load';

const BillList = () => {
  const columns = [
    {
      name: 'Bill No.',
      selector: row => row.bill_number,
      sortable: true
    },
    {
      name: 'Bill Date',
      selector: row => row.date.toString().slice(0,10),
      sortable: true
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true
    },
    {
      name: 'Customer Name',
      selector: row => row.detail[0].cus_name,
    },
    {
      name: 'Customer Mobile',
      selector: row => row.detail[0].cus_mobile,
    },
    {
      name: 'Paid',
      selector: row => row.pay ? "Yes" : "No",
      sortable: true
    },
    {
      name: 'Refund',
      selector: row => row.refund ? "Yes" : "No",
      sortable: true
    },
    {
      name: 'Due Date',
      selector: row => row.due_date ? row.due_date.toString().slice(0,10) : '',
      sortable: true
    },
    {
      cell: row => (
        <div>
          <FontAwesomeIcon icon={faEye} onClick={() => handleView(row)} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginRight: '10px' }} />
         
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false); // New state for edit modal
  const [itemDetails, setItemDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let encryptToken = Cookies.get('_TK');
      let Token;
      if (encryptToken === undefined) {
        return;
      } else {
        Token = decrypt(encryptToken);
        Token = JSON.parse(Token);
      }

      try {
        const response = await axios.get('https://edu-tech-bwe5.onrender.com/v1/bill', {
          headers: {
            'token': Token
          }
        });

        if (response.data.Success === true) {
          setData(response.data.Data);
          setRecords(response.data.Data); // Ensure records are initialized with data
        } else { 
          if(response.data.Message === "Session Time Out, Login Again !") {
            navigate("/");
            Cookies.remove('_UR');
            Cookies.remove('_TK');
          }
          toast.error(response.data.Message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === '') {
      setRecords(data);
    } else {
      const newData = data.filter(row => {
        const concatenatedValues = Object.values(row).join(' ').toLowerCase();
        return concatenatedValues.includes(searchValue);
      });
      setRecords(newData);
    }
  }

  function handleEdit(row) {
    setItemDetails(row);
    setOpenEdit(true);
  }



  const handleView = (row) => {
    setItemDetails(row);
    setOpenView(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleEditSubmit = async() => {
    setLoading(true);
    console.log(itemDetails._id);
    const updatedData = {
      pay: itemDetails.pay,
      refund: itemDetails.refund
    };
    let encryptToken = Cookies.get('_TK');
      let Token;
      if (encryptToken === undefined) {
        return;
      } else {
        Token = decrypt(encryptToken);
        Token = JSON.parse(Token);
      }
    try {
      axios.put('https://edu-tech-bwe5.onrender.com/v1/bill/' + itemDetails._id, updatedData, {
        headers: {
          'token': Token
        }
      }).then(res => {
        if (res.data.Success === true) {
          setLoading(false);
          toast.success(res.data.Message);
           
    setOpenEdit(false);
          
        } else {
          toast.error(res.data.Message);
           
    setOpenEdit(false);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
    console.log("Updated Data:", updatedData);
  
   
  };
  
  return (
    <div className='container mt-2'>
      <h3 style={{textAlign:'center', fontFamily:'sans-serif', color:'blue', fontWeight:'bolder'}}>Bill List</h3>
      <div className='row mb-2'>
        <div className='col-md-6'>
          <MDBInput label='Search Bill' size='lg' onChange={handleFilter} type='text' />
        </div>
        <div className='col-md-6 d-flex justify-content-end'>
          <Link to='/dashboard/bill-entry'> <MDBBtn  color='primary'> Add<FontAwesomeIcon  icon={faPlus} /></MDBBtn></Link>
        </div>
      </div>
      <MDBModal open={openView} setOpen={setOpenView} tabIndex='-1'>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Bill Details</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={() => setOpenView(false)}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
    {itemDetails && (
      <table className="table">
        <tbody>
        <tr>
            <td><strong>Customer Name</strong></td>
            <td>{itemDetails.detail[0].cus_name}</td>
          </tr>
          <tr>
            <td><strong>Customer Mobile</strong></td>
            <td>{itemDetails.detail[0].cus_mobile}</td>
          </tr>
          <tr>
            <td><strong>Customer Email</strong></td>
            <td>{itemDetails.detail[0].cus_email}</td>
          </tr>
          <tr>
            <td><strong>Customer Address</strong></td>
            <td>{itemDetails.detail[0].cus_address}</td>
          </tr>
          <tr>
            <td><strong>Bill Number:</strong></td>
            <td>{itemDetails.bill_number}</td>
          </tr>
          <tr>
            <td><strong>Bill Date:</strong></td>
            <td>{itemDetails.date.toString().slice(0,10)}</td>
          </tr>
          <tr>
            <td><strong>Bill Amount:</strong></td>
            <td>{itemDetails.amount}</td>
          </tr>
          <tr>
            <td><strong>Tax Amount:</strong></td>
            <td>{itemDetails.tax_value}</td>
          </tr>
          <tr>
            <td><strong>Due Date:</strong></td>
            <td>{itemDetails.due_date?(itemDetails.due_date.toString().slice(0,10)):('')}</td>
          </tr>
          <tr>
            <td><strong>Paid:</strong></td>
            <td>{itemDetails.pay ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td colSpan="2"><strong>Details:</strong></td>
          </tr>
          {itemDetails.detail && itemDetails.detail.map((record, index) => (
            <tr key={index}>
              <td colSpan="2">
                <table className="table">
                  <tbody>
                    
                    <tr>
                      <td><strong>Item Code:</strong></td>
                      <td>{record.item_cd}</td>
                    </tr>
                    <tr>
                      <td><strong>Item Name:</strong></td>
                      <td>{record.item_name}</td>
                    </tr>
                    <tr>
                      <td><strong>Item Quantity:</strong></td>
                      <td>{record.item_qty}</td>
                    </tr>
                    <tr>
                      <td><strong>Item Rate:</strong></td>
                      <td>{record.item_rate}</td>
                    </tr>
                    <tr>
                      <td><strong>Amount:</strong></td>
                      <td>{record.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </MDBModalBody>
  
              <MDBModalFooter>
                <MDBBtn color='secondary' onClick={() => setOpenView(false)}>Close</MDBBtn>
              
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
  
      {/* Edit Modal */}
<MDBModal open={openEdit} setOpen={setOpenEdit} tabIndex='-1'>
  <MDBModalDialog>
    <MDBModalContent>
      <MDBModalHeader>
        <MDBModalTitle>Edit Bill</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={handleEditClose}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        {/* Form or content for editing */}
        {itemDetails && (
          // Example form fields
          <div>
            <label>Bill Number: {itemDetails.bill_number}</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="paidCheckbox" checked={itemDetails.pay} onChange={() => setItemDetails({...itemDetails, pay: !itemDetails.pay})} />
              <label className="form-check-label" htmlFor="paidCheckbox">
                Paid
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  type="checkbox" id="refundCheckbox" disabled={itemDetails.refund}  checked={itemDetails.refund === true} onChange={() => setItemDetails({...itemDetails, refund: !itemDetails.refund})} />
              <label className="form-check-label" htmlFor="refundCheckbox">
                Refund
              </label>
            </div>
          </div>
        )}
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color='secondary' onClick={handleEditClose}>Close</MDBBtn>
        <MDBBtn color='primary' onClick={handleEditSubmit}>{loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    "Modify "
                  )}</MDBBtn> {/* handleEditSubmit function to be implemented */}
      </MDBModalFooter>
    </MDBModalContent>
  </MDBModalDialog>
</MDBModal>

  
      {/* Display Data Table */}
      {data.length > 0 ? (
        <DataTable
          columns={columns}
          data={records}
          pagination
          highlightOnHover
          customStyles={{
            headRow: {
              style: {
                backgroundColor: 'black',
                color: 'white',
                fontWeight: 'bold',
              }
            }
          }}
        />
      ) : (
        <Load type='spinningBubbles' color='grey'/>
      )}
    </div>
  );
  
};

export default BillList;
