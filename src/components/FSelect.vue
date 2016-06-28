<template>
  <div class="dropdown fselect" :class="{ 'open': open }" :class="{ 'has-error': !valid }">
    <div type="text" v-el:selectcontainer
      class="dropdown-toggle form-control"
      @click="toggleDropdown"
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
    <ul class="dropdown-menu scrollable-dropdown" :style="{ 'width': width }">
      <li class="search-field">
        <input v-show="searchable" v-el:search
          @keydown="searchHandler"
          type="text"
          v-model="search"
          class="form-control"
          style="width: 100%; margin-bottom: 5px;"
          placeholder="Search...">
        <span v-if="searchable && !searchResults.length">
          <i>No Results Found...</i>
        </span>
      </li>
      <li v-for="opt in options | selectable" :class="{ active: isSelected(opt) }"
        @mouseover="activeOption = $index">
        <a @click="addItem(opt[valueKey])" :class="{ hovered: activeOption === $index }">{{ opt[textKey] }}</a>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import * as _ from '../utils/utils'
  import $ from '../utils/helpers'
  import { isKey } from '../utils/events'

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
        removeClickAway: () => {},
        search: '',
        searchResults: [],
        activeOption: 0
      }
    },
    methods: {
      addItem (id) {
        let val = this.getValue(id)
        let found = _.contains(this.value, val)
        if (this.value.length >= this.selectLimit && !found) {
          this.$dispatch('fselect.error', {
            message: `The maximum selected option limit of ${this.selectLimit} has been reached`
          })
          return
        } else if (this.multiple) {
          if (this.allowMultiple || (!this.allowMultiple && !found)) {
            this.value.push(val)
            this.closeDropdown()
          } else {
            this.removeItem(id)
          }
        } else {
          this.value = [val]
          this.closeDropdown()
        }
      },
      closeDropdown (force) {
        if (this.closeOnSelect || force) {
          this.open = false
          this.search = ''
        }
      },
      removeItem (id) {
        this.value = _.filter(this.value, (v) => {
          return (this.storeObject && v[this.valueKey] !== id) || (!this.storeObject && v !== id)
        })
      },
      clickAway (event) {
        if (this.$el && !this.$el.contains(event.target) && this.open) this.closeDropdown(true)
      },
      getValue (id) {
        return !this.storeObject ? id : _.find(this.options, (v) => {
          return v[this.valueKey] === id
        })
      },
      isSelected (opt) {
        let ids = _.map(this.value, (v) => {
          return this.storeObject ? v[this.valueKey] : v
        })
        return _.contains(ids, opt[this.valueKey])
      },
      searchHandler (event) {
        if (isKey(event, 'ArrowDown') && this.activeOption < this.searchResults.length - 1) {
          this.activeOption++
        } else if (isKey(event, 'ArrowUp') && this.activeOption > 0) {
          this.activeOption--
        } else if (isKey(event, 'Enter')) {
          event.preventDefault()
          let item = this.searchResults[this.activeOption]
          if (item) this.addItem(item[this.valueKey])
        } else if (isKey(event, 'Escape')) {
          this.closeDropdown(true)
        } else {
          this.activeOption = 0
        }
      },
      toggleDropdown (event) {
        let clickAreas = [ this.$els.selectcontainer, this.$els.selectbody, this.$els.placeholder ]
        if (_.contains(clickAreas, event.target)) this.open = !this.open
        if (this.open && this.searchable) { setTimeout(() => { this.$els.search.focus() }, 10) }
      }
    },
    computed: {
      caretClass () {
        if (!this.disabled) {
          if (!this.multiple || !this.value.length) {
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
        let newOptions = _.filter(options, (opt) => {
          try {
            return opt[this.textKey].match(new RegExp(this.search, 'i')) || this.search === ''
          } catch (err) {
            return false
          }
        })
        this.searchResults = newOptions.slice(0, this.optionLimit)
        return newOptions.slice(0, this.optionLimit)
      }
    },
    props: {
      align: { type: String, default: 'left' },
      allowClear: { type: Boolean, default: true },
      allowMultiple: { type: Boolean, default: false },
      closeOnSelect: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      optionLimit: { type: Number, default: 5 },
      multiple: { type: Boolean, default: false },
      options: { type: Array },
      placeholder: { type: String, default: '' },
      removeClass: { validator: validateClassProp, default: 'glyphicon glyphicon-remove x-remove' },
      removeSelectedOptions: { type: Boolean, default: false },
      searchable: { type: Boolean, default: true },
      selectLimit: { type: Number },
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
      this.removeClickAway = $(document).click(this.clickAway, undefined, true)
      this.value = _.without(_.map(_.ensureArray(this.value), (v) => {
        return this.getValue(_.isString(v) ? v : _.get(v, this.valueKey, null))
      }), null)

      //  set the min-height to the initial height and make the select container auto height
      $(document).ready(() => {
        let minHeight = window.getComputedStyle(this.$els.selectcontainer).getPropertyValue('height')
        this.$els.selectcontainer.style.minHeight = minHeight
        this.$els.selectcontainer.style.height = 'auto'
      })
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
    height: auto;
  }
  .fselect .x-remove {
    font-size: 9px;
    min-height: inherit;
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
  .fselect .scrollable-dropdown {
    height: auto;
    max-height: 15em;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .fselect .form-control {
    padding-right: 16px !important;
  }
  .fselect .hovered {
    background-color: rgb(238, 238, 238);
    color: #000;
  }
</style>
