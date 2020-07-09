const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
const div = document.createElement('div')
div.className = 'page'
console.log(currentPage)

for (let item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.appendChild(div)
  }
}

// nav style
const cards = document.querySelectorAll(".card")
const view = document.querySelectorAll('.card-admin')

if (currentPage.includes('/admin')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `/admin/recipes/${cardId}`
    });
  }
} else {
  for (let card of cards) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `/recipes/${cardId}`
    });
  }
}

// form delete confirmation
const formDelete = document.querySelector('#form-delete')
    
formDelete.addEventListener('submit', e => {
    const confirmation = confirm('Are you sure you want to delete')

    if (!confirmation) {
        event.preventDefault()
    }
})
