<template lang="jade">
  div
    h2 SemanticUI
    formation(:config='divdata', :value.sync='modelData', framework='semanticui', :debug='true')
    pre {{modelData|json}}
    pre {{$store.state.formation|json}}
</template>

<script type="text/babel">
  import _ from 'lodash'
  // import { component as Formation } from '../../../../src/components'
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css')
    },
    data () {
      return _.merge(_.cloneDeep(bootstrapFormation), {})
    }
  }
</script>
