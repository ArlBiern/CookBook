import * as utili from './utilities'
import { getDessertRecipe, getCocktailRecipe } from './fetching-data'

const selectedBoxes = document.querySelectorAll('.selectedBox .blockBox > div')
const panBox = document.querySelector('.selectedBox .visiblePan')
const selectedBox = document.querySelector('.selectedBox .gridBox')
const mainMealRecipeBox = document.querySelector('.selectedBox [data-selected="mainMeal"]')
const dessertRecipeBox = document.querySelector('.selectedBox [data-selected="dessert"]')
const cocktailRecipeBox = document.querySelector('.selectedBox [data-selected="cocktail"]')

const getRecipeData = async (recipeEl) => {
  if (Object.prototype.hasOwnProperty.call(recipeEl.dataset, 'recipeid')) {
    console.log('Ok, i have data property')
    console.log('Moj rodzic to:', recipeEl.parentElement.dataset.list)
    const recipeData = (recipeEl.parentElement.dataset.list === 'dessert'
      ? await getDessertRecipe(recipeEl.dataset.recipeid) : await getCocktailRecipe(recipeEl.dataset.recipeid))
    return recipeData
  } else {
    console.log(recipeEl)
    console.log(recipeEl.querySelector('span'))
    const name = recipeEl.querySelector('span').innerText
    const ingredients = recipeEl.dataset.ingredients.split(', ')
    const source = recipeEl.dataset.link
    const recipeData = {
      name,
      ingredients,
      source
    }
    console.log(recipeData)
    return recipeData
  }
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
  console.log(selectedBox)
  utili.isHiddenBox(selectedBox, false)
}

const renderMainMeal = (data) => {
  console.log('Main meal rendering')
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
  console.log('Cocktail rendering')
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
  console.log('Dessert rendering')
  console.log(data)
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
  // render recipe
  const dishType = recipeEl.closest('[data-list]').dataset.list
  dishType === 'mainMeal' ? renderMainMeal(recipeData) : (dishType === 'cocktail' ? renderCocktail(recipeData) : renderDessert(recipeData))
  showSelectedBox()
}

const showSelectedRecipes = (e) => {
  if (e.target.tagName.toLowerCase() === 'a') {
    console.log('Im going to show your recipe')
    showPan()
    renderSelectedRecipe(e.target)
  }
}

export default showSelectedRecipes
