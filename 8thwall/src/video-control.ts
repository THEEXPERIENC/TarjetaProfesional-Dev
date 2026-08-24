import * as ecs from '@8thwall/ecs'

// Requerir la ruta real del archivo subido a assets
const videoAsset = require('./assets/animacion-realidadV.mp4')

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    let isPlaying = true

    // Buscar el elemento de video existente creado por 8th Wall o asignarlo si no existe
    const video = document.createElement('video')
    video.src = videoAsset
    video.crossOrigin = 'anonymous'
    video.loop = true
    video.playsInline = true
    video.setAttribute('playsinline', '')

    video.play().catch(() => {
      video.muted = true
      video.play()
    })

    const togglePlay = () => {
      if (isPlaying) {
        video.pause()
        isPlaying = false
      } else {
        video.muted = false
        video.play().catch(() => {})
        isPlaying = true
      }
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, togglePlay)
    world.events.addListener(component.eid, 'click', togglePlay)
  },
})