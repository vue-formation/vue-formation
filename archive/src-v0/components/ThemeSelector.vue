<template>
  <select v-model="value" @change="onChange">
    <option v-for="opt in cookie.themes | orderBy 'text'" :value="opt.value"
      :selected="opt.value === cookie.theme ">{{ opt.text }}</option>
  </select>
</template>
<script type="text/babel">
  import validator from 'validator'
  import { customTheme } from '../vuex/actions'
  export default {
    vuex: {
      actions: {
        customTheme
      },
      getters: {
        cookie: (state) => state.cookie
      }
    },
    created () {
      this.value = this.cookie.theme
    },
    methods: {
      onChange (event) {
        if (this.value === 'customurl') {
          this.$root.$broadcast('modal.show', {
            title: 'Custom Theme URL',
            headerClass: 'bg-primary',
            footerButtons: [
              {
                content: 'Cancel',
                class: 'btn btn-default',
                onClick: (event, modal) => {
                  this.value = this.lastValue
                  modal.hide()
                }
              },
              {
                content: 'Set',
                class: 'btn btn-primary',
                onClick: (event, modal) => {
                  if (validator.isURL(this.$parent.customUrl)) {
                    this.$parent.customUrlError = false
                    /*
                    this.customCount++
                    this.options.push({
                      value: this.$parent.customUrl,
                      text: `Custom${this.customCount}`
                    })
                    */
                    this.customTheme(this.$parent.customUrl)
                    this.value = this.$parent.customUrl
                    this.$root.$broadcast('theme.set', this.value)
                    modal.hide()
                  } else {
                    this.$parent.customUrlError = true
                  }
                }
              }
            ]
          }, 'theme-selector')
        } else {
          this.$root.$broadcast('theme.set', this.value)
        }
      }
    },
    watch: {
      value (newVal, oldVal) {
        if (newVal !== this.lastValue) this.lastValue = oldVal
      }
    },
    data () {
      return {
        customCount: 0,
        lastValue: null,
        value: null,
        options: []
      }
    }
  }
</script>
