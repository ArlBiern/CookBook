import * as utili from './utilities'
import { getRandomCuriosityTitle, getCuriosity } from './fetching-data'

const curosityBox = document.querySelector('.curosityBox .curosity')
const curiosityCategory = 'Snack_foods'

const getDataCuriosity = async () => {
  const curiosityTitle = await getRandomCuriosityTitle(curiosityCategory)
  const curiosityData = await getCuriosity(curiosityTitle)
  return curiosityData
}

const renderCuriosity = async (curiosityData) => {
  const htmlContent = `
    <h2>${curiosityData.title}</h2>
    <p>${curiosityData.extract}</p>
    <a class="mainButton sectionB" href="${curiosityData.page}" target="_blank">read more</a>
  `
  utili.clearElement(curosityBox)
  curosityBox.insertAdjacentHTML('afterbegin', htmlContent)
}

const showCuriosity = async () => {
  const curiosity = await getDataCuriosity()
  const renderedCuriosity = await renderCuriosity(curiosity)
  return renderedCuriosity
}

export { showCuriosity }
