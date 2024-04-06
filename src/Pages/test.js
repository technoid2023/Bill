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
  const [gstRate, setGstRate] = useState(18); // New state for GST rate
  const [isIgstChecked, setIsIgstChecked] = useState(false); // Checkbox state for IGST

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
      tax_value: calculateTaxValue(),
      cgst_per: isIgstChecked ? 0 : gstRate / 2, // CGST percentage
      sgst_per: isIgstChecked ? 0 : gstRate / 2, // SGST percentage
      cgst_amt: calculateCgstAmount(), // CGST amount
      sgst_amt: calculateSgstAmount(), // SGST amount
      igst_amt: calculateIgstAmount(), // IGST amount
      igst_per: isIgstChecked ? gstRate : 0, // IGST percentage
    };
    if (formData.cus_name && formData.cus_email && formData.cus_mobile && formData.cus_address && formData.items) {
      if (!isPaid && !dueDate) {
        toast.error("Due date is required if the bill is not paid.");
        setLoading(false);
        return;
      }
      axios.post('http://127.0.0.1:8111/v1/bill', formData, {
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

  // Calculate total amount
  let totalamount = billItems.reduce((total, item) => total + parseFloat(item.amount), 0);

  // Calculate CGST amount based on GST rate
  const calculateCgstAmount = () => {
    return isIgstChecked ? 0 : (totalamount * gstRate) / 200;
  };

  // Calculate SGST amount based on GST rate
  const calculateSgstAmount = () => {
    return isIgstChecked ? 0 : (totalamount * gstRate) / 200;
  };

  // Calculate IGST amount based on GST rate
  const calculateIgstAmount = () => {
    return isIgstChecked ? (totalamount * gstRate) / 100 : 0;
  };

  // Calculate gross amount
  let grossamount = totalamount + calculateCgstAmount() + calculateSgstAmount() + calculateIgstAmount();

  // Calculate tax value
  const calculateTaxValue = () => {
    return calculateCgstAmount() + calculateSgstAmount() + calculateIgstAmount();
  };

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
          {/* Existing JSX code */}
        </MDBCol>
      </MDBRow>
  
      {/* GST Rate Section */}
      <MDBRow className="justify-content-end">
        <MDBCol md="2">
          <label htmlFor="gstRate" className="form-label">
            GST Rate (%):
          </label>
        </MDBCol>
        <MDBCol md="2">
          {/* New JSX for GST Rate input */}
        </MDBCol>
      </MDBRow>
  
      {/* IGST Checkbox */}
      <MDBRow className="mb-3">
        <MDBCol>
          {/* New JSX for IGST Checkbox */}
        </MDBCol>
      </MDBRow>
  
      {/* Amount Sections */}
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
            disabled
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
  
      {!isIgstChecked && (
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
              disabled
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
      )}
      
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
          {/* Gross amount input */}
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
