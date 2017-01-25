import _ from './dash/dash.index'
import { FRAMEWORKS, BOOTSTRAP } from './constants'

export default function extendProps (version, props = {}) {
  return _.merge({}, props, {
    value: {
      type: Object,
      required: true,
      twoWay: version === 1 ? 'true' : undefined
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    components: {
      type: Array
    },
    bindings: {
      type: Object,
      default () {
        return {}
      }
    },
    version: {
      type: Number,
      default: version
    },
    register: {
      type: Function
    },
    eventHub: {
      type: Object
    },
    framework: {
      type: String,
      default: BOOTSTRAP,
      validator (value) {
        return _.includes(FRAMEWORKS, value)
      }
    }
  })
}
