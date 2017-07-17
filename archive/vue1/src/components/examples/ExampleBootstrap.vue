<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', :value.sync='modelData', vuex='formation', :debug='true')
    pre {{modelData|json}}
    pre {{$store.state.formation|json}}
</template>

<script type="text/babel">
  import _ from 'lodash'
  // import { component as Formation } from '../../../../src/components'
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    data () {
      return _.merge(_.cloneDeep(bootstrapFormation), {
        tester: 'ok'
      })
    }
  }
</script>
