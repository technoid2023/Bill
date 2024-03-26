import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../Components/Layout/Layout";
import Cookies from "js-cookie";
import { encrypt } from "../Auth/PrivateRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRotate } from "@fortawesome/free-solid-svg-icons";

import image from "../Assests/login2.png";


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
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    showPassword: false, // state to manage password visibility
  });
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  // const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Update form data when inputs change
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
              Cookies.set("_TK", encryptToken);

              let userData = data.Data[0];

              let encryptUser = encrypt(JSON.stringify(userData));

              Cookies.set("_UR", encryptUser, { expires: 1 });
              setTimeout(() => {
                navigate("/dashboard");
              }, 100);
              toast.success(`Welcome Back ${userData.name}`);
              regenerateCaptcha();
            } else {
              toast.error("Invalid User Credentials !");
              regenerateCaptcha();
            }
          })
          .catch((error) => {
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
      }
    } else {
      toast.error("Wrong Captcha !!");
      regenerateCaptcha();
    }
  };

  return (
    <Layout>
      <MDBContainer className="my-3">
        <Toaster position="top-center" reverseOrder={false} />

        <MDBCard
          className="mt-1"
          style={{
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(0, 0, 0, 0.4) 0px -2px 6px 0px inset",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            height: "30rem",
          }}
        >
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                

                

                <form onSubmit={handleSubmit} style={{marginTop:'10rem'}}>
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
                      <span>
                        <MDBBtn
                          className="mb-1 px-5"
                          color="success"
                          size="lg"
                          type="submit"
                          disabled={!isFormValid}
                          style={{ marginRight: "5rem", marginTop: "1rem" }}
                        >
                          Login
                        </MDBBtn>
                      </span>
                      <span style={{ marginLeft: "1px", color: "white" }}>
                        <Link
                          className="small mb-1"
                          to="/signup"
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            marginTop: "2px",
                          }}
                        >
                          Don't Have Account
                          <br />
                          SignUp Here
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>

                <Link
                  className="small "
                  to="/reset"
                  style={{
                    color: "sandybrown",
                    fontWeight: "bold",
                    marginRight: "12rem"
                  }}
                >
                  Forgot password?
                </Link>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </Layout>
  );
}

export default UserLogin;
