const initARUI = () => {
  // Evitar duplicar la interfaz si ya existe
  if (document.getElementById('ar-ui-overlay')) return

  const uiLayer = document.createElement('div')
  uiLayer.id = 'ar-ui-overlay'
  Object.assign(uiLayer.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '99999',
    pointerEvents: 'none',
  })

  // Botón Instagram
  const instaBtn = document.createElement('a')
  instaBtn.href = 'https://www.instagram.com/alone_prxject?igsi=MWYxcm04M2t6M3pxZA%3D%3D&utm_source=qr'
  instaBtn.target = '_blank'
  Object.assign(instaBtn.style, {
    position: 'absolute',
    bottom: '30px',
    left: '25px',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    backgroundColor: '#E1306C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    pointerEvents: 'auto',
  })
  instaBtn.innerText = 'IG'

  // Botón TikTok
  const tiktokBtn = document.createElement('a')
  tiktokBtn.href = 'https://www.tiktok.com/@alone_prxject?_r=1&_t=ZS-999eSLlJWqu'
  tiktokBtn.target = '_blank'
  Object.assign(tiktokBtn.style, {
    position: 'absolute',
    bottom: '30px',
    right: '25px',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    backgroundColor: '#000000',
    border: '2px solid #00f2fe',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    pointerEvents: 'auto',
  })
  tiktokBtn.innerText = 'TK'

  uiLayer.appendChild(instaBtn)
  uiLayer.appendChild(tiktokBtn)
  document.body.appendChild(uiLayer)

  // Control de Pausa / Play del Video al tocar la pantalla fuera de los botones
  let isPlaying = true
  window.addEventListener('click', (e) => {
    if (e.target === instaBtn || e.target === tiktokBtn) return

    const videos = document.querySelectorAll('video')
    isPlaying = !isPlaying
    videos.forEach((v) => (isPlaying ? v.play() : v.pause()))
  })
}

const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/TARJETA.json')
    ],
  })

  // Iniciar la interfaz nativa
  initARUI()
}

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)