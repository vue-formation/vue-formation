export default {
  title: 'Simple Form',
  exampleType: 'formation',
  description: 'A simple reactive form that can be cleared and displays a modal when submitted. First Name is required.',
  headerClass: 'bg-primary',
  formConfig: {
    liveValidation: true,
    rows: [
      {
        columns: [
          {
            type: 'text',
            label: 'First Name',
            model: 'firstName',
            required: true
          },
          {
            type: 'text',
            label: 'Last Name',
            model: 'lastName'
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
                  vm.setData(['firstName', 'lastName'], '')
                }
              },
              {
                text: 'Submit',
                class: 'btn-primary',
                iconClass: 'glyphicon glyphicon-ok',
                onClick: (event, vm) => {
                  if (!vm.validate()) return
                  vm.$root.$broadcast('modal.show', {
                    title: 'Hello!',
                    body: `Welcome ${vm.data.firstName} ${vm.data.lastName}`,
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
    firstName: '',
    lastName: ''
  },
  formHtml: '<formation :data.sync="data" :config="config">'
}
