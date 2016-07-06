<template>
  <div>
    <div v-el:modal
         class="modal fade in"
         :style="{ 'display': show ? 'block' : 'none', 'z-index': 1031 }"
         role="dialog">
      <div class="modal-dialog" role="document" style="z-index: 2000">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="hideModal()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Modal title</h4>
          </div>
          <div class="modal-body">
            <p>One fine body&hellip;</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
  <div v-el:backdrop
       class="modal-backdrop fade in"
       :style="{ 'display': show ? 'block' : 'none', 'z-index': 1030 }"></div>
</template>
<script type="text/babel">
  import $ from '../utils/helpers'

  export default {
    data () {
      return {
        open: false,
        removeClickAway: () => {}
      }
    },
    methods: {
      clickAway (event) {
        if (this.$els && this.$els.modal && !this.$els.modal.contains(event.target) && this.open) this.hideModal()
      },
      toggleModal () {
        this.show = !this.show
      },
      hideModal () {
        this.show = false
      },
      showModal () {
        this.show = true
      }
    },
    created () {
      this.removeClickAway = $(document).click(this.clickAway, undefined, true)
    },
    beforeDestroy () {
      this.removeClickAway()
    },
    props: {
      show: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      config: {
        type: Object
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.$emit('modal.opening')
        } else {
          this.$emit('modal.closing')
        }
      }
    },
    events: {
      'modal.opening': function () {
        this.open = false
        setTimeout(() => { this.$emit('modal.open') }, 0)
      },
      'modal.open': function () {
        this.open = true
      },
      'modal.closing': function () {
        this.open = true
        setTimeout(() => { this.$emit('modal.close') }, 0)
      },
      'modal.close': function () {
        this.open = false
      }
    }
  }
</script>
