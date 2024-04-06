// src/SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick }) => {
 return (
    <div className="hero__title" style={{ paddingTop: '10px' }}>
      <button id="submitBtn" className="btn_rec" onClick={onClick}>Recommend</button>
    </div>
 );
};

export default SubmitButton;
