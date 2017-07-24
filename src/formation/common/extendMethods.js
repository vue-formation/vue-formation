import * as _ from '../utils/litedash/dash'
import eventHandler from './eventHandler'
import evalProp from './evalProp'

export default function extendMethods (methods = {}) {
  return _.merge({}, methods, {
    eventHandler,
    getAttr (name) {
      return evalProp(
        [Function, String, Boolean, Number, Object],
        this.config.attrs[name],
        this,
        this.config,
        this.value,
        null
      )
    },
    getData (name) {
      return evalProp(
        [Function, String, Boolean, Number, Object],
        this.config.data[name],
        this,
        this.config,
        this.value,
        null
      )
    },
    hasPath (obj, path) {
      return _.has(obj, path)
    },
    hasAttr (name) {
      return _.has(this, `config.attrs.${name}`)
    },
    hasData (name) {
      return _.has(this, `config.data.${name}`)
    },
    hasEvent (name) {
      return _.has(this, `config.on.${name}`)
    },
    kebab (name) {
      return _.kebabCase(name)
    },
    isString (val) {
      return _.isString(val)
    }
  })
}
