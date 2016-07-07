<template>
  <div id="app">
    <nav class="navbar navbar-default" style="margin-bottom: 0px;">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" style="height: 100%">
            <img src="../src/assets/formation.png" style="display: inline-block; height: 35px; width: 50px;">
            <span style="display: inline-block; height: 100%; position: relative; top: 0.2em;">VueFormation</span>
          </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse pull-right" style="height: 100%; top: 1em; position: relative;">
          <form class="form-inline">
            <div class="form-group">
              <label for="themer" class="navbar-text" style="line-height: 0.5em;">Change Theme&nbsp;&nbsp;</label>
              <theme-selector style="width:200px;" id="themer" class="form-control"></theme-selector>
            </div>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid" style="background-color: #3368bb; color: #fff;">
      <div class="container">
        <h1 class="display-3" style="color: #fff; font-weight: 500; margin-top: 0px;">VueFormation</h1>
        <p class="lead" style="color: #fff">A <b>Bootstrap</b> themeable <b>Vue.js</b> form builder
          <br>
          Build complex <b>reactive</b> form layouts using <b>JSON</b></p>
        <p class="lead">
          <a style="border: 1px solid #fff; color: #fff;" class="btn btn-lg"
             href="https://github.com/bhoriuchi/vue-formation" role="button">
            <span class="fa fa-github"></span>
            Code on GitHub
          </a>
        </p>
      </div>
    </div>
    <div class="container">
      <div v-for="(exampleId, example) in Examples">
        <h3><a><span @click="showCode(exampleId)" class="fa fa-code"></span></a> {{ example.title }}</h3>
        <div class="row">
          <div class="col-md-8">
            <formation :data.sync="exampleData[exampleId]" :config="exampleConfig[exampleId]"></formation>
          </div>
          <div class="col-md-4">
            <label style="width: 100%"> <b>Form Data</b>
<pre style="font-size: 10px;">
{{ exampleData[exampleId] | json }}
</pre>
            </label>
          </div>
        </div>
      </div>
    </div>
    <f-modal v-ref:codemodal>
    </f-modal>
  </div>
</template>

<script type="text/babel">
  import Prism from 'prismjs'
  import Hello from './components/Hello'
  import ThemeSelector from './components/ThemeSelector'
  import * as _ from './utils/utils'
  import { stringify } from './utils/stringify'
  // import { Formation } from '../dist/vue-formation'
  // import { Formation } from '../dist/vue-formation.min'
  import Formation from './components/Formation'
  import FModal from './components/FModal'
  import Examples from './examples'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'font-awesome/css/font-awesome.min.css'
  import './formation.css'
  import 'prismjs/themes/prism-coy.css'

  export default {
    components: {
      Hello,
      Formation,
      FModal,
      ThemeSelector
    },
    created () {
      var ss = document.createElement('link')
      ss.type = 'text/css'
      ss.rel = 'stylesheet'
      ss.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css'
      ss.id = 'page-theme'
      document.getElementsByTagName('head')[0].appendChild(ss)
      _.forEach(Examples, (example, id) => {
        _.vueSet(this.exampleData, id, example.formData)
        _.vueSet(this.exampleConfig, id, example.formConfig)
      })
    },
    events: {
      'formation.error': (evt) => { console.log(evt) }
    },
    methods: {
      showCode (id) {
        let config = {
          footerButtons: [
            {
              content: 'Close',
              class: 'btn btn-default',
              onClick (event, modal) {
                modal.hide()
              }
            }
          ]
        }
        let exConfig = this.Examples[id]
        if (!exConfig) {
          config = Object.assign({
            title: 'No Documentation',
            body: 'There is currently no documentation available for this example',
            headerClass: 'bg-warning',
            headerIconClass: 'fa fa-warning'
          }, config)
        } else {
          let source = stringify(exConfig.formConfig, null, '  ')
          config = Object.assign({
            body: `<pre style="max-height: 30em; overflow-y: auto;"><code id="formatted-code" class="language-javascript">${source}</code></pre>`
          }, config, exConfig)
        }
        this.$refs.codemodal.$emit('modal.show', config)
        this.$nextTick(() => {
          let el = document.getElementById('formatted-code')
          Prism.highlightElement(el)
        })
      },
      buildInclude () {
        if (!isNaN(this.formData.select1)) {
          let rows = []
          for (let i = 0; i < Number(this.formData.select1); i++) {
            rows.push({
              columns: [
                {
                  type: 'text',
                  label: `Include ${i}`,
                  model: `includes.sub["row${i}"]`
                }
              ]
            })
          }
          return rows
        }
      }
    },
    data () {
      return {
        exampleData: {},
        exampleConfig: {},
        Examples
      }
    }
  }
</script>

<style>
  input:focus, button:focus, button:active {
    outline: none !important;
  }
  .modal-header.bg-primary h4, .modal-header.bg-primary .close {
    color: #fff;
  }
  h3 a span.fa.fa-code {
    cursor: pointer;
  }
</style>
