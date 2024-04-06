import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Recommend from './Recommend';
import Output from './Output'; 
import './styles/bootstrap.min.css';
import './styles/main.css';
import './styles/recommend.css';
import './styles/output.css'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/output" element={<Output />} /> 
      </Routes>
    </Router>
 </React.StrictMode>
);
