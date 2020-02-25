const getRandomDrink = async () => {
  try {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const data = await res.json()
    const drink = data.drinks[0]
    let ingredients = ''
    for (const prop in drink) {
      if (drink[prop] !== null && prop.includes('strIngredient')) {
        const nbr = prop.slice(-2).match(/\d+/g).toString()
        ingredients += `<li>${drink[prop]}: ${drink['strMeasure' + nbr]}</li>`
      }
    }
    return `
      <h3>${drink.strDrink}</h3>
      <h4>Ingredients</h4>
      <ul>${ingredients}</ul>
      <h4>Preparation</h4>
      <p> ${drink.strInstructions}</p>
      `
  } catch (err) {
    alert('Something goes wrong, refresh and try one more time')
  }
}

const showRandomDrink = (selector) => {
  const link = document.querySelector('.randomDrinkButton')
  const cnt = document.querySelectorAll('.selectedBox .blockBox > div')
  const drinkCnt = document.querySelector(selector)

  link.addEventListener('click', () => {
    const drinkInnerHTML = Promise.resolve(getRandomDrink())
    drinkInnerHTML.then(value => {
      drinkCnt.innerHTML = value
      cnt.forEach(el => {
        el.classList.add('hiddenBox')
      })
      drinkCnt.classList.remove('hiddenBox')
    })
  })
}

module.exports = showRandomDrink
