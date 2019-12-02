import './css/main.css'
import './css/curosity.css'
import './css/cards.css'
import './css/selected.css'
import './css/list.css'
import './css/error.css'
import './css/dropdown.css'
import './css/utilities.css'
import './css/pan-anim.css'
import './css/glide.core.min.css'
import './css/glide.theme.min.css'
import './css/instructions.css'
import './css/rwd.css'
import './assets/favicon.ico'
import Glide from '@glidejs/glide'
import * as utili from './js/utilities'
import { showCuriosity } from './js/curosity'
import * as ing from './js/ingredient-inputs'
import showRandomDrink from './js/random-drink'
import showExampleRecipes from './js/example-recipes'
import showSelectedRecipes from './js/selected-recipes'
import { createFlame, createPan } from './js/pan-anim'
import './js/random-meal'
import './js/instructions'
import dragAndDrop from './js/drag-drop'

const pageLoad = () => {
  const newCuriosityButton = document.querySelector('.randomCurosityButton')
  const selectBox = document.querySelector('.selectBox')
  const ingredientsInputs = document.querySelectorAll('.selectBox input')
  const errorCloseButton = document.querySelector('.error-close-button')
  const searchButton = document.querySelector('.pot .search')
  const exampleRecipesArea = document.querySelector('#chefSuggestions')

  const preparePage = () => {
    new Glide('.glide', { autoplay: 4000 }).mount()
    // for DEBUGGING
    // const buttons = [...document.querySelectorAll('.selectBox button')]
    // buttons.forEach((b) => {
    //   console.log('I turn buttons on')
    //   b.disabled = false
    // })

    // Get and show first curiosity
    showCuriosity()

    // Get and show random drink
    showRandomDrink('.visibleDrink')

    // Drag and drop
    dragAndDrop()

    // Creating pan animation
    const animCnt = document.querySelector('.visiblePan')
    createPan(animCnt, '250px')
    createFlame(animCnt, 1, '100px')
  }

  preparePage()
  document.addEventListener('click', ing.hideShowedHintLists)
  newCuriosityButton.addEventListener('click', showCuriosity)
  selectBox.addEventListener('click', ing.selectBoxClicked)
  selectBox.addEventListener('input', ing.checkForHints)
  ingredientsInputs.forEach((i) => {
    i.addEventListener('focus', ing.checkInput)
  })
  errorCloseButton.addEventListener('click', utili.hideWarning)
  searchButton.addEventListener('click', showExampleRecipes)
  exampleRecipesArea.addEventListener('click', showSelectedRecipes)
}

document.addEventListener('DOMContentLoaded', pageLoad)
