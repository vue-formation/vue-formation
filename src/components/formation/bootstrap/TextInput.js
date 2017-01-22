import multi from 'vue-multi-version'
import {
  ensureConfig,
  getAttr,
  eventHandler,
  query as $,
  dash as _
} from '../common/index'

export default function TextInput (binding) {
  let { attrs, on } = binding
  let bindings = []

  _.forEach(attrs, (attr) => {
    bindings.push(`:${attr}="hasAttr('${attr}') ? getAttr('${attr}', 'String') : null"`)
  })
  _.forEach(on, (evt) => {
    bindings.push(`v-on:${evt}="hasEvent('${evt}') ? eventHandler('${evt}', $event) : null"`)
  })

  let template = `<input type="text" class="form-control" v-model="value[config.model]" ${bindings.join(' ')}>`

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
      components: { type: Array, default () { return [] } }
    },
    methods: {
      eventHandler,
      getAttr,
      hasAttr (name) {
        return _.has(this, `config.attrs.${name}`)
      },
      hasEvent (name) {
        return _.has(this, `config.on.${name}`)
      }
    },
    created () {
      ensureConfig(this.config)
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
