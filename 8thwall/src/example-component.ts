import * as ecs from '@8thwall/ecs'

let isAction = false

ecs.registerComponent({
  name: 'example-component',
  schema: {
    idleAnim: ecs.string,
    actionAnim: ecs.string,
  },
  add: (world, component) => {
    // Asigna tus animaciones exactas por defecto
    const idle = component.schema.idleAnim || 'Armature|mixamo.com|Layer0'
    const action = component.schema.actionAnim || 'Armature.001|mixamo.com|Layer0'

    // Escucha el clic sobre la entidad usando su ID único (eid)
    world.events.addListener(component.eid, 'click', () => {
      isAction = !isAction
      const nextAnim = isAction ? action : idle

      // Cambia la animación directamente en el modelo 3D
      ecs.GltfModel.set(world, component.eid, {
        animationClip: nextAnim,
      })
    })
  },
})