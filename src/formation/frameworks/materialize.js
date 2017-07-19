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
    'text-input': {
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
