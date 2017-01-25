<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', v-model='modelData', framework='materialize', :debug='true')
    pre {{modelData|json}}
    pre {{$store.state.formation|json}}
</template>

<script type="text/babel">
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    mounted () {
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
