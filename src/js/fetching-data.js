const cocktaildbBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const mealdbBaseUrl = 'https://www.themealdb.com/api/json/v1/1/'
const puppyBaseUrl = 'https://cookcoorse.glitch.me/http://www.recipepuppy.com/'

const puppyHeaders = {
  'X-Requested-With': 'XMLHttpRequest'
}

const dbIngredientListEndpoint = 'list.php?i=list'
const puppyIngredientListEndpoint = 'ing.php?q='

const getIngredients = (dishGroup) => {
  // console.log('Getting ingredients')
  if (dishGroup === 'cocktail') {
    const hints = []
    return fetch(`${cocktaildbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.drinks)
      .then((drinkTable) => drinkTable.forEach((d) => hints.push(d.strIngredient1)))
      .then(() => hints)
  }

  if (dishGroup === 'dessert') {
    const hints = []
    return fetch(`${mealdbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.meals)
      .then((mealTable) => mealTable.forEach((d) => hints.push(d.strIngredient)))
      .then(() => hints)
  }
  return false
}

// console.log('Getting Main Ingredients')
const getMainMealIngredients = (ingredient) => fetch(
  `${puppyBaseUrl}${puppyIngredientListEndpoint}${ingredient}`,
  puppyHeaders
)
  .then((res) => res.text())
  .then((resText) => resText.split('\n'))
  .then((array) => {
    array.pop()
    return array.map((i) => i.trim())
  })

export { getIngredients, getMainMealIngredients }
