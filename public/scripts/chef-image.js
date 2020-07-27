const PhotosUpload = {
  preview: document.querySelector('#photos-preview'),
  uploadLimit: 1,
  input: '',
  files: [],
  handlePhotoInput(event) {
    const { files: fileList } = event.target
    this.input = event.target

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
  hasLimit(event) {
    const { files: fileList } = event.target

    if (fileList.length > this.uploadLimit) {
      alert('Você só pode usar uma foto')
      event.preventDefault()
      return true
    }

    return false
  },
  getRemoveButton() {
    const remove = document.createElement('i')
    remove.classList.add('material-icons')
    remove.innerHTML = "close"

    return remove
  },
  removePhoto(event) {
    const photosDiv = event.target.parentNode
    const photosArray = Array.from(PhotosUpload.preview.children)
    const index = photosArray.indexOf(photosDiv)

    PhotosUpload.files.splice(index, 1)
    PhotosUpload.input.files = PhotosUpload.getAllFiles()

    photosDiv.remove()
  },
  getAllFiles(){
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

    this.files.forEach(file => { dataTransfer.items.add(file)})

    return dataTransfer.files
  }
}