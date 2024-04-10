// //aa
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBCard,
//   MDBCardBody,
//   MDBRow,
//   MDBCol,
//   MDBInput,
// } from "mdb-react-ui-kit";

// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Layout from "../Components/Layout/Layout";
// import Cookies from "js-cookie";
// import { encrypt } from "../Auth/PrivateRoute";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash, faRotate } from "@fortawesome/free-solid-svg-icons";

// import image from "../Assests/bill_login.jpg";
// import Registration from "./Registration";


// const generateRandomCode = () => {
//   let code = "";
//   for (let i = 0; i < 4; i++) {
//     code += Math.floor(Math.random() * 10); // Generate random digit (0-9)
//   }
//   return code;
// };

// function UserLogin() {



//   const navigate = useNavigate();
//   // State to manage form inputs
//   const [showRegistrationModal, setShowRegistrationModal] = useState(false);
//   const [formData, setFormData] = useState({
//     userId: "",
//     password: "",
//     showPassword: false, // state to manage password visibility
//   });
//   const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
//   // const [userInput, setUserInput] = useState("");
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); 
//   // Update form data when inputs change
//   const toggleRegistrationModal = () => {
//     setShowRegistrationModal(!showRegistrationModal);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     checkFormValidity(); // Check form validity on input change
//   };

//   // Check form validity
//   const checkFormValidity = () => {
//     // Check if user ID, password, and captcha are filled
//     const isUserIdValid = formData.userId.trim() !== "";
//     const isPasswordValid = formData.password.trim() !== "";

