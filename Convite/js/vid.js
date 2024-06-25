var video = $('#vid')

var width = $(window).width()

if (width > 1200) {
  video.attr('src', 'src/video-desktop.mp4')
} else {
  video.attr('src', 'src/video-mobile.mp4')
}
