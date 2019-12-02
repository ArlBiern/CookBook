import * as utili from './utilities'

const cocktaildbBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'
const mealdbBaseUrl = 'https://www.themealdb.com/api/json/v1/1/'
const puppyBaseUrl = 'https://cookcoorse.glitch.me/http://www.recipepuppy.com/'
const wikipediaBaseUrl = 'https://en.wikipedia.org/w/api.php'
const wikipediaRestBaseUrl = 'https://en.wikipedia.org/api/rest_v1/'
const wikipediaCategoryParams = 'action=query&list=categorymembers&format=json&cmlimit=200&cmtitle=Category%3A'
const wikipediaOriginParam = 'origin=*'
const wikipediaRestSummaryEndpoint = 'page/summary/'

const puppyHeaders = {
  'X-Requested-With': 'XMLHttpRequest'
}

const dbIngredientListEndpoint = 'list.php?i=list'
const dbRecipesEndpoint = 'filter.php?i='
const dbRecipeEndpoint = 'lookup.php?i='

const puppyIngredientListEndpoint = 'ing.php?q='
const puppySearchRecipeEndpoint = 'api/?i='

const getIngredients = (dishGroup) => {
  if (dishGroup === 'cocktail') {
    const hints = []
    return fetch(`${cocktaildbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.drinks)
      .then((drinkTable) => drinkTable.forEach((d) => hints.push(d.strIngredient1)))
      .then(() => hints)
      .catch((err) => console.log(`Error: ${err}`))
  }

  if (dishGroup === 'dessert') {
    const hints = []
    return fetch(`${mealdbBaseUrl}${dbIngredientListEndpoint}`)
      .then((res) => res.json())
      .then((resJson) => resJson.meals)
      .then((mealTable) => mealTable.forEach((d) => hints.push(d.strIngredient)))
      .then(() => hints)
      .catch((err) => console.log(`Error: ${err}`))
  }
  return false
}

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
  .catch((err) => console.log(`Error: ${err}`))

const getMainMealRecipes = (ingredients) => {
  const queryString = ingredients.join(',')
  return fetch(`${puppyBaseUrl}${puppySearchRecipeEndpoint}${queryString}`, puppyHeaders)
    .then((res) => res.json())
    .then((resJson) => resJson.results)
    .catch((err) => console.log(err))
}

const getMealCategory = (list) => {
  const extendedMealList = []
  list.forEach((el) => extendedMealList.push(
    fetch(`${mealdbBaseUrl}${dbRecipeEndpoint}${el.idMeal}`)
      .then((res) => res.json())
      .then((resJson) => resJson.meals[0].strCategory.toLowerCase())
      .then((category) => {
        el.category = category
        return el
      })
      .catch((err) => console.log(`Error: ${err}`))
  ))
  return Promise.all(extendedMealList)
}

const getDessertRecipes = async (ingredients) => {
  const queryString = ingredients[0]
  return fetch(`${mealdbBaseUrl}${dbRecipesEndpoint}${queryString}`)
    .then((res) => res.json())
    .then((resJson) => resJson.meals)
    .then(getMealCategory)
    .then((listWithCategory) => listWithCategory.filter((el) => el.category === 'dessert'))
    .catch((err) => console.log(`Error: ${err}`))
}

const getCocktailRecipes = (ingredients) => {
  const queryString = ingredients[0]
  return fetch(`${cocktaildbBaseUrl}${dbRecipesEndpoint}${queryString}`)
    .then((res) => res.json())
    .then((resJson) => resJson.drinks)
    .catch((err) => console.log(`Error: ${err}`))
}

const getDessertRecipe = (recipeid) => {
  return fetch(`${mealdbBaseUrl}${dbRecipeEndpoint}${recipeid}`)
    .then((res) => res.json())
    .then((resJson) => resJson.meals[0])
    .then((data) => {
      const name = data.strMeal.trim()
      const source = data.strSource
      const image = data.strMealThumb
      const ingredientsNames = []
      const ingredientsMeasures = []
      for (const prop in data) {
        if (data[prop] && prop.includes('strIngredient')) {
          ingredientsNames.push(data[prop])
        }
      }
      for (const prop in data) {
        if (data[prop] && prop.includes('strMeasure')) {
          ingredientsMeasures.push(data[prop])
        }
      }
      const ingredients = []
      for (let i = 0; i < ingredientsNames.length; i++) {
        ingredients.push(`${ingredientsNames[i].trim()}: ${ingredientsMeasures[i].trim()}`)
      }
      const recipeData = {
        name,
        ingredients,
        source,
        image
      }
      return recipeData
    })
    .catch((err) => console.log(`Error: ${err}`))
}

const getCocktailRecipe = (recipeid) => {
  return fetch(`${cocktaildbBaseUrl}${dbRecipeEndpoint}${recipeid}`)
    .then((res) => res.json())
    .then((resJson) => resJson.drinks[0])
    .then((data) => {
      const name = data.strDrink.trim()
      const instruction = data.strInstructions
      const ingredientsNames = []
      const ingredientsMeasures = []
      for (const prop in data) {
        if (data[prop] !== null && prop.includes('strIngredient')) {
          ingredientsNames.push(data[prop])
        }
      }
      for (const prop in data) {
        if (data[prop] && prop.includes('strMeasure')) {
          ingredientsMeasures.push(data[prop])
        }
      }
      const ingredients = []
      for (let i = 0; i < ingredientsNames.length; i++) {
        ingredients.push(`${ingredientsNames[i].trim()}: ${ingredientsMeasures[i].trim()}`)
      }
      const recipeData = {
        name,
        ingredients,
        instruction
      }
      return recipeData
    })
    .catch((err) => console.log(`Error: ${err}`))
}

const getCuriosity = async (articleTitle) => {
  const fetchAddress = `${wikipediaRestBaseUrl}${wikipediaRestSummaryEndpoint}${articleTitle}`
  return fetch(fetchAddress)
    .then((res) => (res.json()))
    .then((resJson) => {
      const articleExtractObject = resJson
      const { displaytitle: title, extract, content_urls: { desktop: { page } } } = articleExtractObject
      return { title, extract, page }
    })
    .catch((err) => console.log(`Error: ${err}`))
}

const isPage = (wikiElement) => ((wikiElement.title.startsWith('List') ||
  wikiElement.title.startsWith('Category') ||
  wikiElement.title.startsWith('Template') ||
  wikiElement.title.startsWith('File')) === false)

const getCategoryContent = (categoryName) => {
  const fetchAddress = `${wikipediaBaseUrl}?${wikipediaCategoryParams}${categoryName}&${wikipediaOriginParam}`
  return fetch(fetchAddress)
    .then((res) => res.json())
    .then((resJson) => resJson.query.categorymembers.filter(isPage))
    .catch((err) => console.log(`Error: ${err}`))
}

const getRandomCuriosityTitle = async (categoryName) => {
  const categoryContent = await getCategoryContent(categoryName)
  const randomArticle = utili.random(categoryContent.length)
  const randomArticleTitle = utili.underscoreText(categoryContent[randomArticle].title)
  return randomArticleTitle
}

export {
  getIngredients,
  getMainMealIngredients,
  getMainMealRecipes,
  getDessertRecipes,
  getCocktailRecipes,
  getDessertRecipe,
  getCocktailRecipe,
  getRandomCuriosityTitle,
  getCuriosity
}
