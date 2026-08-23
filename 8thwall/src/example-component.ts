import * as ecs from '@8thwall/ecs'

let isAction = false

ecs.registerComponent({
  name: 'example-component',
  schema: {
    idleAnim: ecs.string,
    actionAnim: ecs.string,
  },
  add: (world, component) => {
    const idle = component.schema.idleAnim || 'Armature|mixamo.com|Layer0'
    const action = component.schema.actionAnim || 'Armature.001|mixamo.com|Layer0'

    // Escuchar el evento de clic directamente en la entidad
    world.events.addListener(component.eid, 'click', () => {
      isAction = !isAction
      const nextAnim = isAction ? action : idle

      // Cambiar el clip de la animación en el componente de la entidad
      ecs.GltfModel.set(world, component.eid, {
        animationClip: nextAnim,
      })
    })
  },
})