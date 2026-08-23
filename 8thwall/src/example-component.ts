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

    // Función que altera la animación en el modelo 3D
    const triggerChange = () => {
      isAction = !isAction
      const nextAnim = isAction ? action : idle

      ecs.GltfModel.set(world, component.eid, {
        animationClip: nextAnim,
        loop: true,
        paused: false,
        timeScale: 1,
      })
    }

    // Método directo de 8th Wall ECS para eventos de toque en la entidad
    world.events.addListener(component.eid, ecs.input.SCREEN_TOUCH_START, triggerChange)
    world.events.addListener(component.eid, 'interact', triggerChange)
  },
})