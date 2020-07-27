const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  handleFileInput(event) {
    const { files: fileList } = event.target

    if (this.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = this.getContainer(image)

        this.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })
  },
  getContainer(image) {
    const div = document.createElement('div')

    div.classList.add('photo')
    div.onclick = () => alert('remover')
    div.appendChild(image)
    div.appendChild(this.getRemoveButton())

    return div
  },
  hasLimit(event) {
    const { files: fileList } = event.target

    if (fileList.length > this.uploadLimit) {
      alert('Você não pode por mais de 5 fotos')
      event.preventDefault()
      return true
    }

    return false
  },
  getRemoveButton(){
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = "close"

    return button
  },
  removePhoto(event){
    
  }
}