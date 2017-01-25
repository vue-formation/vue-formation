<template lang="jade">
  div
    h2 Bootstrap
    formation(:config='divdata', v-model='modelData', vuex='formation')
    pre {{modelData|json}}
</template>

<script type="text/babel">
  // import Vue from 'vue'
  // import Formation from '../../../../src/components/formation/Formation'
  import bootstrapFormation from '../../../../src/data/bootstrapFormation'

  export default {
    // components: {
    //  Formation: Formation(Vue)
    // },
    mounted () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    data () {
      return bootstrapFormation
    }
  }
</script>
