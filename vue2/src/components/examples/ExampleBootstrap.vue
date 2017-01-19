<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', v-model='modelData')
    pre {{modelData|json}}
</template>

<script type="text/babel">
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    mounted () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    filters: {
      json (val) {
        return JSON.stringify(val, null, '  ')
      }
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
