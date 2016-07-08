export default {
  title: 'Simple Form',
  headerClass: 'bg-primary',
  formConfig: {
    rows: [
      {
        columns: [
          { type: 'text', label: 'First Name', model: 'firstName' },
          { type: 'text', label: 'Last Name', model: 'lastName' }
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
                  this.showModal = true
                  console.log(vm.data)
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
  }
}
