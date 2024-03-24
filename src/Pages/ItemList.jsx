import React from 'react';
import DataTable from '../Components/Layout/Datatable';

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
];

const data = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'John Doe', age: 30 },
  { id: 4, name: 'Jane Smith', age: 25 }, { id: 5, name: 'John Doe', age: 30 },
  { id: 6, name: 'fefe Smith', age: 25 },
  { id: 7, name: 'John Doe', age: 30 },
  { id: 8, name: 'Jane Smith', age: 25 },
  { id: 9, name: 'John Doe', age: 30 },
  { id: 10, name: 'Jane Smith', age: 25 }, { id: 11, name: 'John Doe', age: 30 },
  { id: 12, name: 'Jane Smith', age: 25 }, { id: 13, name: 'John Doe', age: 30 },
  { id: 14, name: 'Jane Smith', age: 25 }, { id: 15, name: 'John Doe', age: 30 },
  { id: 16, name: 'Jane Smith', age: 25 }, { id: 17, name: 'John Doe', age: 30 },
  { id: 18, name: 'Jane Smith', age: 25 }, { id: 19, name: 'John Doe', age: 30 },
  { id: 20, name: 'Jane Smith', age: 25 }, { id: 21, name: 'John Doe', age: 30 },
  { id: 22, name: 'Jane Smith', age: 25 }, { id: 23, name: 'John Doe', age: 30 },
  { id: 24, name: 'Jane Smith', age: 25 },
  // Add more data here
];

const ItemList = () => {
  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default ItemList;
