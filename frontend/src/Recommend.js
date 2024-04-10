// src/Recommend.js
import React, { useState } from 'react';
import HeaderBack from './Recommend/HeaderBack';
import Footer from './Home/Footer';
import FoodTypeCards from './Recommend/FoodTypeCards';
import AllergyCards from './Recommend/AllergyCards';
import HealthSliders from './Recommend/HealthSliders';
import IngredientInput from './Recommend/IngredientInput';
import SubmitButton from './Recommend/SubmitButton';
import { useNavigate } from 'react-router-dom';
import FloatingSearchButton from './FloatingSearchButton'; // Import the FloatingSearchButton component



function Recommend() {
 const [isSearchActive, setIsSearchActive] = useState(false); // Moved state here
 const [foodType, setFoodType] = useState('');
 const [allergies, setAllergies] = useState([]);
 const [healthPreferences, setHealthPreferences] = useState({ carbohydrate: 50, protein: 50, fat: 50 });
 const [ingredients, setIngredients] = useState([]);
 const [errorMessage, setErrorMessage] = useState('');


 const handleFoodTypeChange = (type) => {
    setFoodType(type);
 };

 const handleAllergyChange = (updatedAllergies) => {
  setAllergies(updatedAllergies);
};

 const handleSliderChange = (name, value) => {
    setHealthPreferences({ ...healthPreferences, [name]: value });
 };

 const handleIngredientChange = (ingredients) => {
    setIngredients(ingredients);
 };

 const navigate = useNavigate();

 const closeButtonStyle = {
    backgroundColor: 'white',
    border: 'none',
    color: 'black',
    padding: '1px 1px',
    cursor: 'pointer',
    float: 'right', // This will move the button to the right
    fontSize: '18px',
    // move the button a bit down
    marginTop: '3px',
    lineHeight: '16px',
    borderRadius: '50%',
    // Make the font bold
    fontWeight: 'bold',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    verticalAlign: 'middle',
   };
   

 const handleSubmit = () => {
    const userInput = {
        food_type: foodType,
        allergies: allergies,
        ingredients: ingredients,
        calories: healthPreferences.carbohydrate,
        fat_content: healthPreferences.fat,
        protein_content: healthPreferences.protein,
        gluten_free: allergies.includes('Gluten'),
        dairy_free: allergies.includes('Dairy'),
    };

    fetch('http://localhost:8000/recommend/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage);
                });
            }
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      if (Array.isArray(data) && data.length === 0) {
          throw new Error('Sorry, not enough items to recommend');
      }
      // Store the data in sessionStorage
      sessionStorage.setItem('recommendations', JSON.stringify(data));
      // Redirect to the output page
      // window.location.href = '/output';
      navigate('/output');
  })
  
    .catch(error => {
        console.error('Error:', error);
        setErrorMessage(error.message); // Set the error message state
    });
};


return (
  <div>
    <HeaderBack />
    <FloatingSearchButton isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} /> {/* Pass state as props */}
    {!isSearchActive && (
      <>
        <FoodTypeCards onFoodTypeChange={handleFoodTypeChange} />
        <AllergyCards onAllergyChange={handleAllergyChange} />
        <HealthSliders onSliderChange={handleSliderChange} />
        <IngredientInput onIngredientChange={handleIngredientChange} />
        <SubmitButton onClick={handleSubmit} />
      </>
    )}
      {errorMessage && (
        <div className="col-sm-12" style={{ display: 'block' }}>
          <div className="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert">
            <i className="start-icon far fa-times-circle faa-pulse animated"></i>
            <strong className="font__weight-semibold">Oopsie!</strong> <span>{errorMessage}</span>
            <button type="button" className="close" style={closeButtonStyle} onClick={() => setErrorMessage('')}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
 );
}

export default Recommend;