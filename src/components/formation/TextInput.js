import multi from 'vue-multi-version'
import {
  makeTemplateBindings,
  extendMethods,
  query as $,
  dash as _
} from './common/index'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'

export default function TextInput (binding, framework) {
  let template = `<input type="text" class="form-control" v-model="value[config.model]" ${makeTemplateBindings(binding)}>`

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
      /**
       * @property {String} model - model path
       * @property {*} [class] - css class settings
       * @property {*} [style] - css style settings
       * @property {Boolean|Function} [readonly=false] - make form readonly
       * @property {Boolean|Function} [disabled=false] - disable form
       * @placeholder {String|Function} [placeholder=""] - placeholder text
       */
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
    },
    ready () {
      console.log(this)
      console.log($(this.$el))
    },
    mounted () {
      console.log(this)
      console.log($(this.$el))
    }
  }
}
