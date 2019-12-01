// const pot = document.querySelector('.pot')
const allTables = document.querySelectorAll('[data-box]')
// const mainMealTable = pot.querySelector('[data-box="mainMeal"]')
// const dessertTable = pot.querySelector('[data-box="dessert"]')
// const cocktailTable = pot.querySelector('[data-box="cocktail"]')

const renderExampleRecipes = async () => {
  console.log('Show recipes')
  // const exampleRecipesData = await getRecipesData()
  // here rendering recipes function
}

const checkTable = () => {
  const tableState = []
  allTables.forEach((t) => {
    const addedIngredients = t.querySelectorAll('li.item').length
    tableState.push(addedIngredients)
  })
  return tableState
}

const showExampleRecipes = () => {
  const tableState = checkTable()
  if (tableState.every((t) => t === 0)) {
    alert('No ingredients in pot')
    return false
  }
  if (tableState[0] !== 3 || tableState[1] !== 1 || tableState[2] !== 1) {
    alert('Add more ingredients to pot')
    return false
  }
  renderExampleRecipes()
}

export default showExampleRecipes
