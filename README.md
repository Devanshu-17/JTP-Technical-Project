# Foodinator - A Food Recommendation System

This is a food recommendation system that recommends food based on the user's preferences. The system uses a K-Means clustering algorithm to cluster similar foods together and recommend foods based on the user's preferences.

This project was developed as part of the Technical Project Round for JTP (Japan Third Party).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API Documentation](#api-documentation)
- [Usage](#usage)
- [Implementation](#demo)
- [License](#license)

## Introduction

Foodinator is a food recommendation system that recommends food based on the user's preferences. The system uses a K-Means clustering algorithm to cluster similar foods together and recommend foods based on the user's preferences.

The system uses a dataset of food items, their types, allergens, and nutritional information to cluster similar foods together. The user can input their preferences, such as the type of food they like, any allergens they have, and their nutritional requirements. The system then uses the K-Means clustering algorithm to cluster similar foods together and recommend foods based on the user's preferences.

The system also has appropriate error handling mechanisms in place to handle any errors that may occur during the recommendation process.

The dataset used in the system has been created from scratch by using the Spoonacular API to fetch food items, their types, allergens, and nutritional information. The dataset has been cleaned and preprocessed to remove any missing values and outliers.

The dataset has been tested and evaluated by using various machine learning algorithms, such as K-Means clustering, Nearest Neighbors, Support Vector Machines, K-Nearest Neighbors and a Neural Network. The K-Means clustering algorithm has been found to perform the best in terms of accuracy and efficiency.

## Features

- Feature 1: Recommends food based on the user's preferences.
- Feature 2: Provides detailed information about the recommended food items.
- Feature 3: Takes into account the user's allergens and nutritional requirements.

## Technologies Used

The system has been developed using the FastAPI framework for the backend and React for the frontend. The system uses MongoDB as the database to store the food items and user preferences. The system has been containerized using Docker to ensure easy deployment and scalability.

- Python
- FastAPI
- React
- MongoDB
- Docker
- HTML
- CSS
- JavaScript
- Bootstrap

## Getting Started

### Prerequisites

- Docker 

Install Docker by following the instructions [here](https://docs.docker.com/get-docker/).

- Docker Compose

Install Docker Compose by following the instructions [here](https://docs.docker.com/compose/install/).

- Git

Install Git by following the instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Installation

1. Clone the repository

```bash
git clone https://github.com/Devanshu-17/JTP-Technical-Project
```

2. Change the directory

```bash
cd JTP-Technical-Project
```

3. Build the Docker image

```bash
docker-compose up --build
```

4. Access the system

The system should now be running on `http://localhost:3000`.

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

5. Stop the system
    
```bash
    docker-compose down
```

### API Documentation

The API documentation can be accessed by going to `http://localhost:8000/docs`.

## Usage

1. Open the system in your browser by going to `http://localhost:3000`.

2. Click on the "Get Started" button to start using the system.

3. Enter your preferences, such as the type of food you like, any allergens you have, and your nutritional requirements.

4. Click on the "Recommend" button to get food recommendations based on your preferences.

5. The system will display a list of recommended food items along with detailed information about each food item.

## Implementation

#### Home Page
![Home](https://github.com/Devanshu-17/JTP-Technical-Project/assets/93381397/7031c2ba-5651-45dc-8af8-46750a4e227e)

#### Recommendation Page
![Recommendation](https://github.com/Devanshu-17/JTP-Technical-Project/assets/93381397/35d64050-c666-4c9d-b17f-e8f169b95894)

#### Output Page
![Output](https://github.com/Devanshu-17/JTP-Technical-Project/assets/93381397/fe71e4cf-1320-4628-8fd8-86501cf2cab9)

## License

This project is licensed under the [MIT LICENSE](LICENSE) - see the [LICENSE](LICENSE) file for details.
