<template>
  <link v-el:link v-if="current" rel="stylesheet" type="text/css" :href="current" id="page-theme">
</template>

<script type="text/babel">
  export default {
    data () {
      return {
        color: null,
        intervalCount: 0,
        interval: null,
        current: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css'
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
        let intervalCount = 0
        let color = this.getColor()
        this.current = theme
        if (this.interval) {
          this.removeInterval()
          this.interval = null
        }
        this.interval = setInterval(() => {
          if (intervalCount > 200) this.removeInterval()
          intervalCount++
          let currentColor = this.getColor()
          if (currentColor !== color) {
            this.removeInterval()
            this.$root.$broadcast('logo.inverted', currentColor === '#fff')
          }
        }, 10)
      }
    }
  }
</script>
