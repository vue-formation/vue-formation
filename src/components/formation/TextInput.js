import { makeTemplateBindings, extendMethods, extendProps, dash as _ } from './common/index'
import { BOOTSTRAP, SEMANTICUI, MATERIALIZE } from './common/constants'

export default function TextInput (binding, framework, component, version) {
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
    props: extendProps(version),
    methods: extendMethods({
      validate () {
        return this.touched && this.valid
      }
    }),
    computed: {
      _value () {
        return _.has(this.config, 'model') ? this.value[this.config.model] : null
      }
    },
    created () {
      this.register(this, this.components, this.bindings, this.framework)
    },
    watch: {
      _value (val) {
        this.touched = true
        this.valid = _.isFunction(this.config.validate)
          ? this.config.validate.call(this, val)
          : true
      }
    },
    data () {
      return {
        valid: false,
        touched: false
      }
    }
  }
}
