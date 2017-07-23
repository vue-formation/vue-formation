import * as _ from '../utils/litedash/dash'

export default function extendProps (version, props = {}) {
  let model = version === 1
    ? {
      value: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
    : {
      value: {
        type: Object,
        required: true
      }
    }

  return _.merge({}, props, model, {
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
    localHub: {
      type: Object
    },
    framework: {
      type: String
    },
    frameworks: {
      type: Object
    }
  })
}
