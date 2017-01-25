import VueMultiVersion from 'vue-multi-version'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'
import { vueSet, vuexHelper, extractBindings, registerFormationComponents, dash as _ } from './common/index'

export default function (Vue) {
  const VUE_VERSION = VueMultiVersion(Vue).select(1, 2)

  return {
    name: 'formation',
    template: `
<div class="formation">
  <component v-for="c in config.components || []"
    :is="'formation-' + c.type"
    :config="c.config || {}"
    :components='c.components || []'
    :bindings="_bindings"
    :framework="framework"
    :register="register"
    :event-hub="eventHub"
    :VUE_VERSION="${VUE_VERSION}"
    ${VUE_VERSION === 1 ? ':value.sync' : 'v-model'}="modelData"></component>
</div>
`,
    props: {
      value: {
        type: Object,
        default () {
          return {}
        },
        twoWay: VUE_VERSION === 1 ? true : undefined
      },
      vuex: {
        type: String
      },
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    vuex: VUE_VERSION === 1 ? {} : undefined,
    created () {
      console.log('Vue', VUE_VERSION)
      this.syncModelProps()
      this.register(this, this._config.components, this._bindings, this.framework)
      if (this.vuex && this.$store) {
        vuexHelper(this.$store)
      }
    },
    computed: {
      _bindings () {
        return extractBindings(this._config)
      },
      _config () {
        this.$nextTick(this.syncModelProps)
        return this.config
      }
    },
    methods: {
      register (vm, components, bindings, framework) {
        return registerFormationComponents(Vue, VUE_VERSION)(vm, components, bindings, framework)
      },
      findModels (obj, models = []) {
        if (_.has(obj, 'config.model')) models.push(obj.config.model)
        if (_.isArray(_.get(obj, 'components'))) {
          _.forEach(obj.components, (c) => {
            this.findModels(c, models)
          })
        }
        if (_.isArray(_.get(obj, 'rows'))) {
          _.forEach(obj.rows, (row) => {
            if (_.isArray(_.get(row, 'columns'))) {
              _.forEach(row.columns, (col) => {
                if (col.model) models.push(col.model)
              })
            }
          })
        }
        return models
      },
      syncModelProps () {
        _.forEach(_.uniq(this.findModels(this._config)), (model) => {
          if (!this.modelData.hasOwnProperty(model)) {
            Object.defineProperty(this.modelData, model, {
              configurable: true,
              enumerable: true,
              get: () => _.get(this.value, model),
              set: (v) => vueSet(this.value, model, v)
            })
          }
        })
      }
    },
    data () {
      return {
        modelData: {},
        eventHub: new Vue()
      }
    }
  }
}
/*
export default {
  install (Vue) {
    let eventHub = new Vue()

    // create a new multi version instance
    let multi = VueMultiVersion(Vue)
    let version = multi.select(1, 2)
    let registerFormationComponents = register(Vue, version)

    // register global formation functions
    Vue.prototype.$formationRegisterComponents = registerFormationComponents
    Vue.prototype.$formationEmit = eventHub.$emit
    Vue.prototype.$formationOn = eventHub.$on
  }
}
*/
