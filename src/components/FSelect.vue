<template>
  <div class="dropdown fselect" :class="{ 'open': open }">
    <div type="text" v-el:selectcontainer
      class="dropdown-toggle form-control"
      @click="toggleDropdown" style="height: auto;"
      :style="{ 'width': width, 'text-align': align !== 'center' ? 'left' : null }"
      style="position: relative; font-weight: normal;">
      <div class="select-body" v-el:selectbody>
        <span v-if="value.length === 0" v-el:placeholder class="placeholder-text">{{ placeholder }}</span>
        <span v-if="value.length > 0 && !multiple" class="placeholder-text">{{ singleValueText }}</span>
        <span v-if="value.length > 0 && multiple"
        v-for="item in multiValue"
        track-by="$index"
        class="select-tag"
        :class="tagClass">
          <span v-if="!disabled"
            :class="removeClass"
            @click="removeItem(item[valueKey])"></span>
          <span>{{ item[textKey] }}</span>
        </span>
      </div>
      <span class="caret-position"
        :class="caretClass"
        @click="multiple && allowClear ? value = [] : null"></span>
    </div>
    <ul class="dropdown-menu" :style="{ 'width': width }">
      <li class="search-field">
        <input type="text" class="form-control" style="width: 100%" placeholder="Search...">
      </li>
      <li v-for="opt in options | selectable">
        <a @click="addItem(opt[valueKey])">{{ opt[textKey] }}</a>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import * as _ from '../utils/utils'
  import { onEvent } from '../utils/helpers'

  function validateClassProp (value) {
    return _.isString(value) || _.isArray(value) || _.isHash(value)
  }

  function validateValue (value) {
    return value || value === 0
  }

  export default {
    data () {
      return {
        open: false,
        removeClickAway: () => {}
      }
    },
    methods: {
      addItem (id) {
        let val = this.getValue(id)
        if (this.multiple) {
          if (this.allowMultiple || (!this.allowMultiple && !_.contains(this.value, val))) {
            this.value.push(val)
            this.closeDropdown()
          }
        } else {
          this.value = [val]
          this.closeDropdown()
        }
      },
      closeDropdown () {
        if (this.closeOnSelect) this.open = false
      },
      removeItem (id) {
        this.value = _.filter(this.value, (v) => {
          return (this.storeObject && v[this.valueKey] !== id) || (!this.storeObject && v !== id)
        })
      },
      clickAway (event) {
        if (this.$el && !this.$el.contains(event.target) && this.open) this.open = false
      },
      getValue (id) {
        return !this.storeObject ? id : _.find(this.options, (v) => {
          return v[this.valueKey] === id
        })
      },
      toggleDropdown (event) {
        let clickAreas = [ this.$els.selectcontainer, this.$els.selectbody, this.$els.placeholder ]
        if (_.contains(clickAreas, event.target)) this.open = !this.open
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
        return this.storeObject ? this.value : _.map(this.value, (val) => {
          return _.find(this.options, (opt) => {
            return opt[this.valueKey] === val
          })
        })
      },
      multiValueText () {
        return _.map(
          _.filter(this.options, (opt) => {
            return _.find(this.value, (val) => {
              let v = this.storeObject ? val[this.valueKey] : val
              return opt[this.valueKey] === v
            })
          }),
          val => val[this.textKey]
        ).join(', ')
      },
      singleValueText () {
        return _.get(
          _.find(this.options, (opt) => {
            let v = this.storeObject ? this.value[0][this.valueKey] : this.value[0]
            return opt[this.valueKey] === v
          }),
          this.textKey
        )
      }
    },
    filters: {
      selectable (options) {
        if (!this.removeSelectedOptions) return options
        let ids = _.map(this.value, (val) => {
          return this.storeObject ? val[this.valueKey] : val
        })
        return _.filter(options, (opt) => {
          return !_.includes(ids, opt[this.valueKey])
        })
      }
    },
    props: {
      align: { type: String, default: 'left' },
      allowClear: { type: Boolean, default: true },
      allowMultiple: { type: Boolean, default: false },
      closeOnSelect: { type: Boolean, default: true },
      disabled: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      options: { type: Array },
      placeholder: { type: String, default: '' },
      removeClass: { validator: validateClassProp, default: 'glyphicon glyphicon-remove x-remove' },
      removeSelectedOptions: { type: Boolean, default: true },
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
      this.value = _.without(_.map(_.ensureArray(this.value), (v) => {
        return this.getValue(_.isString(v) ? v : _.get(v, this.valueKey, null))
      }), null)
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
    padding: 3px 12px;
    font-size: 13px;
    margin: 2px;
  }
  .fselect .select-body {
    padding: 2px 0px 2px 0px;
  }
  .fselect .x-remove {
    font-size: 9px;
  }
  .fselect .x-remove:hover {
    color: red;
  }
  .fselect .placeholder-text {
    line-height: 2em;
  }
  .fselect .caret-position {
    position: absolute;
    top: 50%;
    right: 4px;
    line-height: 0.5em;
    font-size: 10px;
  }
  .fselect .dropdown-menu .search-field {
    padding: 0px 20px;
  }
</style>
