<template>
  <div class="dropdown fselect" :class="{ 'open': open }">
    <div type="text"
      class="dropdown-toggle form-control"
      @click="open = !open"
      style="height: auto; padding-bottom: 4px;"
      :style="{ 'width': width, 'text-align': align !== 'center' ? 'left' : null }"
      style="position: relative; font-weight: normal;">
      <div style="padding-right: 15px;">
        <span v-if="value.length === 0">{{ placeholder }}</span>
        <span v-if="value.length > 0 && !multiple">{{ singleValueText }}</span>
        <span v-if="value.length > 0 && multiple"
        v-for="item in multiValue"
        class="select-tag">
          <span v-if="!disabled" class="glyphicon glyphicon-remove" style="font-size: 10px;"></span>
            <span>{{ item[textKey] }}</span>
        </span>
      </div>
      <span class="caret" style="position: absolute; right: 4px; top: 50%"></span>
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
  import { find, filter, get, map } from '../utils/utils'
  import { on } from '../utils/helpers'
  export default {
    data () {
      return { open: false }
    },
    methods: {
      addItem (id) {
        if (this.multiple) {
          this.value.push(id)
        } else {
          this.value = [id]
          this.open = false
        }
      }
    },
    computed: {
      singleValueText () {
        return get(
          find(this.options, (opt) => {
            let v = this.storeObject ? this.value[0][this.valueKey] : this.value[0]
            return opt[this.valueKey] === v
          }),
          this.textKey
        )
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
      }
    },
    props: {
      disabled: { type: Boolean, default: false },
      multiple: { type: Boolean, default: false },
      options: { type: Array },
      placeholder: { type: String, default: '' },
      storeObject: { type: Boolean, default: false },
      textKey: { type: String, default: 'text' },
      value: { twoWay: true, type: Array },
      valueKey: { type: String, default: 'value' },
      width: {
        validator (value) {
          let rx = /(^100%$)|^[1-9]\d?%$/
          return !isNaN(value) || String(value).match(rx)
        }
      }
    },
    ready () {
      //  close on click-away
      on(document, 'click', (event) => {
        if (!this.$el.contains(event.target)) this.open = false
      })
    }
  }
</script>
<style>
  .fselect .dropdown-toggle {
    cursor: default;
    padding-left: 8px;
  }
  .fselect .select-tag {
    display: inline-block;
    color: rgba(0, 0, 0, 0.6);
    background-color: #e4e4e4;
    border-radius: 16px;
    padding: 4px 12px;
    margin-right: 4px;
    font-size: 12px;
  }
</style>
