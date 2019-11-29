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
import * as ing from './js/ingredient-inputs'

const pageLoad = () => {
  // const addIngredientButtons = document.querySelectorAll('.selectBox button')
  // const ingredientInputs = document.querySelectorAll('selectBox input')
  // const hintLists = document.querySelectorAll('.selectBox ul')
  const selectBox = document.querySelector('.selectBox')
  const ingredientsInputs = document.querySelectorAll('.selectBox input')

  const preparePage = () => {
    new Glide('.glide', { autoplay: 4000 }).mount()
    // for DEBUGGING
    const buttons = [...document.querySelectorAll('.selectBox button')]
    buttons.forEach((b) => {
      console.log('zmieniam button')
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
}

document.addEventListener('DOMContentLoaded', pageLoad)
