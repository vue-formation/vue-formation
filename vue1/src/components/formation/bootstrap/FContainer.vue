<template>
  <div :class="clazz" :style="config.style">
    <component v-for="c in components"
      :is="c.type"
      :config="c.config"
      :components='c.components'
      :model.sync="model"></component>
  </div>
</template>

<script type="text/babel">
  import registerComponents from './components'
  import { mergeClass } from '../common'

  export default {
    name: 'FDiv',
    props: {
      model: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } }
    },
    computed: {
      clazz () {
        let obj = mergeClass(this.config.class || {}, {})
        obj.container = true
      }
    },
    init () {
      registerComponents(this.$options.components, ['FContainer'])
    }
  }
</script>
