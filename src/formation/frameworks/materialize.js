import { TAG_BINDINGS, TAG_MODEL, TAG_COMPONENTS, TAG_DEFAULT_CLASS } from '../common/constants'

export default {
  name: 'materialize',
  maxCols: 12,
  components: {
    'a': {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    'button': {
      classMap: {
        default: 'teal',
        primary: 'blue',
        success: 'green',
        info: 'cyan',
        warning: 'amber',
        danger: 'red',
        link: 'btn-flat'
      },
      template: `<button type="button" class="btn ${TAG_DEFAULT_CLASS}" ${TAG_BINDINGS}>
        <i v-if='config.iconClassLeft' class="material-icons left" :class="config.iconClassLeft"></i>
        <span v-if="config.text" v-text="config.text"></span>
        <i v-if='config.iconClassRight' class="material-icons right" :class="config.iconClassRight"></i>
        <div v-if="config.html" v-html="config.html"></div>
      </button>`
    },
    'container': {
      template: `<div class="container" ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    'div': {
      template: `<div ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    'form-grid': {
      columnClass (width) {
        return [`s${width}`]
      },
      template ({ version }) {
        return `<div ${TAG_BINDINGS}>
          <form class="col s12">
            <div v-for="(${version === 1 ? 'rIdx, row' : 'row, rIdx'}) in config.rows" class="row">
              <div v-for="(${version === 1 ? 'cIdx, col' : 'col, cIdx'}) in row.columns" class="col input-field" :class="columnClass(rIdx, cIdx)">
                ${TAG_COMPONENTS}
                <label :class="{ active: isFocused['r' + rIdx + 'c' + cIdx] || value[col.config.model] || col.config.placeholder }">
                  {{col.label}}
                  <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">
                      *
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>`
      }
    },
    'modal': {
      template ({ version }) {
        return `<div ${TAG_BINDINGS}>
          ${version === 1 ? '' : '<transition name="formation-fade">'}
          <div v-show="show" ${version === 1 ? 'transition="formation-fade-vue1x"' : ''}
          :class="{ 'formation-modal-blur-area': dismissable }" @click="dismiss"
          :style="{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: 'auto', width: 'auto', 'z-index': zIndex }">
            <div class="modal" style="display: block; top: 10%;">
              <div class="modal-content">
                <h4 v-if="hasPath(config, 'header.text')" v-text="config.header.text"></h4>
                <p v-if="hasPath(config, 'body.text')" v-text="config.body.text"></p>
                ${TAG_COMPONENTS}
              </div>
              <div class="modal-footer" v-if="hasPath(config, 'footer')">
                
              </div>
            </div>
          </div>
          ${version === 1 ? '' : '</transition>'}
        </div>`
      }
    },
    'text-input': {
      template: `<input type="text" class="validate" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
