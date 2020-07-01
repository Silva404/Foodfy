const cards = document.querySelectorAll(".card")
const currentPage = location.pathname

if (currentPage.includes('/admin')) {
  for (let card of cards) {
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

