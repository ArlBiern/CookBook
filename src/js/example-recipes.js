import { getMainMealRecipes, getDessertRecipes, getCocktailRecipes } from './fetching-data'
const potTable = document.querySelector('.potTable')
const allTables = document.querySelectorAll('[data-box]')
// const mainMealTable = pot.querySelector('[data-box="mainMeal"]')
// const dessertTable = pot.querySelector('[data-box="dessert"]')
// const cocktailTable = pot.querySelector('[data-box="cocktail"]')

const getValueFromCard = (card) => {
  const cardValue = card.innerText.slice(0, -1).toLowerCase()
  return cardValue
}

const getIngredient = async (dish) => {
  const table = potTable.querySelector(`[data-box="${dish}"]`)
  const tableElements = table.querySelectorAll('li.item')
  const tableIngredients = []
  tableElements.forEach((el) => tableIngredients.push(getValueFromCard(el)))
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
  console.log('getAllRecipes after fetch', allRecipesData)
  return allRecipesData
}

const randomRecipes = (allFoundRecipes) => {
  const randomedRecipes = []
  return randomedRecipes
}

const getRecipesData = async () => {
  // return random recipes result of each category
  const allFoundRecipes = await getAllRecipes()
  const recipesData = randomRecipes(allFoundRecipes)
  return recipesData
}

const renderExampleRecipes = async () => {
  console.log('Show recipes')
  const exampleRecipesData = await getRecipesData()
  // here rendering recipes function
  return exampleRecipesData
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
