import React from "react";
import "./header.scss";

const Header = ({ setTags }) => {
  const uploadFile = () => {
    console.log('try');
    const fileInput = document.querySelector('input[type="file"]');
    if(fileInput.files.length !== 0) {
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    console.log('try2');
    fetch("https://018c-103-5-132-23.ngrok-free.app/upload", {
      method: "POST",
      body: formData,
    }).then(response => response.text())
    .then(data => {
      let res=JSON.parse(data);
      console.log(res.labels);
      setTags(res.labels);
    });
    alert("File uploaded");
    }
  };
  return (
    <div className="header">
      <div className="form">

        <input type="file" className="customFile"/>

        <button type="submit" onClick={uploadFile} className="submitBtn">submit</button>
      </div>
    </div>
  );
};

export default Header;
