<template>
  <div class="dropdown fselect" :class="{ 'open': open }">
    <div type="text" v-el:selectcontainer
      class="dropdown-toggle form-control"
      @click="toggleDropdown"
      style="height: auto;"
      :style="{ 'width': width, 'text-align': align !== 'center' ? 'left' : null,
       'padding-top': (topWidth + topBorder) + 'px' }"
      style="position: relative; font-weight: normal;">
      <div class="select-body" v-el:selectbody>
        <span v-if="value.length === 0" v-el:placeholder>{{ placeholder }}</span>
        <span v-if="value.length > 0 && !multiple">{{ singleValueText }}</span>
        <span v-if="value.length > 0 && multiple"
        v-for="item in multiValue"
        track-by="$index"
        class="select-tag"
        :class="tagClass">
          <span v-if="!disabled"
            :class="removeClass"
            @click="removeItem(item[valueKey])"
            style="font-size: 10px;"></span>
          <span>{{ item[textKey] }}</span>
        </span>
      </div>
      <span style="position: absolute; right: 4px; top: 50%; font-size: 10px;"
        :class="caretClass"
        @click="multiple && allowClear ? value = [] : null"></span>
    </div>
    <ul class="dropdown-menu" :style="{ 'width': width }">
      <li style="padding: 5px;">
        <input type="text" class="form-control" style="width: 100%">
      </li>
      <li v-for="opt in options">
        <a @click="addItem(opt[valueKey])">{{ opt[textKey] }}</a>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import {
    find, filter, get, map, isArray, isHash,
    isString, without, contains, ensureArray
  } from '../utils/utils'
  import { onEvent, getStyle, pxToInt } from '../utils/helpers'

  function validateClassProp (value) {
    return isString(value) || isArray(value) || isHash(value)
  }

  function validateValue (value) {
    return value || value === 0
  }

  export default {
    data () {
      return {
        open: false,
        removeClickAway: () => {},
        topBorder: 0,
        topWidth: 4
      }
    },
    methods: {
      addItem (id) {
        let val = this.getValue(id)
        if (this.multiple) {
          if (this.allowMultiple || (!this.allowMultiple && !contains(this.value, val))) {
            this.value.push(val)
          }
        } else {
          this.value = [val]
          this.open = false
        }
      },
      removeItem (id) {
        this.value = filter(this.value, (v) => {
          return (this.storeObject && v[this.valueKey] !== id) || (!this.storeObject && v !== id)
        })
      },
      clickAway (event) {
        if (this.$el && !this.$el.contains(event.target) && this.open) this.open = false
      },
      getValue (id) {
        return !this.storeObject ? id : find(this.options, (v) => {
          return v[this.valueKey] === id
        })
      },
      toggleDropdown (event) {
        let clickAreas = [ this.$els.selectcontainer, this.$els.selectbody, this.$els.placeholder ]
        if (contains(clickAreas, event.target)) this.open = !this.open
      }
    },
    computed: {
      caretClass () {
        if (!this.disabled) {
          if (!this.multiple) {
            return 'caret'
          } else if (this.allowClear && this.value.length > 0) {
            return this.removeClass
          }
        }
        return null
      },
      multiValue () {
        return this.storeObject ? this.value : map(this.value, (val) => {
          return find(this.options, (opt) => {
            return opt[this.valueKey] === val
          })
        })
      },
      multiValueText () {
        return map(
          filter(this.options, (opt) => {
            return find(this.value, (val) => {
              let v = this.storeObject ? val[this.valueKey] : val
              return opt[this.valueKey] === v
            })
          }),
          val => val[this.textKey]
        ).join(', ')
      },
      singleValueText () {
        return get(
          find(this.options, (opt) => {
            let v = this.storeObject ? this.value[0][this.valueKey] : this.value[0]
            return opt[this.valueKey] === v
          }),
          this.textKey
        )
      }
    },
    props: {
      align: { type: String, default: 'left' },
      allowClear: { type: Boolean, default: true },
      allowMultiple: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      options: { type: Array },
      placeholder: { type: String, default: '' },
      removeClass: { validator: validateClassProp, default: 'glyphicon glyphicon-remove x-remove' },
      storeObject: { type: Boolean, default: false },
      tagClass: { validator: validateClassProp, default: 'default-tag-style' },
      textKey: { type: String, default: 'text' },
      value: { twoWay: true, validator: validateValue },
      valueKey: { type: String, default: 'value' },
      width: {
        validator (value) {
          let rx = /(^100%$)|^[1-9]\d?%$/
          return !isNaN(value) || String(value).match(rx)
        }
      }
    },
    created () {
      this.removeClickAway = onEvent(document, 'click', this.clickAway)
      this.value = without(map(ensureArray(this.value), (v) => {
        return this.getValue(isString(v) ? v : get(v, this.valueKey, null))
      }), null)
    },
    ready () {
      let style = getStyle(this.$els.selectcontainer, ['border-top-width', 'border-bottom-width'])
      this.topBorder = pxToInt(style['border-top-width']) + pxToInt(style['border-bottom-width'])
    },
    beforeDestroy () {
      this.removeClickAway()
    }
  }
</script>
<style>
  .fselect .dropdown-toggle {
    cursor: default;
    padding-left: 8px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .fselect .select-tag.default-tag-style {
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
    background-color: #e4e4e4;
    border-radius: 14px;
    padding: 2px 12px;
    font-size: 13px;
    margin-right: 2px;
    margin-bottom: 4px;
  }
  .fselect .select-body {
    padding-right: 15px;
  }
  .fselect .x-remove:hover {
    color: red;
  }
</style>
