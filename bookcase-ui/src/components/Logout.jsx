import React from "react";
import { logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigator = useNavigate();

  const handleLogout = () => {
    logout();
    navigator("/login");
  };

  return (
    <div>
      <button onClick={handleLogout} className="main-button" style={{width:"130px", marginTop:".8rem"}}>Logout</button>
    </div>
  );
};

export default Logout;
