import * as utili from './utilities'

const cardBox = document.querySelector('.cardBox')
const selectBox = document.querySelector('.selectBox')

const mainMealInput = document.querySelector('#mainMeal')
const dessertInput = document.querySelector('#dessert')
const cocktailInput = document.querySelector('#cocktail')

const mainMealBox = selectBox.querySelector('[data-input="mainMeal"]')
const dessertBox = selectBox.querySelector('[data-input="dessert"]')
const cocktailBox = selectBox.querySelector('[data-input="cocktail"]')

const warningElement = selectBox.querySelector('.error')
const warningElementText = selectBox.querySelector('.error-message')

const warningHideTime = 3000

const warning = {
  enough: 'Enough ingredients in this category',
  duplicate: 'This ingredient already added'
}

const ingredientsData = {
  mainMeal: {
    limit: 4,
    input: mainMealInput,
    box: mainMealBox
  },
  dessert: {
    limit: 2,
    input: dessertInput,
    box: dessertBox
  },
  cocktail: {
    limit: 2,
    input: cocktailInput,
    box: cocktailBox
  }
}

const getInputValue = (dishGroup) => {
  console.log('I take input value')
  console.log(dishGroup)
  console.log(ingredientsData[dishGroup])
  console.log(dessertInput)
  return ingredientsData[dishGroup].input.value.trim()
}

const renderWarning = (button, dishGroup, reason) => {
  const { [dishGroup]: { box } } = ingredientsData
  // comment out for debugging
  // button.disabled = true
  warningElementText.innerText = reason
  box.prepend(warningElement)
  utili.showElement(warningElement)
  setTimeout(utili.hideElement, warningHideTime, warningElement)
}

const renderCard = (dishGroup, inputValue) => {
  console.log('I render card')
  const htmlContent = `
<div data-card="${dishGroup}" draggable="true" class="card">
  ${inputValue}
</div>`
  cardBox.insertAdjacentHTML('beforeend', htmlContent)
}

const createIngredientCard = (clickedButton) => {
  console.log('You clicked Add Button - I will create a card')
  const dishGroup = clickedButton.parentElement.dataset.input
  console.log(dishGroup)
  const addedIngredients = [...cardBox.querySelectorAll(`[data-card=${dishGroup}]`)].map((i) => i.innerText)
  console.log(addedIngredients.length)
  // check how many ingredients in each category were already added
  if (addedIngredients.length >= ingredientsData[dishGroup].limit) {
    console.log('We have enough ingredients in this category')
    renderWarning(clickedButton, dishGroup, warning.enough)
    return false
  }
  // check if user has already added the ingredient
  const inputValue = getInputValue(dishGroup)
  if (addedIngredients.includes(inputValue)) {
    console.log('Ingredient exist')
    renderWarning(clickedButton, dishGroup, warning.duplicate)
    return false
  }

  console.log(inputValue)
  renderCard(dishGroup, inputValue)
  // comment out for DEBUGGING
  // clickedButton.disabled = true
  return true
}

const hideHints = (e) => {
  const changedEl = e.target
  if (!changedEl.tagName === 'input') return
  console.log('You leave input')
}

const checkInput = (e) => {
  console.log('You focused input by event: ', e.type)
}

const displayHints = (e) => {
  const changedEl = e.target
  if (!changedEl.tagName === 'input') return
  console.log('I start check hints')
}

const getIngredientFromHint = (clickedHint) => {
  console.log('You clicked hint')
}

const selectBoxClicked = (e) => {
  const clickedEl = e.target

  switch (clickedEl.tagName.toLowerCase()) {
    case 'button':
      createIngredientCard(clickedEl)
      break
    case 'li':
      getIngredientFromHint(clickedEl)
      break
    default:
      break
  }
}

export {
  hideHints,
  checkInput,
  displayHints,
  selectBoxClicked
}
