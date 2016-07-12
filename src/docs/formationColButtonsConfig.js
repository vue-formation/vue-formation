export default {
  title: 'FormationColButtonsConfig',
  description: 'Adds a button group',
  extends: 'FormationColStyledConfig',
  structure: [
    {
      path: 'buttons',
      type: {
        name: 'Array&lt;FormationColButtonConfig&gt;',
        link: '#FormationColButtonConfig'
      },
      required: true,
      description: 'List of buttons'
    },
    {
      path: 'group',
      type: 'Boolean',
      description: 'When <code>true</code> show as a button-group'
    }
  ]
}
