// Workflow.js
import React from 'react';

const Workflow = () => {
 return (
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    <div class="section__title">
                        <h2>Workflow</h2>
                        <p>Let's take a brief look into how Foodinator works.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="workflow">
                        <span class="workflow__icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,10h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm0,2a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Zm-3-3H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>
						</span>
                        <h3 class="workflow__title">Indulge Your Preferences! 💕 </h3>
                        <p class="workflow__text">Select your favorite food types, dietary preferences and the ingredients you have on hand. </p>
                    </div>
                </div>

                <div class="col-12 col-md-6 col-lg-4">
                    <div class="workflow workflow--green">
                        <span class="workflow__icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Z"/></svg>
						</span>
                        <h3 class="workflow__title">Generate Recommendations 🤖 </h3>
                        <p class="workflow__text">Our model will curate personalized recommendations based on your choices. </p>
                    </div>
                </div>

                <div class="col-12 col-lg-4">
                    <div class="workflow workflow--light">
                        <span class="workflow__icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16,20H8a3,3,0,0,1-3-3V7A1,1,0,0,0,3,7V17a5,5,0,0,0,5,5h8a1,1,0,0,0,0-2Zm-6-7a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2H11A1,1,0,0,0,10,13ZM21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V15a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0,0,1-1-1ZM19,15a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,.18,1H11a1,1,0,0,0,0,2h8Z"/></svg>
						</span>
                        <h3 class="workflow__title">Step-by-Step Instructions 📜</h3>
                        <p class="workflow__text">Explore recommended dishes accompanied by detailed instructions with mouth watering images. </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
 );
};

export default Workflow;
