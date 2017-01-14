<template>
  <button type="button" :class="clazz" :style="config.style">
    <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
    <span>{{config.text}}</span>
    <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
    {{{config.html}}}
  </button>
</template>

<script type="text/babel">
  import _ from 'lodash'
  import registerComponents from './components'
  import { BTN_CLASS } from './constants'
  import { mergeClass } from '../common'

  export default {
    name: 'FButton',
    props: {
      model: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } }
    },
    computed: {
      clazz () {
        let type = _.has(BTN_CLASS, this.config.type) ? BTN_CLASS[this.config.type] : 'btn-default'
        return mergeClass({
          'btn': true,
          [type]: true
        }, this.config.class)
      }
    },
    init () {
      registerComponents(this.$options.components, ['FButton'])
    }
  }
</script>
