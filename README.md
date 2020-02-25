# Welcome to Cookbook
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![Status: In progress](https://img.shields.io/badge/status-in%20progress-blueViolet)
![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)

This app was created as a part of the CodersCamp project (2019, Warsaw group) - Third project - Javascript, interactive apps

**Check demo** at ✨ [adress to live version](https://freefrogs.github.io/CookBook/) and **source code** at 🏠 [GitHub project homepage](https://github.com/dobrzyckahanna/CookBook)

**Created by**:
* **FreeFrogs** - check at [Github](https://github.com/freefrogs)
* **ireshka** - check at [Github](https://github.com/ireshka)
* **Kombajn27** - check at [Github](https://github.com/Kombajn27)

## Description

We created an app that helps choose meal, cocktail or dessert recipes. It also provides a 'culinary curiosity' feature. Because choice is important, we provide the ability to choose ingredients (with hints) and present a few randomly chosen recipes for everyone to choose what they like.

## Setup

### Install & usage
* Download zip file & unzip or clone repository 
```bash
git clone git@github.com:freefrogs/CookBook.git
```
* Install required project dependencies and run developer server
```bash
cd CookBook
npm ci
# or for npm below 6: npm install
npm run start
```
* This builds project and runs developer server. Open http://localhost:8080 to see and play with app.

* At any time you can use `npm run build` for create a minified bundle ready for production.
  
* Due to restrictions of used PuppyRecipe Api and CORS Anywhere proxy, connection to PuppyRecipe is restricted to developer server on webpack default port.

* We use free and open API so be kind and don't abuse them. We use their data to learn new skills, not to create a business app.

## Features
- you can get a random meal recipe from MealDB
- you can get a random drink recipe from CocktailDB
- you can get a random food curiosity from Wikipedia (we chose snack food - who doesn't like snacks?)
- you can choose favourite ingredients, put them into a pot and let magic happen - receive a couple of random recipes for every situation (main meal & dessert from MealDB, cocktail from CocktailDB) - play with drag and drop feature
- you can enjoy a pan animation when you are waiting for recipes

### Code requirements and specification
Project had a set of requirements that needed to be fullfiled:
- connect and get data from external API (see Credits section for detailed API information)
- make DOM interaction
- get DOM elements in JavaScript
- change styles via JavaScript
- change html content via JavaScript
- animation (look at pan animation or play with page title)
- use external library (we use Glide.js)
- use async/await, promise and callback functionalities

As we all learn new things during the course, we decided to use different approaches for solving similar problems. We split the tasks among three people so that everyone can face a given problem in their own way.

### Used technologies & tools
* module bundling by Webpack
* Javascript transpiling by Babel
* modern JS syntax and use of ES6, ES7 & ES8 features
* no CSS preprocessors
* ESlint for Javascript code linting
* Glide.js slider

## Known troubles
- glide.js error might occur in some Chrome versions but it doesn't break slider functionality

## Credits
* static images from [Pixabay](https://pixabay.com) and [FreeFrogs](https://github.com/freefrogs)
* used [Glide.js](https://glidejs.com/) slider developed by [Jędrzej Chałubek](https://github.com/jedrzejchalubek)
* utilized API:
  * dessert & random meal recipes from: [TheMealDB](https://www.themealdb.com/)
  * cocktail recipes from: [TheCocktailDB](https://www.themealdb.com/)
  * food curiosity from: [Wikipedia](https://en.wikipedia.org/)