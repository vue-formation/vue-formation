<template>
  <link v-el:link v-if="cookie.theme" rel="stylesheet" type="text/css" :href="cookie.theme" id="page-theme">
</template>

<script type="text/babel">
  import {
    changeTheme,
    changeInvertedLogo
  } from '../vuex/actions'
  import * as _ from '../utils/utils'
  export default {
    vuex: {
      actions: {
        changeTheme,
        changeInvertedLogo
      },
      getters: {
        cookie: (state) => state.cookie
      }
    },
    data () {
      return {
        color: null,
        intervalCount: 0,
        interval: null
      }
    },
    methods: {
      parseColor (color) {
        /* http://stackoverflow.com/questions/13070054/convert-rgb-strings-to-hex-in-javascript */
        let arr = []
        color.replace(/[\d+\.]+/g, function (v) { arr.push(parseFloat(v)) })
        return {
          hex: '#' + arr.slice(0, 3).map(this.toHex).join(''),
          opacity: arr.length === 4 ? arr[3] : 1
        }
      },
      toHex (int) {
        let hex = int.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      },
      getContrastYIQ (hexcolor) {
        let opacity = 1
        if (hexcolor.match(/^rgb/)) {
          let convert = this.parseColor(hexcolor)
          hexcolor = convert.hex
          opacity = Number(convert.opacity)
        }
        /* https://24ways.org/2010/calculating-color-contrast/ */
        hexcolor = hexcolor.replace(/^#/, '')
        let r = parseInt(hexcolor.substr(0, 2), 16)
        let g = parseInt(hexcolor.substr(2, 2), 16)
        let b = parseInt(hexcolor.substr(4, 2), 16)
        let yiq = ((r * 299) + (g * 587) + (b * 114)) / (1000 * opacity)
        return (yiq >= 128) ? '#000' : '#fff'
      },
      getColor () {
        let el = document.getElementById('topnav')
        let bgColor = window.getComputedStyle(el).getPropertyValue('background-color')
        return this.getContrastYIQ(bgColor)
      },
      removeInterval () {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    events: {
      'theme.set': function (theme) {
        if (this.interval) {
          this.removeInterval()
          this.interval = null
        }
        let intervalCount = 0
        this.changeTheme(theme)

        setTimeout(() => {
          this.interval = setInterval(() => {
            if (intervalCount > 200) this.removeInterval()
            intervalCount++
            let found = _.find(document.styleSheets, (sheet) => {
              if (sheet.href === theme) return true
            })
            if (found) {
              this.removeInterval()
              this.changeInvertedLogo(this.getColor() === '#fff')
            }
          }, 10)
        }, 100)
      }
    }
  }
</script>
