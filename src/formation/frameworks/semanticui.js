import { TAG_BINDINGS, TAG_MODEL, TAG_COMPONENTS, TAG_DEFAULT_CLASS } from '../common/constants'

export default {
  name: 'semanticui',
  maxCols: 16,
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
    'form-grid': {
      columnClass (width) {
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
      },
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
    'modal': {
      template: `<div ${TAG_BINDINGS}>
        <div :class="{ 'formation-modal-blur-area': hideOnBackdrop }" @click="contentBlur"
        :style="{ display: show ? 'block' : 'none', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: 'auto', width: 'auto', 'z-index': zIndex }">
          <div class="ui modal" :style="{ display: show ? 'block' : 'none', top: '10%' }">
            <div class="header" v-if="hasPath(config, 'header.text')" v-text="config.header.text"></div>
            <div class="content">
              ${TAG_COMPONENTS}
            </div>
            <div class="actions">
            
            </div>
          </div>
        </div>
      </div>`
    },
    'text-input': {
      template: `<div class="ui input"><input type="text" ${TAG_MODEL} ${TAG_BINDINGS}></div>`
    }
  }
}

