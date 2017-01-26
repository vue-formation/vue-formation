<template lang="jade">
  div
    h2 Materialize
    formation(:config='divdata', :value.sync='modelData', framework='materialize', :debug='true')
    pre {{modelData|json}}
    pre {{$store.state.formation|json}}
</template>

<script type="text/babel">
  import _ from 'lodash'
  import { component as Formation } from '../../../../src/components'
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    components: {
      Formation
    },
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css')
    },
    data () {
      return _.merge(_.cloneDeep(bootstrapFormation), {})
    }
  }
</script>
