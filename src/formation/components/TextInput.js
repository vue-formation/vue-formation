import * as _ from '../utils/litedash/dash'
import {
  makeTemplateBindings,
  extendMethods,
  extendProps,
  extractBindings,
  compileTemplate
} from '../common/index'
import { TAG_BINDINGS, TAG_MODEL } from '../common/constants'

export default function TextInput (binding, framework, frameworks, component, version) {
  let info = {
    binding,
    framework: frameworks[framework],
    component,
    version
  }

  return {
    template: compileTemplate(info, frameworks, framework, 'text-input', [
      {
        tag: TAG_MODEL,
        value: ' v-model="value[config.model]" '
      },
      {
        tag: TAG_BINDINGS,
        value: ` ${makeTemplateBindings(binding)} `
      }
    ]),
    name: 'formation-text-input',
    props: extendProps(version),
    methods: extendMethods({
      validate () {
        return this.touched && this.valid
      }
    }),
    created () {
      this.register(this, this.components, extractBindings(this.config), this.framework, this.frameworks)
    },
    computed: {
      _value () {
        return _.has(this.config, 'model') ? this.value[this.config.model] : null
      }
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
