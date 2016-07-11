export default {
  title: 'Multi-Component Form',
  exampleType: 'formation',
  description: 'A form that uses multiple components.',
  headerClass: 'bg-primary',
  formConfig: {
    liveValidation: false,
    rows: [
      {
        columns: [
          {
            type: 'text',
            label: 'Text Input',
            model: 'text'
          },
          {
            type: 'fselect',
            label: 'FSelect',
            model: 'fselect',
            multiple: true,
            options: [
              { value: 'dog', text: 'Dog' },
              { value: 'cat', text: 'Cat' },
              { value: 'horse', text: 'Horse' },
              { value: 'duck', text: 'Duck' },
              { value: 'pig', text: 'Pig' },
              { value: 'elephant', text: 'Elephant' },
              { value: 'panda', text: 'Panda' },
              { value: 'koala', text: 'Koala' }
            ]
          }
        ]
      },
      {
        columns: [
          {
            type: 'buttons',
            buttons: [
              {
                text: 'Clear',
                class: 'btn-default',
                iconClass: 'glyphicon glyphicon-remove',
                onClick (event, vm) {
                  vm.setData('text', '')
                  vm.setData('fselect', [])
                }
              },
              {
                text: 'Submit',
                class: 'btn-primary',
                iconClass: 'glyphicon glyphicon-ok',
                onClick: (event, vm) => {
                  if (!vm.validate()) return
                  vm.$root.$broadcast('modal.show', {
                    title: 'Data',
                    body: `<pre>${JSON.stringify(vm.data, null, '  ')}</pre>`,
                    footerButtons: [
                      {
                        content: 'Close',
                        class: 'btn btn-default',
                        onClick: (event, modal) => {
                          modal.hide()
                        }
                      }
                    ]
                  }, 'dialog')
                }
              }
            ]
          }
        ]
      }
    ]
  },
  formData: {
    text: '',
    fselect: ''
  },
  formHtml: '<formation :data.sync="data" :config="config">'
}
