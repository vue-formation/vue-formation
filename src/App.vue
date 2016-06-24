<template>
  <div id="app">
    <div class="container">
      <h3>Vue-Formation</h3>
      <span>A Vue.js form builder</span>
      <hr>
      <formation :data.sync="formData" :config="formConfig"></formation>
      <pre>
// Form Data
{{ formData | json }}
      </pre>
    </div>
  </div>
</template>

<script type="text/babel">
  import Hello from './components/Hello'
  import Formation from './components/Formation'
  import FSelect from './components/FSelect'

  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootswatch/paper/bootstrap.css'
  import './formation.css'

  export default {
    components: {
      Hello,
      Formation,
      FSelect
    },
    computed: {
      formConfig () {
        return {
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
                  model: 'text2',
                  placeholder: 'Enter text2'
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
                  text: 'Test',
                  class: 'btn-primary',
                  iconClass: 'glyphicon glyphicon-ok',
                  onClick (event, data) {
                    console.log(JSON.stringify(data, null, '  '))
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
                  ]
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
                  valueKey: 'id'
                },
                {
                  label: 'vSelect Multiple',
                  type: 'vselect',
                  model: 'vselect1',
                  labelKey: 'text',
                  placeholder: 'Select numbers...',
                  multiple: true,
                  options: [
                    { value: '1', text: 'One' },
                    { value: '2', text: 'Two' },
                    { value: '3', text: 'Three' },
                    { value: '4', text: 'Four' },
                    { value: '5', text: 'Five' },
                    { value: '6', text: 'Six' }
                  ]
                }
              ]
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
</style>
