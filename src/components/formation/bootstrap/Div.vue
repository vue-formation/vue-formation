<template>
  <div :class="clazz" :style="config.style">
    <component v-for="c in components"
      :is="'formation-' + c.type"
      :config="c.config"
      :components='c.components'
      :model.sync="model"></component>
  </div>
</template>

<script type="text/babel">
  import { mergeClass } from '../common/index'

  export default {
    name: 'formation-div',
    props: {
      model: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } }
    },
    computed: {
      clazz () {
        return mergeClass(this.config.class || {}, {})
      }
    }
  }
</script>
