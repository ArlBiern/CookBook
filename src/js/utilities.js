const isHidden = (e, boolean) => e.classList.toggle('hidden', boolean)
const isHiddenBox = (e, boolean) => e.classList.toggle('hiddenBox', boolean)

const hideWarning = (e) => {
  const warning = e.target.parentElement
  isHidden(warning, true)
}

const clearElement = (el) => {
  while (el.firstChild) {
    el.firstChild.remove()
  }
}

const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase()

const randomFewElements = (array, limit) => {
  const elements = new Set()
  while (elements.size !== limit) {
    elements.add(array[Math.floor(Math.random() * array.length - 1) + 1])
  }
  const elementsArray = [...elements]
  return elementsArray
}

const getValueFromCard = (card) => {
  const cardValue = card.innerText.slice(0, -1).toLowerCase().trim()
  return cardValue
}

export {
  hideWarning,
  clearElement,
  isHidden,
  capitalizeFirstLetter,
  randomFewElements,
  getValueFromCard,
  isHiddenBox
}
