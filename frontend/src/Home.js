// src/App.js
import React from 'react';
import Header from './Home/Header';
import Hero from './Home/Hero';
import Features from './Home/Features';
import Filler from './Home/Filler';
import Workflow from './Home/Workflow';
import Technology from './Home/Technology';
import Footer from './Home/Footer';

function Home() {
 return (
    <div className="Home">
      <Header />
      <Hero />
      <Features />
      <Filler />
      <Workflow />
      <Technology />
      <Footer />
    </div>
 );
}

export default Home;
