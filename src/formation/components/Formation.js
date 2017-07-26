import _ from '../utils/litedash/dash.index'
import common from '../common/index'
import { BOOTSTRAP } from '../common/constants'
import { vueModel, vuexModel, VUEX_MUTATION } from '../utils/vue-deepset'
let {
  extractBindings,
  registerComponents,
  dbg,
  Backdrop,
  getVueVersion,
  buildLibrary
} = common

export default function formation (Vue, options, plugins) {
  const VUE_VERSION = getVueVersion(Vue)
  const DEBUG = Boolean(_.get(options, 'slient', !Vue.config.silent))
  let { frameworks, components } = buildLibrary(options, plugins)

  return {
    name: 'formation',
    template: `
      <div class="formation formation-root">
        <div v-if="compiled" :class="['formation-' + framework, 'formation-framework']">
          <component v-for="${VUE_VERSION === 1 ? '(idx, c)' : '(c, idx)'} in config.components || []"
          :key="idx"
          :is="'formation-' + c.type"
          :config="c.config || {}"
          :components="c.components || []"
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
        default: DEBUG
      }
    },
    vuex: VUE_VERSION === 1
      ? {}
      : undefined,
    created () {
      // check if vuex mutation has been included
      if (this.vuex && !_.has(this, `$store._mutations["${VUEX_MUTATION}"]`)) {
        this.dbg(new Error('unable to find formation mutation "' + VUEX_MUTATION + '", ' +
          'please ensure it is included during the Vuex store initialization. Defaulting to object model'))
      }

      this.createEventListeners()
    },
    beforeDestroy () {
      this.removeEventListeners()
    },
    computed: {
      modelData () {
        return this.vuex && _.has(this, `$store._mutations["${VUEX_MUTATION}"]`)
          ? vuexModel.call(this, this.vuex, Vue)
          : vueModel.call(this, this.value, Vue)
      },
      _bindings () {
        return extractBindings(this._config)
      },
      _config () {
        return this.config
      },
      formationRoot () {
        return {
          vue: Vue,
          vm: this,
          root: this.$root,
          version: VUE_VERSION,
          framework: this.frameworks[this.framework],
          frameworks: this.frameworks,
          frameworkName: this.framework,
          eventHub: this.eventHub,
          localHub: this.localHub,
          components: this.components,
          common
        }
      }
    },
    methods: {
      render () {
        this.updateComponents(true)
        this.compiled = false
        this.compiled = true
      },
      dbg () {
        if (this.debug) dbg.apply(this, [...arguments])
      },
      register (vm, c, bindings, framework, frameworks, refresh) {
        return registerComponents(Vue, VUE_VERSION, components)(vm, c, bindings, framework, frameworks, refresh)
      },
      updateComponents (refresh) {
        registerComponents(this, this.formationRoot, this._config, refresh)
        // this.register(this, this._config.components, this._bindings, this.framework, this.frameworks, refresh)
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
      },
      domKeyupListener (e) {
        switch (e.keyCode) {
          case 27:
            this.localHub.$emit('Escape')
        }
      },
      createEventListeners () {
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

        document.addEventListener('keyup', this.domKeyupListener)
      },
      removeEventListeners () {
        this.$root.$off('backdrop.show', this.createBackdrop)
        document.removeEventListener('keyup', this.domKeyupListener)
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
        components,
        compiled: true,
        localHub: new Vue()
      }
    }
  }
}
