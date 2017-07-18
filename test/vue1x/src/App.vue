<template lang="pug">
  #app
    h3 Vue {{version}}
    pre.text-left(v-html="fdata | json")
    formation(framework="bootstrap", :value.sync="fdata.fModel", :config="fdata.fConfig")
</template>

<script type="text/babel">
  import Vue from 'vue'
  import fdata from '../../../src/formation/data/config'

  export default {
    name: 'app',
    data () {
      return {
        fdata,
        version: Vue.version
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
