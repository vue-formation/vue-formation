<template>
  <input type="text"
    :class="clazz"
    :style="config.style"
    :readonly="readonly"
    :disabled="disabled"
    :placeholder="placeholder"
    v-on:keydown="config.onkeydown ? eventHandler(config.onkeydown) : null"
    v-model="value[config.model]">
</template>

<script type="text/babel">
  import multi from 'vue-multi-version'
  import { mergeClass, evalProp, evalEvent } from '../common/index'

  export default {
    name: 'formation-text-input',
    props: {
      value: {
        type: Object,
        required: true,
        twoWay: multi.select(true, undefined)
      },
      /**
       * @property {String} model - model path
       * @property {*} [class] - css class settings
       * @property {*} [style] - css style settings
       * @property {Boolean|Function} [readonly=false] - make form readonly
       * @property {Boolean|Function} [disabled=false] - disable form
       * @placeholder {String|Function} [placeholder=""] - placeholder text
       */
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } }
    },
    created () {
      console.log(this)
    },
    methods: {
      eventHandler (event) {
        return evalEvent(event, this)
      },
      foo (evt) {
        console.log(evt, 'stuff')
      }
    },
    computed: {
      clazz () {
        return mergeClass({
          'form-control': true
        }, this.config.class)
      },
      disabled () {
        return evalProp(
          [Function, Boolean],
          this.config.disabled,
          this,
          this.config,
          this.value,
          false
        )
      },
      placeholder () {
        return evalProp(
          [Function, String],
          this.config.placeholder,
          this,
          this.config,
          this.value,
          ''
        )
      },
      readonly () {
        return evalProp(
          [Function, Boolean],
          this.config.readonly,
          this,
          this.config,
          this.value,
          false
        )
      }
    }
  }
</script>
