import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
        <button
          className="login-button"
          onClick={() =>
            setBtnName((prev) => (prev === "Login" ? "Logout" : "Login"))
          }
        >
          {btnName} 
        </button>
      </div>
    </div>
  );
};

export default Header;
