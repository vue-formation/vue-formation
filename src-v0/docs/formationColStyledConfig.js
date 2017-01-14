export default {
  title: 'FormationColStyledConfig',
  description: 'Applies custom CSS styling',
  extends: 'FormationColConfig',
  structure: [
    {
      path: 'class',
      type: 'String | Array | Object',
      description: 'CSS class to set on the column'
    },
    {
      path: 'style',
      type: 'String | Array | Object',
      description: 'Style attributes to set on the column'
    }
  ]
}
