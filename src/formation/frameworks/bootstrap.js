import { TAG_BINDINGS, TAG_MODEL, TAG_COMPONENTS, TAG_DEFAULT_CLASS } from '../common/constants'

export default {
  name: 'bootstrap',
  maxCols: 12,
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
    'form-grid': {
      columnClass (width) {
        return [`col-sm-${width}`]
      },
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
    'modal': {
      template ({ version }) {
        return `<div ${TAG_BINDINGS}>
          ${version === 1 ? '' : '<transition name="formation-fade">'}
          <div v-show="show" ${version === 1 ? 'transition="formation-fade-vue1x"' : ''} 
          :class="{ 'formation-modal-blur-area': hideOnBackdrop }" @click="contentBlur" 
          :style="{ zIndex: zIndex, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: 'auto', height: 'auto' }">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" v-if="hasPath(config, 'header.text')" v-text="config.header.text"></h4>
                </div>
                <div class="modal-body">
                  ${TAG_COMPONENTS}
                </div>
                <div class="modal-footer">
                  
                </div>
              </div>
            </div>
          </div>
          ${version === 1 ? '' : '</transition>'}
        </div>`
      }
    },
    'text-input': {
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
