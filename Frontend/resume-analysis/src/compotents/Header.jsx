import React from "react";
import "./header.scss";
const Header = () => {
  const uploadFile = ({ setTags }) => {
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log(response);
      setTags(response);
    });
  };
  return (
    <div className="header">
      <div className="form">
        <input type="file" />       <button type="submit">submit</button>
      </div>
    </div>
  );
};

export default Header;
