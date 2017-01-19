<template>
  <button type="button" :class="clazz" :style="config.style">
    <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
    <span>{{config.text}}</span>
    <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
    <div v-if="config.html" v-html="config.html"></div>
  </button>
</template>

<script type="text/babel">
  import _ from 'lodash/lodash.min'
  import { BTN_CLASS } from './common/constants'
  import { mergeClass } from '../common/index'

  export default {
    name: 'formation-button',
    props: {
      value: { type: Object },
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
    }
  }
</script>
