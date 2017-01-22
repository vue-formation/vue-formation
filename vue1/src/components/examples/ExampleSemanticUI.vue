<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', :value.sync='modelData', framework='semanticui')
    pre {{modelData|json}}
</template>

<script type="text/babel">
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
