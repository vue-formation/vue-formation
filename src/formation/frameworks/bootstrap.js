import {
  TAG_BINDINGS,
  TAG_MODEL,
  TAG_COMPONENTS,
  TAG_HEAD_COMPONENTS,
  TAG_FOOT_COMPONENTS
} from '../common/constants'

const BUTTON_CLASS_MAP = {
  default: 'btn-default',
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  danger: 'btn-danger',
  link: 'btn-link'
}

function columnClass (width) {
  return [`col-sm-${width}`]
}

export default {
  name: 'bootstrap',
  maxCols: 12,
  columnClass,
  buttonClassMap: BUTTON_CLASS_MAP,
  components: {
    A: {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    Button: {
      classMap: BUTTON_CLASS_MAP,
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
          <form role="form">
            <div v-for="(${version === 1 ? 'rIdx, row' : 'row, rIdx'}) in config.rows">
              <div class="row form-group">
                <div v-for="(${version === 1 ? 'cIdx, col' : 'col, cIdx'}) in row.columns" :class="columnClass(rIdx, cIdx)">
                  <label style="width: 100%">
                    {{col.label}}
                    <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">
                        *
                    </span>
                    ${TAG_COMPONENTS}
                  </label>
                </div>
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
          :class="{ 'formation-modal-blur-area': dismissable }" @click="dismiss" @keyup.esc="dismiss"
          :style="{ zIndex: zIndex, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: 'auto', height: 'auto' }">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header" v-if="hasPath(config, 'header')">
                  <h4 class="modal-title" v-if="hasPath(config, 'header.text')" v-text="config.header.text"></h4>
                  ${TAG_HEAD_COMPONENTS}
                </div>
                <div class="modal-body">
                  <p v-if="hasPath(config, 'body.text')" v-text="config.body.text"></p>
                  ${TAG_COMPONENTS}
                </div>
                <div class="modal-footer" v-if="hasPath(config, 'footer')">
                  ${TAG_FOOT_COMPONENTS}
                  <button class="btn btn-default" v-if="hasPath(config, 'footer.closeButton')" type="button" 
                  @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : 'Close'"></button>
                </div>
              </div>
            </div>
          </div>
          ${version === 1 ? '' : '</transition>'}
        </div>`
      }
    },
    TextInput: {
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
