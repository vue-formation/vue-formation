<template>
  <div class="dropdown fselect" :class="{ 'open': open }" :class="{ 'has-error': !valid }">
    <div type="text" v-el:selectcontainer
      class="dropdown-toggle form-control"
      @click="toggleDropdown"
      :style="{ 'width': width, 'text-align': align !== 'center' ? 'left' : null, 'height': 'auto', 'display': 'flex' }"
      style="position: relative; font-weight: normal; height: auto; display: flex;">
      <div class="select-body" v-el:selectbody>
        <span v-if="value.length === 0" v-el:placeholder class="placeholder-text">{{ placeholder }}</span>
        <span v-if="value.length > 0 && !multiple" class="placeholder-text">{{ singleValueText }}</span>
        <span v-if="value.length > 0 && multiple"
        v-for="item in multiValue"
        track-by="$index"
        class="select-tag" :class="tagClass">
          <span v-if="!disabled"
            :class="removeClass"
            @click="emitChange('remove', item[valueKey], selectId)"></span>
          <span>{{ item[textKey] }}</span>
        </span>
      </div>
      <span class="caret-position"
        :class="interactClass"
        @click="emitChange('clear', undefined, selectId)"></span>
      <select class="form-control" style="width: 1px; float: right; visibility: hidden;"></select>
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
        <a @click="emitChange('add', opt[valueKey], selectId)"
          :class="{ hovered: activeOption === $index }">{{ opt[textKey] }}</a>
      </li>
    </ul>
  </div>
</template>
<script type="text/babel">
  import * as _ from '../utils/utils'
  import $ from '../utils/helpers'
  import { isKey } from '../utils/events'
  import '../css/formation-icons.css'

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
      emitChange (type, value, id) {
        this.$emit('fselect.change', type, value, id)
      },
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
            this.$emit('fselect.added', val)
            this.$emit('fselect.changed')
            if (this.onChange) this.onChange('add', val, this)
            this.closeDropdown()
          } else {
            this.removeItem(id)
          }
        } else {
          this.value = [val]
          this.$emit('fselect.added', val)
          this.$emit('fselect.changed')
          if (this.onChange) this.onChange('add', val, this)
          this.closeDropdown()
        }
      },
      closeDropdown (force) {
        if (this.closeOnSelect || force) {
          this.open = false
          this.search = ''
        }
      },
      clearItems () {
        if (this.multiple && this.allowClear) this.value = []
        this.$emit('fselect.cleared')
        this.$emit('fselect.changed')
        if (this.onChange) this.onChange('clear', undefined, this)
      },
      removeItem (id) {
        this.value = _.filter(this.value, (v) => {
          return (this.storeObject && v[this.valueKey] !== id) || (!this.storeObject && v !== id)
        })
        this.$emit('fselect.removed', id)
        this.$emit('fselect.changed')
        if (this.onChange) this.onChange('remove', id, this)
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
          if (item) this.emitChange('add', item[this.valueKey], this.selectId)
        } else if (isKey(event, 'Escape')) {
          this.closeDropdown(true)
        } else {
          this.activeOption = 0
        }
      },
      toggleDropdown (event) {
        let clickAreas = [ this.$els.selectcontainer, this.$els.selectbody, this.$els.placeholder ]
        if (_.contains(clickAreas, event.target)) this.open = !this.open
        if (this.open && this.searchable) { this.$nextTick(() => { this.$els.search.focus() }) }
      }
    },
    computed: {
      interactClass () {
        if (!this.disabled) {
          if (!this.multiple || !this.value.length) {
            return this.caretClass
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
      caretClass: { validator: validateClassProp, default: 'icon formation-caret-down caret-font' },
      closeOnSelect: { type: Boolean, default: true },
      disabled: { type: Boolean, default: false },
      optionLimit: { type: Number, default: 5 },
      multiple: { type: Boolean, default: false },
      onChange: { type: Function },
      onChanging: { type: Function, default: () => true },
      options: { type: Array, required: true },
      placeholder: { type: String, default: '' },
      removeClass: { validator: validateClassProp, default: 'icon formation-remove x-remove' },
      removeSelectedOptions: { type: Boolean, default: false },
      searchable: { type: Boolean, default: true },
      selectId: { type: String },
      storeObject: { type: Boolean, default: false },
      tagClass: {
        validator: validateClassProp,
        default () {
          return ['btn', 'btn-primary', 'default-tag-class']
        }
      },
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
    },
    beforeDestroy () {
      this.removeClickAway()
    },
    events: {
      'fselect.change': function (type, value, id) {
        //  check for selectId option and return if not the correct id
        if (this.selectId && this.selectId !== id) return

        //  make changes
        this.$emit('fselect.changing', type, value, this, id)
        if (this.onChanging(type, value, this)) {
          switch (type) {
            case 'add':
              this.$emit('fselect.adding', value, this, id)
              this.addItem(value)
              break
            case 'remove':
              this.$emit('fselect.removing', value, this, id)
              this.removeItem(value)
              break
            case 'clear':
              this.$emit('fselect.clearing', this, id)
              this.clearItems()
              break
            default:
              break
          }
        }
      },
      'fselect.add': function (value, id) {
        this.$emit('fselect.change', 'add', value, id)
      },
      'fselect.remove': function (value, id) {
        this.$emit('fselect.change', 'remove', value, id)
      },
      'fselect.clear': function (id) {
        this.$emit('fselect.change', 'clear', id)
      }
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
  .fselect .select-tag.default-tag-class {
    margin: 2px;
    font-size: 0.75em;
    padding: 0px 10px;
    height: 2em;
    line-height: 2em;
  }
  .fselect .select-tag.default-tag-style {
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
    background-color: #e4e4e4;
    border-radius: 14px;
    padding: 0px 12px;
    margin: 2px;
  }
  .fselect .select-body {
    padding: 2px 0px 2px 0px;
    height: auto;
  }
  .fselect .x-remove {
    font-size: 10px;
    min-height: inherit;
  }
  .fselect .x-remove:hover {
    color: red;
  }
  .fselect .placeholder-text {
    line-height: 2em;
  }
  .fselect .caret-font {
    font-size: 13px;
  }
  .fselect .caret-position {
    position: absolute;
    top: 50%;
    right: 4px;
    line-height: 0.5em;
    color: #555;
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
