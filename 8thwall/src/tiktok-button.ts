import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'tiktok-button',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: 'https://www.tiktok.com/@alone_prxject?_r=1&_t=ZS-999eSLlJWqu',
  },
  add: (world, component) => {
    const openTikTok = (event: any) => {
      if (event && event.stopPropagation) {
        event.stopPropagation()
      }

      if (component.schema.url) {
        window.open(component.schema.url, '_blank')
      }
    }

    world.events.addListener(component.eid, ecs.input.UI_CLICK, openTikTok)
    world.events.addListener(component.eid, 'click', openTikTok)
  },
})