export default {
  title: 'FormationConfig',
  description: 'Used by a formation component to provide the layout and options for a form. The object is bound to ' +
    'the component so any modifications after the initial render/compile will be re-rendered/compiled automatically. ' +
    'This allows your forms to be more dynamic and even reconfigure themselves based on the current supplied user input',
  example: {
    liveValidation: false,
    rows: [
      {
        columns: [
          {
            type: 'text',
            label: 'First Name',
            model: 'firstName'
          }
        ]
      }
    ]
  },
  structure: [
    {
      path: 'liveValidation',
      type: 'Boolean',
      default: '<code>false</code>',
      description: 'Validates all forms on first and subsequent user input'
    },
    {
      path: 'format',
      type: 'String',
      description: 'Layout type. Valid values are <code>"inline"</code> and <code>"horizontal"</code>'
    },
    {
      path: 'framework',
      type: 'String',
      default: '<code>"bootstrap"</code>',
      description: 'CSS framework to use. Currently Bootstrap is the only framework supported'
    },
    {
      path: 'transition',
      type: 'String',
      description: 'Vue transition'
    },
    {
      path: 'transitionEnter',
      type: 'String',
      description: 'Vue enter transition'
    },
    {
      path: 'transitionLeave',
      type: 'String',
      description: 'Vue leave transition'
    },
    {
      path: 'stagger',
      type: 'Number',
      description: 'Vue transition stagger'
    },
    {
      path: 'enterStagger',
      type: 'Number',
      description: 'Vue transition enter stagger'
    },
    {
      path: 'leaveStagger',
      type: 'Number',
      description: 'Vue transition leave stagger'
    },
    {
      path: 'align',
      type: 'String',
      default: 'inherited',
      description: 'Content alignment. Valid values are <code>"left"</code> and <code>"right"</code>'
    },
    {
      path: 'rows',
      type: {
        name: 'Array&lt;FormationRowConfig&gt;',
        link: '#FormationRowConfig'
      },
      required: true,
      description: 'A list of "rows"'
    }
  ]
}
