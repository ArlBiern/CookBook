import { getMainMealRecipes, getDessertRecipes, getCocktailRecipes } from './fetching-data'
import * as utili from './utilities'
const potTable = document.querySelector('.potTable')
const allTables = document.querySelectorAll('[data-box]')
const suggestionsBox = document.querySelector('#suggestions')

const getIngredient = async (dish) => {
  const table = potTable.querySelector(`[data-box="${dish}"]`)
  const tableElements = table.querySelectorAll('li.item')
  const tableIngredients = []
  tableElements.forEach((el) => tableIngredients.push(utili.getValueFromCard(el)))
  return tableIngredients
}

const getIngredientsFromTable = async () => {
  const mainMealIngredients = getIngredient('mainMeal')
  const dessertIngredient = getIngredient('dessert')
  const cocktailIngredient = getIngredient('cocktail')
  const ingredients = await Promise.all([mainMealIngredients, dessertIngredient, cocktailIngredient])
  return ingredients
}

const getAllRecipes = async () => {
  const [mainMealIngredients, dessertIngredient, cocktailIngredient] = await getIngredientsFromTable()
  const mainMealRecipes = getMainMealRecipes(mainMealIngredients)
  const dessertRecipes = getDessertRecipes(dessertIngredient)
  const cocktailRecipes = getCocktailRecipes(cocktailIngredient)
  const allRecipesData = await Promise.all([mainMealRecipes, dessertRecipes, cocktailRecipes])
  return allRecipesData
}

const randomRecipes = (allFoundRecipes) => {
  const drawRecipes = allFoundRecipes.map((a) => a.length > 4 ? utili.randomFewElements(a, 4) : a)
  return drawRecipes
}

const getRecipesData = async () => {
  // return random recipes result of each category
  const allFoundRecipes = await getAllRecipes()
  const recipesData = randomRecipes(allFoundRecipes)
  return recipesData
}

const areRecipes = (array) => array.length !== 0

const renderNoRecipeMessage = (dishType) => {
  const selectedList = document.querySelector(`[data-list=${dishType}]`)
  utili.clearElement(selectedList)
  const listItem = document.createElement('li')
  listItem.innerText = 'Sorry, we didn\'t find any recipes for given ingredients. Change ingredient and try again.'
  selectedList.appendChild(listItem)
}

const renderPuppyShortRecipe = (mealArray, dishType) => {
  if (!areRecipes(mealArray)) {
    renderNoRecipeMessage(dishType)
  } else {
    const selectedList = document.querySelector(`[data-list=${dishType}]`)
    utili.clearElement(selectedList)
    mealArray.forEach((el) => {
      const selectedList = document.querySelector(`[data-list=${dishType}]`)
      const listItem = document.createElement('li')
      const innerText = el.title.replace('Recipe', '').trim()
      listItem.dataset.link = el.href
      listItem.dataset.ingredients = el.ingredients
      listItem.innerHTML = `<span>${innerText}</span><a href="#chosen">show</a>`
      selectedList.appendChild(listItem)
    })
  }
}

const renderDbBaseShortRecipe = (mealArray, dishType) => {
  if (!areRecipes(mealArray)) {
    renderNoRecipeMessage(dishType)
  } else {
    const selectedList = document.querySelector(`[data-list=${dishType}]`)
    utili.clearElement(selectedList)
    mealArray.forEach((el) => {
      const selectedList = document.querySelector(`[data-list=${dishType}]`)
      const listItem = document.createElement('li')
      const innerText = dishType === 'dessert' ? el.strMeal.trim() : el.strDrink.trim()
      listItem.dataset.recipeid = dishType === 'dessert' ? el.idMeal : el.idDrink
      listItem.innerHTML = `<span>${innerText}</span><a href="#chosen">show</a>`
      selectedList.appendChild(listItem)
    })
  }
}

const renderExampleRecipes = async () => {
  const exampleRecipesData = await getRecipesData()
  const [mainMeal, dessert, cocktail] = exampleRecipesData
  renderPuppyShortRecipe(mainMeal, 'mainMeal')
  renderDbBaseShortRecipe(dessert, 'dessert')
  renderDbBaseShortRecipe(cocktail, 'cocktail')
  // const hash = 'suggestions'
  // location.hash = `#${hash}`
  suggestionsBox.scrollIntoView()
  console.log('In order?')
  return true
}

const checkTable = () => {
  const tableState = []
  allTables.forEach((t) => {
    const addedIngredients = t.querySelectorAll('li.item').length
    tableState.push(addedIngredients)
  })
  return tableState
}

const showExampleRecipes = () => {
  const tableState = checkTable()
  if (tableState.every((t) => t === 0)) {
    alert('No ingredients in pot')
    return false
  }
  if (tableState[0] !== 3 || tableState[1] !== 1 || tableState[2] !== 1) {
    alert('Add more ingredients to pot')
    return false
  }
  renderExampleRecipes()
}

export default showExampleRecipes
