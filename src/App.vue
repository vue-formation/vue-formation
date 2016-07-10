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
            <img v-if="logoInverted" src="../src/assets/formation-inverted.png" style="display: inline-block; height: 35px; width: 50px;">
            <img v-if="!logoInverted" src="../src/assets/formation.png" style="display: inline-block; height: 35px; width: 50px;">
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
          <div v-for="(exampleId, example) in Examples" v-if="example.showExample !== false">
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
      </f-tabs>
    </div>
    <f-modal v-ref:codemodal>
      <f-tabs slot="body" :config="sourceTabConfig" :active.sync="sourceTabActive" style="width: 100%;">
        <div slot="config">
          <pre style="max-height: 30em;"><code class="language-javascript">{{ source.config }}</code></pre>
        </div>
        <div slot="data" v-if="source.data">
          <pre style="max-height: 30em;"><code class="language-javascript">{{ source.data }}</code></pre>
        </div>
        <div slot="html">
          <pre style="max-height: 30em;"><code class="language-markup">{{ source.html }}</code></pre>
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
  //  vendor
  import Prism from 'prismjs'

  //  local
  import * as _ from './utils/utils'
  import { stringify } from './utils/stringify'
  import Examples from './examples'
  import ConfigStrs from './examples/example-config-strings'

  //  components
  import About from './components/About'
  import ComponentsDoc from './components/ComponentsDoc'
  import Hello from './components/Hello'
  import ThemeSelector from './components/ThemeSelector'
  import {
    Formation,
    FModal,
    FTabs
  } from './components'

  //  css
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'font-awesome/css/font-awesome.min.css'
  import './formation.css'
  import 'prismjs/themes/prism.css'
  import 'prismjs/plugins/show-language/prism-show-language.css'

  export default {
    components: {
      About,
      ComponentsDoc,
      Hello,
      Formation,
      FModal,
      FTabs,
      ThemeSelector
    },
    created () {
      _.forEach(Examples, (example, id) => {
        _.vueSet(this.exampleData, id, example.formData)
        _.vueSet(this.exampleConfig, id, example.formConfig)
      })

      /* Taken From example http://prismjs.com/plugins/show-language/ */
      var Languages = {}
      Prism.hooks.add('before-highlight', function (env) {
        let pre = env.element.parentNode
        if (!pre || !/pre/i.test(pre.nodeName)) {
          return
        }
        let language = pre.getAttribute('data-language') ||
          Languages[env.language] ||
          (env.language.substring(0, 1).toUpperCase() + env.language.substring(1))

        /* check if the divs already exist */
        let sib = pre.previousSibling
        var div, div2
        if (sib && /\s*\bprism-show-language\b\s*/.test(sib.className) &&
          sib.firstChild &&
          /\s*\bprism-show-language-label\b\s*/.test(sib.firstChild.className)) {
          div2 = sib.firstChild
        } else {
          div = document.createElement('div')
          div2 = document.createElement('div')
          div2.className = 'prism-show-language-label'
          div.className = 'prism-show-language'
          div.appendChild(div2)
          pre.parentNode.insertBefore(div, pre)
        }
        div2.innerHTML = language
      })
      Prism.highlightAll()
    },
    events: {
      'formation.error': (evt) => { console.log(evt) },
      'logo.inverted': function (inverted) { this.logoInverted = inverted }
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
          this.source.config = ConfigStrs[id] // stringify(exConfig.formConfig, null, '  ')
          this.source.data = stringify(this.exampleData[id], null, '  ')
          this.source.html = exConfig.formHtml
          if (exConfig.exampleType !== 'formation') this.sourceTabConfig.tabs[1].show = false
          else this.sourceTabConfig.tabs[1].show = true
          config = Object.assign(config, exConfig)
        }
        this.$refs.codemodal.$emit('modal.show', config)
        this.$nextTick(() => {
          Prism.highlightAll()
        })
      }
    },
    computed: _.merge({}, _.mapValues(Examples, (v) => {
      return function () { return v.formConfig }
    })),
    data () {
      let self = this
      return {
        self,
        logoInverted: false,
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
          tabs: [
            { id: 'about', text: 'About' },
            { id: 'examples', text: 'Examples' },
            { id: 'components', text: 'Components' }
          ]
        },
        source: {
          config: null,
          data: null,
          html: null
        },
        exActiveTabs: {},
        mainTabActive: 'about',
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
