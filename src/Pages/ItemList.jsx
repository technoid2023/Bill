// import axios from 'axios';
// import Cookies from 'js-cookie';
// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { decrypt } from '../Auth/PrivateRoute';
// import toast from 'react-hot-toast';

// const ItemList = () => {
//   const columns=[
//     {
//       name:'Item Code',
//       selector:row=>row.item_cd,
//       sortable:true
//     },
//     {
//       name:'Item Title',
//       selector:row=>row.name
//     },
//     {
//       name:'Category',
//       selector:row=>row.category
//     },
//     {
//       name:'Sub Category',
//       selector:row=>row.subcategory
//     },
//     {
//       name:'Cost Price',
//       selector:row=>row.CP,
//       sortable:true
//     },
//     {
//       name:'Saling Price',
//       selector:row=>row.SP,
//       sortable:true
//     }
//   ]
//   const [data, setData] = useState([]);
//   const [records,setRecords]=useState(data);
//   useEffect(() => {
//     const fetchData = async () => {
//       let encryptToken = Cookies.get('_TK');
//     let Token;
//     if (encryptToken === undefined) {
//         return;
//     } else {
//         Token = decrypt(encryptToken);
//         Token = JSON.parse(Token);
//     }
//     console.log(Token);
//       try {
//         axios.get('http://192.168.0.104:8111/v1/item', {
//           headers: {
//             'token': Token
//           }
//         })
//         .then(res => {
//           console.log(res);
//           if (res.data.Success === true) {
//             setData(res.data.Data);
//           } else {
//             toast.error(res.data.Message);
//           }
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
        
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Failed to fetch data');
//       }
//     };
    
//     fetchData();
//   }, []);
// function handleFilter(event){
//   const newData=data.filter(row=>{
//     return row.name.toLowerCase().includes(event.target.value.toLowerCase())
//   })
// setRecords(newData)
// }

//   return (
//     <div className='container mt-5'>
//       <div className='text-end'><input type='text' onChange={handleFilter()}/></div>
//       {data.length > 0 ? (
//         <DataTable
//           columns={columns}
//           data={records}
//           pagination
//           highlightOnHover
//           selectableRows
          
//         />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ItemList;


import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { decrypt } from '../Auth/PrivateRoute';
import toast from 'react-hot-toast';

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
        const response = await axios.get('http://192.168.0.104:8111/v1/item', {
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
      setRecords(data); // Set records back to the original data when input value is empty
    } else {
      const newData = data.filter(row => {
        // Concatenate all field values and convert to lowercase for case-insensitive search
        const concatenatedValues = Object.values(row).join(' ').toLowerCase();
        return concatenatedValues.includes(searchValue);
      });
      setRecords(newData);
    }
  }
  
  
  

  return (
    <div className='container mt-5'>
      <div className='text-end'>
        <input type='text' onChange={handleFilter} /> {/* Fixed event binding */}
      </div>
      {data.length > 0 ? (
        <DataTable
          columns={columns}
          data={records}
          pagination
          highlightOnHover
          selectableRows
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ItemList;
