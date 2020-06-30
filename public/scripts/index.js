const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', e => {
        const index = card

        window.location.href = `/recipes/${index}`
    })
}