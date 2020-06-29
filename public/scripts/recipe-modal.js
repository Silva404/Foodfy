const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal-content')
const cards = document.querySelectorAll('.card')
const close = document.querySelector('.close-toggle')

for (let card of cards) {
    card.addEventListener('click', e => {
        modal.classList.toggle('hide')
        modalContent.innerHTML += card.innerHTML     
    })
}

close.addEventListener('click', e => {
    modal.classList.add('hide')
})

