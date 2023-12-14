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
        <div class="custom-file-input">
          <input type="file" id="fileInput" name="fileInput" class="hidden" />
        </div>
        <button type="submit">submit</button>
      </div>
    </div>
  );
};

export default Header;
