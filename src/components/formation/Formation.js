import { FRAMEWORKS, BOOTSTRAP } from './common/constants'
import { extractBindings, registerFormationComponents, dbg } from './common/index'
import { vueModel, vuexModel } from 'vue-deepset'
import _ from 'lodash'

export default function (Vue) {
  console.log('Vue', Vue.version)
  const VUE_VERSION = Number((_.isString(Vue.version) ? Vue.version : '1.0.0').split('.')[0])

  return {
    name: 'formation',
    template: `
<div class="formation">
  <component v-for="${VUE_VERSION === 1 ? '(idx, c)' : '(c, idx)'} in config.components || []"
    :key="idx"
    :is="'formation-' + c.type"
    :config="c.config || {}"
    :components="c.components || []"
    :bindings="_bindings"
    :framework="framework"
    :register="register"
    :event-hub="eventHub"
    :version="${VUE_VERSION}"
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
      this.register(this, this._config.components, this._bindings, this.framework)

      // check vuex mutation has been included
      if (this.vuex) {
        if (!_.has(this, '$store._mutations.VUEX_DEEP_SET')) {
          console.warn('[vue-formation]: unable to find formation mutation "VUEX_DEEP_SET", ' +
            'please ensure it is included during the Vuex store initialization')
        }
      }
    },
    computed: {
      modelData () {
        return this.vuex ? this.vuexModel(this.vuex) : this.vueModel(this.value)
      },
      _bindings () {
        return extractBindings(this._config)
      },
      _config () {
        return this.config
      }
    },
    methods: {
      vueModel,
      vuexModel,
      dbg () {
        if (this.debug) dbg.apply(this, [...arguments])
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
        if (_.isArray(_.get(obj, 'config.rows'))) {
          _.forEach(obj.config.rows, (row) => {
            if (_.isArray(_.get(row, 'columns'))) {
              _.forEach(row.columns, (col) => {
                if (_.has(col, 'config.model')) {
                  models.push(col.config.model)
                }
              })
            }
          })
        }
        return models
      }
    },
    data () {
      return {
        eventHub: new Vue()
      }
    }
  }
}
