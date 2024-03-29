import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { decrypt } from '../Auth/PrivateRoute';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBInput, MDBBtn} from 'mdb-react-ui-kit';
import Load from './Load';
import { useNavigate } from 'react-router-dom';

const Stock = () => {
  const navigate=useNavigate()
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
      name: 'Source',
      selector: row => row.source,
      sortable: true
    },
    {
      name: 'In Stock',
      selector: row => row.qty,
      sortable: true
    },
    {
      cell: row => (
        <div>
          
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
    Cookies.set('item',JSON.stringify(row))
    navigate('/dashboard/update-stock')
  }

  function handleDelete(row) {
    console.log('Delete row:', row);
  }


  return (
    <div className='container mt-2'>
       <h3 style={{textAlign:'center', fontFamily:'sans-serif', color:'blue', fontWeight:'bolder'}}>Available Stock</h3>
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
       
       <Load type='spinningBubbles' color='black' />
    
       
      )}
    </div>
  );
};

export default Stock;
