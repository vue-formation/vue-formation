import Button from './Button.vue'
import Container from './Container.vue'
import Div from './Div.vue'
import TextInput from './TextInput'

export default function (Vue, bindings) {
  Vue.component('formation-button', Button)
  Vue.component('formation-container', Container)
  Vue.component('formation-div', Div)
  if (bindings['text-input']) Vue.component('formation-text-input', Vue.extend(TextInput(bindings['text-input'])))
}
