import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../styles/RegisterComponentStyle.css";
import { registerAPICall } from "../services/AuthService";
import img2 from "../assets/logo1.svg";
import img3 from "../assets/logo-kompiuteris.png";
import { ToastContainer, toast } from "react-toastify";
import "../styles/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameEmptyError, setNameEmptyError] = useState("");
  const navigator = useNavigate();

  //validation
  const validateName = () => {
    if (name.trim() === "") {
      setNameEmptyError("Enter a name.");
      return false;
    }
    setNameEmptyError("");
    return true;
  };
  const validateUsername = (value) => {
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,30}$/.test(value)) {
      setUsernameError("Required 5-30 characters, letters and numbers.");
      return false;
    }
    setUsernameError("");
    return true;
  };
  const validateEmail = (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Email address must be unique and formatted correctly.");
      return false;
    }
    const [, domain] = value.split('@');
    if (domain.includes('..')) {
      setEmailError("Email address must formatted correctly");
      return false;
    }
    setEmailError("");
    return true;
  };
  const validatePassword = (value) => {
    if (value.length < 8 || value.length >20 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
      setPasswordError("Required 8-20 characters with letters and numbers");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateRepeatPassword = (value) => {
    if (value !== password) {
      setRepeatPasswordError("Passwords do not match.");
      return false;
    }
    setRepeatPasswordError("");
    return true;
  };

  function handleRegistrationForm(e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isRepeatPasswordValid = validateRepeatPassword(repeatPassword);

    if (
      isUsernameValid &&
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isRepeatPasswordValid
    ) {
      const register = { name, username, email, password };
      console.log(register);

      registerAPICall(register)
        .then((response) => {
          console.log(response.data);
          setName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setRepeatPassword("");
          toast.success("Registration successful!");
          setTimeout(() => {
            navigator("/login");
          }, 5500);
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 409) {
            toast.error("This email or username is already registered");
          }
          setUsername("");
          setEmail("");
        });
    }
  }
  return (
    <div className="container">
      <ToastContainer></ToastContainer>
      <div className="logo-1">
        <img src={img2} alt="" />
      </div>
      <div className="logo-2">
        <img src={img3} width={400} alt="" />
      </div>

      <br />
      <br />
      <div className="row">
        <div className="col-md-7 align-items-start">
          <div className="card">
            <div>
              <h2 className="text-start fs-1 fw-bold m-2 px-3 py-2">Register</h2>
            </div>

            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-7 control-label "></label>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-5 py-2 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-14 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {nameEmptyError && (
                      <p className="text-danger">{nameEmptyError}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-7 control-label"></label>
                  <div className="col-md-">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {usernameError && (
                      <p className="text-danger">{usernameError}</p>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-7 control-label"> </label>
                  <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-7 control-label"> </label>
                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                      id="custom-input"
                    />
                    {passwordError && (
                      <p className="text-danger ">{passwordError}</p>
                    )}
                  </div>
                </div>
                {password && (
                  <div className="row mb-3">
                    <label className="col-md-7 control-label"></label>
                    <div>
                      <input
                        type="password"
                        name="repeatPassword"
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-2 py-2"
                        id="custom-input"
                      />
                      {repeatPasswordError && (
                        <p className="text-danger">{repeatPasswordError}</p>
                      )}
                    </div>
                  </div>
                )}
                <div className="form-group mb-2">
                  <button
                    className="px-5 py-2 rounded-3 col-12 justify-content-center align-items-center
                                                      "
                    id="custom-button"
                    onClick={(e) => handleRegistrationForm(e)}
                  >
                    Create an account
                  </button>
                </div>
                <div className="Allready-member">
                  <p>Allready a member ?</p>
                </div>
                <div className="Login-link">
                  <a href="http://localhost:3000/login">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
