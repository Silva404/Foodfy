const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', event => {
        const cardId = card.getAttribute('id')
        console.log(cardId)
        window.location.href = `/recipes/${cardId}`
    })
}