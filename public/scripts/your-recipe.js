const description = document.getElementsByClassName('recipe-description')

for (let i = 0; i < description.length; i++) {
    const span = description[i].querySelector('.span')
    const content = description[i].querySelector('.description')
  
    span.addEventListener('click', e => {
      if (span.innerHTML == 'esconder') {
        span.innerHTML = 'mostrar'
        content.classList.add('hide')
      } else {
        span.innerHTML = 'esconder'
        content.classList.remove('hide')
      }
    })
  }
  
const imageGallery = {
  highlight: document.querySelector('.highlight img'),
  dots: document.querySelectorAll('.dots img'),
  galleryPreview: document.querySelectorAll('.preview img'),
  setImage(e) {
    const { target } = e 

    this.galleryPreview.forEach(image => image.classList.remove('active'))
    target.classList.add('active')
    for (let preview of this.galleryPreview) {
      if (target.src == preview.src) {
        preview.classList.add('active')
      }
    }
    
    this.highlight.src = target.src
  }
} 