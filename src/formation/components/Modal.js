import _ from '../utils/litedash/dash'
import {
  makeTemplateBindings,
  extendMethods,
  extendProps,
  extractBindings,
  compileTemplate,
  nestedComponents
} from '../common/index'
import { TAG_COMPONENTS, TAG_HEAD_COMPONENTS, TAG_FOOT_COMPONENTS, TAG_BINDINGS } from '../common/constants'

export default function Modal (binding, framework, frameworks, component, version) {
  let info = {
    binding,
    framework: frameworks[framework],
    component,
    version
  }

  return {
    template: compileTemplate(info, frameworks, framework, 'modal', [
      {
        tag: TAG_BINDINGS,
        value: ` ${makeTemplateBindings(binding)} `
      },
      {
        tag: TAG_HEAD_COMPONENTS,
        value: nestedComponents(version, 'headerComponents')
      },
      {
        tag: TAG_COMPONENTS,
        value: nestedComponents(version, 'bodyComponents')
      },
      {
        tag: TAG_FOOT_COMPONENTS,
        value: nestedComponents(version, 'footerComponents')
      }
    ]),
    name: 'formation-modal',
    props: extendProps(version),
    computed: {
      headerComponents () {
        return _.get(this, 'config.header.components', [])
      },
      bodyComponents () {
        return _.get(this, 'config.body.components', [])
      },
      footerComponents () {
        return _.get(this, 'config.footer.components', [])
      }
    },
    methods: extendMethods({
      dismiss (e) {
        if (e.target.classList.contains('formation-modal-blur-area')) {
          this.hideModal()
        }
      },
      showModal () {
        this.eventHub.$emit('backdrop.show', this._uid)
        window.setTimeout(() => {
          this.show = true
        }, 100)
      },
      hideModal () {
        this.show = false
        window.setTimeout(() => {
          this.eventHub.$emit('backdrop.hide', this._uid)
        }, 100)
      }
    }),
    created () {
      let name = this.config.name

      if (name) {
        this.eventHub.$on(`${name}.modal.show`, this.showModal)
        this.eventHub.$on(`${name}.modal.hide`, this.hideModal)
      }
      this.eventHub.$on('modal.show', this.showModal)
      this.eventHub.$on('modal.hide', this.hideModal)
      this.localHub.$on('Escape', () => {
        if (this.show) this.hideModal()
      })

      // register the individual modal components
      if (this.headerComponents.length) {
        this.register(this, this.headerComponents, extractBindings(this.config.header), this.framework, this.frameworks)
      }
      if (this.bodyComponents.length) {
        this.register(this, this.bodyComponents, extractBindings(this.config.body), this.framework, this.frameworks)
      }
      if (this.footerComponents.length) {
        this.register(this, this.footerComponents, extractBindings(this.config.footer), this.framework, this.frameworks)
      }
    },
    data () {
      return {
        show: false,
        zIndex: this.config.zIndex || 9000,
        dismissable: this.config.dismissable !== false
      }
    }
  }
}
