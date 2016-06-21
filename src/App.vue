<template>
  <div id="app">
    <div class="container">
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

  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootswatch/paper/bootstrap.css'

  export default {
    components: {
      Hello,
      Formation
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
              forms: [
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
                  placeholder: 'Enter text2'
                }
              ]
            },
            {
              forms: [
                {
                  type: 'button',
                  text: 'Test',
                  class: 'btn-default',
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
              forms: [
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
                }
              ]
            },
            {
              type: 'section',
              content: '<h5>Controls</h5>'
            },
            {
              forms: [
                {
                  type: 'radio',
                  label: 'Format',
                  model: 'format',
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
          format: null
        }
      }
    }
  }
</script>

<style>
  input:focus, button:focus {
    outline: none !important;
  }
</style>
