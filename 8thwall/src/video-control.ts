import * as ecs from '@8thwall/ecs'

let isPlaying = false

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    
    const toggleVideo = () => {
      const videos = document.querySelectorAll('video')

      videos.forEach((v) => {
        if (isPlaying) {
          v.pause()
        } else {
          v.muted = false
          v.play().catch(() => {})
        }
      })

      isPlaying = !isPlaying
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, toggleVideo)
    world.events.addListener(component.eid, 'click', toggleVideo)
  },
})