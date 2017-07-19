<template lang="pug">
  div
    formation(framework="semanticui", :value.sync="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import fdata from '../../../../src/formation/data/config'

  export default {
    ready () {
      document.getElementById('style-framework').href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css'
    },
    data () {
      return {
        fdata
      }
    }
  }
</script>