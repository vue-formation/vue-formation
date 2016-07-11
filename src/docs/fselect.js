
/*
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
      default: '<code>true</code>',
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
    },
    {
      name: 'on-change',
      type: 'Function (type, value, vm)',
      twoWay: false,
      required: false,
      default: null,
      description: 'Function to call on change where type is <code>"add"</code>, <code>"remove"</code>, or <code>"clear"</code>'
    },
    {
      name: 'on-changing',
      type: 'Function (type, value, vm)',
      twoWay: false,
      required: false,
      default: null,
      description: 'If specified, requsted changes (<code>"add"</code>, <code>"remove"</code>, or <code>"clear"</code>) will first run the provided function. If the function returns <code>false</code> the change will not proceed.'
    },
    {
      name: 'options',
      type: 'Array',
      twoWay: false,
      required: true,
      default: null,
      description: 'A list of option objects'
    },
    {
      name: 'placeholder',
      type: 'String',
      twoWay: false,
      required: false,
      default: null,
      description: 'Placeholder text when no options are selected'
    },
    {
      name: 'remove-class',
      type: 'String | Array | Object',
      twoWay: false,
      required: false,
      default: null,
      description: 'Class to apply to remove buttons'
    },
    {
      name: 'remove-selected-options',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: 'false',
      description: 'Removes options from the option list when selected'
    },
    {
      name: 'searchable',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: 'true',
      description: 'Show an option search form'
    },
    {
      name: 'select-id',
      type: 'String',
      twoWay: false,
      required: false,
      default: null,
      description: 'An identifier string for the select menu which when set is required as a parameter when making changes via events'
    },
    {
      name: 'store-object',
      type: 'Boolean',
      twoWay: false,
      required: false,
      default: 'false',
      description: 'When <code>true</code> the option object will be stored in the value instead of just the value'
    },
    {
      name: 'tag-class',
      type: 'String | Array | Object',
      twoWay: false,
      required: false,
      default: null,
      description: 'Class to apply to tags'
    },
    {
      name: 'text-key',
      type: 'String',
      twoWay: false,
      required: false,
      default: 'text',
      description: 'Key path in an object to the text attribute'
    },
    {
      name: 'value',
      type: 'String | Array',
      twoWay: true,
      required: true,
      default: null,
      description: 'Selected value(s). Will always be converted into an <code>Array</code>'
    },
    {
      name: 'value-key',
      type: 'String',
      twoWay: false,
      required: false,
      default: 'value',
      description: 'Key path in an object to the value attribute'
    },
    {
      name: 'width',
      type: 'String | Number',
      twoWay: false,
      required: false,
      default: null,
      description: 'Width of the select menu'
    }
  ],
  events: [
    {
      type: 'fselect.changing (type, value, vm, id)',
      description: 'Fired before any changes are made',
      params: [
        {
          name: 'type',
          type: 'String',
          description: 'The type of change being made (<code>"add"</code>, <code>"remove"</code>, or <code>"clear"</code>)'
        },
        {
          name: 'value',
          type: '*',
          description: 'The value used in the change'
        },
        {
          name: 'vm',
          type: 'VueComponent',
          description: 'The fselect vue instance'
        },
        {
          name: 'id',
          type: 'String',
          description: 'The fselect id if set'
        }
      ]
    },
    {
      type: 'fselect.changed',
      description: 'Fired after a change is made'
    },
    {
      type: 'fselect.adding',
      description: 'Fired before a value is added'
    },
    {
      type: 'fselect.added',
      description: 'Fired after a value is added'
    },
    {
      type: 'fselect.removing',
      description: 'Fired before a value is removed'
    },
    {
      type: 'fselect.removed',
      description: 'Fired after a value is removed'
    },
    {
      type: 'fselect.clearing',
      description: 'Fired before the value is cleared'
    },
    {
      type: 'fselect.cleared',
      description: 'Fired after a value is cleared'
    }
  ],
  listeners: [
    {
      type: 'fselect.change (type, value, id)',
      description: 'Makes a change to the value',
      params: [
        {
          name: 'type',
          type: 'String',
          description: 'Type of change to make. Valid values are <code>"add"</code>, <code>"remove"</code>, or <code>"clear"</code>'
        },
        {
          name: 'value',
          type: 'String',
          description: 'Value ID to use in the change'
        },
        {
          name: 'id',
          type: 'String',
          description: 'ID of the fselect menu to perform the change on'
        }
      ]
    },
    {
      type: 'fselect.add (value, id)',
      description: 'Sets/Adds a value',
      params: [
        {
          name: 'value',
          type: 'String',
          description: 'Value ID to set/add'
        },
        {
          name: 'id',
          type: 'String',
          description: 'ID of the fselect menu to perform the change on'
        }
      ]
    },
    {
      type: 'fselect.remove (value, id)',
      description: 'Removes a value',
      params: [
        {
          name: 'value',
          type: 'String',
          description: 'Value ID to remove'
        },
        {
          name: 'id',
          type: 'String',
          description: 'ID of the fselect menu to perform the change on'
        }
      ]
    },
    {
      type: 'fselect.clear (id)',
      description: 'Clears all values',
      params: [
        {
          name: 'id',
          type: 'String',
          description: 'ID of the fselect menu to perform the change on'
        }
      ]
    }
  ]
}
