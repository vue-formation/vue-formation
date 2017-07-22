import * as _ from '../utils/litedash/dash'
import { extractBindings, registerComponents, dbg, Backdrop } from '../common/index'
import { BOOTSTRAP } from '../common/constants'
import baseFrameworks from '../frameworks/index'
import { vueModel, vuexModel } from '../utils/vue-deepset'
import baseWidgets from './index'

export default function formation (Vue, options) {
  const VUE_VERSION = Number((_.isString(Vue.version) ? Vue.version : '2.0.0').split('.')[0])
  let frameworks = _.merge({}, baseFrameworks, _.get(options, 'frameworks', {}))
  let widgets = _.merge({}, baseWidgets, _.get(options, 'components', {}))

  return {
    name: 'formation',
    template: `
      <div :class="['formation']">
        <div v-if="compiled" :class="rootClass">
          <component v-for="${VUE_VERSION === 1 ? '(idx, c)' : '(c, idx)'} in config.components || []"
          :key="idx"
          :is="'formation-' + c.type"
          :config="c.config || {}"
          :components="c.components || []"
          :bindings="_bindings"
          :framework="framework"
          :frameworks="frameworks"
          :register="register"
          :event-hub="eventHub"
          :version="${VUE_VERSION}"
          ${VUE_VERSION === 1 ? ':value.sync' : 'v-model'}="modelData"></component>
        </div>
      </div>`,
    props: {
      value: {
        type: Object,
        default () {
          return {}
        },
        twoWay: VUE_VERSION === 1
          ? true
          : undefined
      },
      vuex: {
        type: String
      },
      name: {
        type: String,
        default: `formation-${Date.now()}`
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
          return _.has(frameworks, value)
        }
      },
      eventHub: {
        type: Object,
        default () {
          return new Vue()
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

      // check vuex mutation has been included
      if (this.vuex) {
        if (!_.has(this, '$store._mutations.VUEX_DEEP_SET')) {
          console.warn('[vue-formation]: unable to find formation mutation "VUEX_DEEP_SET", ' +
            'please ensure it is included during the Vuex store initialization')
        }
      }

      // this bit of code is used to re-render the child-components should the framework change
      this.eventHub.$on('render.components', () => this.render())
      if (this.name) this.eventHub.$on(`${this.name}.render.components`, () => this.render())
      this.eventHub.$emit(`${this.name}.render.components`)

      // watch for backdrop events
      this.$root.$on('backdrop.show', this.createBackdrop)
      this.eventHub.$on('backdrop.show', requestedBy => {
        this.$root.$emit('backdrop.show', `${this.name}-${requestedBy}`)
      })
      this.eventHub.$on('backdrop.hide', requestedBy => {
        this.$root.$emit('backdrop.hide', `${this.name}-${requestedBy}`)
      })
    },
    computed: {
      rootClass () {
        return ['formation', `formation-${this.framework}`]
      },
      modelData () {
        return this.vuex ? this.vuexModel(this.vuex, Vue) : this.vueModel(this.value, Vue)
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
      render () {
        this.updateComponents(true)
        this.compiled = false
        this.compiled = true
      },
      dbg () {
        if (this.debug) dbg.apply(this, [...arguments])
      },
      register (vm, components, bindings, framework, frameworks, refresh) {
        return registerComponents(Vue, VUE_VERSION, widgets)(vm, components, bindings, framework, frameworks, refresh)
      },
      updateComponents (refresh) {
        this.register(this, this._config.components, this._bindings, this.framework, this.frameworks, refresh)
      },
      createBackdrop (requestedBy) {
        /*
         * The backdrop is a special case component since we only want 1 to exist in a vue application
         * it is manually created, appended, and mounted to the root app element. the backdrop also
         * uses the root elements eventing system to communicate
         */
        if (!document.getElementById('formation-backdrop')) {
          let backdrop = document.createElement('div')
          backdrop.setAttribute('id', 'formation-backdrop')
          this.$root.$el.appendChild(backdrop)
          Backdrop(Vue, VUE_VERSION, this).create().$mount('#formation-backdrop')
          this.$root.$emit('backdrop.show', requestedBy)
        }
      }
    },
    watch: {
      framework () {
        this.eventHub.$emit(`${this.name}.render.components`)
      }
    },
    data () {
      return {
        frameworks,
        compiled: true
      }
    }
  }
}
