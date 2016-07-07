<template>
  <div @click="clickAway">
    <div v-if="show" :transition="animation !== 'none' ? animation : null" v-el:modal class="modal"
      style="display: block;"
      :style="{ 'z-index': zIndex + 1 }"
      :class="{ 'mopen': open, 'mclose': !open }"
      role="dialog">
      <div class="modal-dialog" role="document" style="z-index: 2000">
        <div v-el:content class="modal-content">
          <div v-if="config.showHeader !== false"
               class="modal-header"
               :class="config.headerClass"
               :style="config.headerStyle">
            <slot name="header">
              <button v-if="config.headerClose !== false" type="button" class="close" @click="hideModal()">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">
                <span v-if="config.headerIconClass" :class="config.headerIconClass"></span>
                {{ title || config.title }}
              </h4>
            </slot>
          </div>
          <div v-if="config.showBody !== false"
               class="modal-body"
               :class="config.bodyClass"
               :style="config.bodyStyle">
            <slot name="body">
              {{{ isFunction(config.body) ? config.body(this) : config.body }}}
            </slot>
          </div>
          <div v-if="config.showFooter !== false"
               class="modal-footer"
               :class="config.footerClass"
               :style="config.footerStyle">
            <slot name="footer">
              {{{ isFunction(config.footer) ? config.footer(this) : config.footer }}}
              <button v-for="button in config.footerButtons"
                @click="button.onClick($event, this)" :class="button.class"
                :style="button.style">
                {{{ button.content }}}
              </button>
            </slot>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div :transition="animation !== 'none' ? animation : null"
      v-if="backdrop && show"
      class="backdrop-container"
      :class="{ 'mopen': open, 'mclose': !open }">
      <div class="modal-backdrop"
        :style="{ 'z-index': zIndex, 'opacity': backdropOpacity }">
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  // import $ from '../utils/helpers'

  export default {
    data () {
      return {
        opener: false,
        open: false
      }
    },
    methods: {
      isFunction (obj) {
        return typeof obj === 'function'
      },
      clickAway (event) {
        if (!this.$els.content.contains(event.target) && this.open) this.hideModal()
      },
      toggleModal () {
        this.show = !this.show
      },
      toggle () {
        this.toggleModal()
      },
      hideModal (noSet) {
        if (this.opener) return
        this.$emit('modal.closing')
        this.$emit('hide.bs.modal')
        if (!noSet) this.show = false
      },
      hide () {
        this.hideModal()
      },
      showModal (noSet) {
        this.opener = true
        this.$emit('modal.opening')
        this.$emit('show.bs.modal')
        if (this.exclusive) this.$root.$broadcast('modal.hide')
        if (!noSet) this.show = true
      }
    },
    props: {
      show: {
        twoWay: true,
        type: Boolean,
        default: false
      },
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      backdrop: {
        type: Boolean,
        default: true
      },
      backdropOpacity: {
        type: Number,
        default: 0.5
      },
      exclusive: {
        type: Boolean,
        default: true
      },
      zIndex: {
        type: Number,
        default: 2000000000
      },
      animation: {
        type: String,
        default: 'fade-modal'
      }
    },
    watch: {
      show (val) {
        val ? this.showModal(true) : this.hideModal(true)
      }
    },
    events: {
      'modal.hide': function () {
        this.hideModal()
      },
      'modal.show': function (config) {
        this.config = config || this.config
        this.showModal()
      },
      'modal.opening': function () {
        setTimeout(() => { this.$emit('modal.open') }, 0)
      },
      'modal.open': function () {
        this.open = true
        this.opener = false
        this.$emit('shown.bs.modal')
      },
      'modal.closing': function () {
        setTimeout(() => { this.$emit('modal.close') }, 0)
      },
      'modal.close': function () {
        this.open = false
        this.$emit('hidden.bs.modal')
      }
    }
  }
</script>
<style>
  .fade-modal-enter, .fade-modal-leave {
    opacity: 0;
  }
  .fade-modal-transition.modal {
    transition: opacity 0.3s ease;
  }
  .fade-modal-transition.backdrop-container {
    transition: opacity 0.5s ease;
  }
  .fade-modal-transition.modal.mclose, .fade-modal-transition.backdrop-container.mopen {
    transition-delay: 0.2s;
  }
</style>
