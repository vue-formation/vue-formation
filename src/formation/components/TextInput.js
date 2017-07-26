import _ from '../utils/litedash/dash.index'

export default function TextInput (info) {
  return info.f.common.extendComponent(info, [
    {
      tag: info.f.common.constants.TAG_MODEL,
      value: ' v-model="value[config.model]" '
    }
  ], {
    methods: {
      validate () {
        return this.touched && this.valid
      }
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
  })
}
