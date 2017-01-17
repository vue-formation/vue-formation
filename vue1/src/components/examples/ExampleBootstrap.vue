<template lang="jade">
  div
    h2 Bootstrap
    // example-formation(framework='bootstrap')
    f-div(:components='divdata.components')
</template>

<script type="text/babel">
  // import $ from 'jquery'
  import FDiv from '../../../src/components/formation/bootstrap/FDiv.vue'
  // import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      // ExampleFormation
      FDiv
    },
    ready () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    data () {
      return {
        divdata: {
          components: [
            {
              type: 'FButton',
              config: {
                type: 'primary',
                text: 'click me'
              }
            },
            {
              type: 'FDiv',
              components: [
                {
                  type: 'FButton',
                  config: {
                    type: 'danger',
                    text: 'stuff'
                  }
                }
              ]
            },
            {
              type: 'FContainer',
              components: [
                {
                  type: 'FDiv',
                  components: [
                    {
                      type: 'FContainer',
                      components: [
                        {
                          type: 'FButton',
                          config: {
                            type: 'danger',
                            text: 'DEEP'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>
