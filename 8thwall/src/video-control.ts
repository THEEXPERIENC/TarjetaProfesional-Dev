import * as ecs from '@8thwall/ecs'

let isPlaying = true

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    const toggleVideo = () => {
      isPlaying = !isPlaying
      const videos = document.querySelectorAll('video')

      videos.forEach((v) => {
        if (!isPlaying) {
          v.pause()
        } else {
          v.play().catch(() => {})
        }
      })
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, toggleVideo)
    world.events.addListener(component.eid, 'click', toggleVideo)
  },
})