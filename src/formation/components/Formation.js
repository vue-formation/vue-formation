import * as _ from '../utils/litedash/dash'
import { extractBindings, registerComponents, dbg } from '../common/index'
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
      this.eventHub.$on('backdrop.show', this.showBackdrop)
      this.eventHub.$on('backdrop.hide', this.hideBackdrop)
      this.eventHub.$on('backdrop.hide.force', requestedBy => this.hideBackdrop(requestedBy, true))
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
      showBackdrop (requestedBy) {
        if (!document.getElementById('formation-backdrop')) {
          let backdrop = document.createElement('div')
          backdrop.setAttribute('id', 'formation-backdrop')
          backdrop.style.backgroundColor = '#000000'
          backdrop.style.opacity = 0
          backdrop.style.position = 'fixed'
          backdrop.style.display = 'none'
          backdrop.style.top = 0
          backdrop.style.left = 0
          backdrop.style.right = 0
          backdrop.style.bottom = 0
          backdrop.style.width = 'auto'
          backdrop.style.height = 'auto'
          backdrop.style.transition = '0.5s ease'
          document.body.appendChild(backdrop)
        }
        let bd = document.getElementById('formation-backdrop')
        if (bd) {
          let owner = bd.getAttribute('data-owner')
          if (!owner) bd.setAttribute('data-owner', `${this.name}-${requestedBy}`)
          bd.style.display = 'block'
          window.setTimeout(() => {
            bd.style.opacity = 0.6
          })
        }
      },
      hideBackdrop (requestedBy, force) {
        let bd = document.getElementById('formation-backdrop')
        let owner = bd.getAttribute('data-owner')
        if (owner === `${this.name}-${requestedBy}` || force || !owner) {
          bd.setAttribute('data-owner', '')
          bd.style.opacity = 0
          window.setTimeout(() => {
            bd.style.display = 'none'
          }, 300)
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
