<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">VueFormation</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse pull-right">
          <form class="form-inline">
            <div class="form-group" style="margin-top: 8px;">
              <label for="themer" class="navbar-text" style="line-height: 0.5em;">Change Theme&nbsp;&nbsp;</label>
              <theme-selector style="width:200px;" id="themer" class="form-control"></theme-selector>
            </div>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid" style="background-color: #3368bb; color: #fff">
      <div class="container">
        &nbsp;
        <h1 class="display-3" style="color: white; font-weight: 500">VueFormation</h1>
        <p class="lead" style="color: #fff">A Bootstrap themeable Vue.js form builder</p>
        <p class="lead">
          <a style="border: 1px solid #fff; color: #fff;" class="btn btn-lg"
             href="https://github.com/bhoriuchi/vue-formation" role="button">Code on GitHib</a>
          <a style="border: 1px solid #fff; color: #fff;" class="btn btn-lg"
             href="https://github.com/bhoriuchi/vue-formation/zipball/master"
             role="button" download target="_blank">Download v1.0.0</a>
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <formation :data.sync="formData" :config="formConfig"></formation>
        </div>
        <div class="col-md-4" style="padding-top: 16px;">
          <label style="width: 100%"> <b>Form Data</b>
<pre style="font-size: 10px;">
{{ formData | json }}
</pre>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import 'prismjs'
  import Hello from './components/Hello'
  import ThemeSelector from './components/ThemeSelector'
  // import { Formation } from '../dist/vue-formation'
  // import { Formation } from '../dist/vue-formation.min'
  import Formation from './components/Formation'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import './formation.css'
  import 'prismjs/themes/prism-coy.css'

  export default {
    components: {
      Hello,
      Formation,
      ThemeSelector
    },
    created () {
      var ss = document.createElement('link')
      ss.type = 'text/css'
      ss.rel = 'stylesheet'
      ss.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css'
      ss.id = 'page-theme'
      document.getElementsByTagName('head')[0].appendChild(ss)
    },
    events: {
      'formation.error': (evt) => {
        console.log(evt)
      }
    },
    methods: {
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
    computed: {
      formConfig () {
        return {
          debug: false,
          liveValidation: true,
          format: this.formData.format,
          rows: [
            {
              type: 'section',
              content: '<h5>Text Forms</h5>'
            },
            {
              columns: [
                {
                  type: 'text',
                  label: 'Text1',
                  model: 'text1',
                  placeholder: 'Enter text1'
                },
                {
                  type: 'text',
                  label: 'Text2',
                  model: 'text2',
                  placeholder: 'Enter text2',
                  validate (data) {
                    return data && data.length > 0
                  }
                }
              ]
            },
            {
              type: 'section',
              content: '<h5>Buttons</h5>'
            },
            {
              columns: [
                {
                  type: 'button',
                  text: 'Print Data',
                  class: 'btn-primary',
                  iconClass: 'glyphicon glyphicon-console',
                  onClick (event, vm) {
                    console.log('VALID:', vm.validate())
                    console.log(JSON.stringify(vm.data, null, '  '))
                  }
                },
                {
                  type: 'button',
                  text: 'Clear Select',
                  class: 'btn-info',
                  onClick (event, vm) {
                    vm.data.select1 = '-1'
                    vm.clearData('includes')
                  }
                }
              ]
            },
            {
              type: 'section',
              content: '<h5>Select Forms</h5>'
            },
            {
              columns: [
                {
                  label: 'Standard Select',
                  type: 'select',
                  model: 'select1',
                  options: [
                    { value: '-1', text: 'Select a number...', hidden: true },
                    { value: '1', text: 'One' },
                    { value: '2', text: 'Two' },
                    { value: '3', text: 'Three' },
                    { value: '4', text: 'Four' },
                    { value: '5', text: 'Five' },
                    { value: '6', text: 'Six' }
                  ],
                  onChange (event, vm) {
                    vm.clearData('includes')
                  }
                },
                {
                  label: 'fSelect',
                  type: 'fselect',
                  width: '100%',
                  model: 'fselect',
                  multiple: true,
                  storeObject: true,
                  placeholder: 'Select something...',
                  options: [
                    { id: '1', name: 'One' },
                    { id: '2', name: 'Two' },
                    { id: '3', name: 'Three' },
                    { id: '4', name: 'Four' },
                    { id: '5', name: 'Five' },
                    { id: '6', name: 'Six' }
                  ],
                  textKey: 'name',
                  valueKey: 'id',
                  onRemoving (event, val, vm, fn) {
                    if (val === '2') return false
                  },
                  onClearing (event, vm) {
                    if (vm.value.length < 2) return false
                  }
                }
              ]
            },
            {
              type: 'include',
              value: this.buildInclude
            },
            {
              type: 'section',
              content: '<h5>Controls</h5>'
            },
            {
              columns: [
                {
                  type: 'radio',
                  label: 'Format',
                  model: 'format',
                  bind: { disabled () { return true } },
                  radios: [
                    {
                      label: 'None',
                      value: null
                    },
                    {
                      label: 'Inline',
                      value: 'inline'
                    },
                    {
                      label: 'Horizontal',
                      value: 'horizontal'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    data () {
      return {
        formData: {
          text1: 'Has Default Text',
          text2: '',
          select1: '-1',
          fselect: '1',
          format: null,
          vselect1: null,
          valueKey: 'id',
          textKey: 'name'
        }
      }
    }
  }
</script>

<style>
  input:focus, button:focus, button:active {
    outline: none !important;
  }
</style>
