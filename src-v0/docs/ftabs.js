export default {
  title: 'FTabs',
  exampleId: 'TabEx1',
  params: [
    {
      name: 'config',
      type: 'Object&lt;TabConfig&gt;',
      twoWay: false,
      required: true,
      default: null,
      description: 'Tab configuration object'
    },
    {
      name: 'active',
      type: 'String',
      twoWay: true,
      required: false,
      default: 'First Tab',
      description: 'ID of the active tab'
    }
  ],
  events: [
    {
      type: 'show.bs.tab',
      description: 'This event fires before the active tab is changed'
    },
    {
      type: 'shown.bs.tab',
      description: 'This event fires after the active tab has changed'
    }
  ]
}
