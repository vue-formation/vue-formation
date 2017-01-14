# vue-formation
A Bootstrap themeable Vue.js form builder

*Note: This project is still under initial development and provides limited support/documentation*

[`Project Page`](https://vue-formation.github.io/vue-formation/)

### Bootstrap
Formation relies on [Bootstrap.css](http://getbootstrap.com/) for styling and it must be included in your project for formation to work properly. You may also use bootstrap themes like [Bootswatch](https://bootswatch.com/)


### Example

```js
import { Formation } from 'vue-formation'
import 'bootstrap.css'
import 'bootstrap-theme.css' // optional

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
