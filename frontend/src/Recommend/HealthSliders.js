// src/HealthSliders.js
import React, { useState, useEffect } from 'react';

const HealthSliders = ({ onSliderChange }) => {
 const [carbohydrateRatio, setCarbohydrateRatio] = useState(50);
 const [proteinRatio, setProteinRatio] = useState(50);
 const [fatRatio, setFatRatio] = useState(50);

 const handleSliderChange = (event, setRatio) => {
    const value = event.target.value;
    setRatio(value);
    onSliderChange(event.target.name, value);
 };
 
  // Log the values whenever they change
  useEffect(() => {
    console.log(`Carbohydrate Ratio: ${carbohydrateRatio}`);
    console.log(`Protein Ratio: ${proteinRatio}`);
    console.log(`Fat Ratio: ${fatRatio}`);
 }, [carbohydrateRatio, proteinRatio, fatRatio]);

 return (
  <div>
   <div className="hero__title" style={{ paddingTop: '160px' }}>
        <h2>How healthy do you want your food to be?</h2>
      </div>
    <div className="range-slider">
      <div className="slider-container">
        <div className="slider-box">
          <label htmlFor="carbohydrateSlider" className="slider-label">Calories</label>
          <input type="range" min="100" max="1000" value={carbohydrateRatio} name="carbohydrate" onChange={(event) => handleSliderChange(event, setCarbohydrateRatio)} className="slider" id="carbohydrateSlider" />
          <p className="slider-value" id="carbohydrateValue">{carbohydrateRatio}</p>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider-box">
          <label htmlFor="proteinSlider" className="slider-label">Protein</label>
          <input type="range" min="0" max="100" value={proteinRatio} name="protein" onChange={(event) => handleSliderChange(event, setProteinRatio)} className="slider" id="proteinSlider" />
          <p className="slider-value" id="proteinValue">{proteinRatio}</p>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider-box">
          <label htmlFor="fatSlider" className="slider-label">Fat</label>
          <input type="range" min="0" max="100" value={fatRatio} name="fat" onChange={(event) => handleSliderChange(event, setFatRatio)} className="slider" id="fatSlider" />
          <p className="slider-value" id="fatValue">{fatRatio}</p>
        </div>
      </div>
    </div>
    </div>
 );
};

export default HealthSliders;
