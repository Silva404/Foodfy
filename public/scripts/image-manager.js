const PhotosUpload = {
  input: '',
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 5,
  files: [],
  gallery: document.querySelector('#recipe_galery'),
  handleFileInput(event) {
    const { files: fileList } = event.target
    this.input = event.target

    if (this.gallery) {
      this.uploadLimit = 5
    } else {
      this.uploadLimit = 1
    }

    if (this.hasLimit(event)) return

    Array.from(fileList).forEach(file => {
      this.files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = this.getContainer(image)

        this.preview.appendChild(div)
      }

      reader.readAsDataURL(file)
    })

    this.input.files = this.getAllFiles()
  },
  getContainer(image) {
    const div = document.createElement('div')

    div.classList.add('photo')
    div.onclick = this.removePhoto
    div.appendChild(image)
    div.appendChild(this.getRemoveButton())

    return div
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    this.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  hasLimit(event) {
    const { files: fileList } = event.target
    const { preview } = this

    if (fileList.length > this.uploadLimit) {
      alert(`Você não pode por mais de ${this.uploadLimit} fotos`)
      event.preventDefault()
      return true
    }

    const photosDiv = []
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'photo') {
        photosDiv.push(item)
      }
    })

    const total = fileList.length + photosDiv.length
    if (total > this.uploadLimit) {
      alert('Você atingiu o limite de fotos')
      event.preventDefault()
      return true
    }

    return false
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = "delete"

    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode
    const photoArray = Array.from(PhotosUpload.preview.children)
    const index = photoArray.indexOf(photoDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photoDiv.remove()
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode

    if (photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"')
      if (removedFiles) removedFiles.value += `${photoDiv.id},`
    }

    photoDiv.remove()
  }
}