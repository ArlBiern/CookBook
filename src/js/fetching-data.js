const cocktaildbBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const mealdbBaseUrl = 'https://www.themealdb.com/api/json/v1/1/'
const puppyBaseUrl = 'https://cookcoorse.glitch.me/http://www.recipepuppy.com/'

const puppyHeaders = {
  'X-Requested-With': 'XMLHttpRequest'
}

const dbIngredientListEndpoint = 'list.php?i=list'
const dbRecipesEndpoint = 'filter.php?i='
const dbRecipeEndpoint = 'lookup.php?i='

const puppyIngredientListEndpoint = 'ing.php?q='
const puppySearchRecipeEndpoint = 'api/?i='

const getIngredients = (dishGroup) => {
  // console.log('Getting ingredients')
  if (dishGroup === 'cocktail') {
    const hints = []
    return fetch(`${cocktaildbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.drinks)
      .then((drinkTable) => drinkTable.forEach((d) => hints.push(d.strIngredient1)))
      .then(() => hints)
  }

  if (dishGroup === 'dessert') {
    const hints = []
    return fetch(`${mealdbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.meals)
      .then((mealTable) => mealTable.forEach((d) => hints.push(d.strIngredient)))
      .then(() => hints)
  }
  return false
}

// console.log('Getting Main Ingredients')
const getMainMealIngredients = (ingredient) => fetch(
  `${puppyBaseUrl}${puppyIngredientListEndpoint}${ingredient}`,
  puppyHeaders
)
  .then((res) => res.text())
  .then((resText) => resText.split('\n'))
  .then((array) => {
    array.pop()
    return array.map((i) => i.trim())
  })

const getMainMealRecipes = (ingredients) => {
  const queryString = ingredients.join(',')
  console.log('From fetch puppy', queryString)
  return fetch(`${puppyBaseUrl}${puppySearchRecipeEndpoint}${queryString}`, puppyHeaders)
    .then((res) => res.json())
    .then((resJson) => resJson.results)
    .catch((err) => console.log(err))
}

const getMealCategory = (list) => {
  const extendedMealList = []
  list.forEach((el) => extendedMealList.push(
    fetch(`${mealdbBaseUrl}${dbRecipeEndpoint}${el.idMeal}`)
      .then((res) => res.json())
      .then((resJson) => resJson.meals[0].strCategory.toLowerCase())
      .then((category) => {
        el.category = category
        return el
      })
  ))
  return Promise.all(extendedMealList)
}

const getDessertRecipes = async (ingredients) => {
  const queryString = ingredients[0]
  console.log('From fetch dessert', queryString)
  return fetch(`${mealdbBaseUrl}${dbRecipesEndpoint}${queryString}`)
    .then((res) => res.json())
    .then((resJson) => resJson.meals)
    .then(getMealCategory)
    .then((listWithCategory) => listWithCategory.filter((el) => el.category === 'dessert'))
}

const getCocktailRecipes = (ingredients) => {
  const queryString = ingredients[0]
  console.log('From fetch cocktail', queryString)
  return fetch(`${cocktaildbBaseUrl}${dbRecipesEndpoint}${queryString}`)
    .then((res) => res.json())
    .then((resJson) => resJson.drinks)
}

const getDessertRecipe = (recipeid) => {
  console.log('Fetch dessert details')
  return fetch(`${mealdbBaseUrl}${dbRecipeEndpoint}${recipeid}`)
    .then((res) => res.json())
    .then((resJson) => resJson.meals[0])
    .then((data) => {
      const name = data.strMeal.trim()
      const source = data.strSource
      const image = data.strMealThumb
      const ingredientsNames = []
      const ingredientsMeasures = []
      for (const prop in data) {
        if (data[prop] && prop.includes('strIngredient')) {
          ingredientsNames.push(data[prop])
        }
      }
      for (const prop in data) {
        if (data[prop] && prop.includes('strMeasure')) {
          ingredientsMeasures.push(data[prop])
        }
      }
      const ingredients = []
      for (let i = 0; i < ingredientsNames.length; i++) {
        ingredients.push(`${ingredientsNames[i].trim()}: ${ingredientsMeasures[i].trim()}`)
      }
      const recipeData = {
        name,
        ingredients,
        source,
        image
      }
      return recipeData
    })
}

const getCocktailRecipe = (recipeid) => {
  console.log('Fetch cocktail details')
  return fetch(`${cocktaildbBaseUrl}${dbRecipeEndpoint}${recipeid}`)
    .then((res) => res.json())
    .then((resJson) => resJson.drinks[0])
    .then((data) => {
      const name = data.strDrink.trim()
      const instruction = data.strInstructions
      const ingredientsNames = []
      const ingredientsMeasures = []
      for (const prop in data) {
        if (data[prop] !== null && prop.includes('strIngredient')) {
          ingredientsNames.push(data[prop])
        }
      }
      for (const prop in data) {
        if (data[prop] && prop.includes('strMeasure')) {
          ingredientsMeasures.push(data[prop])
        }
      }
      const ingredients = []
      for (let i = 0; i < ingredientsNames.length; i++) {
        ingredients.push(`${ingredientsNames[i].trim()}: ${ingredientsMeasures[i].trim()}`)
      }
      const recipeData = {
        name,
        ingredients,
        instruction
      }
      return recipeData
    })
}

export {
  getIngredients,
  getMainMealIngredients,
  getMainMealRecipes,
  getDessertRecipes,
  getCocktailRecipes,
  getDessertRecipe,
  getCocktailRecipe
}
