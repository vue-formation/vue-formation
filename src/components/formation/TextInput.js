import multi from 'vue-multi-version'
import {
  makeTemplateBindings,
  extendMethods,
  dash as _
} from './common/index'
import { FRAMEWORKS, BOOTSTRAP, SEMANTICUI, MATERIALIZE } from './common/constants'

export default function TextInput (binding, framework) {
  let template = ''

  switch (framework) {
    case BOOTSTRAP:
      template = `
<input type="text" class="form-control" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
`
      break

    case MATERIALIZE:
      template = `
<input type="text" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
`
      break

    case SEMANTICUI:
      template = `
<div class="ui input">
  <input type="text" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
</div>
`
      break

    default:
      break
  }

  // return the vue.js component
  return {
    template,
    name: 'formation-text-input',
    props: {
      value: {
        type: Object,
        required: true,
        twoWay: multi.select(true, undefined)
      },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    methods: extendMethods({}),
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework)
    }
  }
}
