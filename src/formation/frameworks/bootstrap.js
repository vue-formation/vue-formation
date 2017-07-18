import { TAG_BINDINGS, TAG_MODEL, TAG_COMPONENTS, TAG_DEFAULT_CLASS } from '../common/constants'

export default {
  name: 'bootstrap',
  components: {
    'a': {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    'button': {
      classMap: {
        default: 'btn-default',
        primary: 'btn-primary',
        success: 'btn-success',
        info: 'btn-info',
        warning: 'btn-warning',
        danger: 'btn-danger',
        link: 'btn-link'
      },
      template: `<button type="button" class="btn ${TAG_DEFAULT_CLASS}" ${TAG_BINDINGS}>
        <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
        <span v-if="config.text" v-text="config.text"></span>
        <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
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
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
