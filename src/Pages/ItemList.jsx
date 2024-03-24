import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { decrypt } from '../Auth/PrivateRoute';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';  // Assuming MDBBtn is the button component from MDBReactUiKit

const ItemList = () => {
  const columns = [
    {
      name: 'Item Code',
      selector: row => row.item_cd,
      sortable: true
    },
    {
      name: 'Item Title',
      selector: row => row.name
    },
    {
      name: 'Category',
      selector: row => row.category
    },
    {
      name: 'Sub Category',
      selector: row => row.subcategory
    },
    {
      name: 'Cost Price',
      selector: row => row.CP,
      sortable: true
    },
    {
      name: 'Selling Price',
      selector: row => row.SP,
      sortable: true
    },
    {
      
      cell: row => (
        <div>
          <FontAwesomeIcon icon={faEye} onClick={() => handleEdit(row)} style={{ cursor: 'pointer', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faEdit} onClick={() => handleDelete(row)} style={{ cursor: 'pointer',marginRight: '10px' }} />
        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(row)} style={{ cursor: 'pointer' }} />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];
// let api=[
//   {
//       "_id": "65f973b1367950e6e32f6e49",
//       "name": "Emami Mustard Oi",
//       "category": "Oil",
//       "subcategory": "Mustard Oil",
//       "CP": 150,
//       "SP": 120,
//       "item_cd": "EM01",
//       "source": "Emami",
//       "item_des": "Oil",
//       "qty": 18
//   },
//   {
//       "_id": "65fab8fbd548a8fe7586aea4",
//       "name": "Basmati Rice",
//       "category": "Grocery",
//       "subcategory": "Rice",
//       "CP": 230,
//       "SP": 200,
//       "item_cd": "BR01",
//       "source": "AK Rice",
//       "item_des": "Rice",
//       "qty": 20
//   },
//   {
//       "_id": "65fab901d548a8fe7586aea7",
//       "name": "Basmati Rice",
//       "category": "Grocery",
//       "subcategory": "Rice",
//       "CP": 250,
//       "SP": 220,
//       "item_cd": "BR02",
//       "source": "BR Rice",
//       "item_des": "RIce",
//       "qty": 15
//   },
//   {
//       "_id": "65fab906d548a8fe7586aeaa",
//       "name": "Masoor Dal",
//       "category": "Grocery",
//       "subcategory": "Dal",
//       "CP": 150,
//       "SP": 110,
//       "item_cd": "MD01",
//       "source": "Nabaratna",
//       "item_des": "Dal",
//       "qty": 45
//   },
//   {
//       "_id": "65fab90cd548a8fe7586aead",
//       "name": "Maida",
//       "category": "Grocery",
//       "subcategory": "Maida",
//       "CP": 45,
//       "SP": 35,
//       "item_cd": "MD02",
//       "source": "Fortune",
//       "item_des": "Maida",
//       "qty": 28
//   },
//   {
//       "_id": "65fab911d548a8fe7586aeb0",
//       "name": "Chakki Ata",
//       "category": "Grocery",
//       "subcategory": "Ata",
//       "CP": 45,
//       "SP": 35,
//       "item_cd": "CA01",
//       "source": "Ganesh",
//       "item_des": "Ata",
//       "qty": 39
//   }
// ]
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);

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
        const response = await axios.get('https://edu-tech-bwe5.onrender.com/v1/item', {
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

export default ItemList;
