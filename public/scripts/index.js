const cards = document.querySelectorAll(".card")

for (let card of cards) {
  card.addEventListener("click", (e) => {
    const cardId = card.getAttribute('id')

    window.location.href = `/recipes/${cardId}`
  });
}


const description = document.getElementsByClassName('recipe-description')

for (let i = 0; i < description.length; i++) {
  const span = description[i].querySelector('.span')
  const content = description[i].querySelector('.description')

  span.addEventListener('click', e => {
    if (span.innerHTML == 'esconder') {
      span.innerHTML = 'mostrar'
      content.classList.add('hide')
    } else {
      span.innerHTML = 'esconder'
      content.classList.remove('hide')
    }
  })
}

const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
const div = document.createElement('div')
div.className = 'page'

for (let item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.appendChild(div)
  }
}