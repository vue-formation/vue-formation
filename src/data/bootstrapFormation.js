export default {
  modelData: {
    type: 'Component Data',
    text1: 'one'
  },
  divdata: {
    components: [
      {
        type: 'form-grid',
        config: {
          rows: [
            {
              columns: [
                {
                  label: 'Text2',
                  type: 'text-input',
                  config: {
                    model: 'text2'
                  }
                },
                {
                  label: 'Text3',
                  type: 'text-input',
                  config: {
                    model: 'text3'
                  }
                }
              ]
            }
          ]
        }
      },
      {
        type: 'text-input',
        config: {
          model: 'text1',
          on: {
            keydown: {
              handler (event, config, data) {
                console.log({
                  event,
                  vm: this,
                  value: data[config.model]
                })
              },
              modifiers: ['ctrl', 'shift', 'delete']
            }
          }
        }
      },
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
