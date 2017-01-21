<template>
  <input type="text"
         :accesskey="hasAttr('accesskey') ? getAttr('accesskey', 'String') : null"
         :class="clazz"
         :contenteditable="hasAttr('contenteditable') ? getAttr('contenteditable', 'String') : null"
         :contextmenu="hasAttr('contextmenu') ? getAttr('contextmenu', 'String') : null"
         :dir="hasAttr('dir') ? getAttr('dir', 'String') : null"
         :draggable="hasAttr('draggable') ? getAttr('draggable', 'String') : null"
         :dropzone="hasAttr('dropzone') ? getAttr('dropzone', 'String') : null"
         :hidden="hasAttr('hidden') ? getAttr('hidden', 'Boolean') : null"
         :id="hasAttr('id') ? getAttr('id', 'String') : null"
         :lang="hasAttr('lang') ? getAttr('lang', 'String') : null"
         :spellcheck="hasAttr('spellcheck') ? getAttr('spellcheck', 'String') : null"
         :style="hasAttr('style') ? getAttr('style', 'String,Array,Object') : null"
         :tabindex="hasAttr('tabindex') ? getAttr('tabindex', 'String') : null"
         :title="hasAttr('title') ? getAttr('title', 'String') : null"
         :translate="hasAttr('translate') ? getAttr('translate', 'String') : null"
         :accept="hasAttr('accept') ? getAttr('accept', 'String') : null"
         :autocomplete="hasAttr('autocomplete') ? getAttr('autocomplete', 'String') : null"
         :autofocus="hasAttr('autofocus') ? getAttr('autofocus', 'Boolean') : null"
         :dirname="hasAttr('dirname') ? getAttr('dirname', 'String') : null"
         :disabled="hasAttr('disabled') ? getAttr('disabled', 'Boolean') : null"
         :form="hasAttr('form') ? getAttr('form', 'String') : null"
         :formnovalidate="hasAttr('formnovalidate') ? getAttr('formnovalidate', 'Boolean') : null"
         :list="hasAttr('list') ? getAttr('list', 'String') : null"
         :max="hasAttr('max') ? getAttr('max', 'String') : null"
         :maxlength="hasAttr('maxlength') ? getAttr('maxlength', 'String') : null"
         :min="hasAttr('min') ? getAttr('min', 'String') : null"
         :multiple="hasAttr('multiple') ? getAttr('multiple', 'Boolean') : null"
         :name="hasAttr('name') ? getAttr('name', 'String') : null"
         :pattern="hasAttr('pattern') ? getAttr('pattern', 'String') : null"
         :placeholder="hasAttr('placeholder') ? getAttr('placeholder', 'String') : null"
         :readonly="hasAttr('readonly') ? getAttr('readonly', 'Boolean') : null"
         :required="hasAttr('required') ? getAttr('required', 'Boolean') : null"
         :size="hasAttr('size') ? getAttr('size', 'String') : null"
         :step="hasAttr('step') ? getAttr('step', 'String') : null"
         v-on:blur="hasEvent('blur') ? eventHandler('blur', $event) : null"
         v-on:change="hasEvent('change') ? eventHandler('change', $event) : null"
         v-on:contextmenu="hasEvent('contextmenu') ? eventHandler('contextmenu', $event) : null"
         v-on:focus="hasEvent('focus') ? eventHandler('focus', $event) : null"
         v-on:input="hasEvent('input') ? eventHandler('input', $event) : null"
         v-on:invalid="hasEvent('invalid') ? eventHandler('invalid', $event) : null"
         v-on:reset="hasEvent('reset') ? eventHandler('reset', $event) : null"
         v-on:search="hasEvent('search') ? eventHandler('search', $event) : null"
         v-on:select="hasEvent('select') ? eventHandler('select', $event) : null"
         v-on:submit="hasEvent('submit') ? eventHandler('submit', $event) : null"
         v-on:keydown="hasEvent('keydown') ? eventHandler('keydown', $event) : null"
         v-on:keypress="hasEvent('keypress') ? eventHandler('keypress', $event) : null"
         v-on:keyup="hasEvent('keyup') ? eventHandler('keyup', $event) : null"
         v-on:click="hasEvent('click') ? eventHandler('click', $event) : null"
         v-on:dblclick="hasEvent('dblclick') ? eventHandler('dblclick', $event) : null"
         v-on:mousedown="hasEvent('mousedown') ? eventHandler('mousedown', $event) : null"
         v-on:mousemove="hasEvent('mousemove') ? eventHandler('mousemove', $event) : null"
         v-on:mouseout="hasEvent('mouseout') ? eventHandler('mouseout', $event) : null"
         v-on:mouseover="hasEvent('mouseover') ? eventHandler('mouseover', $event) : null"
         v-on:mouseup="hasEvent('mouseup') ? eventHandler('mouseup', $event) : null"
         v-on:mousewheel="hasEvent('mousewheel') ? eventHandler('mousewheel', $event) : null"
         v-on:wheel="hasEvent('wheel') ? eventHandler('wheel', $event) : null"
         v-model="value[config.model]">
</template>

<script type="text/babel">
  import multi from 'vue-multi-version'
  import {
    mergeClass,
    ensureConfig,
    getAttr,
    eventHandler,
    query as $,
    dash as _
  } from '../common/index'

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
    methods: {
      eventHandler,
      getAttr,
      hasAttr (name) {
        return _.has(this, `config.attrs.${name}`)
      },
      hasEvent (name) {
        return _.has(this, `config.on.${name}`)
      }
    },
    created () {
      ensureConfig(this.config)
    },
    ready () {
      console.log(this)
      console.log($(this.$el))
    },
    mounted () {
      console.log(this)
      console.log($(this.$el))
    },
    computed: {
      clazz () {
        return mergeClass({
          'form-control': true
        }, _.isFunction(this.config.attrs.class)
          ? this.config.attrs.class()
          : this.config.attrs.class)
      }
    },
    data () {
      return {
        vm: this
      }
    }
  }
</script>
