import React, {useState} from "react";
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import {useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RegisterComponentStyle.css";
import "../App.css";
import img3 from "../assets/books-and-people.svg";

import { jwtDecode } from 'jwt-decode';

const LoginComponent = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notAuthorizedError, setNotAuthorizedError] = useState('')

    const navigator = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();
        await loginAPICall(username, password)
            .then((response) => {
                console.log(response.data); 
                const token = response.data.accessToken;
                storeToken(token);
                const decodedToken = jwtDecode(token);
                const roles = decodedToken.rol;
                console.log(roles);
                saveLoggedInUser(username);
                localStorage.setItem('userRoles', JSON.stringify(roles));
    
                // Redirect based on user role
                if (roles.includes('ADMIN')) {
                    navigator("/admindashboard");
                } else {
                    navigator("/userdashboard");
                }
    
                window.location.reload(false);
                console.log(username);
            }).catch(error => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    setNotAuthorizedError('Unauthorized access!');
                    setTimeout(() => {
                        setNotAuthorizedError('');
                    }, 2000);
                }
                setUsername("");
                setPassword("");
            });
    }
    
    

    return (
        <div className="container">
            <div className="logo-3">
                <img src={img3} width={200} alt="" />
            </div>
            <br />
            <br />
            <div className="row">
                <div className="col-md-7 align-items-start">
                    <div className="card">
                        <div>
                            <h2 className="text-start fs-1 fw-bold m-2 px-3 py-2">Login now</h2>
                            <p className="m-4 text-start">Hi, Welcome back</p>
                        </div>
                        <div className="card-body">
                            <form>
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
                                            className="mt-3 px-5 py-1 bg-white rounded-3 shadow col-12 row align-items-center text-success-subtle fs-6 fw-normal font-family-Inter col-11 m-0 px-3 py-2"
                                            id="custom-input"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <button
                                        className="mt-3 px-5 py-2 rounded-3 col-12 justify-content-center align-items-center"
                                        onClick={(e) => handleLoginForm(e)}
                                        id="custom-button"
                                    >
                                        Log in
                                    </button>
                                </div>
                                <div className="Allready-member">
                                    <p style={{fontSize:"20px", color: "red"}}>{notAuthorizedError}</p>
                                    <p>Dont have an account ?</p>
                                </div>
                                <div className="Login-link">
                                    <a href="http://localhost:3000/register">Register Here</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
