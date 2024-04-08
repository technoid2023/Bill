// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { decrypt } from "../Auth/PrivateRoute";
// import toast from "react-hot-toast";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEdit,
//   faTrash,
//   faPlus,
//   faDownload,
//   faUpload,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   MDBInput,
//   MDBBtn,
//   MDBModal,
//   MDBModalBody,
//   MDBModalHeader,
//   MDBModalFooter,
// } from "mdb-react-ui-kit";
// import Load from "./Load";
// import { useNavigate } from "react-router-dom";
// import { CSVLink } from "react-csv";

// const Stock = () => {
//   const navigate = useNavigate();
//   const columns = [
//     {
//       name: "Item Code",
//       selector: (row) => row.item_cd,
//       sortable: true,
//     },
//     {
//       name: "Item Title",
//       selector: (row) => row.name,
//     },
//     {
//       name: "Category",
//       selector: (row) => row.category,
//     },
//     {
//       name: "Sub Category",
//       selector: (row) => row.subcategory,
//     },
//     {
//       name: "Source",
//       selector: (row) => row.source,
//       sortable: true,
//     },
//     {
//       name: "In Stock",
//       selector: (row) => row.qty,
//       sortable: true,
//     },
//     {
//       cell: (row) => (
//         <div>
//           <FontAwesomeIcon
//             icon={faEdit}
//             onClick={() => handleEdit(row)}
//             style={{ cursor: "pointer", marginRight: "10px" }}
//           />
//           <FontAwesomeIcon
//             icon={faTrash}
//             onClick={() => handleDelete(row)}
//             style={{ cursor: "pointer" }}
//           />
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];

//   const [data, setData] = useState([]);
//   const [records, setRecords] = useState(data);
//   const [importModal, setImportModal] = useState(false);
//   const [exportModal, setExportModal] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [downloading, setDownloading] = useState(false);

//   const fetchData = async () => {
//     let encryptToken = Cookies.get("_TK");
//     let Token;
//     if (encryptToken === undefined) {
//       return;
//     } else {
//       Token = decrypt(encryptToken);
//       Token = JSON.parse(Token);
//       console.log(Token);
//     }

//     try {
//       const response = await axios.get(
//         "https://edu-tech-bwe5.onrender.com/v1/item",
//         {
//           headers: {
//             token: Token,
//           },
//         }
//       );

