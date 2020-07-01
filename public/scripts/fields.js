function addIngredient() {
    const ingredients = document.querySelector("#ingredients")
    const fieldContainer = document.querySelectorAll(".ingredient")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false

    // Deixa o valor do input vazio
    newField.children[0].value = ""
    ingredients.appendChild(newField)
}

const ingredients = document.querySelector(".add-ingredient")
if (ingredients) ingredients.addEventListener("click", addIngredient)


// new preparation
function addNewPreparation() {
    const preparation = document.querySelector("#preparation")
    const fieldContainer = document.querySelectorAll(".preparation")

    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false

    // Deixa o valor do input vazio
    newField.children[0].value = ""
    preparation.appendChild(newField)
}

const preparation = document.querySelector(".add-preparation")
if (preparation) preparation.addEventListener("click", addNewPreparation);