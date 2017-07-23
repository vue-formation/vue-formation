export default function Backdrop (Vue, version, vm) {
  let BackdropComponent = Vue.extend({
    template: `<div>
      ${version === 1 ? '' : '<transition name="formation-backdrop-fade">'}
      <div id="formation-backdrop" :style="style" v-show="show" transition="formation-backdrop-fade-vue1x"></div>
      ${version === 1 ? '' : '</transition>'}
    </div>`,
    created () {
      this.$root = vm.$root
      this.$root.$on('backdrop.show', requestedBy => {
        if (!this.requestedBy && !this.show) {
          this.requestedBy = requestedBy
          this.show = true
        }
      })
      this.$root.$on('backdrop.hide', requestedBy => {
        if (!this.requestedBy || this.requestedBy === requestedBy) {
          this.show = false
          this.requestedBy = null
        }
      })
      this.$root.$on('backdrop.hide.force', requestedBy => {
        this.show = false
        this.requestedBy = null
      })
    },
    data () {
      return {
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 'auto',
          height: 'auto'
        },
        show: false,
        requestedBy: null
      }
    }
  })

  return {
    create () {
      return new BackdropComponent()
    }
  }
}
