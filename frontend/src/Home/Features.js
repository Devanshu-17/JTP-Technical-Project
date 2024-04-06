// Features.js
import React from 'react';

const Features = () => {
 return (
        <section className="section">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="features features--first">
                        <h3 class="features__title"> Tailored to Your Tastes</h3>
                        <p class="features__text"> Our personalized recommendation system analyzes your dining preferences, dietary requirements, and culinary interests to curate a bespoke selection of dishes. Say goodbye to generic suggestions and hello to a personalized dining experience crafted just for you.  </p>
                    </div>
                </div>

                <div class="col-12 col-lg-4">
                    <div class="features features--yellow">
                        <h3 class="features__title">Dietary Compatibility</h3>
                        <p class="features__text">  Whether you're gluten-free, dairy-free, or have specific dietary restrictions, our system takes your dietary preferences into account. Enjoy peace of mind knowing that every recommendation aligns with your dietary needs, ensuring a satisfying and enjoyable dining experience. </p>
                    </div>
                </div>

                <div class="col-12 col-lg-4">
                    <div class="features features--nephrite">
                        <h3 class="features__title">Detailed Instructions</h3>
                        <p class="features__text"> Dive into the culinary world with confidence, as our recommendations come with detailed step-by-step instructions for preparing each dish. Whether you're a novice cook or a seasoned chef, our instructions ensure a seamless cooking experience from start to finish. </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
 );
};

export default Features;
