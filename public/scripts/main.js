// nav style
const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
const div = document.createElement('div')
div.className = 'page'

for (let item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.appendChild(div)
  }
}


// clickable cards based on routes
const cards = document.querySelectorAll(".card")
const view = document.querySelectorAll('.card-admin')

if (currentPage.includes('/recipes')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `${currentPage}/${cardId}`
    });
  }
}
else if (currentPage.includes('/admin/chefs')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      if (currentPage == `/admin/chefs`) {
        window.location.href = `${currentPage}/${cardId}`
      }
      else if (currentPage == `/admin/chefs/${cardId}`) {
        window.location.href = `/recipes/${cardId}`
      }

    });
  }
}
else if (currentPage.includes('/home')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `recipes/${cardId}`
    });
  }
}
// console.log(currentPage)

// form delete confirmation box
if (currentPage.includes('/edit')) {
  const formDelete = document.querySelector('#form-delete')
  const modal = document.querySelector('#modal')
  const popup = modal.querySelector('input[name=popup')

  formDelete.addEventListener('submit', e => {
    if (popup.value !== null) {   
      const close = modal.querySelector('.box a')

      modal.style.display = 'grid'
      close.addEventListener('click', e => {
        modal.style.display = 'none'
      })
    } else {
      const confirmation = confirm('Are you sure you want to delete')

      if (!confirmation) {
        event.preventDefault()
      }
    }    
  })
}