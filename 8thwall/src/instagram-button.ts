import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'instagram-button',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: 'https://www.instagram.com/alone_prxject?igsi=MWYxcm04M2t6M3pxZA%3D%3D&utm_source=qr',
  },
  add: (world, component) => {
    const openLink = (e: any) => {
      if (component.schema.url) {
        window.open(component.schema.url, '_blank')
      }
    }

    // Escucha eventos en UI y eventos de colisión por toque
    world.events.addListener(component.eid, ecs.input.UI_CLICK, openLink)
    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, openLink)
    world.events.addListener(component.eid, 'click', openLink)
  },
})