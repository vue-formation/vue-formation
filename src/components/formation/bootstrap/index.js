import Button from './Button.vue'
import Container from './Container.vue'
import Div from './Div.vue'
import TextInput from './TextInput.vue'

export default function (Vue) {
  Vue.component('formation-button', Vue.extend(Button))
  Vue.component('formation-container', Vue.extend(Container))
  Vue.component('formation-div', Vue.extend(Div))
  Vue.component('formation-text-input', Vue.extend(TextInput))
}
