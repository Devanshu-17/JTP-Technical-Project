// Hero.js
import React from 'react';
import { Link } from 'react-router-dom';


const Hero = () => {
 return (

    <section className="hero" id="hero">
     <div class="container">
         <div class="row">
             <div class="col-12">
                 <div class="hero__content">
                     <span class="hero__tagline">Introducing</span>
                     <h2 class="hero__title">Foodinator</h2>
                     <p class="hero__text">Your Personalised Food Recommendation Assistant</p>
                     <div class="hero__btns">
                         <a href="https://github.com/Devanshu-17/JTP-Technical-Project" class="hero__btn"><span>Explore</span></a>
                        <Link to="/recommend" className="hero__btn hero__btn--nephrite">
                            <button type="button">
                                <span>Get Started</span>
                            </button>
                        </Link>

                     </div>
                 </div>
             </div>
         </div>
     </div>
 </section>

 );
};

export default Hero;
