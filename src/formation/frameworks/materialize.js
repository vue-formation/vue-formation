import {
  TAG_BINDINGS,
  TAG_MODEL,
  TAG_COMPONENTS,
  TAG_HEAD_COMPONENTS,
  TAG_FOOT_COMPONENTS
} from '../common/constants'

const BUTTON_CLASS_MAP = {
  default: 'teal',
  primary: 'blue',
  success: 'green',
  info: 'cyan',
  warning: 'amber',
  danger: 'red',
  link: 'btn-flat'
}

function columnClass (width) {
  return [`s${width}`]
}

export default {
  name: 'materialize',
  maxCols: 12,
  columnClass,
  buttonClassMap: BUTTON_CLASS_MAP,
  components: {
    A: {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    Button: {
      template (f, binding, component) {
        return `<button type="button" class="btn ${f.common.defaultClass(BUTTON_CLASS_MAP, component)}" ${TAG_BINDINGS}>
          {{config.text}}
          ${TAG_COMPONENTS}
        </button>`
      }
    },
    Container: {
      template: `<div class="container" ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    Div: {
      template: `<div ${TAG_BINDINGS}>${TAG_COMPONENTS}</div>`
    },
    FormGrid: {
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
    Modal: {
      template ({ version }) {
        return `<div ${TAG_BINDINGS}>
          ${version === 1 ? '' : '<transition name="formation-fade">'}
          <div v-show="show" ${version === 1 ? 'transition="formation-fade-vue1x"' : ''}
          :class="{ 'formation-modal-blur-area': dismissable }" @click="dismiss"
          :style="{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: 'auto', width: 'auto', 'z-index': zIndex }">
            <div class="modal" style="display: block; top: 10%;">
              <div class="modal-content">
                <h4 v-if="hasPath(config, 'header.text') && !hasPath(config, 'header.components')"
                v-text="config.header.text"></h4>
                ${TAG_HEAD_COMPONENTS}
                <p v-if="hasPath(config, 'body.text')" v-text="config.body.text"></p>
                ${TAG_COMPONENTS}
              </div>
              <div class="modal-footer" v-if="hasPath(config, 'footer')">
                ${TAG_FOOT_COMPONENTS}
                <button class="btn teal" v-if="hasPath(config, 'footer.closeButton')" type="button" 
                @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : 'Close'"></button>
              </div>
            </div>
          </div>
          ${version === 1 ? '' : '</transition>'}
        </div>`
      }
    },
    TextInput: {
      template: `<input type="text" class="validate" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
