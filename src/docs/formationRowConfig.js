export default {
  title: 'FormationRowConfig',
  description: 'Defines settings for a Formation row',
  structure: [
    {
      path: 'class',
      type: 'String | Array | Object',
      description: 'One or more CSS class to add to the row'
    },
    {
      path: 'style',
      type: 'String | Array | Object',
      description: 'Style attributes to add to the row'
    },
    {
      path: 'columns',
      type: {
        name: 'Array&lt;FormationColConfig&gt;',
        link: '#FormationColConfig'
      },
      description: 'List of columns for the current row'
    }
  ]
}
