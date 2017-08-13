<template lang="pug">
  div
    formation(:framework="framework", v-model="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import framework from '../../../../src/formation/frameworks/semanticui'
  import fdata from '../../../../src/formation/data/config'

  export default {
    mounted () {
      document.getElementById('style-framework').href = 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css'
    },
    data () {
      return {
        fdata,
        framework
      }
    }
  }
</script>
