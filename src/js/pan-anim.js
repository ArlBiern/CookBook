// === Flames ===

function createFlame (element, count = 1, size = '120px') {
  const mainDiv = document.createElement('div')
  mainDiv.classList.add('flame_cnt')
  if (size !== '120px') {
    mainDiv.style.setProperty('--flame_cnt_size', `${size}`)
  }

  for (let i = 1; i <= count; i++) {
    const flamesDiv = document.createElement('div')
    flamesDiv.classList.add('flames')

    const flameUpDiv = document.createElement('div')
    const flameDownDiv = document.createElement('div')

    for (let i = 1; i <= 5; i++) {
      const flameUpElement = document.createElement('div')
      flameUpElement.classList.add('flame_up')

      const flameDownElement = document.createElement('div')
      flameDownElement.classList.add('flame_down')

      flameUpDiv.appendChild(flameUpElement)
      flameDownDiv.appendChild(flameDownElement)
    }

    flamesDiv.appendChild(flameUpDiv)
    flamesDiv.appendChild(flameDownDiv)

    mainDiv.appendChild(flamesDiv)
  }

  element.appendChild(mainDiv)
}

// === Pan elements === //

function createPan (element, size = '250px') {
  const mainDiv = document.createElement('div')
  mainDiv.classList.add('pan_cnt')
  if (size !== '250px') {
    mainDiv.style.setProperty('--pan_anim_size', `${size}`)
  }

  const paragraph = document.createElement('p')
  paragraph.innerText = 'Waiting for your choice...'
  mainDiv.appendChild(paragraph)

  const cookingDiv = document.createElement('div')
  cookingDiv.classList.add('cooking_animation')

  for (let i = 1; i <= 5; i++) {
    const bubbleDiv = document.createElement('div')
    bubbleDiv.classList.add('bubble')
    cookingDiv.appendChild(bubbleDiv)
  }

  const panArea = document.createElement('div')
  panArea.classList.add('pan_area')

  panArea.innerHTML += `
    <div class="pan_elements">
      <div class="pan"></div>
      <div class="handle"></div>
    </div>
    <div class="pancake">
      <div class="pastry"></div>
    </div>
    `
  cookingDiv.appendChild(panArea)
  mainDiv.appendChild(cookingDiv)

  element.appendChild(mainDiv)
}

module.exports.createFlame = createFlame
module.exports.createPan = createPan
