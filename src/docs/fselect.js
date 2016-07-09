
/*
 onChange: { type: Function },
 onChanging: { type: Function, default: () => true },
 onClose: { type: Function },
 onClosing: { type: Function, default: () => true },
 onClear: { type: Function },
 onClearing: { type: Function, default: () => true },
 onAdd: { type: Function },
 onAdding: { type: Function, default: () => true },
 onRemove: { type: Function },
 onRemoving: { type: Function, default: () => true },
 options: { type: Array },
 placeholder: { type: String, default: '' },
 height: { type: String },
 removeClass: { validator: validateClassProp, default: 'icon formation-remove x-remove' },
 removeSelectedOptions: { type: Boolean, default: false },
 searchable: { type: Boolean, default: true },
 selectLimit: { type: Number },
 storeObject: { type: Boolean, default: false },
 tagClass: {
 validator: validateClassProp,
 default () {
 return ['btn', 'btn-primary', 'default-tag-class']
 }
 },
 textKey: { type: String, default: 'text' },
 value: { twoWay: true, validator: validateValue },
 valueKey: { type: String, default: 'value' },
 width: {
 validator (value) {
 let rx = /(^100%$)|^[1-9]\d?%$/
 return !isNaN(value) || String(value).match(rx)
 }
 }
 }
 */

export default {
  title: 'FSelect',
  exampleId: 'SelectEx1',
  params: [
    {
      name: 'align',
      type: 'String',
      twoWay: false,
      required: false,
      default: '<code>"left"</code>',
      description: 'Aligns the text'
    },
    {
      name: 'allow-clear',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>true</code>',
      description: 'When using multiple select, display a clear form <code>x</code>'
    },
    {
      name: 'allow-multiple',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>false</code>',
      description: 'Allow the same value to be selected more than once'
    },
    {
      name: 'caret-class',
      type: 'String | Array | Object',
      twoWay: false,
      required: false,
      default: null,
      description: 'Specify a custom caret class'
    },
    {
      name: 'close-on-select',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>false</code>',
      description: 'Close the select menu on each selection when using <code>multiple</code>'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>false</code>',
      description: 'Disables the form when truthy'
    },
    {
      name: 'option-limit',
      type: 'Number',
      twoWay: false,
      required: false,
      default: '<code>5</code>',
      description: 'Maximum number of select options to display'
    },
    {
      name: 'multiple',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: '<code>false</code>',
      description: 'Allow multiple selections'
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
      type: 'modal.show',
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
