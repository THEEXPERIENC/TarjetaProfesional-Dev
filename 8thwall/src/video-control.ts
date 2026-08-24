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

    // 1. Escuchar eventos nativos de 8th Wall ECS (en el objeto y pantalla)
    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, togglePlay)
    world.events.addListener(component.eid, 'click', togglePlay)

    // 2. Escuchar el toque directo en la ventana/pantalla global como respaldo
    const handleGlobalTouch = (e: TouchEvent | MouseEvent) => {
      // Evita disparos dobles si interactúa con controles nativos
      togglePlay()
    }

    window.addEventListener('touchstart', handleGlobalTouch, { passive: true })
  },
})