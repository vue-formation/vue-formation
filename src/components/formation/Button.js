import { makeTemplateBindings, extendMethods, defaultClass, dash as _ } from './common/index'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'

const BTN_CLASS = {
  [BOOTSTRAP]: {
    default: 'btn-default',
    primary: 'btn-primary',
    success: 'btn-success',
    info: 'btn-info',
    warning: 'btn-warning',
    danger: 'btn-danger',
    link: 'btn-link'
  }
}

export default function Button (binding, framework, component) {
  let template = '<button type="button">'
  let btnClass = defaultClass(BTN_CLASS[framework], component)
  switch (framework) {
    case BOOTSTRAP:
      template = `<button type="button" class="btn ${btnClass}" ${makeTemplateBindings(binding)}>`
      break
    default:
      break
  }

  template += `<span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
  <span v-if="config.text" v-text="config.text"></span>
  <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
  <div v-if="config.html" v-html="config.html"></div>
</button>`

  return {
    template,
    name: 'formation-button',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    methods: extendMethods({}),
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework)
    }
  }
}
