
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { decrypt } from '../Auth/PrivateRoute';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBDropdown,MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,faFileArrowDown,faPlus,faRecycle} from '@fortawesome/free-solid-svg-icons';
const BillForm = () => {
  const navigate=useNavigate();
  const [itemList, setItemList] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [quantity, setQuantity] = useState();
  const [chkQty, setChkQty] = useState();
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
  useEffect(() => {
    const encryptToken = Cookies.get('_TK');

    if ( encryptToken) {
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
        amount:(itemRate*quantity),
       
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
    const formData = {
      cus_name: cusName,
      cus_email: cusEmail,
      cus_mobile: cusMobile,
      cus_address: cusAddress,
      items: billItems,
      pay: isPaid ,
      due_date: dueDate
    };
    if (formData.cus_name && formData.cus_email && formData.cus_mobile && formData.cus_address && formData.items) {
      axios.post('https://edu-tech-bwe5.onrender.com/v1/bill', formData, {
        headers: {
          'token': token
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.Success === true) {
          toast.success(`Bill generated, Bill No:${response.data.Bill_no}`);

          clearForm();
          navigate('/dashboard/bill')
        } else {
          toast.error('Failed to generate bill.');
        }
      })
      .catch(error => {
        console.error('An error occurred while generating the bill:', error);
      });
    } else {
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
  const handleIsPaidChange = () => {
    if (!isPaid) {
      setDueDate(); // Reset dueDate to null if isPaid is unchecked
    }
  };
  return (
    <MDBContainer style={{ backgroundColor: 'white', overflowX: 'auto' }}>
      <MDBRow>
        <MDBCol>
          <h2 style={{textAlign:'center', fontFamily:'sans-serif', color:'blue', fontWeight:'bolder'}}>Bill Entry Form</h2>
        </MDBCol>
      </MDBRow>

      {/* Customer Section */}
      <MDBRow className="mb-3">
        <MDBCol md='3'>
          <MDBInput
            type="text"
            label="Name(Customer)"
            value={cusName}
            onChange={(e) => setCusName(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>
     
        <MDBCol md='3'>
          <MDBInput
            type="email"
            label="Email(Customer)"
            value={cusEmail}
            onChange={(e) => setCusEmail(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>
       
        <MDBCol md='2'>
          <MDBInput
            type="tel"
            label="Mobile(Customer)"
            value={cusMobile}
            onChange={(e) => setCusMobile(e.target.value)}
            style={{ width: '100%' }}
          /><br></br>
        </MDBCol>
       
        <MDBCol md='4'>
          <MDBInput
            type="text"
            label="Address(Customer)"
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
              <MDBInput type="text" label="Search" onChange={(e) => handleSearch(e.target.value)}  />
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
          <MDBBtn onClick={handleAddItem} color='warning' style={{color:'black'}}><FontAwesomeIcon icon={faPlus}/> Add</MDBBtn>
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
        <MDBCol style={{minWidth:'fit-content'}}>
          <MDBTable style={{overflow:'auto'}}>
            <MDBTableHead style={{ backgroundColor: '#f8f9fa',fontSize:'large'}}>
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
                   <Link><FontAwesomeIcon size='1x' style={{color:'red'}} icon={faTrash} onClick={() => handleDeleteItem(index)}/></Link> 
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
      </MDBRow>

      {/* Checkbox Section */}
      <MDBRow className="mb-3">
        <MDBCol>
          <MDBCheckbox
            id="isPaid"
            label="Is Paid"
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-center">
  <MDBCol md="6">
    <div className="text-center">
      <MDBBtn onClick={handleGenerateBill} style={{marginRight:'1rem'}} color='success'><FontAwesomeIcon icon={faFileArrowDown}/> Generate Bill</MDBBtn>
      <MDBBtn onClick={clearForm} color='danger'><FontAwesomeIcon icon={faRecycle}/> Clear</MDBBtn>
    </div>
  </MDBCol>
</MDBRow>



    </MDBContainer>
  );
};

export default BillForm;
