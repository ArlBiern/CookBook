import * as utili from './utilities'
import { getIngredients, getMainMealIngredients } from './fetching-data'

const cardBox = document.querySelector('.cardBox')
const selectBox = document.querySelector('.selectBox')

const mainMealBox = selectBox.querySelector('[data-input="mainMeal"]')
const dessertBox = selectBox.querySelector('[data-input="dessert"]')
const cocktailBox = selectBox.querySelector('[data-input="cocktail"]')

const mainMealInput = document.querySelector('#mainMeal')
const dessertInput = document.querySelector('#dessert')
const cocktailInput = document.querySelector('#cocktail')

const buttons = [...selectBox.querySelectorAll('button')]
const [mainMealButton, dessertButton, cocktailButton] = buttons

const hintsLists = [...selectBox.querySelectorAll('[data-select]')]
const [mainMealHints, dessertHints, cocktailHints] = hintsLists

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
    box: mainMealBox,
    button: mainMealButton,
    hints: mainMealHints
  },
  dessert: {
    limit: 2,
    input: dessertInput,
    box: dessertBox,
    button: dessertButton,
    cache: null,
    hints: dessertHints
  },
  cocktail: {
    limit: 2,
    input: cocktailInput,
    box: cocktailBox,
    button: cocktailButton,
    cache: null,
    hints: cocktailHints
  }
}

const getInputValue = (dishGroup) => ingredientsData[dishGroup].input.value.trim().toLowerCase()

const renderWarning = (button, dishGroup, reason) => {
  const { [dishGroup]: { box } } = ingredientsData
  button.disabled = true
  warningElementText.innerText = reason
  box.prepend(warningElement)
  utili.isHidden(warningElement, false)
  setTimeout(utili.isHidden, warningHideTime, warningElement, true)
}

const renderCard = (dishGroup, inputValue) => {
  //
  const capitalizeInputValue = utili.capitalizeFirstLetter(inputValue)
  const htmlContent = `<div data-card="${dishGroup}" draggable="true" class="card dragged">${capitalizeInputValue}<span class="deleteItem">+</span></div>`
  cardBox.insertAdjacentHTML('beforeend', htmlContent)
}

const createIngredientCard = (clickedButton) => {
  // console.log('You clicked Add Button - I will create a card')
  const dishGroup = clickedButton.parentElement.dataset.input
  const addedIngredients = [...cardBox.querySelectorAll(`[data-card=${dishGroup}]`)].map((i) => utili.getValueFromCard(i))
  // check how many ingredients in each category were already added
  if (addedIngredients.length >= ingredientsData[dishGroup].limit) {
    renderWarning(clickedButton, dishGroup, warning.enough)
    return false
  }
  // check if user has already added the ingredient
  const inputValue = getInputValue(dishGroup)
  if (addedIngredients.includes(inputValue)) {
    renderWarning(clickedButton, dishGroup, warning.duplicate)
    return false
  }

  renderCard(dishGroup, inputValue)
  // comment out for DEBUGGING
  clickedButton.disabled = true
  return true
}

const hideHints = (dishGroup) => {
  utili.isHidden(ingredientsData[dishGroup].hints, true)
}

const checkInput = (e) => {
  // console.log('You focused input by event: ', e.type)
  const dishGroup = e.currentTarget.parentElement.dataset.input
  ingredientsData[dishGroup].button.disabled = true
}

const findMatched = (value, array) => array.filter((el) => {
  const regex = new RegExp(value, 'gi')
  return el.match(regex)
})

const getAllHints = async (dishGroup) => {
  if (!ingredientsData[dishGroup].cache) {
    const allIngredients = await getIngredients(dishGroup)
    ingredientsData[dishGroup].cache = allIngredients
    return ingredientsData[dishGroup].cache
  }
  if (ingredientsData[dishGroup].cache) {
    const allIngredients = ingredientsData[dishGroup].cache
    return allIngredients
  }
  return false
}

const getMatchedHints = async (dishGroup) => {
  const actualInputValue = ingredientsData[dishGroup].input.value
  if (dishGroup === 'mainMeal') {
    const mainMealIngredients = await getMainMealIngredients(actualInputValue)
    return mainMealIngredients
  }

  const allIngredients = await getAllHints(dishGroup)
  const matchedIngredients = findMatched(actualInputValue, allIngredients)
  return matchedIngredients
}

const renderHints = async (dishGroup) => {
  const matchedHints = await getMatchedHints(dishGroup)

  matchedHints.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) return -1
    if (a.toLowerCase() > b.toLowerCase()) return 1
    return 0
  })

  const matchedEl = matchedHints.map((e) => Object.assign(
    document.createElement('li'), {
      textContent: utili.capitalizeFirstLetter(e)
    }
  ))

  utili.clearElement(ingredientsData[dishGroup].hints)

  matchedEl.forEach((el) => ingredientsData[dishGroup].hints.appendChild(el))

  utili.isHidden(ingredientsData[dishGroup].hints, false)
}

const checkForHints = (e) => {
  const changedEl = e.target

  if (!changedEl.tagName === 'input') return

  const dishGroup = changedEl.parentElement.dataset.input
  ingredientsData[dishGroup].button.disabled = true

  if (changedEl.value.trim().length < 3) {
    utili.isHidden(ingredientsData[dishGroup].hints, true)
    return
  }

  renderHints(dishGroup)
}

const getIngredientFromHint = (clickedHint) => {
  // console.log('You clicked hint')
  const { textContent } = clickedHint
  const dishGroup = clickedHint.parentElement.dataset.select
  ingredientsData[dishGroup].input.value = textContent
  hideHints(dishGroup)
  ingredientsData[dishGroup].button.disabled = false
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

const hideShowedHintLists = (e) => {
  if (e.target.tagName.toLowerCase() !== 'li') {
    hintsLists.forEach((h) => {
      utili.isHidden(h, true)
    })
  }
}

export {
  hideHints,
  checkInput,
  checkForHints,
  selectBoxClicked,
  hideShowedHintLists
}
