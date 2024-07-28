# WorldWise
WorldWise is a full-stack web application built with React + Vite that allows users to explore and track their travel adventures across different cities and countries around the world. It provides a comprehensive set of features for browsing, adding, and managing cities, as well as viewing detailed information about each city and tracking personal travel history.
## Live Demo
[<img src="./public/icon.png" alt="WorldWise" width="15"/>](https://wordwise-yuejiao.netlify.app/) [WorldWise](https://wordwise-yuejiao.netlify.app/)
## Technologies and Techniques Used
[<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" height="25">](https://reactjs.org/) The core library for building user interfaces.  
[<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white" height="25">](https://vitejs.dev/) A fast build tool for a more efficient development experience.  
[<img alt="React Router" src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white" height="25">](https://reactrouter.com/) Routing and navigation within the application.  
[<img alt="React Leaflet" src="https://img.shields.io/badge/-React_Leaflet-4D8B31?style=flat-square&logo=leaflet&logoColor=white" height="25">](https://react-leaflet.js.org/) Interactive maps for visualizing city and user's locations.  
[<img alt="Context API" src="https://img.shields.io/badge/-Context_API-555555?style=flat-square&logo=react&logoColor=white" height="25">](https://reactjs.org/docs/context.html) Manage global state of cities, provide asynchronous CRUD operations with Firebase, including loading cities, retrieving city details.  
[<img alt="Firebase" src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" height="25">](https://firebase.google.com/) Real-time database for managing city data (reference, get, push, remove).  

## Visual Overview
### Complete App Overview
[<img src="./gifs/GifWorldWise.gif" alt="Gif WorldWise" width="700"/>](./gifs/GifWorldWise.gif)
### Separate Overview
#### 1. Homepage, Pricing Page, Product Pages
[<img src="./gifs/3pages.gif" alt="3pages" width="700"/>](<./gifs/3pages.gif>)
#### 2. Login
[<img src="./gifs/Login.gif" alt="Login" width="700"/>](<./gifs/Login.gif>)
#### 3. Main App Page and User Location
[<img src="./gifs/MainPage.gif" alt="Login" width="700"/>](<./gifs/MainPage.gif>)
#### 4. Managing Cities, Countries
[<img src="./gifs/CityCountryModify.gif" alt="Login" width="700"/>](<./gifs/CityCountryModify.gif>)

## Features

### Travel Tracking

- Track your travels and mark the cities you've visited on an interactive map.
- Keep a log of your travel experiences and share them with friends.

### City and Country Lists

- **City List**: Browse through a list of cities, each displaying its name, position on the map, and an emoji representing its unique identity.
- **Country List**: Explore a list of countries, providing a broad overview of cities grouped by country.

### City Details

- **City Details Page**: View detailed information about each city, including its name, position on the map, emoji representation, and additional data.
- **Interactive Map**: Utilize an interactive map powered by Leaflet to visualize the exact location of each city and explore nearby areas.

### Add New City

- **Form**: Add new cities to the database by filling out a form with relevant details, including the city's name, position (latitude and longitude), and an emoji to represent it.
- **Validation**: Ensure data integrity and accuracy through form validation, preventing the addition of incomplete or incorrect city information.

### Pricing and Product Information

- **Pricing Page**: Discover the different pricing options for using the WorldWise application.
- **Product Page**: Discover the different products at the WorldWise application.

### Protected Routes

- **Login Page**: Access secure pages and functionality by authenticating through a login page, providing a username and password.
- **Protected Routes**: Utilize protected routes to ensure that only authenticated users have access to certain pages, such as adding new cities.

### Responsive Design

- **Responsive Layout**: Experience a seamless user experience across various devices and screen sizes, thanks to the application's responsive design and adaptive layout.

## More Projects...

- [usePopCorn](https://github.com/YuejiaoShi/movie-app) - Movie Tracker app
- [React Quiz](https://github.com/YuejiaoShi/react-quiz-app) - Quiz app
- [Recipestic](https://github.com/YuejiaoShi/recipe-app) - Recipe app