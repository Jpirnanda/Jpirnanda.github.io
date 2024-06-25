document.addEventListener('DOMContentLoaded', function () {
  const openPopupButton = document.getElementById('button')
  const closePopupButton = document.getElementById('closePopup')
  const popup = document.getElementById('popup')
  const video = document.getElementById('vid') // Certifique-se de que o ID corresponda ao elemento de vídeo

  openPopupButton.addEventListener('click', () => {
    popup.style.display = 'block'
    if (video) {
      video.pause()
    }
  })

  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none'
    video.play()
  })

  window.addEventListener('click', (event) => {
    if (event.target == popup) {
      popup.style.display = 'none'
    }
  })
})
