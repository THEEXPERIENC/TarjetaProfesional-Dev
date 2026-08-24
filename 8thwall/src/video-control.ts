import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    let isPlaying = true

    const toggleVideo = () => {
      isPlaying = !isPlaying

      // Obtener el elemento de video directamente en la página web
      const videoEl = document.querySelector('video') as HTMLVideoElement | null

      if (videoEl) {
        if (isPlaying) {
          videoEl.play()
        } else {
          videoEl.pause()
        }
      }
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, toggleVideo)
    world.events.addListener(component.eid, 'click', toggleVideo)
  },
})