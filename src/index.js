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
import './css/rwd.css'
import Glide from '@glidejs/glide'
import * as utili from './js/utilities'
import * as ing from './js/ingredient-inputs'
import showRandomDrink from './js/random-drink.js'
import { createFlame, createPan } from './js/pan-anim'
import './js/random-meal.js'

const pageLoad = () => {
  const selectBox = document.querySelector('.selectBox')
  const ingredientsInputs = document.querySelectorAll('.selectBox input')
  const errorCloseButton = document.querySelector('.error-close-button')

  const preparePage = () => {
    new Glide('.glide', { autoplay: 4000 }).mount()
    // for DEBUGGING
    // const buttons = [...document.querySelectorAll('.selectBox button')]
    // buttons.forEach((b) => {
    //   console.log('I turn buttons on')
    //   b.disabled = false
    // })

    // Get and show random drink
    showRandomDrink('.visibleDrink')

    // Creating pan animation
    const animCnt = document.querySelector('.visiblePan')
    createPan(animCnt, '250px')
    createFlame(animCnt, 1, '100px')
  }

  preparePage()
  document.addEventListener('click', ing.hideShowedHintLists)
  selectBox.addEventListener('click', ing.selectBoxClicked)
  selectBox.addEventListener('input', ing.checkForHints)
  ingredientsInputs.forEach((i) => {
    i.addEventListener('focus', ing.checkInput)
  })
  errorCloseButton.addEventListener('click', utili.hideWarning)
}

document.addEventListener('DOMContentLoaded', pageLoad)
