import { TAG_BINDINGS, TAG_MODEL, TAG_COMPONENTS, TAG_DEFAULT_CLASS } from '../common/constants'

export default {
  name: 'semanticui',
  components: {
    'a': {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    'button': {
      classMap: {
        default: 'basic',
        primary: 'primary',
        success: 'positive',
        info: 'teal',
        warning: 'orange',
        danger: 'negative',
        link: 'basic'
      },
      template: `<button type="button" class="ui button ${TAG_DEFAULT_CLASS}" ${TAG_BINDINGS}>
        <i v-if='config.iconClassLeft' class="icon" :class="config.iconClassLeft"></i>
        <span v-if="config.text" v-text="config.text"></span>
        <i v-if='config.iconClassRight' class="icon" :class="config.iconClassRight"></i>
        <div v-if="config.html" v-html="config.html"></div>
      </button>`
    },
    'container': {
      template: `<div class="container" ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    'div': {
      template: `<div ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    'text-input': {
      template: `<div class="ui input"><input type="text" ${TAG_MODEL} ${TAG_BINDINGS}></div>`
    }
  }
}
