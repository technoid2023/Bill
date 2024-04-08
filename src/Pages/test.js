import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import Load from './Load';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const Stock = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
        setRecords(response.data.Data);
      } else {
        if (response.data.Message === "Session Time Out, Login Again !") {
          toast.error(response.data.Message);
          navigate("/");
          Cookies.remove('_UR');
          Cookies.remove('_TK');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleFilter = (event) => {
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
  };

  const handleEdit = (row) => {
    Cookies.set('uitem', JSON.stringify(row));
    navigate('/dashboard/update-stock');
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('YOUR_UPLOAD_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': Cookies.get('_TK')
        }
      });

      console.log('File uploaded successfully:', response.data);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    }
  };

  return (
    <div className='container mt-2'>
      <h3 style={{ textAlign: 'center', fontFamily: 'sans-serif', color: 'blue', fontWeight: 'bolder' }}>Available Stock</h3>
      <div className='row mb-2'>
        <div className='col-md-6'>
          <MDBInput label='Search Item' size='lg' onChange={handleFilter} type='text' />
        </div>
        <div className='col-md-6 d-flex justify-content-end'>
          <input type='file' onChange={handleFileChange} style={{ display: 'none' }} ref={(fileInput) => (this.fileInput = fileInput)} />
          <MDBBtn color='primary' onClick={() => this.fileInput.click()}>Add <FontAwesomeIcon icon={faPlus} /></MDBBtn>
          <MDBBtn color='primary' onClick={handleFileUpload}>Upload</MDBBtn>
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
