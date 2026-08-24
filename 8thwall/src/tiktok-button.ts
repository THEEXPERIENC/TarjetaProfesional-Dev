import * as ecs from '@8thwall/ecs'

const logoAsset = require('./assets/TikTokLogo.png')

let buttonElement: HTMLDivElement | null = null

ecs.registerComponent({
  name: 'tiktok-button',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: 'https://www.tiktok.com/@alone_prxject?_r=1&_t=ZS-999eSLlJWqu',
  },
  add: (world, component) => {
    const container = document.createElement('div')
    buttonElement = container

    // Posicionado abajo a la derecha
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '25px',
      right: '20px',
      zIndex: '9999',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundImage: `url(${logoAsset})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.4)',
      cursor: 'pointer',
    })

    document.body.appendChild(container)

    const openTikTok = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      window.open(component.schema.url, '_blank')
    }

    container.addEventListener('click', openTikTok)
    container.addEventListener('touchstart', openTikTok)
  },
  remove: (world, component) => {
    if (buttonElement && buttonElement.parentNode) {
      buttonElement.parentNode.removeChild(buttonElement)
      buttonElement = null
    }
  },
})