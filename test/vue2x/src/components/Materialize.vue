<template lang="pug">
  div
    formation(framework="materialize", v-model="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import fdata from '../../../../src/formation/data/config'

  export default {
    mounted () {
      document.getElementById('style-framework').href = 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css'
    },
    data () {
      return {
        fdata
      }
    }
  }
</script>