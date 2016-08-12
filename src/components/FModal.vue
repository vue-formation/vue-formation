<template>
  <div @click="clickAway">
    <div v-if="show" :transition="animation !== 'none' ? animation : null" v-el:modal class="modal"
      style="display: block;"
      :style="{ 'z-index': zIndex + 1 }"
      :class="{ 'mopen': open, 'mclose': !open }"
      role="dialog">
      <div class="modal-dialog" :class="dialogClass" role="document">
        <div v-el:content class="modal-content">
          <div v-if="config.showHeader !== false"
               class="modal-header"
               :class="config.headerClass"
               :style="config.headerStyle">
            <slot name="header">
              <button v-if="config.headerClose !== false" type="button" class="close" @click="show = false">
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
                @click="button.onClick ? button.onClick($event, this) : null" :class="button.class"
                :style="button.style">
                {{{ button.content }}}
              </button>
            </slot>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- Deprecating
    <div :transition="animation !== 'none' ? animation : null"
      v-if="backdrop && show"
      class="backdrop-container"
      :class="{ 'mopen': open, 'mclose': !open }" style="{ 'z-index': zIndex }">
      <div class="modal-backdrop"
        :style="{ 'opacity': backdropOpacity }">
      </div>
    </div>
    -->
  </div>
</template>
<script type="text/babel">
  import * as _ from '../utils/utils'
  import $ from '../utils/helpers'

  export default {
    data () {
      return {
        opener: false,
        open: false,
        _backdrop: null,
        _scrollWidth: 0,
        _bodyPad: 0,
        _bodyMargin: 0
      }
    },
    computed: {
      dialogClass () {
        let clazz = this.config.dialogClass || []

        if (_.isString(clazz)) {
          clazz = clazz.split(/\s+/)
        } else if (_.isHash(clazz)) {
          let newClazz = []
          _.forEach(clazz, (v, k) => {
            if (v === true) newClazz.push(k)
          })
          clazz = newClazz
        }
        if (this.config.size === 'large') clazz.push('modal-lg')
        else if (this.config.size === 'small') clazz.push('modal-sm')

        return _.uniq(clazz)
      }
    },
    methods: {
      isFunction (obj) {
        return typeof obj === 'function'
      },
      clickAway (event) {
        if (this.$els &&
          this.$els.content &&
          !this.$els.content.contains(event.target) &&
          this.open) this.show = false
      },
      toggleModal () {
        this.show = !this.show
      },
      toggle () {
        this.toggleModal()
      },
      hideModal () {
        if (this.opener) return
        this.$emit('modal.closing')
        this.$emit('hide.bs.modal')
        this.removeBackdrop()
      },
      hide () {
        this.show = false
      },
      showModal () {
        this.opener = true
        this.$emit('modal.opening')
        this.$emit('show.bs.modal')
        if (this.exclusive) this.$root.$broadcast('modal.hide', [this.modalId])
        this.checkScrollbar()
        $('body').css('paddingRight', `${this._scrollWidth + this._bodyPad + this._bodyMargin}px`)
        this.addBackdrop()
      },
      addBackdrop () {
        if (!this.backdrop) return
        let a = this.animation
        let tClass = a === 'none' ? '' : `${a}-transition ${a}-enter`
        this._backdrop = $(document.createElement('div'))
          .addClass(`backdrop-container ${tClass}`)
          .css('zIndex', this.zIndex)
          .css('position', 'absolute')
          .appendTo('body')
          .append(
            $(document.createElement('div'))
              .addClass('modal-backdrop')
          )
        this.$nextTick(() => {
          this._backdrop.css('opacity', this.backdropOpacity)
          $('body').addClass('modal-open')
        })
      },
      checkScrollbar () {
        let hasScroll = $(document.documentElement).hasScroll()
        this._bodyPad = hasScroll ? $('body').css('paddingRight') : 0
        this._bodyMargin = hasScroll ? $('body').css('marginRight') : 0
        this._scrollWidth = hasScroll ? this.measureScrollbar() : 0
      },
      removeBackdrop () {
        if (!this._backdrop) return

        let _remove = () => {
          $(this._backdrop).remove()
          this._backdrop = null
          $('body').removeClass('modal-open').css('paddingRight', `${this._bodyPad + this._bodyMargin}px`)
        }

        if (this.animation) {
          this._backdrop.removeClass(`${this.animation}-enter`).addClass(`mopen ${this.animation}-leave`)
          this.$nextTick(() => { this._backdrop.once('transitionend', () => _remove()).css('opacity', 0) })
        } else {
          _remove()
        }
      },
      measureScrollbar () { // taken/modified from bootstrap.js
        let scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        $('body').append(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        $(scrollDiv).remove()
        return scrollbarWidth
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
      modalId: {
        type: String,
        default: `modal${Date.now()}`
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
        val ? this.showModal() : this.hideModal()
      }
    },
    events: {
      'modal.hide': function (except) {
        if (!_.includes(_.ensureArray(except), this.modalId)) this.show = false
      },
      'modal.show': function (config, id) {
        if (id && this.modalId !== id) return
        this.config = config || this.config
        this.show = true
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
