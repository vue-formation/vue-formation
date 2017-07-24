export default {
  fModel: {
    text1: 'Hi Mom!'
  },
  fConfig: {
    components: [
      {
        type: 'source-code',
        config: {
          source: 'npm install vue-formation --save',
          plugins: ['command-line'],
          attrs: {
            class: 'command-line'
          }
        }
      },
      {
        type: 'modal',
        config: {
          name: 'mymodal',
          header: {
            text: 'Modal Header'
          },
          body: {
            text: 'stuff'
          },
          footer: {
            components: [
              {
                type: 'button',
                config: {
                  type: 'default',
                  text: 'Close',
                  on: {
                    click () {
                      this.eventHub.$emit('mymodal.modal.hide')
                    }
                  }
                }
              }
            ]
          }
        }
      },
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
          model: 'text1'
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
                      text: 'DEEP',
                      on: {
                        click () {
                          this.eventHub.$emit('modal.show')
                        }
                      }
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
