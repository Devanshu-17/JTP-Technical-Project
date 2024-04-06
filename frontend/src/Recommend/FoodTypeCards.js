import React, { useState } from 'react';
import veg from '../img/Recommend/veg.jpg';
import nonveg from '../img/Recommend/nonveg.png';

const FoodTypeCards = ({ onFoodTypeChange }) => {
  const [selectedFoodType, setSelectedFoodType] = useState('');

  const handleFoodTypeClick = (type) => {
    console.log(`Card selected: ${type}`); // Log the selected food type to the console
    setSelectedFoodType(type);
    onFoodTypeChange(type);
  };

  return (
    <div>
      <div className="hero__title" style={{ paddingTop: '160px' }}>
        <h2>What type of food do you like?</h2>
      </div>
      <div className="cards-list">
        <div className={`card ${selectedFoodType === 'Veg' ? 'active' : ''}`} onClick={() => handleFoodTypeClick('Veg')}>
          <div className="card_image">
            <img src={veg} alt="Veg" />
          </div>
          <div className="card_title title-white">
            <div style={{ paddingTop: '90px' }}>
              <p>Veg</p>
            </div>
          </div>
        </div>
        <div className={`card ${selectedFoodType === 'Non-Veg' ? 'active' : ''}`} onClick={() => handleFoodTypeClick('Non-Veg')}>
          <div className="card_image">
            <img src={nonveg} alt="Non-Veg" />
          </div>
          <div className="card_title title-white">
            <div style={{ paddingTop: '90px' }}>
              <p>Non-Veg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodTypeCards;
