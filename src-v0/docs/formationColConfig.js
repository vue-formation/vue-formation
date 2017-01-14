export default {
  title: 'FormationColConfig',
  description: 'Defines settings for a Formation column. FormationColConfigs have standard configuration options that ' +
  'can be extended with options for specific column types. See component documentation. All component options should' +
  'be provided using camelCase',
  structure: [
    {
      path: 'type',
      type: {
        name: 'FormationColTypeEnum',
        link: '#FormationColTypeEnum'
      },
      required: true,
      description: 'A supported column type'
    },
    {
      path: 'bind',
      type: 'FormationColBind',
      description: 'A collection of element binding actions'
    }
  ]
}
