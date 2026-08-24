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
    const openInstagram = (event: any) => {
      if (event && event.stopPropagation) {
        event.stopPropagation()
      }

      if (component.schema.url) {
        window.open(component.schema.url, '_blank')
      }
    }

    world.events.addListener(component.eid, ecs.input.UI_CLICK, openInstagram)
    world.events.addListener(component.eid, 'click', openInstagram)
  },
})