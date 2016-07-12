export default {
  title: 'FormationColTextConfig',
  description: 'Configuration for a text input. Includes password, email, search, etc.',
  extends: 'FormationColStyledConfig',
  structure: [
    {
      path: 'label',
      type: 'String',
      description: 'Form label. Can contain HTML'
    },
    {
      path: 'model',
      type: 'String',
      description: 'Data path to bind to'
    },
    {
      path: 'validate',
      type: 'Function (data)',
      description: 'Validation function where <code>data</code> is the current form component value'
    },
    {
      path: 'required',
      type: 'Boolean',
      default: '<code>false</code>',
      description: 'When <code>true</code> the data value cannot be undefined or an empty array'
    }
  ]
}
