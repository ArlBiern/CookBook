const dragAndDrop = () => {
  let dragged
  const box = document.querySelector('.findBox')
  const allLists = box.querySelectorAll('[data-box]')
  const deleteAll = box.querySelector('.clear.sectionC')

  deleteAll.addEventListener('click', () => {
    Array.from(allLists).map(list => {
      while (list.children.length > 1) {
        list.removeChild(list.lastElementChild)
      }
    })
  })

  box.addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteItem')) {
      e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    }
  })

  box.addEventListener('dragstart', e => {
    dragged = e.target
    e.target.classList.toggle('dragstart')
  })

  box.addEventListener('dragend', e => {
    e.target.classList.toggle('dragstart')
  })

  box.addEventListener('dragover', e => {
    e.preventDefault()
  })

  box.addEventListener('dragenter', e => {
    if (e.target.className === 'dropzone') {
      e.target.classList.toggle('dragenter')
    }
  })

  box.addEventListener('dragleave', e => {
    if (e.target.classList.contains('dropzone')) {
      e.target.classList.toggle('dragenter')
    }
  })

  box.addEventListener('drop', e => {
    e.preventDefault()
    const type = dragged.dataset.card
    const check = checkLimits(dragged, type)
    if (e.target.classList.contains('dropzone') && !check) {
      itemAddition(dragged, type)
      e.target.classList.toggle('dragenter')
      dragged.parentNode.removeChild(dragged)
    }
    if (e.target.classList.contains('dropzone') && check) {
      alert('You have added to many ingredients')
      e.target.classList.toggle('dragenter')
    }
  })

  function itemAddition (draggedElement, type) {
    Array.from(allLists).map(list => {
      if (list.dataset.box === type) {
        const listItem = document.createElement('li')
        listItem.classList.add('item')
        const innerText = draggedElement.innerText.slice(0, -1)
        listItem.innerHTML = `${innerText}<span class="deleteItem">+</span>`
        list.appendChild(listItem)
      }
    })
  }

  function checkLimits (draggedElement, type) {
    switch (type) {
      case 'mainMeal':
        return allLists[0].children.length > 1
      case 'dessert':
        return allLists[1].children.length > 1
      case 'cocktail':
        return allLists[2].children.length > 1
      default:
        return false
    }
  }
}

module.exports = dragAndDrop