//     setIsFormValid(isUserIdValid && isPasswordValid);
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setFormData({
//       ...formData,
//       showPassword: !formData.showPassword,
//     });
//   };

//   const regenerateCaptcha = () => {
//     // setUserInput("");
//     setCaptchaCode(generateRandomCode());
//     setIsCorrect(false);
//   };

//   const handleCaptchaSubmit = (e) => {
//     const input = e.target.value;
//     // setUserInput(input);
//     if (input === captchaCode) {
//       setIsCorrect(true);
//     } else {
//       setIsCorrect(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     if (isCorrect) {
//       if (formData.userId !== "" && formData.password !== "") {
//         axios
//           .post("https://edu-tech-bwe5.onrender.com/v1/login", {
//             email: formData.userId,
//             password: formData.password,
//           })
//           .then((response) => {
            
//             console.log("tested");
//             let data = response.data;
//             console.log(data);
//             if (data.Success === true) {
//               let rawToken = data.Token;
//               let encryptToken = encrypt(JSON.stringify(rawToken));
//               Cookies.set("_TK", encryptToken, { expires: 1 });
//               let userData = data.Data[0];
//               let encryptUser = encrypt(JSON.stringify(userData));
//               Cookies.set("_UR", encryptUser, { expires: 1 });
//               // toast.success(`Welcome Back ${userData.name}`);
//               regenerateCaptcha();
              
//               // Call the background API
              
//               const backgroundAPICall = axios.get("https://edu-tech-bwe5.onrender.com/v1/store", {headers: {
//                 'token': rawToken}
//               });
  
//               // Redirect to dashboard after both API calls are completed
//               Promise.all([backgroundAPICall]).then((responses) => {
//                 // Save background API result to cookies\
//                 console.log(responses[0].data);
//                 const backgroundData = (responses[0].data.Success)===true? responses[0].data.Data[0]:'';
//                 Cookies.set("_ST", JSON.stringify(backgroundData));
//                 setIsLoading(false);
//                 toast.success(`Welcome Back ${userData.name}`);
//                 // Redirect to dashboard
//                 setTimeout(() => {
//                   navigate("/dashboard");
//                 }, 100);
//               });
//             } else {
//               toast.error("Invalid User Credentials !");
//               regenerateCaptcha();
//               setIsLoading(false);
//             }
//           })
//           .catch((error) => {
//             setIsLoading(false);
//             toast.error("Bad Credentials !");
//             console.error("Error fetching data:", error);
//             if (error.response) {
//               console.error(
//                 "Server responded with status:",
//                 error.response.status
//               );
//               console.error("Response data:", error.response.data);
//             }
//           });
//       } else {
//         toast.error("Give Login Credentials ");
//         setIsLoading(false);
//       }
//     } else {
//       toast.error("Wrong Captcha !!");
//       setIsLoading(false);
//       regenerateCaptcha();
//     }
//   };
  
  

//   return (
//     <Layout>
//       <MDBContainer className="my-3">
//         <Toaster position="top-center" reverseOrder={false} />
//         {showRegistrationModal && (
//   <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
//     <div className="modal-dialog modal-dialog-centered modal-xl" role="document"> {/* Added modal-xl class for extra large modal */}
//       <div className="modal-content" style={{ width: "100%", height: "100%" }}> {/* Set width and height to 100% */}
//         <div className="modal-header">
//           <h5 className="modal-title">Register</h5>
//           <button type="button" className="btn-close" onClick={toggleRegistrationModal}></button>
//         </div>
//         <div className="modal-body">
//           <Registration /> {/* Render the Registration component inside the modal */}
//         </div>
//       </div>
//     </div>
//   </div>
// )}


//         <MDBCard
//           className="mt-1"
//           style={{
//             borderRadius: "10px",
//             boxShadow:
//               "rgba(0, 0, 0, 0.6) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(0, 0, 0, 0.4) 0px -2px 6px 0px inset",
//             backgroundImage: `url(${image})`,
//             backgroundSize: "cover",
//             minHeight:'42rem'
            
//           }}
//         >
//           <MDBRow className="g-0">
//             <MDBCol md="6">
//               <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                

                

//                 <form onSubmit={handleSubmit} style={{marginTop:'10rem', marginRight:'8rem'}}>
//                   <MDBInput
//                     wrapperClass="mb-4"
//                     label="Email ID"
//                     id="userId"
//                     type="text"
//                     size="lg"
//                     name="userId"
//                     onChange={handleInputChange}
//                     value={formData.userId}
//                     style={{ color: "goldenrod" }}
//                     onPaste={(e) => {
//                       e.preventDefault();
//                       toast.error("Pasting is disabled.");
//                     }}
//                   />
//                   <div className="position-relative">
//                     <MDBInput
//                       wrapperClass="mb-4"
//                       label="Password"
//                       id="password"
                    
//                       type={formData.showPassword ? "text" : "password"}
//                       size="lg"
//                       name="password"
//                       onChange={handleInputChange}
//                       value={formData.password}
//                       style={{ color: "black" }}
//                       onPaste={(e) => {
//                         e.preventDefault();
//                         toast.error("Pasting is disabled.");
//                       }}
//                     />
//                     <FontAwesomeIcon
//                       icon={formData.showPassword ? faEye : faEyeSlash}
//                       onClick={togglePasswordVisibility}
//                       className="position-absolute end-0 top-50 translate-middle-y me-3"
//                       style={{ cursor: "pointer" }}
//                     />
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div
//                         style={{
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         <input
//                           disabled
//                           value={captchaCode}
//                           style={{
//                             backgroundColor: "white",
//                             color: "grey",
//                             width: "80px",
//                             border: "none",
//                             fontSize: "24px",
//                             letterSpacing: "5px",
//                             textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
//                             position: "relative",
//                             zIndex: "1",
//                           }}
//                           onCopy={(e) => e.preventDefault()}
//                         />
//                         <span
//                           style={{
//                             position: "absolute",
//                             left: 0,
//                             top: "50%",
//                             width: "100%",
//                             height: "3px",
//                             backgroundColor: "green",
//                             transform: "rotate(-155deg)",
//                             zIndex: "4",
//                           }}
//                         ></span>
//                         <span
//                           style={{
//                             position: "absolute",
//                             left: 0,
//                             top: "50%",
//                             width: "100%",
//                             height: "5px",
//                             backgroundColor: "red",
//                             transform: "rotate(-0deg)",
//                             zIndex: "4",
//                           }}
//                         ></span>
//                         <span
//                           style={{
//                             position: "absolute",
//                             left: 0,
//                             top: "50%",
//                             width: "100%",
//                             height: "3px",
//                             backgroundColor: "blue",
//                             transform: "rotate(-25deg)",
//                             zIndex: "4",
//                           }}
//                         ></span>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={regenerateCaptcha}
//                         style={{
//                           backgroundColor: "transparent",
//                           border: "none",
//                           cursor: "pointer",
//                         }}
//                       >
//                         <FontAwesomeIcon
//                           icon={faRotate}
//                           size="2x"
//                           style={{ color: "green", marginLeft: "8px" }}
//                         />
//                       </button>
//                       <form style={{ marginTop: "5px" }}>
//                         <MDBInput
//                           wrapperClass="mb-2"
//                           label="Enter Captcha"
//                           id="captcha"
//                           type="text"
//                           size="lg"
                          
//                           onChange={handleCaptchaSubmit}
//                           style={{ color: "black", fontWeight: "bolder" }}
//                           onPaste={(e) => {
//                             e.preventDefault();
//                             toast.error("Pasting is disabled.");
//                           }}
//                         />
//                       </form>
//                     </div>
//                   </div>
//                   <div>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <span>
//                       <MDBBtn
//               className="mb-1 px-5"
//               color="success"
//               size="lg"
//               type="submit"
//               disabled={!isFormValid || isLoading} // Disable button when loading
//               style={{ marginRight: "5rem", marginTop: "1rem" }}
//             >
//               {isLoading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : "Login"}
//             </MDBBtn>
//                       </span>
//                       <span style={{ marginLeft: "1px", color: "white" }}>
//         <span
//           className="small mb-1"
//           onClick={toggleRegistrationModal} // Open the registration modal when clicked
//           style={{
//             color: "red",
//             fontWeight: "bold",
//             marginTop: "2px",
//             cursor: "pointer", // Add cursor pointer to indicate it's clickable
//           }}
//         >
//         <MDBBtn type="button"> Sign UP</MDBBtn>
          
//         </span>
//       </span>
//                     </div>
//                   </div>
//                 </form>

//                 <Link
//                   className="small "
//                   to="/reset"
//                   style={{
//                     color: "sandybrown",
//                     fontWeight: "bold",
//                     marginRight: "12rem"
//                   }}
//                 >
//                   Forgot password?
//                 </Link>
//               </MDBCardBody>
//             </MDBCol>
//           </MDBRow>
//         </MDBCard>
//       </MDBContainer>
//     </Layout>
//   );
// }

// export default UserLogin;



//aa
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput
} from "mdb-react-ui-kit";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../Components/Layout/Layout";
import Cookies from "js-cookie";
import { encrypt } from "../Auth/PrivateRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRotate } from "@fortawesome/free-solid-svg-icons";
import image from "../Assests/bill.gif";
import Registration from "./Registration";
import './Login.css';
import image2 from '../Assests/login3.jpg'
const generateRandomCode = () => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10); // Generate random digit (0-9)
  }
  return code;
};

