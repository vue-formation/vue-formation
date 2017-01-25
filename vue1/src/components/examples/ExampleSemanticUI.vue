<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', :value.sync='modelData', framework='semanticui', :debug='true')
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
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
