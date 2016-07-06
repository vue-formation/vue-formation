# vue-formation
A Bootstrap themeable Vue.js form builder

*Note: This project is still under initial development and provides limited support/documentation*

[`Project Page`](https://bhoriuchi.github.io/vue-formation/)

### Example

```js
import { Formation } from 'vue-formation'

new Vue({
  el: '#app',
  components: { Formation },
  template: '<formation :data.sync="formData" :config="formConfig"></formation>',
  data: {
    formData: {
      firstName: '',
      lastName: ''
    },
    formConfig: {
      rows: [
        {
          columns: [
            {
              type: 'text',
              label: 'First Name',
              model: 'firstName'
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
              type: 'button',
              text: 'OK',
              class: 'btn-primary',
              iconClass: 'glyphicon glyphicon-ok',
              onClick (event, vm) {
                vm.validate()
                console.log(vm.data)
              }
            }
          ]
        }
      ]
    }
  }
})
```
