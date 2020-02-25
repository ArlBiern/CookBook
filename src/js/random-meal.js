/* eslint-disable no-undef */

const container = document.querySelector('.visibleMeal')

const getMeal = function () {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const allData = data.meals[0]

      let items = ''
      for (const el in allData) {
        if (allData[el] !== '' && el.includes('strIngredient')) {
          items += `<li>${allData[el]}</li>`
        }
      }

      const output = `
        <h3>${allData.strMeal}</h3>
        <a href="${allData.strSource}" class="mainButton sectionA" target="_blank">see more details</a>
        <h4>Ingredients:</h4>
        <ul>${items}</ul>
        <h4>Preparation:</h4>
        <p>${allData.strInstructions}</p>
      `
      showProperBox()
      container.innerHTML = output
    })
    .catch(err => {
      console.log(err)
      alert('Something went wrong, problem with connection, try again')
    })
}

const showProperBox = function () {
  const divs = document.querySelectorAll('.selectedBox .blockBox > div')
  for (const div of divs) {
    div.classList.add('hiddenBox')
  }
  container.classList.remove('hiddenBox')
}

const randomMealButton = document.querySelector('.randomMealButton')

randomMealButton.addEventListener('click', getMeal)
