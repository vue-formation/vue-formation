<template lang="pug">
  div
    formation(framework="bootstrap", v-model="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import fdata from '../../../../src/formation/data/config'

  export default {
    mounted () {
      document.getElementById('style-framework').href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
    },
    data () {
      return {
        fdata
      }
    }
  }
</script>