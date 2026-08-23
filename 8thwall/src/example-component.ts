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

    const switchAnimation = () => {
      isAction = !isAction
      const nextAnim = isAction ? action : idle

      // Forzar la actualización del clip activo en el componente GltfModel
      ecs.GltfModel.mutate(world, component.eid, (cursor) => {
        cursor.animationClip = nextAnim
      })
    }

    // Registrar evento global en el lienzo de 8th Wall
    window.addEventListener('pointerdown', switchAnimation)

    return () => {
      window.removeEventListener('pointerdown', switchAnimation)
    }
  },
})