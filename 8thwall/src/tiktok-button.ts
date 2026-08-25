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
      const targetUrl = component.schema.url
      if (!targetUrl) return

      // Intenta abrir en nueva pestaña; si el navegador bloquea el popup, redirige la pestaña actual
      const newTab = window.open(targetUrl, '_blank')
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        window.location.href = targetUrl
      }
    }

    // Registrar escuchadores de eventos
    world.events.addListener(component.eid, ecs.input.UI_CLICK, openTikTok)
    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, openTikTok)
    world.events.addListener(component.eid, 'click', openTikTok)
  },
})