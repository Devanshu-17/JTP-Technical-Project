import React, { useEffect, useState } from 'react';
import HeaderBack from './Recommend/HeaderBack';
import Footer from './Home/Footer';

const Output = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [detailsFetched, setDetailsFetched] = useState(false); // Flag for fetch status

  useEffect(() => {
    const storedRecommendations = JSON.parse(sessionStorage.getItem('recommendations')) || [];
    setRecommendations(storedRecommendations);
  }, []);

  useEffect(() => {
    if (!detailsFetched && recommendations.length > 0) {
      recommendations.forEach(recommendation => {
        fetchAndDisplayFoodDetails(recommendation.food);
      });
      setDetailsFetched(true);
    }
  }, [recommendations, detailsFetched]);

  const fetchAndDisplayFoodDetails = async (foodName) => {
    try {
      const response = await fetch(`http://localhost:8000/fetch-food-details/?food=${encodeURIComponent(foodName)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();
      console.log(details);

      // Update recommendations only if details are fetched successfully
      setRecommendations(prevRecommendations =>
        prevRecommendations.map(rec => rec.food === foodName ? { ...rec, ...details, showFullInstructions: false } : rec)
      );
    } catch (error) {
      console.error('Error fetching food details:', error);
    }
  };

  const toggleInstructions = (index, event) => {
    event.preventDefault(); // Prevent the default action of the <a> tag
    setRecommendations(prevRecommendations =>
      prevRecommendations.map((rec, i) => i === index ? { ...rec, showFullInstructions: !rec.showFullInstructions } : rec)
    );
  };

  return (
    <div>
      <HeaderBack />
      <div>
        <div className="hero__title" style={{ paddingTop: '160px' }}>
          <h2>You may like these </h2>
        </div>
        <div className="container">
          <div id="recommendations" className="projcard-container">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="projcard projcard-blue">
                <div className="projcard-innerbox">
                  <img className="projcard-img" src={recommendation.image} alt={recommendation.food} />
                  <div className="projcard-textbox">
                    <div className="projcard-title">{recommendation.food}</div>
                    <div className="projcard-subtitle">
                      Source: <a href={recommendation.sourceUrl} target="_blank" rel="noreferrer">{recommendation.sourceUrl}</a>
                    </div>
                    <div className="projcard-bar"></div>
                    <div className={`projcard-description ${recommendation.showFullInstructions ? 'scrollable-instructions' : ''}`}>
                      Instructions: {recommendation.showFullInstructions ? recommendation.instructions : (recommendation.instructions?.substring(0, 100) || '')}
                      <a href="/" onClick={(event) => toggleInstructions(index, event)} className="read-more">{recommendation.showFullInstructions ? 'Show less' : 'Read more'}</a>
                    </div>
                    <div className="projcard-tagbox">
                      {/* Ingredients: {recommendation.ingredients} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Output;
