import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { decrypt } from "../Auth/PrivateRoute";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Load from "./Load";
import { useNavigate } from "react-router-dom";

const ItemList = () => {
  const navigate = useNavigate();
  const columns = [
    {
      name: "Item Code",
      selector: (row) => row.item_cd,
      sortable: true,
    },
    {
      name: "Item Title",
      selector: (row) => row.name,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Sub Category",
      selector: (row) => row.subcategory,
    },
    {
      name: "Cost Price",
      selector: (row) => row.CP,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => row.SP,
      sortable: true,
    },
    {
      cell: (row) => (
        <div>
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => handleView(row)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => handleEdit(row)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(row)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const [openView, setOpenView] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [newItem, setNewItem] = useState({
    item_cd: "",
    title: "",
    category: "",
    subcategory: "",
    CP: "",
    SP: "",
    source: "",
    item_des: "",
  });

  
  useEffect(() => {
    const fetchData = async () => {
      let encryptToken = Cookies.get("_TK");
      let Token;
      if (encryptToken === undefined) {
        return;
      } else {
        Token = decrypt(encryptToken);
        Token = JSON.parse(Token);
      }

      try {
        console.log("token",Token);
        const response = await axios.get(
          "https://edu-tech-bwe5.onrender.com/v1/item",
          {
            headers: {
              token: Token,
            },
          }
        );

        if (response.data.Success === true) {
          setData(response.data.Data);
          setRecords(response.data.Data); 
        } else {
          toast.error(response.data.Message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleAddItem = () => {
    const encryptToken = Cookies.get("_TK");
    if (!encryptToken) {
      console.error("Token not found.");
      return;
    }
    const decryptedToken = decrypt(encryptToken);
    const Token = JSON.parse(decryptedToken);

    const formData = {
      name: newItem.title,
      category: newItem.category,
      subcategory: newItem.subcategory,
      CP: newItem.CP,
      SP: newItem.SP,
      source: newItem.source,
      item_cd: newItem.item_cd,
      item_des: newItem.item_des 
    };
    if (!Object.values(formData).every(value => value)) {
      console.error("Some fields are empty.");
      toast.error("Please fill all the fields.");
      return;
    }
    axios.post('https://edu-tech-bwe5.onrender.com/v1/item', formData, {
      headers: {
        'token': Token
      }
    })
    .then(response => {
      console.log(response);
      if (response.data.Success === true) {
        toast.success(`Item added successfully`);
        handleCloseAdd();
      } else {
        toast.error('Failed to add item.');
      }
    })
    .catch(error => {
      console.error('An error occurred while adding the item:', error);
      toast.error("Failed to add item. Please try again later.");
    });
  };

  function handleFilter(event) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue === "") {
      setRecords(data);
    } else {
      const newData = data.filter((row) => {
        const concatenatedValues = Object.values(row).join(" ").toLowerCase();
        return concatenatedValues.includes(searchValue);
      });
      setRecords(newData);
    }
  }

  function handleEdit(row) {
    console.log("Edit row:", row);
    Cookies.set("item", JSON.stringify(row));
    navigate("/dashboard/update-item");

    // Set the selected row when edit button is clicked
  }

  function handleDelete(row) {
    console.log("Delete row:", row);
  }

  const handleView = (row) => {
    setItemDetails(row);
    setOpenView(true);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  return (
    <div className="container mt-2">
      <h3
        style={{
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "blue",
          fontWeight: "bolder",
        }}
      >
        Item List
      </h3>
      <div className="row mb-2">
        <div className="col-md-6">
          <MDBInput
            label="Search Item"
            size="lg"
            onChange={handleFilter}
            type="text"
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <MDBBtn color="primary" onClick={handleOpenAdd}>
            Add <FontAwesomeIcon icon={faPlus} />
          </MDBBtn>
        </div>
      </div>
      <MDBModal open={openAdd} setOpen={setOpenAdd} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Item</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleCloseAdd}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="mb-3">
                <strong htmlFor="item_cd" className="form-label">
                  Item Code
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="item_cd"
                  name="item_cd"
                  value={newItem.item_cd}
                  onChange={handleInputChange}
                  placeholder="Item Code"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="title" className="form-label">
                  Item Title
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  placeholder="Item Title"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="category" className="form-label">
                  Category
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="subcategory" className="form-label">
                  Sub Category
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="subcategory"
                  name="subcategory"
                  value={newItem.subcategory}
                  onChange={handleInputChange}
                  placeholder="Sub Category"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="CP" className="form-label">
                  Cost Price
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="CP"
                  name="CP"
                  value={newItem.CP}
                  onChange={handleInputChange}
                  placeholder="Cost Price"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="SP" className="form-label">
                  Selling Price
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="SP"
                  name="SP"
                  value={newItem.SP}
                  onChange={handleInputChange}
                  placeholder="Selling Price"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="source" className="form-label">
                  Source
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="source"
                  name="source"
                  value={newItem.source}
                  onChange={handleInputChange}
                  placeholder="Source"
                />
              </div>
              <div className="mb-3">
                <strong htmlFor="item_des" className="form-label">
                  Description
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="item_des"
                  name="item_des"
                  value={newItem.item_des}
                  onChange={handleInputChange}
                  placeholder="Description"
                />
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={handleCloseAdd}>
                Cancel
              </MDBBtn>
              <MDBBtn color="primary" onClick={handleAddItem}>
                Add Item
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal open={openView} setOpen={setOpenView} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Item Details</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setOpenView(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              {itemDetails && (
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Item Code:</strong>
                      </td>
                      <td>{itemDetails.item_cd}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Item Title:</strong>
                      </td>
                      <td>{itemDetails.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Category:</strong>
                      </td>
                      <td>{itemDetails.category}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Sub Category:</strong>
                      </td>
                      <td>{itemDetails.subcategory}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Cost Price:</strong>
                      </td>
                      <td>{itemDetails.CP}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Selling Price:</strong>
                      </td>
                      <td>{itemDetails.SP}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Source:</strong>
                      </td>
                      <td>{itemDetails.source}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Description:</strong>
                      </td>
                      <td>{itemDetails.item_des}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setOpenView(false)}>
                Close
              </MDBBtn>
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
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              },
            },
          }}
        />
      ) : (
        <Load type="spinningBubbles" color="grey" />
      )}
    </div>
  );
};

export default ItemList;
