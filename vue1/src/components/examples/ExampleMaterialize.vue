<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', :value.sync='modelData', framework='materialize')
    pre {{modelData|json}}
</template>

<script type="text/babel">
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