//       if (response.data.Success === true) {
//         setData(response.data.Data);
//         setRecords(response.data.Data); // Ensure records are initialized with data
//       } else {
//         if (response.data.Message === "Session Time Out, Login Again !") {
//           toast.error(response.data.Message);
//           navigate("/");
//           Cookies.remove("_UR");
//           Cookies.remove("_TK");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to fetch data");
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   function handleFilter(event) {
//     const searchValue = event.target.value.toLowerCase();
//     if (searchValue === "") {
//       setRecords(data);
//     } else {
//       const newData = data.filter((row) => {
//         const concatenatedValues = Object.values(row).join(" ").toLowerCase();
//         return concatenatedValues.includes(searchValue);
//       });
//       setRecords(newData);
//     }
//   }

//   function handleEdit(row) {
//     console.log("Edit row:", row);
//     Cookies.set("uitem", JSON.stringify(row));
//     navigate("/dashboard/update-stock");
//   }

//   function handleDelete(row) {
//     console.log("Delete row:", row);
//   }
//   const handleFileUpload = async (file) => {
//     setUploading(true);
//     try {
//       fetchData();
//       toast.success("File uploaded successfully");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       toast.error("Failed to upload file");
//     } finally {
//       setUploading(false);
//       setImportModal(false);
//     }
//   };
//   const handleImport = () => {
//     setImportModal(true);
//   };

//   return (
//     <div className="container mt-2">
//       <h3
//         style={{
//           textAlign: "center",
//           fontFamily: "sans-serif",
//           color: "blue",
//           fontWeight: "bolder",
//         }}
//       >
//         Available Stock
//       </h3>
//       <div className="row mb-2">
//         <div className="col-md-6">
//           <MDBInput
//             label="Search Item"
//             size="lg"
//             onChange={handleFilter}
//             type="text"
//           />
//         </div>
//         <div className="col-md-6 d-flex justify-content-end ">
//           <MDBBtn color="success" onClick={handleImport} disabled={uploading}>
//             {" "}
//             {uploading ? "Importing..." : "Import"}{" "}

//             <FontAwesomeIcon icon={faDownload} />
//           </MDBBtn>{" "}
//           &nbsp;
//           <CSVLink
//             data={data}
//             filename={"stock_data.csv"}
//             className="btn btn-primary"
//             target="_blank"
//             onClick={fetchData}
//             disabled={uploading}
//           >
//             {uploading ? "Exporting..." : "Export"}{" "}
//             <FontAwesomeIcon icon={faUpload} />
//           </CSVLink>
//         </div>
//       </div>

//       {data.length > 0 ? (
//         <DataTable
//           columns={columns}
//           data={records}
//           pagination
//           highlightOnHover
//           customStyles={{
//             headRow: {
//               style: {
//                 backgroundColor: "black",
//                 color: "white",
//                 fontWeight: "bold",
//               },
//             },
//           }}
//         />
//       ) : (
//         <Load type="spinningBubbles" color="black" />
//       )}
//       {/* Import Modal */}
//       <MDBModal show={importModal} onHide={() => setImportModal(false)}>
//         <MDBModalHeader>Import CSV</MDBModalHeader>
//         <MDBModalBody>
//           <input
//             type="file"
//             onChange={(e) => handleFileUpload(e.target.files[0])}
//           />
//         </MDBModalBody>
//         <MDBModalFooter>
//           <MDBBtn color="secondary" onClick={() => setImportModal(false)}>
//             Close
//           </MDBBtn>
//         </MDBModalFooter>
//       </MDBModal>
//     </div>
//   );
// };

// export default Stock;

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
  faDownload,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Load from "./Load";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

const Stock = () => {
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
      name: "Source",
      selector: (row) => row.source,
      sortable: true,
    },
    {
      name: "In Stock",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      cell: (row) => (
        <div>
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
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fetchData = async () => {
    let encryptToken = Cookies.get("_TK");
    let Token;
    if (encryptToken === undefined) {
      return;
    } else {
      Token = decrypt(encryptToken);
      Token = JSON.parse(Token);
      console.log(Token);
    }

    try {
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
        if (response.data.Message === "Session Time Out, Login Again !") {
          toast.error(response.data.Message);
          navigate("/");
          Cookies.remove("_UR");
          Cookies.remove("_TK");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    Cookies.set("uitem", JSON.stringify(row));
    navigate("/dashboard/update-stock");
  }

  function handleDelete(row) {
    console.log("Delete row:", row);
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log("File:", file);
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    setUploading(true);
    const encryptToken = Cookies.get("_TK");
    if (!encryptToken) {
      console.error("Token not found");
      return;
    }
  
    try {
      const Token = JSON.parse(decrypt(encryptToken));
      console.log("Token:", Token);
  
      const formData = new FormData();
      formData.append("file", file); 
  
      const response = await axios.post(
        "https://edu-tech-bwe5.onrender.com/v1/item/add/csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: Token,
          },
        }
      );
  
      if (response.data.Success) {
        console.log(response.data.Message);
        toast.success("File uploaded successfully");
        fetchData();
      } else {
        toast.error(response.data.Message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
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
        Available Stock
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
        <div className="col-md-6 d-flex justify-content-end ">
          <label htmlFor="file-upload" className="btn btn-success">
            {uploading ? "Importing..." : "Import"}
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              disabled={uploading}
              key={uploading ? "uploading" : "not-uploading"} 
            />{" "}
            &nbsp;
            <FontAwesomeIcon icon={faDownload} />
          </label>
          &nbsp;
          <CSVLink
            data={data}
            filename={"stock_data.csv"}
            className="btn btn-primary"
            target="_blank"
            onClick={fetchData}
            disabled={uploading}
          >
            {downloading ? "Exporting..." : "Export"}
            &nbsp;
            <FontAwesomeIcon icon={faUpload} />
          </CSVLink>
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
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold",
              },
            },
          }}
        />
      ) : (
        <Load type="spinningBubbles" color="black" />
      )}
    </div>
  );
};

export default Stock;
