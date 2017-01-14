export default {
  title: 'FormationColButtonConfig',
  description: 'Adds a button with access to the form data',
  extends: 'FormationColStyledConfig',
  structure: [
    {
      path: 'onClick',
      type: 'Function (event, vm)',
      description: 'Called on button click events. Passes the event object as well as a reference to the ' +
      'formation component instance. Data can be accessed via <code>vm.data</code>'
    },
    {
      path: 'iconClass',
      type: 'String | Array | Object',
      description: 'Set a webfont icon on the button'
    },
    {
      path: 'text',
      type: 'String',
      description: 'Button text'
    }
  ]
}
