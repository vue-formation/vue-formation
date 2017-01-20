import _ from 'lodash/lodash.min'

export default function evalProp (types, value, vm, config, data, defaultValue) {
  for (let type of types) {
    switch (type) {
      case Function:
        if (_.isFunction(value)) return value(vm, config, data)
        break
      case Boolean:
        if (_.isBoolean(value)) return value
        break
      case String:
        if (_.isString(value)) return value
        break
      case Date:
        if (_.isDate(value)) return value
        break
      case Number:
        if (_.isNumber(value)) return value
        break
      default:
        break
    }
  }
  return defaultValue
}
