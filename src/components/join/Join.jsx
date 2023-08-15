import React, { useState } from "react";
import "./join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };

  const [name, setName] = useState();

  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={logo} alt="logo" />
        <h1>i CHAT</h1>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="joinInput"
          placeholder="Enter Your Name"
        />
        <Link
          to={"/chat"}
          onClick={(e) => (!name ? e.preventDefault() : null)}
        >
          <button className="joinBtn" onClick={sendUser}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
