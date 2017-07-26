import _ from '../utils/litedash/dash.index'

export default function extendComponent ({ f, binding, component, name }, interpolations, def, extendComponents) {
  let model = f.version === 1
    ? { value: { type: Object, required: true, twoWay: true } }
    : { value: { type: Object, required: true } }

  // if extend components, add a components interpolation
  if (extendComponents) {
    interpolations.push({
      tag: f.common.constants.TAG_COMPONENTS,
      value: f.common.nestedComponents(f.version)
    })
  }

  let extended = {
    name,
    template: def.template || f.common.compileTemplate(f, binding, component, name, interpolations),
    props: _.merge({}, def.props, model, {
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      components: {
        type: Array,
        default () {
          return []
        }
      }
    }),
    methods: _.merge({}, def.methods, {
      eventHandler: f.common.eventHandler,
      emitEvent (event, value) {
        f.eventHub.$emit(event, value)
      },
      onEvent (event, handler) {
        f.eventHub.$on(event, handler)
      },
      offEvent (event, handler) {
        f.eventHub.$off(event, handler)
      },
      emitLocalEvent (event, value) {
        f.localHub.$emit(event, value)
      },
      onLocalEvent (event, handler) {
        f.localHub.$on(event, handler)
      },
      offLocalEvent (event, handler) {
        f.localHub.$off(event, handler)
      },
      getAttr (name) {
        return f.common.evalProp(
          [Function, String, Boolean, Number, Object],
          this.config.attrs[name],
          this,
          this.config,
          this.value,
          null
        )
      },
      getData (name) {
        return f.common.evalProp(
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

  // if extend components add a modified created hook
  if (extendComponents) {
    extended.created = function created () {
      f.common.registerComponents(this, f, this)
      if (_.isFunction(def.created)) def.created.call(this)
    }
  }

  // merge everything together, do not merge keys that have been manually extended
  return _.merge(extended, _.omit(def, _.keys(extended)))
}
