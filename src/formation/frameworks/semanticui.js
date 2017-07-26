import {
  TAG_BINDINGS,
  TAG_MODEL,
  TAG_COMPONENTS,
  TAG_HEAD_COMPONENTS,
  TAG_FOOT_COMPONENTS
} from '../common/constants'

const BUTTON_CLASS_MAP = {
  default: 'basic',
  primary: 'primary',
  success: 'positive',
  info: 'teal',
  warning: 'orange',
  danger: 'negative',
  link: 'basic'
}

function columnClass (width) {
  var w = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen'
  ]

  return [w[width], 'wide', 'field']
}

export default {
  name: 'semanticui',
  maxCols: 16,
  columnClass,
  buttonClassMap: BUTTON_CLASS_MAP,
  components: {
    A: {
      template: `<a ${TAG_BINDINGS}>${TAG_COMPONENTS}</a>`
    },
    Button: {
      template (f, binding, component) {
        return `<button type="button" class="ui button ${f.common.defaultClass(BUTTON_CLASS_MAP, component)}" ${TAG_BINDINGS}>
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
          <form class="ui form">
            <div class="field" v-for="(${version === 1 ? 'rIdx, row' : 'row, rIdx'}) in config.rows">
              <div class="fields">
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
          :class="{ 'formation-modal-blur-area': dismissable }" @click="dismiss"
          :style="{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: 'auto', width: 'auto', 'z-index': zIndex }">
            <div class="ui modal" style="display: block; top: 10%;">
              <div class="header" v-if="hasPath(config, 'header.text') && !hasPath(config, 'header.components')"
              v-text="config.header.text"></div>
              <div class="header" v-if="hasPath(config, 'header.components')">
                ${TAG_HEAD_COMPONENTS}
              </div>
              <div class="content">
                <p v-if="hasPath(config, 'body.text')" v-text="config.body.text"></p>
                ${TAG_COMPONENTS}
              </div>
              <div class="actions">
                ${TAG_FOOT_COMPONENTS}
                <button class="ui button basic" v-if="hasPath(config, 'footer.closeButton')" type="button" 
                @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : 'Close'"></button>
              </div>
            </div>
          </div>
          ${version === 1 ? '' : '</transition>'}
        </div>`
      }
    },
    TextInput: {
      template: `<div class="ui input"><input type="text" ${TAG_MODEL} ${TAG_BINDINGS}></div>`
    }
  }
}

