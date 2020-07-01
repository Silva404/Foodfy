const cards = document.querySelectorAll(".card")

for (let card of cards) {
  card.addEventListener("click", (e) => {
    const cardId = card.getAttribute('id')

    window.location.href = `/recipes/${cardId}`
  });
}


const description = document.getElementsByClassName('recipe-description')

