import * as ecs from '@8thwall/ecs'

let isHidden = false

ecs.registerComponent({
  name: 'video-control',
  schema: {},
  add: (world, component) => {
    
    const toggleVideoVisibility = () => {
      isHidden = !isHidden

      // 1. Obtener la entidad de 8th Wall Studio
      const entity = world.getEntity(component.eid)

      // 2. Obtener el elemento HTML del video para detener el audio
      const videoEl = document.querySelector('video') as HTMLVideoElement | null

      if (isHidden) {
        // Pausar y mutear audio
        if (videoEl) {
          videoEl.pause()
          videoEl.muted = true
        }

        // Ocultar entidad en la escena 3D
        entity.hide()

      } else {
        // Mostrar entidad en la escena 3D
        entity.show()

        // Reproducir y desmutear audio
        if (videoEl) {
          videoEl.muted = false
          videoEl.play().catch(() => {})
        }
      }
    }

    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, toggleVideoVisibility)
    world.events.addListener(component.eid, 'click', toggleVideoVisibility)
  },
})