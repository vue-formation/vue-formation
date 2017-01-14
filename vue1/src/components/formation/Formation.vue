<template>

</template>

<script type="text/babel">
  import _ from 'lodash/lodash.min'
  import Bootstrap from './bootstrap/index'

  const FRAMEWORKS = [
    'bootstrap',
    'foundation',
    'materialize',
    'semanticui'
  ]

  export default {
    props: {
      model: {
        type: Object,
        required: true,
        twoWay: true
      },
      config: {
        type: Object,
        required: true
      },
      framework: {
        type: String,
        default: 'bootstrap',
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    }
  }
</script>
