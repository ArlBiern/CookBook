import * as utili from './utilities'
import { getRecipe, getCocktailRecipe } from './fetching-data'

const selectedBoxes = document.querySelectorAll('.selectedBox .blockBox > div')
const panBox = document.querySelector('.selectedBox .visiblePan')
const selectedBox = document.querySelector('.selectedBox .gridBox')
const mainMealRecipeBox = document.querySelector('.selectedBox [data-selected="mainMeal"]')
const dessertRecipeBox = document.querySelector('.selectedBox [data-selected="dessert"]')
const cocktailRecipeBox = document.querySelector('.selectedBox [data-selected="cocktail"]')

const getRecipeData = async (recipeEl) => {
  const recipeData = (recipeEl.parentElement.dataset.list === 'cocktail'
    ? await getCocktailRecipe(recipeEl.dataset.recipeid) : await getRecipe(recipeEl.dataset.recipeid))
  return recipeData
}

const hideAllBoxes = () => {
  selectedBoxes.forEach((b) => {
    utili.isHiddenBox(b, true)
  })
}

const showPan = () => {
  hideAllBoxes()
  utili.isHiddenBox(panBox, false)
}

const showSelectedBox = () => {
  hideAllBoxes()
  utili.isHiddenBox(selectedBox, false)
}

const renderMainMeal = (data) => {
  const {
    name,
    ingredients,
    source
  } = data
  let ingredientsListHTML = ''
  ingredients.forEach((i) => {
    ingredientsListHTML += `<li>${i}</li>`
  })
  const recipeHTML = `
    <h3>${name}</h3>
    <ul>${ingredientsListHTML}</ul>
    <a class="mainButton sectionA" href="${source}" target="_blank">preparation</a>
    `
  utili.clearElement(mainMealRecipeBox)
  mainMealRecipeBox.insertAdjacentHTML('afterbegin', recipeHTML)
}

const renderCocktail = (data) => {
  const {
    name,
    ingredients,
    instruction
  } = data
  let ingredientsListHTML = ''
  ingredients.forEach((i) => {
    ingredientsListHTML += `<li>${i}</li>`
  })
  const recipeHTML = `
<h3>${name}</h3>
<ul>${ingredientsListHTML}</ul>
<p>${instruction}</p>
`
  utili.clearElement(cocktailRecipeBox)
  cocktailRecipeBox.insertAdjacentHTML('afterbegin', recipeHTML)
}

const renderDessert = (data) => {
  const {
    name,
    ingredients,
    source
  } = data
  let ingredientsListHTML = ''
  ingredients.forEach((i) => {
    ingredientsListHTML += `<li>${i}</li>`
  })
  const recipeHTML = `
  <h3>${name}</h3>
  <ul>${ingredientsListHTML}</ul>
  <a class="mainButton sectionB" href="${source}" target="_blank">preparation</a>
  `
  utili.clearElement(dessertRecipeBox)
  dessertRecipeBox.insertAdjacentHTML('afterbegin', recipeHTML)
}

const renderSelectedRecipe = async (recipeEl) => {
  const recipeData = await getRecipeData(recipeEl.parentElement)
  const dishType = recipeEl.closest('[data-list]').dataset.list
  dishType === 'mainMeal' ? renderMainMeal(recipeData) : (dishType === 'cocktail' ? renderCocktail(recipeData) : renderDessert(recipeData))
  showSelectedBox()
}

const showSelectedRecipes = (e) => {
  if (e.target.tagName.toLowerCase() === 'a') {
    showPan()
    renderSelectedRecipe(e.target)
  }
}

export default showSelectedRecipes
