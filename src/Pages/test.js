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
            <td><strong>CGST Amount:</strong></td>
            <td>{itemDetails.cgst_amt}</td>
          </tr>
          <tr>
            <td><strong>SGST Amount:</strong></td>
            <td>{itemDetails.sgst_amt}</td>
          </tr>
          <tr>
            <td><strong>IGST Amount:</strong></td>
            <td>{itemDetails.igst_amt}</td>
          </tr>
          <tr>
            <td><strong>CGST Value:</strong></td>
            <td>{itemDetails.cgst_per}%</td>
          </tr>
          <tr>
            <td><strong>SGST Value:</strong></td>
            <td>{itemDetails.sgst_per}%</td>
          </tr>
          <tr>
            <td><strong>IGST Value:</strong></td>
            <td>{itemDetails.igst_per}%</td>
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





import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { decrypt } from '../Auth/PrivateRoute';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFileArrowDown, faPlus, faRecycle } from '@fortawesome/free-solid-svg-icons';
const BillForm = () => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [quantity, setQuantity] = useState();
  const [chkQty, setChkQty] = useState();
  const [loading, setLoading] = useState(false);
  const [itemRate, setItemRate] = useState();
  const [token, setToken] = useState(null);
  const [cusName, setCusName] = useState();
  const [cusEmail, setCusEmail] = useState();
  const [cusMobile, setCusMobile] = useState();
  const [cusAddress, setCusAddress] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [dueDate, setDueDate] = useState();
  const [itemName, setItemName] = useState();
  const [igst, setIgst] = useState(18);
  const [cgst, setCgst] = useState(9); // State to hold CGST percentage value
  const [sgst, setSgst] = useState(9);
  useEffect(() => {
    const encryptToken = Cookies.get('_TK');

    if (encryptToken) {
      const decryptedToken = decrypt(encryptToken);

      setToken(JSON.parse(decryptedToken));
    }
  }, []);

  const handleAddItem = () => {
    if (selectedItem && quantity && itemRate) {
      if (parseInt(quantity) > parseInt(chkQty)) {
        toast.error(`Stock not available \n Available Stock ${chkQty}`);
        return;
      }
      const newItem = {
        item_cd: selectedItem,
        item_name: itemName,
        item_qty: quantity,
        item_rate: itemRate,
        amount: (itemRate * quantity),

      };
      setBillItems([...billItems, newItem]);
      setQuantity('');
      setItemName('');
      setSelectedItem('');
      setItemRate('');
      setDueDate('');
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...billItems];
    updatedItems.splice(index, 1);
    setBillItems(updatedItems);
  };

  const handleGenerateBill = () => {
    setLoading(true);
    const formData = {
      cus_name: cusName,
      cus_email: cusEmail,
      cus_mobile: cusMobile,
      cus_address: cusAddress,
      items: billItems,
      pay: isPaid,
      due_date: dueDate,
      tax_value: cgstAmount + sgstAmount+ igstAmount,
      cgst_per: cgst,
      sgst_per: sgst,
      cgst_amt: cgstAmount,
      sgst_amt: sgstAmount,
      igst_amt: igstAmount,
      igst_per: igst,
    };
    if (formData.cus_name && formData.cus_email && formData.cus_mobile && formData.cus_address && formData.items) {
      if (!isPaid && !dueDate) {
        toast.error("Due date is required if the bill is not paid.");
        setLoading(false);
        return;
      }
      axios.post('https://edu-tech-bwe5.onrender.com/v1/bill', formData, {
        headers: {
          'token': token
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.Success === true) {
            setLoading(false);
            toast.success(`Bill generated, Bill No:${response.data.Bill_no}`);

            clearForm();
            navigate('/dashboard/bill')
          } else {
            toast.error('Failed to generate bill.');
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('An error occurred while generating the bill:', error);
        });
    } else {
      setLoading(false);
      toast.error("Fill the form")
    }
  };

  const clearForm = () => {
    setSelectedItem('');
    setQuantity('');
    setItemRate('');
    setCusName('');
    setCusEmail('');
    setCusMobile('');
    setCusAddress('');
    setIsPaid(false);
    setBillItems([]);
    setDueDate('');
    setItemName('');


  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://edu-tech-bwe5.onrender.com/v1/item', {
          headers: {
            'token': token
          }
        });
        if (response.data.Success === true) {
          setItemList(response.data.Data);
          setFilteredItems(response.data.Data);
        } else if (response.data.Data === undefined) {
          setItemList(['Loading']);
        } else {
          console.log('Data not found');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredItems(itemList);
      return;
    }

    const filtered = itemList.filter(
      (item) =>
        item.item_cd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item.item_cd);
    setItemName(item.name);
    setItemRate(item.SP);
    setChkQty(item.qty);
  };

  let totalamount = billItems.reduce((total, item) => total + parseFloat(item.amount), 0)
  let cgstAmount = (totalamount * cgst) / 100;
  let sgstAmount = (totalamount * sgst) / 100;
  let igstAmount = (totalamount * igst) / 100; // Calculate IGST amount
  let grossamount = totalamount + cgstAmount + sgstAmount + igstAmount;
  return (
    <MDBContainer style={{ backgroundColor: 'white', overflowX: 'auto' }}>
      <MDBRow>
        <MDBCol>
          <h2 style={{ textAlign: 'center', fontFamily: 'sans-serif', color: 'blue', fontWeight: 'bolder' }}>Bill Entry Form</h2>
        </MDBCol>
      </MDBRow>

      {/* Customer Section */}
      <MDBRow className="mb-3">
        <MDBCol md='3'>
          <MDBInput
            type="text"
            label="Customer Name"
            value={cusName}
            onChange={(e) => setCusName(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>

        <MDBCol md='3'>
          <MDBInput
            type="email"
            label="Customer Email"
            value={cusEmail}
            onChange={(e) => setCusEmail(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>

        <MDBCol md='2'>
          <MDBInput
            type="tel"
            label="Customer Mobile"
            value={cusMobile}
            onChange={(e) => setCusMobile(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>

        <MDBCol md='4'>
          <MDBInput
            type="text"
            label="Customer Address"
            value={cusAddress}
            onChange={(e) => setCusAddress(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>

      </MDBRow>

      {/* Item Section */}
      <MDBRow className="mb-2">
        {/* Item Dropdown and Input Fields */}
        <MDBCol md='2'>
          <MDBDropdown style={{ width: '6rem' }}>
            <MDBDropdownToggle style={{ width: '8rem' }}>
              {selectedItem ? selectedItem : 'Select Item'}
            </MDBDropdownToggle >
            <MDBDropdownMenu>
              <MDBInput type="text" label="Search" onChange={(e) => handleSearch(e.target.value)} />
              {filteredItems.map((item, index) => (
                <MDBDropdownItem key={index} onClick={() => handleItemSelected(item)}>
                  {item.item_cd} - {item.name}
                </MDBDropdownItem>
              ))}
            </MDBDropdownMenu>
          </MDBDropdown><br></br>
        </MDBCol>
        {/* Other Input Fields */}
        <MDBCol md='2'>
          <MDBInput
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>

        <MDBCol md='2'>

          <MDBInput
            type="number"
            label="Item Rate"
            value={itemRate}
            onChange={(e) => setItemRate(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>

        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={handleAddItem} color='warning' style={{ color: 'black' }}><FontAwesomeIcon icon={faPlus} /> Add</MDBBtn>
        </MDBCol>
        {isPaid ? null : (
          <MDBCol md="4">
            <div className="d-flex align-items-center">
              <span className="me-4" style={{ minWidth: 'fit-content' }}>Due Date</span>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </MDBCol>
        )}
      </MDBRow>

      {/* Table Section */}
      <MDBRow>
        <MDBCol style={{ minWidth: 'fit-content' }}>
          <MDBTable style={{ overflow: 'auto' }}>
            <MDBTableHead style={{ backgroundColor: '#f8f9fa', fontSize: 'large' }}>
              <tr>
                <th>Item</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Item Rate</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {billItems.map((i, index) => (
                <tr key={index}>
                  <td>{i.item_cd}</td>
                  <td>{i.item_name}</td>
                  <td>{i.item_qty}</td>
                  <td>{i.item_rate}</td>
                  <td>{i.amount}</td>
                  <td>
                    <Link><FontAwesomeIcon size='1x' style={{ color: 'red' }} icon={faTrash} onClick={() => handleDeleteItem(index)} /></Link>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="totalamount" className="form-label">
            Total Amount:
          </label>
        </MDBCol>
        <MDBCol md="3">
          <input
            type="text"
            id="totalamount"
            className="form-control"
            value={totalamount.toFixed(2)}
            disabled
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="cgst" className="form-label">
            CGST (%):
          </label>
        </MDBCol>
        <MDBCol md="1">
          <input
            type="number"
            id="cgst"
            className="form-control"
            value={cgst}
            onChange={(e) => {
              setCgst(parseFloat(e.target.value));
            }}
          />
        </MDBCol>
        <MDBCol md="2">
          <input
            type="text"
            id="cgstAmount"
            className="form-control"
            value={cgstAmount}
            disabled
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="sgst" className="form-label">
            SGST (%):
          </label>
        </MDBCol>
        <MDBCol md="1">
          <input
            type="number"
            id="sgst"
            className="form-control"
            value={sgst}
            onChange={(e) => {
              setSgst(parseFloat(e.target.value));
            }}
          />
        </MDBCol>
        <MDBCol md="2">
          <input
            type="text"
            id="sgstAmount"
            className="form-control"
            value={sgstAmount}
            disabled
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="igst" className="form-label">
            IGST (%):
          </label>
        </MDBCol>
        <MDBCol md="1">
          <input
            type="number"
            id="igst"
            className="form-control"
            value={igst}
            onChange={(e) => {
              setIgst(parseFloat(e.target.value));
            }}
          />
        </MDBCol>
        <MDBCol md="2">
          <input
            type="text"
            id="igstAmount"
            className="form-control"
            value={igstAmount}
            disabled
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="grossamount" className="form-label">
            Gross Amount:
          </label>
        </MDBCol>
        <MDBCol md="3">
          <input
            type="text"
            id="grossamount"
            className="form-control"
            value={grossamount.toFixed(2)}
            disabled
          />
        </MDBCol>
      </MDBRow>



      {/* Checkbox Section */}
      <MDBRow className="mb-3">
        <MDBCol>
          <MDBCheckbox
            id="isPaid"
            label="Paid"
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <div className="text-center">
            <MDBBtn onClick={handleGenerateBill} style={{ marginRight: '1rem' }} color='success'>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>

                  Generating...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFileArrowDown} />
                  &nbsp;
                  Generate
                </>
              )}
            </MDBBtn>

            <MDBBtn onClick={clearForm} color='danger'><FontAwesomeIcon icon={faRecycle} /> Clear</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>



    </MDBContainer>
  );
};

export default BillForm;
