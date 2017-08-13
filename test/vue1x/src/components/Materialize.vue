<template lang="pug">
  div
    formation(:framework="framework", :value.sync="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import framework from '../../../../src/formation/frameworks/materialize'
  import fdata from '../../../../src/formation/data/config'

  export default {
    ready () {
      document.getElementById('style-framework').href = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css'
    },
    data () {
      return {
        fdata,
        framework
      }
    }
  }
</script>
