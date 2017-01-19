export default {
  modelData: {
    text1: 'one'
  },
  divdata: {
    components: [
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