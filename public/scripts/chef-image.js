const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 1,
  handlePhotoInput(event) {
    const { files: fileList } = event.target

    if (fileList.length > this.uploadLimit) {
      alert('Você só pode usar uma foto')
      event.preventDefault()
      return
    }

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
    div.onclick = this.removePhoto
    div.appendChild(image)
    div.appendChild(this.getRemoveButton())

    return div
  },
  getRemoveButton() {
    const remove = document.createElement('i')
    remove.classList.add('material-icons')
    remove.innerHTML = "close"

    return remove
  },
  removePhoto(event){
    const photosDiv = event.target.parentNode
    const photosArray = Array.from()

  }
}