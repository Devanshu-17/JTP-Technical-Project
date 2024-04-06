// src/IngredientInput.js
import React, { useState } from 'react';

const IngredientInput = ({ onIngredientChange }) => {
 const [ingredients, setIngredients] = useState('');

 const handleIngredientChange = (event) => {
    const value = event.target.value;
    setIngredients(value);
    onIngredientChange(value.split(',').map(ingredient => ingredient.trim()));
 };

 return (
  <div>
  <div className="hero__title" style={{ paddingTop: '160px' }}>
        <h2>What Ingredients do you have in hand?</h2>
      </div>
    <div className="ingredient-input">
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <h2>Ingredients</h2>
          </div>
          <div className="content">
            <p>Type ingredients separated by commas</p>
            <ul>
              <input type="text" spellCheck="false" onChange={handleIngredientChange} value={ingredients} />
            </ul>
          </div>
        </div> 
      </div>
    </div>
    </div>
 );
};

export default IngredientInput;
