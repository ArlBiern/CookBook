const createIngredientCard = (clickedButton) => {
  console.log('You clicked Add Button - I will create a card')
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
    // case 'input':
    //   checkInput(clickedEl)
    //   break
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
