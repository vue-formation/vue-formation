<script type="text/babel">
  import multi from 'vue-multi-version'
  import { mergeClass } from '../common/index'

  export default {
    template: `
<input type="text" :class="clazz" v-model="value[config.model]">
`,
    name: 'formation-text-input',
    props: {
      value: {
        type: Object,
        required: true,
        twoWay: multi.select(true, undefined)
      },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } }
    },
    computed: {
      clazz () {
        return mergeClass({
          'form-control': true
        }, this.config.class)
      }
    }
  }
</script>
