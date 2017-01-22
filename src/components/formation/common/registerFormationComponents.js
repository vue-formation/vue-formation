import _ from './dash/dash.index'
import Button from '../Button'
import Container from '../Container'
import Div from '../Div'
import TextInput from '../TextInput'

export default function (Vue) {
  return function registerFormationComponents (vm, components, bindings, framework) {
    _.forEach(components, (component) => {
      let { type } = component
      let binding = _.get(bindings, type)
      if (binding) {
        switch (type) {
          case 'button':
            vm.$options.components['formation-button'] = Vue.extend(Button(bindings['button'], framework, component))
            break
          case 'container':
            vm.$options.components['formation-container'] = Vue.extend(Container(bindings['container'], framework, component))
            break
          case 'div':
            vm.$options.components['formation-div'] = Vue.extend(Div(bindings['div'], framework, component))
            break
          case 'text-input':
            vm.$options.components['formation-text-input'] = Vue.extend(TextInput(bindings['text-input'], framework, component))
            break
          default:
            break
        }
      }
    })
  }
}
