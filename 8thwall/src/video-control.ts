import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    let isPlaying = true

    const togglePlay = () => {
      const videoElements = document.querySelectorAll('video')
      
      isPlaying = !isPlaying
      
      videoElements.forEach((video) => {
        if (!isPlaying) {
          video.pause()
        } else {
          video.muted = false
          video.play().catch(() => {})
        }
      })
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, togglePlay)
    world.events.addListener(component.eid, 'click', togglePlay)
  },
})