const isHidden = (e, boolean) => e.classList.toggle('hidden', boolean)

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

export {
  hideWarning,
  clearElement,
  isHidden,
  capitalizeFirstLetter
}
