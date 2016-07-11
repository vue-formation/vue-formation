export default {
  title: 'FModal',
  exampleId: 'ModalEx1',
  params: [
    {
      name: 'show',
      type: 'Boolean',
      twoWay: true,
      required: false,
      default: '<code>false</code>',
      description: 'Opens or closes modal'
    },
    {
      name: 'config',
      type: 'Object',
      twoWay: false,
      required: false,
      default: null,
      description: 'Allows modal content to be set via object instead of slot'
    },
    {
      name: 'modal-id',
      type: 'String',
      twoWay: false,
      required: false,
      default: null,
      description: 'When specified the <code>modal.show</code> listener will only show the modal if the modalId is passed as an argument'
    },
    {
      name: 'backdrop',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>true</code>',
      description: 'Show a backdrop with the modal'
    },
    {
      name: 'backdrop-opacity',
      type: 'Number',
      twoWay: false,
      required: false,
      default: '<code>0.5</code>',
      description: 'Opacity of the backdrop'
    },
    {
      name: 'exclusive',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>true</code>',
      description: 'When true, sends a <code>modal.hide</code> event to all other modals before opening'
    },
    {
      name: 'z-index',
      type: 'Number',
      twoWay: false,
      required: false,
      default: '<code>2000000000</code>',
      description: 'zIndex of the modal'
    },
    {
      name: 'animation',
      type: 'String',
      twoWay: false,
      required: false,
      default: '<code>fade-modal</code>',
      description: 'Transition to use when opening/closing the modal'
    }
  ],
  events: [
    {
      type: 'modal.opening / show.bs.modal',
      description: 'These events fire before the modal is opened'
    },
    {
      type: 'modal.open / shown.bs.modal',
      description: 'These events fire after the modal is opened'
    },
    {
      type: 'modal.closing / hide.bs.modal',
      description: 'These events fire before the modal is closed'
    },
    {
      type: 'modal.close / hidden.bs.modal',
      description: 'These events fire after the modal is closed'
    }
  ],
  listeners: [
    {
      type: 'modal.show (config, id)',
      description: 'When triggered, opens the modal',
      params: [
        {
          name: 'config',
          type: 'Object',
          description: 'Configuration object to use'
        },
        {
          name: 'id',
          type: 'String',
          description: 'ID of the specific modal to open. Used with the <code>modalId</code> parameter'
        }
      ]
    },
    {
      type: 'modal.hide',
      description: 'When triggered, hides the modal'
    }
  ]
}
