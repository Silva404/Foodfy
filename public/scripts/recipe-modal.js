const modal = document.querySelector('.modal-content')
const cards = document.querySelectorAll('.cards-container')

for (let card of cards) {
    card.addEventListener('click', e => {
        modal.classList.remove('hide')
    })
}