<template>
  <input type="text"
         :accesskey="config.accesskey"
         :class="clazz"
         :contenteditable="config.contenteditable"
         :contextmenu="config.contextmenu"
         :dir="config.dir"
         :draggable="config.draggable"
         :dropzone="config.dropzone"
         :hidden="config.hidden"
         :id="config.id"
         :lang="config.lang"
         :spellcheck="config.spellcheck"
         :style="config.style"
         :tabindex="config.tabindex"
         :title="config.title"
         :translate="config.translate"
         :accept="config.accept"
         :autocomplete="config.autocomplete"
         :autofocus="config.autofocus"
         :dirname="config.dirname"
         :disabled="disabled"
         :form="config.form"
         :formnovalidate="config.formnovalidate"
         :list="config.list"
         :max="config.max"
         :maxlength="config.maxlength"
         :min="config.min"
         :multiple="config.multiple"
         :name="config.name"
         :pattern="config.pattern"
         :placeholder="placeholder ? placeholder : null"
         :readonly="readonly"
         :required="config.required"
         :size="config.size"
         :step="config.step"
         v-on:blur="config.onblur ? eventHandler(config.onblur, vm)($event, config, value) : null"
         v-on:change="config.onchange ? eventHandler(config.onchange, vm)($event, config, value) : null"
         v-on:contextmenu="config.oncontextmenu ? eventHandler(config.oncontextmenu, vm)($event, config, value) : null"
         v-on:focus="config.onfocus ? eventHandler(config.onfocus, vm)($event, config, value) : null"
         v-on:input="config.oninput ? eventHandler(config.oninput, vm)($event, config, value) : null"
         v-on:invalid="config.oninvalid ? eventHandler(config.oninvalid, vm)($event, config, value) : null"
         v-on:reset="config.onreset ? eventHandler(config.onreset, vm)($event, config, value) : null"
         v-on:search="config.onsearch ? eventHandler(config.onsearch, vm)($event, config, value) : null"
         v-on:select="config.onselect ? eventHandler(config.onselect, vm)($event, config, value) : null"
         v-on:submit="config.onsubmit ? eventHandler(config.onsubmit, vm)($event, config, value) : null"
         v-on:keydown="config.onkeydown ? eventHandler(config.onkeydown, vm)($event, config, value) : null"
         v-on:keypress="config.onkeypress ? eventHandler(config.onkeypress, vm)($event, config, value) : null"
         v-on:keyup="config.onkeyup ? eventHandler(config.onkeyup, vm)($event, config, value) : null"
         v-on:click="config.onclick ? eventHandler(config.onclick, vm)($event, config, value) : null"
         v-on:dblclick="config.ondblclick ? eventHandler(config.ondblclick, vm)($event, config, value) : null"
         v-on:mousedown="config.onmousedown ? eventHandler(config.onmousedown, vm)($event, config, value) : null"
         v-on:mousemove="config.onmousemove ? eventHandler(config.onmousemove, vm)($event, config, value) : null"
         v-on:mouseout="config.onmouseout ? eventHandler(config.onmouseout, vm)($event, config, value) : null"
         v-on:mouseover="config.onmouseover ? eventHandler(config.onmouseover, vm)($event, config, value) : null"
         v-on:mouseup="config.onmouseup ? eventHandler(config.onmouseup, vm)($event, config, value) : null"
         v-on:mousewheel="config.onmousewheel ? eventHandler(config.onmousewheel, vm)($event, config, value) : null"
         v-on:wheel="config.onwheel ? eventHandler(config.onwheel, vm)($event, config, value) : null"
         v-model="value[config.model]">
</template>

<script type="text/babel">
  import multi from 'vue-multi-version'
  import { mergeClass, evalProp, evalEvent, query } from '../common/index'

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
      eventHandler (event) {
        return evalEvent(event, this)
      }
    },
    ready () {
      console.log(this.$el)
      console.log(query(this.$el))
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
      },
      vm () {
        return this
      }
    }
  }
</script>
