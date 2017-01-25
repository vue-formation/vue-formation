import VueMultiVersion from 'vue-multi-version'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'
import { vueSet, extractBindings, registerFormationComponents, dash as _ } from './common/index'

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
      vuexMutation: {
        type: String,
        default: 'FORMATION_SET'
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
      },
      debug: {
        type: Boolean,
        default: false
      }
    },
    vuex: VUE_VERSION === 1
      ? {}
      : undefined,
    created () {
      this.dbg('Vue', VUE_VERSION)
      this.syncModelProps()
      this.register(this, this._config.components, this._bindings, this.framework)

      // check vuex mutation has been included
      if (this.vuex) {
        if (!_.has(this, `$store._mutations["${this.vuexMutation}"]`)) {
          console.warn('[vue-formation]: unable to find formation mutation "' +
            this.vuexMutation +
            '", please ensure it is included during the Vuex store initialization')
        }
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
      dbg () {
        if (this.debug) console.log.apply(null, [...arguments])
      },
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
              get: () => {
                return this.vuex
                  ? _.get(this.$store.state, `${this.vuex}${model.match(/^\[/) ? '' : '.'}${model}`)
                  : _.get(this.value, model)
              },
              set: (v) => {
                return this.vuex
                  ? this.$store[this.$store.commit ? 'commit' : 'dispatch'](this.vuexMutation, {
                    path: `${this.vuex}${model.match(/^\[/) ? '' : '.'}${model}`,
                    value: v
                  })
                  : vueSet(this.value, model, v)
              }
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
