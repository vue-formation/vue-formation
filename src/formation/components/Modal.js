import { makeTemplateBindings, extendMethods, extendProps, compileTemplate, nestedComponents } from '../common/index'
import { TAG_COMPONENTS, TAG_BINDINGS } from '../common/constants'

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
        tag: TAG_COMPONENTS,
        value: nestedComponents(version)
      }
    ]),
    name: 'formation-modal',
    props: extendProps(version),
    methods: extendMethods({
      contentBlur (e) {
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

      this.register(this, this.components, this.bindings, this.framework, this.frameworks)
    },
    data () {
      return {
        show: false,
        zIndex: this.config.zIndex || 9000,
        hideOnBackdrop: this.config.hideOnBackdrop !== false,
        hideOnEscape: this.config.hideOnEscape !== false
      }
    }
  }
}
