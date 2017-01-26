import _ from './dash/dash.index'
import widgets from '../index'

export default function (Vue, version) {
  return function registerFormationComponents (vm, components, bindings, framework) {
    _.forEach(components, (component) => {
      let { type } = component
      let binding = _.get(bindings, type)
      if (binding) {
        _.forEach(widgets, (widget, name) => {
          let typeName = _.kebabCase(name)
          if (typeName === type) {
            vm.$options.components[`formation-${typeName}`] = Vue.extend(
              widget(bindings[typeName], framework, component, version)
            )
          }
        })
      }
    })
  }
}
