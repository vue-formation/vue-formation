import _ from '../utils/litedash/dash.index'

export default function Modal (info) {
  return info.f.common.extendComponent(info, [
    {
      tag: info.f.common.constants.TAG_HEAD_COMPONENTS,
      value: info.f.common.nestedComponents(info.f.version, 'headerComponents')
    },
    {
      tag: info.f.common.constants.TAG_COMPONENTS,
      value: info.f.common.nestedComponents(info.f.version, 'bodyComponents')
    },
    {
      tag: info.f.common.constants.TAG_FOOT_COMPONENTS,
      value: info.f.common.nestedComponents(info.f.version, 'footerComponents')
    }
  ], {
    methods: {
      dismiss (e) {
        if (e.target.classList.contains('formation-modal-blur-area')) {
          this.hideModal()
        }
      },
      showModal () {
        this.emitEvent('backdrop.show', this._uid)
        window.setTimeout(() => {
          this.show = true
        }, 100)
      },
      hideModal () {
        this.show = false
        window.setTimeout(() => {
          this.emitEvent('backdrop.hide', this._uid)
        }, 100)
      }
    },
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
    data () {
      return {
        show: false,
        zIndex: this.config.zIndex || 9000,
        dismissable: this.config.dismissable !== false
      }
    },
    created () {
      let name = this.config.name

      if (name) {
        this.onEvent(`${name}.modal.show`, this.showModal)
        this.onEvent(`${name}.modal.hide`, this.hideModal)
      }

      this.onEvent('modal.hide', this.hideModal)
      this.onLocalEvent('Escape', () => {
        if (this.show) this.hideModal()
      })

      // register the individual modal components
      if (this.headerComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.headerComponents })
      }
      if (this.bodyComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.bodyComponents })
      }
      if (this.footerComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.footerComponents })
      }
    }
  })
}

