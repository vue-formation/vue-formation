<template>
  <div id="app">
    <nav id="topnav" class="navbar navbar-default" style="margin-bottom: 0px;">
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
            <img v-if="cookie.logoInverted" src="../../src/assets/formation-inverted.png" style="display: inline-block; height: 35px; width: 50px;">
            <img v-if="!cookie.logoInverted" src="../../src/assets/formation.png" style="display: inline-block; height: 35px; width: 50px;">
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
    <div class="jumbotron jumbotron-fluid" style="background-color: #3368bb; color: #fff; margin-bottom: 10px;">
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
      <f-tabs :active.sync="mainTabActive" :config="mainTabConfig">
        <div slot="about">
          <about></about>
        </div>
        <div slot="examples">
          <div v-for="(exampleId, example) in Examples | showExample">
            <h3><a><span @click="showCode(exampleId)" class="fa fa-code"></span></a> {{ example.title }}</h3>
            <p>{{ example.description }}</p>
            <div v-if="example.exampleType === 'formation'" class="row well">
              <div class="col-md-8">
                <formation :data.sync="exampleData[exampleId]" :config="self[exampleId]"></formation>
              </div>
              <div class="col-md-4">
                <label style="width: 100%"> <b>Form Data</b>
<pre style="font-size: 10px;background-color: #fff;">
{{ exampleData[exampleId] | json }}
</pre>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div slot="components">
          <components-doc :vm="self"></components-doc>
        </div>
        <div slot="types">
          <types-doc></types-doc>
        </div>
      </f-tabs>
    </div>
    <f-modal v-ref:codemodal>
      <f-tabs slot="body" :config="sourceTabConfig" :active.sync="sourceTabActive" style="width: 100%;">
        <div slot="config">
          <pre style="max-height: 30em;"><code class="prism language-javascript">{{ source.config }}</code></pre>
        </div>
        <div slot="data" v-if="source.data">
          <pre style="max-height: 30em;"><code class="prism language-javascript">{{ source.data }}</code></pre>
        </div>
        <div slot="html">
          <pre style="max-height: 30em;"><code class="prism language-markup">{{ source.html }}</code></pre>
        </div>
      </f-tabs>
    </f-modal>
    <f-modal modal-id="dialog"></f-modal>
    <f-modal modal-id="theme-selector">
      <div slot="body">
        <form style="width:100%">
          <div class="form-group" :class="{ 'has-error': customUrlError }">
            <label for="theme-css-url">Custom Theme URL</label>
            <input v-model="customUrl" type="url"
                   class="form-control"
                   id="theme-css-url"
                   placeholder="Enter theme URL...">
          </div>
        </form>
      </div>
    </f-modal>
  </div>
</template>
<script type="text/babel">
  //  local
  import * as _ from '../utils/utils'
  import { stringify } from '../utils/stringify'
  import Examples from '../examples'
  import ConfigStrs from '../examples/example-config-strings'

  //  components
  import About from './About'
  import ComponentsDoc from './ComponentsDoc'
  import TypesDoc from './TypesDoc'
  import Hello from './Hello'
  import ThemeSelector from './ThemeSelector'
  import {
    Formation,
    FModal,
    FTabs
  } from './index'

  //  actions
  import { activateMainTab } from '../vuex/actions'

  //  css
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'font-awesome/css/font-awesome.min.css'
  import '../css/formation.css'

  export default {
    vuex: {
      actions: {
        activateMainTab
      },
      getters: {
        cookie: (state) => state.cookie
      }
    },
    components: {
      About,
      ComponentsDoc,
      TypesDoc,
      Hello,
      Formation,
      FModal,
      FTabs,
      ThemeSelector
    },
    created () {
      this.mainTabActive = this.cookie.mainTab
      _.forEach(Examples, (example, id) => {
        _.vueSet(this.exampleData, id, example.formData)
        _.vueSet(this.exampleConfig, id, example.formConfig)
      })
    },
    events: {
      'formation.error': (evt) => { console.log(evt) }
    },
    filters: {
      showExample (value) {
        return _.omitBy(value, (v) => v.showExample === false)
      }
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
          this.source.config = ConfigStrs[id]
          this.source.data = stringify(this.exampleData[id], null, '  ')
          this.source.html = exConfig.formHtml
          if (exConfig.exampleType !== 'formation') this.sourceTabConfig.tabs[1].show = false
          else this.sourceTabConfig.tabs[1].show = true
          config = Object.assign(config, exConfig)
        }
        this.$refs.codemodal.$emit('modal.show', config)
      }
    },
    computed: _.merge({}, _.mapValues(Examples, (v) => {
      return function () { return v.formConfig }
    })),
    data () {
      let self = this
      return {
        self,
        customUrl: 'http://',
        customUrlError: false,
        exampleData: {},
        exampleConfig: {},
        sourceTabConfig: {
          tabs: [
            { id: 'config', text: 'Configuration Object' },
            { id: 'data', text: 'Data Object' },
            { id: 'html', text: 'HTML' }
          ]
        },
        mainTabConfig: {
          onActivate: (id) => {
            this.activateMainTab(id)
          },
          tabs: [
            { id: 'about', text: 'About' },
            { id: 'examples', text: 'Examples' },
            { id: 'components', text: 'Components' },
            { id: 'types', text: 'Types' }
          ]
        },
        source: {
          config: null,
          data: null,
          html: null
        },
        exActiveTabs: {},
        mainTabActive: null,
        sourceTabActive: 'config',
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
