import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { isUserLoggedIn } from '../services/AuthService'
import {useNavigate} from 'react-router-dom'



export const SideBar = () =>{
  const isAuth = isUserLoggedIn();
  const navigator = useNavigate();
  

    return(
        <>
        <div className="flex-shrink-0 p-3 ms-4" style={{width:"280px", paddingLeft:"16px", textAlign:"left", }}>
    <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
      <span className="fw-semibold" style={{fontSize:"20px", color:"white", backgroundColor:"rgba(119, 73, 248, 0.50)", width:"217px", height:"56px", paddingLeft:"16px", paddingTop:"13px"}}>Navbar</span>
    </div>
    <ul className="list-unstyled ps-0">
      <li className="mb-1" style={{color:"#7749F8"}}>
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true" style={{color:"#7749F8"}}>
          New Project
        </button>
        <div className="collapse show" id="home-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px", color:"red"}}>1st step</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>2nd step</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>3rd step</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false" style={{color:"#7749F8"}}>
          My Project
        </button>
        <div className="collapse" id="dashboard-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Overview</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Weekly</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Monthly</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Annually</a></li>
          </ul>
        </div>
      </li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false" style={{color:"#7749F8"}}>
          Save All.CSV
        </button>
        <div className="collapse" id="orders-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>New</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Processed</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Shipped</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Returned</a></li>
          </ul>
        </div>
      </li>
      <li className="border-top my-3"></li>
      <li className="mb-1">
        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false" style={{color:"#7749F8"}}>
          Account
        </button>
        <div className="collapse" id="account-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>New...</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Profile</a></li>
            <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded" style={{marginLeft:"15px"}}>Settings</a></li>
            {/* <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" onClick={() => setShowModal(true)} style={{color:"#7749F8"}}>
              Log out
            </button> */}
          </ul>
        </div>
      </li>
    </ul>
  </div>
        </>


    )


}