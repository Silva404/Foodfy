// nav style
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

// redirect
const cards = document.querySelectorAll(".card")
const view = document.querySelectorAll('.card-admin')

if (currentPage.includes('/admin/recipes')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `/admin/recipes/${cardId}`
    });
  }
} else if (currentPage.includes('/admin/chefs')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `/admin/chefs/${cardId}`
    });
  }
}
else {
  for (let card of cards) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `/recipes/${cardId}`
    });
  }
}

// form delete confirmation

if (currentPage.includes('/edit')) {
  const formDelete = document.querySelector('#form-delete')

  formDelete.addEventListener('submit', e => {
    const confirmation = confirm('Are you sure you want to delete')

    if (!confirmation) {
      event.preventDefault()
    }
  })

}