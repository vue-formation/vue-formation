<template>
  <div :class="clazz" :style="config.style">
    <component v-for="c in components"
      :is="kebab('formation-' + c.type)"
      :config="c.config"
      :components='c.components'
      :value.sync="value"></component>
  </div>
</template>

<script type="text/babel">
  import { mergeClass, dash as _ } from '../common/index'

  export default {
    name: 'formation-container',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } }
    },
    computed: {
      clazz () {
        let obj = mergeClass(this.config.class || {}, {})
        obj.container = true
      }
    },
    methods: {
      kebab (name) {
        return _.kebabCase(name)
      }
    }
  }
</script>
