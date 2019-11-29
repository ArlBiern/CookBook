const showElement = (el) => el.classList.remove('hidden')

const hideElement = (el) => el.classList.add('hidden')

const hideWarning = (e) => {
  const warning = e.target.parentElement
  hideElement(warning)
}

export { showElement, hideElement, hideWarning }
