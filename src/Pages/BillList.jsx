import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { decrypt } from '../Auth/PrivateRoute';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBInput, MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

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
      name: 'Paid',
      selector: row => row.pay ? "Yes" : "No",
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
      cell: row => (
        <div>
          <FontAwesomeIcon icon={faEye} onClick={() => handleView(row)} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row)} style={{ cursor: 'pointer' }} />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [openView, setOpenView] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);

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
    console.log('Edit row:', row);
  }

  function handleDelete(row) {
    console.log('Delete row:', row);
  }

  const handleView = (row) => {
    setItemDetails(row);
    console.log(row);
    setOpenView(true);
  };

  return (
    <div className='container mt-2'>
      <div className='row mb-2'>
        <div className='col-md-6'>
          <MDBInput label='Search Item' size='lg' onChange={handleFilter} type='text' />
        </div>
        <div className='col-md-6 d-flex justify-content-end'>
          <MDBBtn color='primary'>Add <FontAwesomeIcon icon={faPlus} /></MDBBtn>
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BillList;
