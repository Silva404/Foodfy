const Mask = {
  apply(input, func) {

  },
  isEmail(value) {

  }
}

const Validate = {
  apply(input, func) {
    let results = Validate[func](input.value)
    input.value = results.value
    this.clearError(input)

    if (results.error) this.displayError(input, results.error)
  },
  displayError(input, error) {
    const div = document.createElement('div')
    div.classList.add('error')
    div.innerHTML = error

    input.parentNode.appendChild(div)
  },
  clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error')
    if (errorDiv) errorDiv.remove()
  },
  isEmail(value) {
    let error = ''

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!value.match(mailFormat)) {
      error = "Email inválido!"
    }

    return {
      error,
      value
    }
  },
  inputName(value) {
    let error = ''

    if (value.length < 8) {
      error = "Nome deve possuir ao menos 8 caracteres"
    }

    return {
      error, 
      value
    }

  }
}