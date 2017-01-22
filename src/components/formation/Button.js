import { mergeClass, dash as _ } from './common/index'
import { FRAMEWORKS, BOOTSTRAP } from './common/constants'

const BTN_CLASS = {
  default: 'btn-default',
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  danger: 'btn-danger',
  link: 'btn-link'
}

export default function Button (binding, framework) {
  let template = `<button type="button" :class="clazz" :style="config.style">
  <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
  <span>{{config.text}}</span>
  <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
  <div v-if="config.html" v-html="config.html"></div>
</button>`

  return {
    template,
    name: 'formation-button',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework)
    },
    computed: {
      clazz () {
        let type = _.has(BTN_CLASS, this.config.type) ? BTN_CLASS[this.config.type] : 'btn-default'
        return mergeClass({
          'btn': true,
          [type]: true
        }, this.config.class)
      }
    }
  }
}
