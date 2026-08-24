import * as ecs from '@8thwall/ecs'

// Cargar la imagen del icono asignada en el proyecto
const logoAsset = require('./assets/InstagramLogo.png')

let buttonElement: HTMLDivElement | null = null

ecs.registerComponent({
  name: 'instagram-button',
  schema: {
    url: ecs.string,
  },
  schemaDefaults: {
    url: 'https://www.instagram.com/alone_prxject?igsi=MWYxcm04M2t6M3pxZA%3D%3D&utm_source=qr', // Cambia 'tu_usuario' por tu perfil
  },
  add: (world, component) => {
    // 1. Crear el contenedor con icono flotante
    const container = document.createElement('div')
    buttonElement = container

    // 2. Estilos del icono (circular y posicionado en la esquina inferior izquierda)
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '25px',
      left: '20px',
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

    // 3. Abrir la red social sin pausar el video AR
    const openInstagram = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      window.open(component.schema.url, '_blank')
    }

    container.addEventListener('click', openInstagram)
    container.addEventListener('touchstart', openInstagram)
  },
  remove: (world, component) => {
    if (buttonElement && buttonElement.parentNode) {
      buttonElement.parentNode.removeChild(buttonElement)
      buttonElement = null
    }
  },
})