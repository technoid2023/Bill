import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import { decrypt } from '../Auth/PrivateRoute';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCheckbox } from 'mdb-react-ui-kit';

const BillForm = () => {
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
        item_qty: quantity,
        item_rate: itemRate,
        amount:(itemRate*quantity)
      };
      setBillItems([...billItems, newItem]);
      setQuantity('');
      setSelectedItem('');
      setItemRate('');
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
      pay: isPaid 
    };
    if (formData.cus_name && formData.cus_email && formData.cus_mobile && formData.cus_address && formData.items) {
      axios.post('https://edu-tech-bwe5.onrender.com/v1/bill', formData, {
        headers: {
          'token': token
        }
      })
      .then(response => {
        if (response.status === 200) {
          toast.success('Bill generated successfully!');
          clearForm();
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
    setItemRate(item.SP);
    setChkQty(item.qty);
  };

  return (
    <MDBContainer style={{ backgroundColor: 'azure', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
      <MDBRow>
        <MDBCol>
          <h2 style={{textAlign:'center', fontFamily:'sans-serif', color:'blue', fontWeight:'bolder'}}>Bill Entry Form</h2>
        </MDBCol>
      </MDBRow>

      {/* Customer Section */}
      <MDBRow className="mb-3">
        <MDBCol>
          <MDBInput
            type="text"
            label="Customer Name"
            value={cusName}
            onChange={(e) => setCusName(e.target.value)}
            style={{ width: '100%' }}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="email"
            label="Customer Email"
            value={cusEmail}
            onChange={(e) => setCusEmail(e.target.value)}
            style={{ width: '100%' }}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="tel"
            label="Customer Mobile"
            value={cusMobile}
            onChange={(e) => setCusMobile(e.target.value)}
            style={{ width: '100%' }}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            type="text"
            label="Customer Address"
            value={cusAddress}
            onChange={(e) => setCusAddress(e.target.value)}
            style={{ width: '100%' }}
          />
        </MDBCol>
      </MDBRow>

      {/* Item Section */}
      <MDBRow className="mb-4">
        {/* Item Dropdown and Input Fields */}
        <MDBCol>
          <MDBDropdown>
            <MDBDropdownToggle style={{ width: '13rem' }}>
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
          </MDBDropdown>
        </MDBCol>
        {/* Other Input Fields */}
        <MDBCol className="mb-4">
          <MDBInput
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '100%' }}
          />
        </MDBCol>
        <MDBCol>
          
          <MDBInput
            type="number"
            label="Item Rate"
            value={itemRate}
            onChange={(e) => setItemRate(e.target.value)}
            style={{ width: '100%' }}
          />
          
        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={handleAddItem}>Add</MDBBtn>
        </MDBCol>
      </MDBRow>

      {/* Table Section */}
      <MDBRow>
        <MDBCol>
          <MDBTable>
            <MDBTableHead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Item Rate</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {billItems.map((i, index) => (
                <tr key={index}>
                  <td>{i.item_cd}</td>
                  <td>{i.item_qty}</td>
                  <td>{i.item_rate}</td>
                  <td>{i.amount}</td>
                  <td>
                    <MDBBtn onClick={() => handleDeleteItem(index)}>Delete</MDBBtn>
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

      {/* Generate Bill Button */}
      <MDBRow className="mb-4">
        <MDBCol>
          <MDBBtn onClick={handleGenerateBill}>Generate Bill</MDBBtn>
        </MDBCol>
        <MDBCol>
          <MDBBtn onClick={clearForm}>Clear</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default BillForm;
