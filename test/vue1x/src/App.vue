<template lang="pug">
  #app
    span.header-version Vue {{version}} :
    a.fw-link(v-link="{ path: '/bootstrap', activeClass: 'link-active-class' }") bootstrap
    a.fw-link(v-link="{ path: '/materialize', activeClass: 'link-active-class'  }") materialize
    a.fw-link(v-link="{ path: '/semanticui', activeClass: 'link-active-class'  }") semanticui
    pre.text-left(v-html="fdata.fModel | json")
    // formation(:framework="framework", :value.sync="fdata.fModel", :config="fdata.fConfig")
    router-view
</template>

<script type="text/babel">
  import Vue from 'vue'
  import fdata from '../../../src/formation/data/config'

  export default {
    name: 'app',
    methods: {
      changeFramework (name) {
        this.framework = name
        document.getElementById('style-framework').href = this.cdns[name]
      }
    },
    data () {
      return {
        cdns: {
          bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          materialize: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css',
          semanticui: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css'
        },
        framework: 'bootstrap',
        fdata,
        version: Vue.version
      }
    }
  }
</script>

<style>
  body {
    padding: 20px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  a.fw-link {
    padding-left: 10px;
    padding-right: 10px;
  }

  a.link-active-class {
    font-weight: 600;
    color: black;
  }
  span.header-version {
    font-size: 1em;
  }
</style>
