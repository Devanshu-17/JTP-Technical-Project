// Technology.js
import React from 'react';
import python from '../img/Technology/python.svg';
import react from '../img/Technology/react.svg';
import mongodb from '../img/Technology/mongodb.svg';
import docker from '../img/Technology/docker.svg';
import fastapi from '../img/Technology/fastapi.svg';
import html from '../img/Technology/html.svg';
import bootstrap from '../img/Technology/bootstrap.svg';
import javascript from '../img/Technology/javascript.svg';

const Technology = () => {
 return (
    <section class="section section--light">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section__title section__title--between">
                        <h2>Technology Used</h2>
                    </div>
                </div>
                <div class="col-12">
                    <ul class="Technology">
                        <li>
                            <a href="/">
								<img src={python} alt=""/ >
								<span>Python</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={react} alt=""/ >
								<span>React</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={mongodb} alt=""/ >
								<span>MongoDB</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={docker} alt=""/ >
								<span>Docker</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={fastapi} alt=""/ >
								<span>FastAPI</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={html} alt=""/ >
								<span>HTML</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={bootstrap} alt=""/ >
								<span>Bootstrap</span>
							</a>
                        </li>
                        <li>
                            <a href="/">
								<img src={javascript} alt=""/ >
								<span>Javascript</span>
							</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
 );
};

export default Technology;
