import Button from './Button'
import Container from './Container'
import Div from './Div'

export default function (Vue) {
  Vue.component('formation-button', Vue.extend(Button))
  Vue.component('formation-container', Vue.extend(Container))
  Vue.component('formation-div', Vue.extend(Div))
}
