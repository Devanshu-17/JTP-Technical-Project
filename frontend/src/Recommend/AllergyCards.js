import React, { useState } from 'react';
import gluten from '../img/Recommend/gluten.svgz';
import dairy from '../img/Recommend/dairy.svgz';
import none from '../img/Recommend/none.svgz';

const AllergyCards = ({ onAllergyChange }) => {
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const handleAllergyClick = (allergy) => {
    console.log(`Card selected: ${allergy}`);

    // Toggle the selected state of the clicked allergy
    const updatedSelectedAllergies = selectedAllergies.includes(allergy)
      ? selectedAllergies.filter((a) => a !== allergy) 
      : [...selectedAllergies, allergy]; 

    setSelectedAllergies(updatedSelectedAllergies);
    onAllergyChange(updatedSelectedAllergies);
};


  return (
    <div>
      <div className="hero__title" style={{ paddingTop: '160px' }}>
        <h2>Do you have any allergies?</h2>
      </div>
      <div className="cards-list">
        <div
          className={`card ${selectedAllergies.includes('Gluten') ? 'active' : ''}`}
          onClick={() => handleAllergyClick('Gluten')}
        >
          <div className="card_image">
            <img src={gluten} alt="Gluten" />
          </div>
          <div className="card_title title-white">
            <div style={{ paddingTop: '90px' }}>
              <p>Gluten</p>
            </div>
          </div>
        </div>
        <div
          className={`card ${selectedAllergies.includes('Dairy') ? 'active' : ''}`}
          onClick={() => handleAllergyClick('Dairy')}
        >
          <div className="card_image">
            <img src={dairy} alt="Dairy" />
          </div>
          <div className="card_title title-white">
            <div style={{ paddingTop: '90px' }}>
              <p>Dairy</p>
            </div>
          </div>
        </div>
        <div
          className={`card ${selectedAllergies.includes('None') ? 'active' : ''}`}
          onClick={() => handleAllergyClick('None')}
        >
          <div className="card_image">
            <img src={none} alt="None" />
          </div>
          <div className="card_title title-white">
            <div style={{ paddingTop: '90px' }}>
              <p>None</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllergyCards;
