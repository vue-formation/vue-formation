<template lang="pug">
  div
    formation(:framework="framework", :value.sync="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import framework from '../../../../src/formation/frameworks/bootstrap'
  import fdata from '../../../../src/formation/data/config'

  export default {
    ready () {
      document.getElementById('style-framework').href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    },
    data () {
      return {
        fdata,
        framework
      }
    }
  }
</script>
