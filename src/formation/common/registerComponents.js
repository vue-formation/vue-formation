import _ from '../utils/litedash/dash.index'

export default function registerComponents (vm, f, config, refresh) {
  let bindings = f.common.extractBindings(config)
  _.forEach(config.components, component => {
    if (!_(component).get('type').isString().value()) return

    let shortName = _.kebabCase(component.type.replace(/^formation-/i, '')).toLowerCase()
    let name = `formation-${shortName}`
    let properName = _.properCase(shortName, '')
    let binding = bindings[shortName]
    let obj = _.get(f.components, properName)

    if (binding && obj && (!_.has(vm.$options.components, name) || refresh)) {
      let c = obj({ f, binding, component, name, properName, shortName })
      vm.$options.components[name] = f.vue.extend(c)
    }
  })
}
