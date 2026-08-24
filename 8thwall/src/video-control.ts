import * as ecs from '@8thwall/ecs'

let isPlaying = true

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    
    const toggleVideo = () => {
      isPlaying = !isPlaying
      const videos = document.querySelectorAll('video')

      if (!isPlaying) {
        // Pausar y silenciar audio/video
        videos.forEach((v) => {
          v.pause()
          v.muted = true
        })
      } else {
        // Reanudar reproducción y activar audio
        videos.forEach((v) => {
          v.muted = false
          v.play().catch(() => {})
        })
      }
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, toggleVideo)
    world.events.addListener(component.eid, 'click', toggleVideo)
  },
})