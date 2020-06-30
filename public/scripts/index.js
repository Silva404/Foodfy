const cards = document.querySelectorAll(".card")
const hideButton = document.querySelector('.hide')

for (let card of cards) {
  card.addEventListener("click", (e) => {
    const cardId = card.getAttribute('id')

    window.location.href = `/recipes/${cardId}`
  });
}

hideButton.addEventListener('click', e => {
  if (hideButton.innerHTML == 'esconder'){
    
  }
})