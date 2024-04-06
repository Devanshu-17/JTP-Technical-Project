// Filler.js
import React from 'react';
import food from '../img/food.jpg';

const Filler = () => {
 return (
    <section className="section section--bt">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 align-self-center">
                <div class="section__title section__title--grid-right">
                    <strong>Learn More about</strong>
                    <h2>Crafting a Nutritious and Delectable Diet</h2>
                    <p>Join us on a culinary adventure where taste meets nourishment! Picture this: every bite a symphony of flavors, every dish a masterpiece of nutrition.</p>
                    <p>Crafting a nutritious and delectable diet isn't just about sustenance; it's about savoring each morsel while nourishing your body from within. Say goodbye to bland meals and hello to vibrant, palate-pleasing creations that energize and invigorate. Whether you're a seasoned foodie or a curious novice, discover the art of culinary balance where health and taste converge in perfect harmony.</p>
                </div>
            </div>

            <div class="col-12 col-lg-6 align-self-center">
                <div class="section__chart">
                    <img src={food} alt="food" style={{ width: '550px', height: '450px', borderRadius: '10px', overflow: 'hidden' }} />
                </div>
            </div>
            <div class="separator"></div>
        </div>
    </div>
</section>
 );
};

export default Filler;
