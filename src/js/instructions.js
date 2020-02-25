const instrButton = document.querySelector('.instructions')
const instrBox = document.querySelector('.instructionsBox')
const instrClose = document.querySelector('.close')

const removeClass = () => instrBox.classList.remove('hiddenBox')
const addClass = () => instrBox.classList.add('hiddenBox')

instrButton.addEventListener('click', removeClass)
instrClose.addEventListener('click', addClass)
