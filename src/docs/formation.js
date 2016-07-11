export default {
  title: 'Formation',
  exampleId: 'FormationEx1',
  params: [
    {
      name: 'config',
      type: 'Object<FormationConfig>',
      twoWay: false,
      required: true,
      default: null,
      description: 'Formation configuration object'
    },
    {
      name: 'data',
      type: 'Object',
      twoWay: true,
      required: true,
      default: null,
      description: 'Data object to bind'
    },
    {
      name: 'width',
      type: 'String | Number',
      twoWay: false,
      required: false,
      default: null,
      description: 'Width of component (e.g "100%" or "500px"). Numbers will be evaluated as pixels'
    }
  ],
  events: [
    {
      type: 'formation.error ( info )',
      description: 'This event fires immediately when an error encountered by either the formation component or any child components',
      params: [
        {
          name: 'info',
          type: 'Object',
          description: 'Contains details on the error including which component emitted the error'
        }
      ]
    }
  ]
}
