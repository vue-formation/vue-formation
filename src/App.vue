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
        <span>{{ example.description }}</span>
        <hr>
        <div class="row">
          <div class="col-md-8">
            <formation :data.sync="exampleData[exampleId]" :config="self[exampleId]"></formation>
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
      <f-tabs slot="body" :config="tabConfig" :active.sync="tabActive" style="width: 100%;">
        <div slot="config">
          <pre style="max-height: 30em;"><code class="language-javascript">{{ source.config }}</code></pre>
        </div>
        <div slot="data">
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

  //  components
  import {
    Hello,
    ThemeSelector,
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
          this.source.config = stringify(exConfig.formConfig, null, '  ')
          this.source.data = stringify(exConfig.formData, null, '  ')
          this.source.html = exConfig.formHtml
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
        tabConfig: {
          tabs: [
            { id: 'config', text: 'Configuration Object' },
            { id: 'data', text: 'Data Object' },
            { id: 'html', text: 'HTML' }
          ]
        },
        source: {
          config: null,
          data: null,
          html: null
        },
        tabActive: 'config',
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
