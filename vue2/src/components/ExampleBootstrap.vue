<template lang="jade">
  div
    h2 Bootstrap
    // example-formation(framework='bootstrap')
    formation-div(:components='divdata.components')
</template>

<script type="text/babel">
  // import $ from 'jquery'
  // import FDiv from '../../../src/components/formation/bootstrap/FDiv.vue'
  // import ExampleFormation from './ExampleFormation'
  export default {
    components: {
      // ExampleFormation
      // FDiv
    },
    mounted () {
      document.getElementById('style-framework').setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css')
    },
    data () {
      return {
        divdata: {
          components: [
            {
              type: 'button',
              config: {
                type: 'primary',
                text: 'click me'
              }
            },
            {
              type: 'div',
              components: [
                {
                  type: 'button',
                  config: {
                    type: 'danger',
                    text: 'stuff'
                  }
                }
              ]
            },
            {
              type: 'container',
              components: [
                {
                  type: 'div',
                  components: [
                    {
                      type: 'container',
                      components: [
                        {
                          type: 'button',
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