function UserLogin() {



  const navigate = useNavigate();
  // State to manage form inputs
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    showPassword: false, // state to manage password visibility
  });
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  // const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  // Update form data when inputs change
  const toggleRegistrationModal = () => {
    setShowRegistrationModal(!showRegistrationModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    checkFormValidity(); // Check form validity on input change
  };

  // Check form validity
  const checkFormValidity = () => {
    // Check if user ID, password, and captcha are filled
    const isUserIdValid = formData.userId.trim() !== "";
    const isPasswordValid = formData.password.trim() !== "";

    setIsFormValid(isUserIdValid && isPasswordValid);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const regenerateCaptcha = () => {
    // setUserInput("");
    setCaptchaCode(generateRandomCode());
    setIsCorrect(false);
  };

  const handleCaptchaSubmit = (e) => {
    const input = e.target.value;
    // setUserInput(input);
    if (input === captchaCode) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isCorrect) {
      if (formData.userId !== "" && formData.password !== "") {
        axios
          .post("https://edu-tech-bwe5.onrender.com/v1/login", {
            email: formData.userId,
            password: formData.password,
          })
          .then((response) => {
            
            console.log("tested");
            let data = response.data;
            console.log(data);
            if (data.Success === true) {
              let rawToken = data.Token;
              let encryptToken = encrypt(JSON.stringify(rawToken));
              Cookies.set("_TK", encryptToken, { expires: 1 });
              let userData = data.Data[0];
              let encryptUser = encrypt(JSON.stringify(userData));
              Cookies.set("_UR", encryptUser, { expires: 1 });
              // toast.success(`Welcome Back ${userData.name}`);
              regenerateCaptcha();
              
              // Call the background API
              
              const backgroundAPICall = axios.get("https://edu-tech-bwe5.onrender.com/v1/store", {headers: {
                'token': rawToken}
              });
  
              // Redirect to dashboard after both API calls are completed
              Promise.all([backgroundAPICall]).then((responses) => {
                // Save background API result to cookies\
                console.log(responses[0].data);
                const backgroundData = (responses[0].data.Success)===true? responses[0].data.Data[0]:'';
                Cookies.set("_ST", JSON.stringify(backgroundData));
                setIsLoading(false);
                toast.success(`Welcome Back ${userData.name}`);
                // Redirect to dashboard
                setTimeout(() => {
                  navigate("/dashboard");
                }, 100);
              });
            } else {
              toast.error("Invalid User Credentials !");
              regenerateCaptcha();
              setIsLoading(false);
            }
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error("Bad Credentials !");
            console.error("Error fetching data:", error);
            if (error.response) {
              console.error(
                "Server responded with status:",
                error.response.status
              );
              console.error("Response data:", error.response.data);
            }
          });
      } else {
        toast.error("Give Login Credentials ");
        setIsLoading(false);
      }
    } else {
      toast.error("Wrong Captcha !!");
      setIsLoading(false);
      regenerateCaptcha();
    }
  };
  
  

  return (
    <Layout>
        <MDBContainer className="my-5 gradient-form">

<MDBRow>
<MDBCol col='2'>

</MDBCol>
  <MDBCol col='8' className="mb-2">
  <Toaster position="top-center" reverseOrder={false} />
  {showRegistrationModal && (
<div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
<div className="modal-dialog modal-dialog-centered modal-xl" role="document"> {/* Added modal-xl class for extra large modal */}
<div className="modal-content" style={{ width: "100%", height: "100%" }}> {/* Set width and height to 100% */}
  <div className="modal-header">
    <h5 className="modal-title">Register</h5>
    <button type="button" className="btn-close" onClick={toggleRegistrationModal}></button>
  </div>
  <div className="modal-body" style={{ height: '100%', overflowY: 'auto' }}>
  <Registration />
</div>

</div>
</div>
</div>
)}
    <div className="d-flex flex-column ms-4">

      <div className="text-center">
        <img src={image}
          style={{width: '185px'}} alt="logo" />
        <h4 className="mt-1 mb-5 pb-1">We are The BillBuddy Team</h4>
      </div>

      <p>Please login to your account</p>


    
            <MDBInput
              wrapperClass="mb-4"
              label="Email ID"
              id="userId"
              type="text"
              size="lg"
              name="userId"
              onChange={handleInputChange}
              value={formData.userId}
              style={{ color: "goldenrod" }}
              onPaste={(e) => {
                e.preventDefault();
                toast.error("Pasting is disabled.");
              }}
            />
            <div className="position-relative">
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
              
                type={formData.showPassword ? "text" : "password"}
                size="lg"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                style={{ color: "black" }}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Pasting is disabled.");
                }}
              />
              <FontAwesomeIcon
                icon={formData.showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisibility}
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                style={{ cursor: "pointer" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <input
                    disabled
                    value={captchaCode}
                    style={{
                      backgroundColor: "white",
                      color: "grey",
                      width: "80px",
                      border: "none",
                      fontSize: "24px",
                      letterSpacing: "5px",
                      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                      position: "relative",
                      zIndex: "1",
                    }}
                    onCopy={(e) => e.preventDefault()}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      width: "100%",
                      height: "3px",
                      backgroundColor: "green",
                      transform: "rotate(-155deg)",
                      zIndex: "4",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      width: "100%",
                      height: "5px",
                      backgroundColor: "red",
                      transform: "rotate(-0deg)",
                      zIndex: "4",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      width: "100%",
                      height: "3px",
                      backgroundColor: "blue",
                      transform: "rotate(-25deg)",
                      zIndex: "4",
                    }}
                  ></span>
                </div>

                <button
                  type="button"
                  onClick={regenerateCaptcha}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRotate}
                    size="2x"
                    style={{ color: "green", marginLeft: "8px" }}
                  />
                </button>
                <form style={{ marginTop: "5px" }}>
                  <MDBInput
                    wrapperClass="mb-2"
                    label="Enter Captcha"
                    id="captcha"
                    type="text"
                    size="lg"
                    
                    onChange={handleCaptchaSubmit}
                    style={{ color: "black", fontWeight: "bolder" }}
                    onPaste={(e) => {
                      e.preventDefault();
                      toast.error("Pasting is disabled.");
                    }}
                  />
                </form>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
             
              </div>
            </div>
        
      <div className="text-center pt-1 mb-5 pb-1">
        <MDBBtn className="mb-4 w-100 gradient-custom-2" disabled={!isFormValid || isLoading} onClick={handleSubmit}  type="submit"> {isLoading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : "Login"}</MDBBtn>
        <Link className="text-muted" to="/reset">Forgot password?</Link>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
        <p className="mb-0">Don't have an account?</p>
        <MDBBtn outline className='mx-2' onClick={toggleRegistrationModal} color='danger'>
        Sign UP
        </MDBBtn>
      </div>

    </div>

  </MDBCol>
  <MDBCol col='2'>

</MDBCol>




</MDBRow>

</MDBContainer>
    </Layout>
  );
}

export default UserLogin;
