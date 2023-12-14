import React,{useState} from "react";
import "./header.scss";

const Header = ({ setTags }) => {
  const uploadFile = () => {
    console.log('try');
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    console.log('try2');
    fetch("https://988d-14-99-167-142.ngrok-free.app/upload", {
      method: "POST",
      body: formData,
    }).then(response => response.text())
    .then(data => {
      let res=JSON.parse(data);
      console.log(res.labels);
      setTags(res.labels);
    });
    alert("File uploaded");
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
