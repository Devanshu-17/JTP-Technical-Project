# Description: Dockerfile for the frontend

# pull official base image
FROM node:latest as build
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# Install npm
RUN npm i
RUN npm install react-scripts
# add app
COPY . /app/

# Build production
RUN npm run build
RUN npm install -g serve

## Start the app on port 3006
CMD serve -s build -l 3000
