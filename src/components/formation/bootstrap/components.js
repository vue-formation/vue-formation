import _ from 'lodash'
import Vue from 'vue'

export default function registerComponents (registry, omits = []) {
  const components = {
    FButton: Vue.extend(require('./FButton.vue')),
    FContainer: Vue.extend(require('./FContainer.vue')),
    FDiv: Vue.extend(require('./FDiv.vue'))
  }

  _.forEach(_.omit(components, omits), (component, name) => {
    registry[name] = component
  })
}
