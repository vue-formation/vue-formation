<template>
  <div>
    <formation :data.sync="formData" :config="formConfig"></formation>
    <pre>{{ formData | json }}</pre>
  </div>
</template>

<script type="text/babel">
  import * as _ from '../utils/utils'
  import validator from 'validator'
  import Formation from './Formation'

  export default {
    components: {
      Formation
    },
    methods: {
      updateSocialInclude () {
        if (!this.formData.accounts.length) return
        let include = [
          {
            columns: _.map(this.formData.accounts, (account) => {
              return {
                type: 'text',
                label: account.text,
                model: `social.${account.value}`
              }
            })
          }
        ]
        this.$set('socialInclude', include)
      },
      isName (str) {
        return str && !str.match(/[^A-Za-z-]/g)
      }
    },
    computed: {
      formConfig () {
        return {
          decorateRequired: true,
          rows: [
            {
              columns: [
                {
                  type: 'html',
                  value: '<h5>User Info</h5>'
                }
              ]
            },
            {
              columns: [
                {
                  type: 'text',
                  model: 'firstName',
                  label: 'First Name',
                  required: true,
                  validate: this.isName
                },
                {
                  type: 'text',
                  model: 'lastName',
                  label: 'Last Name',
                  required: true,
                  validate: this.isName
                }
              ]
            },
            {
              columns: [
                {
                  type: 'text',
                  model: 'email',
                  label: 'Email Address',
                  required: true,
                  validate (data) {
                    return data && validator.isEmail(data)
                  }
                }
              ]
            },
            {
              columns: [
                {
                  type: 'password',
                  model: 'password1',
                  label: 'Password',
                  required: true
                },
                {
                  type: 'password',
                  model: 'password2',
                  label: 'Password Again',
                  required: true,
                  validate: (data) => {
                    return this.formData.password1 === data
                  }
                }
              ]
            },
            {
              columns: [
                {
                  type: 'html',
                  value: '<h5>Social</h5>'
                }
              ]
            },
            {
              columns: [
                {
                  type: 'fselect',
                  label: 'Accounts',
                  model: 'accounts',
                  storeObject: true,
                  multiple: true,
                  options: [
                    { value: 'twitter', text: 'twitter' },
                    { value: 'facebook', text: 'facebook' },
                    { value: 'instagram', text: 'instagram' }
                  ],
                  onChange: () => {
                    this.$nextTick(() => {
                      this.updateSocialInclude()
                    })
                  }
                },
                {
                  type: 'fselect',
                  label: 'Use Avatar',
                  model: 'social.useAvatar',
                  options: this.formData.accounts
                }
              ]
            },
            {
              type: 'include',
              value: this.socialInclude
            },
            {
              columns: [
                {
                  type: 'buttons',
                  buttons: [
                    {
                      text: 'Reset',
                      class: 'btn-default',
                      onClick: () => {
                        console.log(this)
                      }
                    },
                    {
                      text: 'Create',
                      class: 'btn-primary',
                      onClick (event, vm) {
                        vm.validate()
                      }
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
          firstName: '',
          lastName: '',
          email: '',
          password1: '',
          password2: '',
          social: {
            useAvatar: '',
            twitter: '',
            facebook: '',
            instagram: ''
          },
          accounts: []
        },
        socialInclude: []
      }
    }
  }
</script>
