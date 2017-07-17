import { makeTemplateBindings, extendMethods, extendProps, defaultClass } from './common/index'
import { BOOTSTRAP, MATERIALIZE, SEMANTICUI } from './common/constants'

const BTN_CLASS = {
  [BOOTSTRAP]: {
    default: 'btn-default',
    primary: 'btn-primary',
    success: 'btn-success',
    info: 'btn-info',
    warning: 'btn-warning',
    danger: 'btn-danger',
    link: 'btn-link'
  },
  [MATERIALIZE]: {
    default: 'teal',
    primary: 'blue',
    success: 'green',
    info: 'cyan',
    warning: 'amber',
    danger: 'red',
    link: 'btn-flat'
  },
  [SEMANTICUI]: {
    default: 'basic',
    primary: 'primary',
    success: 'positive',
    info: 'teal',
    warning: 'orange',
    danger: 'negative',
    link: 'basic'
  }
}

export default function Button (binding, framework, component, version) {
  let template = ''
  let btnClass = defaultClass(BTN_CLASS[framework], component)

  switch (framework) {
    case BOOTSTRAP:
      template = `
<button type="button" class="btn ${btnClass}" ${makeTemplateBindings(binding)}>
  <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
  <span v-if="config.text" v-text="config.text"></span>
  <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`
      break

    case MATERIALIZE:
      template = `
<button type="button" class="btn ${btnClass}" ${makeTemplateBindings(binding)}>
  <i v-if='config.iconClassLeft' class="material-icons left" :class="config.iconClassLeft"></i>
  <span v-if="config.text" v-text="config.text"></span>
  <i v-if='config.iconClassRight' class="material-icons right" :class="config.iconClassRight"></i>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`
      break

    case SEMANTICUI:
      template = `
<button type="button" class="ui button ${btnClass}" ${makeTemplateBindings(binding)}>
  <i v-if='config.iconClassLeft' class="icon" :class="config.iconClassLeft"></i>
  <span v-if="config.text" v-text="config.text"></span>
  <i v-if='config.iconClassRight' class="icon" :class="config.iconClassRight"></i>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`
      break

    default:
      break
  }
  return {
    template,
    name: 'formation-button',
    props: extendProps(version),
    methods: extendMethods(),
    created () {
      this.register(this, this.components, this.bindings, this.framework)
    }
  }
}
