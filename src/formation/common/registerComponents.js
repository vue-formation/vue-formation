import * as _ from '../utils/litedash/dash'

export default function (Vue, version, widgets) {
  return function registerFormationComponents (vm, components, bindings, framework, frameworks, refresh) {
    _.forEach(components, (component) => {
      let { type } = component
      let binding = _.get(bindings, type)
      if (binding) {
        _.forEach(widgets, (widget, name) => {
          let typeName = _.kebabCase(name)
          if (typeName === type && (!_.has(vm.$options.components, `formation-${typeName}`) || refresh)) {
            vm.$options.components[`formation-${typeName}`] = Vue.extend(
              widget(bindings[typeName], framework, frameworks, component, version)
            )
          }
        })
      }
    })
  }
}
