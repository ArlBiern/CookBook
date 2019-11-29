import './css/main.css'
import './css/curosity.css'
import './css/cards.css'
import './css/selected.css'
import './css/list.css'
import './css/error.css'
import './css/dropdown.css'
import './css/utilities.css'
import './css/glide.core.min.css'
import './css/glide.theme.min.css'
import Glide from '@glidejs/glide'
import * as utili from './js/utilities'
import * as ing from './js/ingredient-inputs'

const pageLoad = () => {
  const selectBox = document.querySelector('.selectBox')
  const ingredientsInputs = document.querySelectorAll('.selectBox input')
  const errorCloseButton = document.querySelector('.error-close-button')

  const preparePage = () => {
    new Glide('.glide', { autoplay: 4000 }).mount()
    // for DEBUGGING
    const buttons = [...document.querySelectorAll('.selectBox button')]
    buttons.forEach((b) => {
      console.log('I turn buttons on')
      b.disabled = false
    })
  }

  preparePage()
  selectBox.addEventListener('click', ing.selectBoxClicked)
  selectBox.addEventListener('click', ing.selectBoxClicked)
  selectBox.addEventListener('click', ing.selectBoxClicked)
  selectBox.addEventListener('input', ing.displayHints)
  ingredientsInputs.forEach((i) => {
    i.addEventListener('blur', ing.hideHints)
  })
  ingredientsInputs.forEach((i) => {
    i.addEventListener('focus', ing.checkInput)
  })
  errorCloseButton.addEventListener('click', utili.hideWarning)
}

document.addEventListener('DOMContentLoaded', pageLoad)
