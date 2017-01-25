<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', :value.sync='modelData', vuex='formation', :debug='true')
    pre {{modelData|json}}
    pre {{$store.state.formation|json}}
</template>

<script type="text/babel">
  import { component as Formation } from '../../../../src/components'
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    components: {
      Formation
    },
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
