'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash/lodash.min'));
var VueMultiVersion = _interopDefault(require('vue-multi-version'));
var Vue = _interopDefault(require('vue'));

const BTN_CLASS = {
  default: 'btn-default',
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  danger: 'btn-danger',
  link: 'btn-link'
};

const BOOTSTRAP = 'bootstrap';
const FOUNDATION = 'foundation';
const MATERIALIZE = 'materialize';
const SEMANTICUI = 'semanticui';

const FRAMEWORKS = [
  BOOTSTRAP,
  FOUNDATION,
  MATERIALIZE,
  SEMANTICUI
];

const KEYMAP = {
  enter: ['Enter', 13],
  tab: ['Tab', 9],
  delete: ['Delete', 'Backspace', 8, 46],
  escape: ['Escape', 27],
  space: ['Space', 32],
  up: ['ArrowUp', 38],
  down: ['ArrowDown', 40],
  left: ['ArrowLeft', 37],
  right: ['ArrowRight', 39],
  ctrl: ['Control', 'ControlLeft', 'ControlRight', 17],
  alt: ['Alt', 'AltLeft', 'AltRight', 18],
  shift: ['Shift', 'ShiftLeft', 'ShiftRight', 16],
  meta: ['Meta', 'MetaLeft', 'MetaRight']
};

function isKey (e, key) {
  return _.includes(KEYMAP[key], e.key || e.code || e.keyCode || e.which)
}

function evalEvent (event, vm) {
  if (_.isFunction(event)) return event.bind(vm)
  if (!_.isObject(event)) return () => false

  let { handler, modifiers } = event;
  handler = _.isFunction(handler)
    ? handler
    : () => false;

  modifiers = _.isArray(modifiers)
    ? modifiers
    : [];

  return function (e, config, value) {
    let keys = [];
    let modKeys = _.without(modifiers, 'stop', 'prevent', 'capture', 'self', 'once');

    _.forEach(modifiers, (mod) => {
      switch (mod) {
        case 'stop':
          e.stopPropagation();
          break
        case 'prevent':
          e.preventDefault();
          break
        case 'self':
          if (e.target !== vm.$el) return false
          break
        default:
          // get combo modifier keys
          if (mod === 'ctrl' && (isKey(e, mod) || e.ctrlKey)) {
            keys.push(mod);
          }
          if (mod === 'alt' && (isKey(e, mod) || e.altKey)) {
            keys.push(mod);
          }
          if (mod === 'shift' && (isKey(e, mod) || e.shiftKey)) {
            keys.push(mod);
          }
          if (mod === 'meta' && (isKey(e, mod) || e.metaKey)) {
            keys.push(mod);
          }

          // get keycode number keys
          if (_.isNumber(mod) && (e.keyCode === mod || e.which === mod)) {
            keys.push(mod);
          }

          // get keymap keys or strings
          if (_.has(KEYMAP, mod)) {
            if (isKey(e, mod)) {
              keys.push(mod);
            }
          } else if (_.isString(mod) && (e.key === mod || e.code === mod)) {
            keys.push(mod);
          }
          break
      }
    });

    // check that the correct key combo was entered
    if (modKeys.length && _.intersection(modKeys, keys).length !== modKeys.length) return false

    // call the original handler with hte
    handler.apply(vm, [e, config, value]);
  }
}

function evalProp (types, value, vm, config, data, defaultValue) {
  for (let type of types) {
    switch (type) {
      case Function:
        if (_.isFunction(value)) return value(vm, config, data)
        break
      case Boolean:
        if (_.isBoolean(value)) return value
        break
      case String:
        if (_.isString(value)) return value
        break
      case Date:
        if (_.isDate(value)) return value
        break
      case Number:
        if (_.isNumber(value)) return value
        break
      default:
        break
    }
  }
  return defaultValue
}

function mergeClass (c, def = {}) {
  let obj = {};
  c = _.isString(c) ? c.split(/\s+/) : c;
  if (_.isArray(c)) {
    _.forEach(c, (n) => { obj[n] = true; });
  } else if (_.isObject(c)) {
    obj = c;
  }

  return _.merge({}, def, obj)
}

/* eslint-disable */
let isArray = function (obj) {
  return Array.isArray(obj)
};

isArray._accepts = ['ANY'];

/* eslint-disable */
let forEach = function (obj, fn) {
  try {
    if (isArray(obj)) {
      let idx = 0;
      for (let val of obj) {
        if (fn(val, idx) === false) break
        idx++;
      }
    } else {
      for (const key in obj) {
        if (fn(obj[key], key) === false) break
      }
    }
  } catch (err) {
    return
  }
};

forEach._accepts = [Object, Array];

/* eslint-disable */
let addClass = function (className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/);
  this.each(function (i, el) {
    forEach(classList, (clazz) => el.classList.add(clazz));
  });
  /*
  each(this, function (i, el) {
    each(classList, function (j, clazz) {
      el.classList.add(clazz)
    })
  })
  */
};

addClass._dependencies = [
  'query.each',
  'dash.forEach'
];

/* eslint-disable */
let isString = function (obj) {
  return typeof obj === 'string'
};

isString._accepts = ['ANY'];

/* eslint-disable */
let isObject = function (obj) {
  return typeof obj === 'object' && obj !== null
};

isObject._accepts = ['ANY'];

/* eslint-disable */
let rx = /^data-(.+)/;

function getAttrs (node) {
  let obj = {};

  forEach(node.attributes, (attr) => {
    let { name, nodeName, localName, value, nodeValue, textContent } = attr;
    name = name || nodeName || localName;
    value = value || nodeValue || textContent;

    if (isString(name) && name.match(rx)) {
      obj[name.replace(rx, '$1')] = value;
    }
  });
  return obj
}

function hasAttr (node, attrName) {
  let has = false;
  if (!node || !node.attributes) return has
  forEach(node.attributes, () => {
    let { name, nodeName, localName } = attr;
    name = name || nodeName || localName;
    if (name === `data-${attrName}`) {
      has = true;
      return false
    }
  });
  return has
}

function setAttr (node, key, value) {
  if (hasAttr(node, key)) {
    node.setAttribute(`data-${key}`, value);
  } else {
    let attr = document.createAttribute(`data-${key}`);
    attr.value = value;
    node.setAttributeNode(attr);
  }
}

let data = function (key, val) {
  let node = this[0];

  if (!node) {
    return null
  } else if (!key) {
    return getAttrs(node)
  } else if (key && val === undefined) {
    if (isString(key)) {
      return getAttrs(node)[key]
    } else if (isObject(key)) {
      return forEach(key, (v, k) => {
        setAttr(node, k, v);
      })
    }
  }

  // set a key/value
  setAttr(node, key, val);
};

/* eslint-disable */
let each = function (fn) {
  forEach(this.slice(0, this.length), (v, k) => fn.bind(v)(k, v));
};

each._baseutil = true;

/* eslint-disable */
let mapWith = function (obj, fn) {
  let newObj = [];
  forEach(obj, (v, k) => {
    let value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj
};

mapWith._accepts = [Object, Array];

/* eslint-disable */
let mapNodes = function (element, selector) {
  return mapWith(element.querySelectorAll(selector), (v) => isObject(v) ? v : undefined)
};

mapNodes._chainable = false;
mapNodes._dependencies = [
  'dash.mapWith',
  'dash.isObject'
];

/* eslint-disable */
let union = function () {
  let args = [ ...arguments ];
  if (!args.length) return []

  try {
    let u = args.reduce((prev, cur) => {
      if (!isArray(prev) || !isArray(cur)) return []
      return prev.concat(cur)
    }, []);

    return [ ...new Set(u) ]
  } catch (err) {
    console.error(err);
    return []
  }
};

union._accepts = ['ANY'];

/* eslint-disable */
let find = function (selector) {
  let results = [];
  this.each(function () {
    results = union(results, mapNodes(this, selector));
  });
  return this.init(results, this)
};

find._terminates = true;
find._dependencies = [
  'query.mapNodes',
  'query.each',
  'dash.union'
];

/* eslint-disable */
let isFunction = function (obj) {
  return typeof obj === 'function'
};

isFunction._accepts = ['ANY'];

/* eslint-disable */
let isDate = function (obj) {
  return obj instanceof Date
};

isDate._accepts = ['ANY'];

/* eslint-disable */
let isHash = function (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj)
};

isHash._accepts = ['ANY'];
isHash._dependencies = [
  'dash.isArray',
  'dash.isDate',
  'dash.isObject'
];

/* eslint-disable */
let includes = function (obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1
};

includes._accepts = [Array];

/* eslint-disable */
let without = function () {
  let output = [];
  let args = [ ...arguments ];
  if (args.length < 2) return args.length ? args[0] : []
  let search = args.slice(1);

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val);
  });
  return output
};

without._accepts = [Array];
without._dependencies = [
  'dash.forEach',
  'dash.includes'
];

/* eslint-disable */
let map = function (obj, fn) {
  let output = [];
  forEach(obj, (v, k) => output.push(fn(v, k)));
  return output
};

map._accepts = [Object, Array];

/* eslint-disable */
function removeEvent (store, el, event, handler, uuid) {
  let toRemove = [];
  let [ evt, ns ] = event.split(/\.(.+)?/);
  forEach(store.active, (e) => {
    let isElement = e.el === el;
    let isNS = e.ns === ns || !e.ns && !ns;
    let isEvent = e.event === event && isNS;
    let isHandler = e.handler === handler;
    let foundUUID = uuid === e.uuid;
    let foundEvent = isElement && (!event || (isEvent && (isHandler || !handler)));
    if (foundUUID || foundEvent) {
      toRemove.push(e);
      if (isFunction(e.off)) e.off();
    }
  });
  store.active = without.apply(this, [store.active].concat(toRemove));
}

let off = function (events, selector, handler) {
  let queue = [];

  if (isFunction(selector) && !handler) {
    handler = selector;
    selector = undefined;
  }

  let base = selector ? this.find(selector) : this;

  if (isString(events)) {
    queue = map(events.split(/\s+/g), (event) => {
      return { event, handler }
    });
  } else if (events instanceof this.$root.Event) {
    queue = [ { uuid: events.handlerId } ];
  } else if (isHash(events)) {
    forEach(events, (h, e) => {
      queue = union(queue, map(e.split(/\s+/g), (event) => {
        return { event, handler: h }
      }));
    });
  } else if (!events) {
    base.each(function () {
      removeEvent(base.$root.event, this);
    });
    return this
  }

  base.each(function () {
    forEach(queue, (q) => removeEvent(base.$root.event, this, q.event, q.handler, q.uuid));
  });

  return this
};

off._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.isHash',
  'dash.forEach',
  'dash.union',
  'dash.without',
  'dash.map'
];

/* eslint-disable */
function offHandler (el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler, false);
    return () => el.removeEventListener(event, handler, false)
  } else if (el.attachEvent) {
    el.attachEvent(event, handler);
    return () => el.detachEvent(event, handler)
  }
  return () => false
}

function addEvents (one, events, selector, data, fn) {
  if (!isString(selector)) {
    fn = data;
    data = selector;
    selector = undefined;
  }
  if (!isFunction(fn) && isFunction(data)) {
    fn  = data;
    data = undefined;
  }
  if (!fn) fn = () => false;

  let base = selector ? this.find(selector) : this;
  let uuid = base.$root.uuid();

  base.each(function (i, el) {
    let handler = (event) => {
      let e = new base.$root.Event(event, data, uuid);
      fn.call(el, e);
      if (one) base.off(e);
    };
    let prefix = !el.addEventListener ? 'on' : '';

    forEach(events.split(/\s+/g), (event) => {
      let [ evt, ns ] = event.split(/\.(.+)?/);
      event = evt;
      let off = offHandler(el, `${prefix}${evt}`, handler);
      base.$root.event.active.push({ el, event, ns, handler, off, uuid });
    });
  });
}

let onEvent = function (one, events, selector, data, fn) {
  if (isHash(events)) forEach(events, (h, e) => addEvents.call(this, one, e, selector, data, h));
  else if (isString(events)) addEvents.call(this, one, events, selector, data, fn);
  return this
};

onEvent._chainable = false;
onEvent._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.isHash',
  'dash.forEach',
  'query.each',
  'query.find'
];

/* eslint-disable */
let on = function (events, selector, data, fn) {
  onEvent.call(this, false, events, selector, data, fn);
  return this
};

/* eslint-disable */
let one = function (events, selector, data, fn) {
  onEvent.call(this, true, events, selector, data, fn);
  return this
};

/* eslint-disable */
var _query = {
  addClass,
  data,
  each,
  find,
  mapNodes,
  off,
  on,
  one,
  onEvent
};

/* eslint-disable */
let infoName = 'liteutils';
let infoVersion = '0.1.0';

let arr = [];

let lQuery = function (selector, context) {
  context = context || document;
  if (selector !== document) this.prevObject = context instanceof lQuery ? context : new query.fn.init(context);
  let nodes = [];
  if (Array.isArray(selector)) nodes = selector;
  else if (selector instanceof lQuery) nodes = selector.slice(0, nodes.length);
  else if (typeof selector === 'string') nodes = mapNodes(context, selector);
  else nodes = [ selector ];
  this.length = nodes.length;
  forEach(nodes, (node, idx) => {
    this[idx] = node;
  });
};

let query = function (selector, context) {
  return new query.fn.init(selector, context)
};

query.fn = {
  init: function (selector, context) {
    lQuery.prototype = query.fn;
    return new lQuery(selector, context)
  }
};

query.event = {
  active: []
};

query.uuid = () => {
  return `${infoName}${Date.now()}`
};

query.Event = class Event {
  constructor (event, data$$1, uuid) {
    forEach(event, (v, k) => {
      if (!k.match(/^[A-Z_]*$/)) this[k] = v;
    });
    this.originalEvent = event;
    this.handlerId = uuid;
    if (data$$1) this.data = data$$1;
  }
};

forEach(_query, (fn, name) => {
  if (fn._baseutil === true) query[name] = fn;
  if (fn._chainable !== false) query.fn[name] = fn;
});

// extend array and iterator properties
query.fn.splice = arr.splice;
query.fn.slice = arr.slice;
query.fn.sort = arr.sort;
query.fn.push = arr.push;
query.fn.length = 0;
query.fn[infoName] = infoVersion;
query.fn.$root = query;

query.fn[Symbol.iterator] = function values () {
  let nextIndex = 0;
  return {
    next: () => nextIndex < this.length ? { value: this[nextIndex++], done: false } : { done: true }
  }
};

function vueSet (obj, path, val) {
  let value = obj;
  let fields = _.isArray(path) ? path : _.toPath(path);
  for (let f in fields) {
    let idx = Number(f);
    let p = fields[idx];
    if (idx === fields.length - 1) Vue.set(value, p, val);
    else if (!value[p]) Vue.set(value, p, _.isNumber(p) ? [] : {});
    value = value[p];
  }
}

var Button = { template: "<button type=\"button\" :class=\"clazz\" :style=\"config.style\"><span v-if=\"config.iconClassLeft\" :class=\"config.iconClassLeft\"></span> <span>{{config.text}}</span> <span v-if=\"config.iconClassRight\" :class=\"config.iconClassRight\"></span><div v-if=\"config.html\" v-html=\"config.html\"></div></button>",
  name: 'formation-button',
  props: {
    value: { type: Object },
    config: { type: Object, default () { return {} } },
    components: { type: Array, default () { return [] } }
  },
  computed: {
    clazz () {
      let type = _.has(BTN_CLASS, this.config.type) ? BTN_CLASS[this.config.type] : 'btn-default';
      return mergeClass({
        'btn': true,
        [type]: true
      }, this.config.class)
    }
  }
};

var Container = { template: "<div :class=\"clazz\" :style=\"config.style\"><component v-for=\"c in components\" :is=\"kebab('formation-' + c.type)\" :config=\"c.config\" :components=\"c.components\" :value.sync=\"value\"></component></div>",
  name: 'formation-container',
  props: {
    value: { type: Object },
    config: { type: Object, default () { return {} } },
    components: { type: Array, default () { return {} } }
  },
  computed: {
    clazz () {
      let obj = mergeClass(this.config.class || {}, {});
      obj.container = true;
    }
  },
  methods: {
    kebab (name) {
      return _.kebabCase(name)
    }
  }
};

var Div = { template: "<div :class=\"clazz\" :style=\"config.style\"><component v-for=\"c in components\" :is=\"kebab('formation-' + c.type)\" :config=\"c.config\" :components=\"c.components\" :value.sync=\"value\"></component></div>",
  name: 'formation-div',
  props: {
    value: { type: Object },
    config: { type: Object, default () { return {} } },
    components: { type: Array, default () { return {} } }
  },
  computed: {
    clazz () {
      return mergeClass(this.config.class || {}, {})
    }
  },
  methods: {
    kebab (name) {
      return _.kebabCase(name)
    }
  }
};

var TextInput = { template: "<input type=\"text\" :accesskey=\"config.accesskey\" :class=\"clazz\" :contenteditable=\"config.contenteditable\" :contextmenu=\"config.contextmenu\" :dir=\"config.dir\" :draggable=\"config.draggable\" :dropzone=\"config.dropzone\" :hidden=\"config.hidden\" :id=\"config.id\" :lang=\"config.lang\" :spellcheck=\"config.spellcheck\" :style=\"config.style\" :tabindex=\"config.tabindex\" :title=\"config.title\" :translate=\"config.translate\" :accept=\"config.accept\" :autocomplete=\"config.autocomplete\" :autofocus=\"config.autofocus\" :dirname=\"config.dirname\" :disabled=\"disabled\" :form=\"config.form\" :formnovalidate=\"config.formnovalidate\" :list=\"config.list\" :max=\"config.max\" :maxlength=\"config.maxlength\" :min=\"config.min\" :multiple=\"config.multiple\" :name=\"config.name\" :pattern=\"config.pattern\" :placeholder=\"placeholder ? placeholder : null\" :readonly=\"readonly\" :required=\"config.required\" :size=\"config.size\" :step=\"config.step\" v-on:blur=\"config.onblur ? eventHandler(config.onblur, vm)($event, config, value) : null\" v-on:change=\"config.onchange ? eventHandler(config.onchange, vm)($event, config, value) : null\" v-on:contextmenu=\"config.oncontextmenu ? eventHandler(config.oncontextmenu, vm)($event, config, value) : null\" v-on:focus=\"config.onfocus ? eventHandler(config.onfocus, vm)($event, config, value) : null\" v-on:input=\"config.oninput ? eventHandler(config.oninput, vm)($event, config, value) : null\" v-on:invalid=\"config.oninvalid ? eventHandler(config.oninvalid, vm)($event, config, value) : null\" v-on:reset=\"config.onreset ? eventHandler(config.onreset, vm)($event, config, value) : null\" v-on:search=\"config.onsearch ? eventHandler(config.onsearch, vm)($event, config, value) : null\" v-on:select=\"config.onselect ? eventHandler(config.onselect, vm)($event, config, value) : null\" v-on:submit=\"config.onsubmit ? eventHandler(config.onsubmit, vm)($event, config, value) : null\" v-on:keydown=\"config.onkeydown ? eventHandler(config.onkeydown, vm)($event, config, value) : null\" v-on:keypress=\"config.onkeypress ? eventHandler(config.onkeypress, vm)($event, config, value) : null\" v-on:keyup=\"config.onkeyup ? eventHandler(config.onkeyup, vm)($event, config, value) : null\" v-on:click=\"config.onclick ? eventHandler(config.onclick, vm)($event, config, value) : null\" v-on:dblclick=\"config.ondblclick ? eventHandler(config.ondblclick, vm)($event, config, value) : null\" v-on:mousedown=\"config.onmousedown ? eventHandler(config.onmousedown, vm)($event, config, value) : null\" v-on:mousemove=\"config.onmousemove ? eventHandler(config.onmousemove, vm)($event, config, value) : null\" v-on:mouseout=\"config.onmouseout ? eventHandler(config.onmouseout, vm)($event, config, value) : null\" v-on:mouseover=\"config.onmouseover ? eventHandler(config.onmouseover, vm)($event, config, value) : null\" v-on:mouseup=\"config.onmouseup ? eventHandler(config.onmouseup, vm)($event, config, value) : null\" v-on:mousewheel=\"config.onmousewheel ? eventHandler(config.onmousewheel, vm)($event, config, value) : null\" v-on:wheel=\"config.onwheel ? eventHandler(config.onwheel, vm)($event, config, value) : null\" v-model=\"value[config.model]\">",
  name: 'formation-text-input',
  props: {
    value: {
      type: Object,
      required: true,
      twoWay: VueMultiVersion.select(true, undefined)
    },
    /**
     * @property {String} model - model path
     * @property {*} [class] - css class settings
     * @property {*} [style] - css style settings
     * @property {Boolean|Function} [readonly=false] - make form readonly
     * @property {Boolean|Function} [disabled=false] - disable form
     * @placeholder {String|Function} [placeholder=""] - placeholder text
     */
    config: { type: Object, default () { return {} } },
    components: { type: Array, default () { return [] } }
  },
  methods: {
    eventHandler (event) {
      return evalEvent(event, this)
    }
  },
  ready () {
    console.log(this.$el);
    console.log(query(this.$el));
  },
  computed: {
    clazz () {
      return mergeClass({
        'form-control': true
      }, this.config.class)
    },
    disabled () {
      return evalProp(
        [Function, Boolean],
        this.config.disabled,
        this,
        this.config,
        this.value,
        false
      )
    },
    placeholder () {
      return evalProp(
        [Function, String],
        this.config.placeholder,
        this,
        this.config,
        this.value,
        ''
      )
    },
    readonly () {
      return evalProp(
        [Function, Boolean],
        this.config.readonly,
        this,
        this.config,
        this.value,
        false
      )
    },
    vm () {
      return this
    }
  }
};

var bootstrapComponents = function (Vue$$1) {
  Vue$$1.component('formation-button', Button);
  Vue$$1.component('formation-container', Container);
  Vue$$1.component('formation-div', Div);
  Vue$$1.component('formation-text-input', TextInput);
};

var formation = {
  install (Vue$$1) {
    // create a new multi version instance
    let multi = VueMultiVersion(Vue$$1);

    // register the formation component
    Vue$$1.component('formation', {
      name: 'formation',
      template: `
<div>
  <component v-for="c in _config.components"
    :is="'formation-' + c.type"
    :config="c.config"
    :components='c.components'
    ${multi.select(':value.sync', 'v-model')}="modelData"></component>
</div>
`,
      props: {
        value: {
          type: Object,
          defaultValue () {
            return {}
          },
          twoWay: multi.select(true, undefined)
        },
        config: {
          type: Object,
          required: true
        },
        framework: {
          type: String,
          default: BOOTSTRAP,
          validator (value) {
            return _.includes(FRAMEWORKS, value)
          }
        }
      },
      created () {
        this.syncModelProps();
        switch (this.framework) {
          case BOOTSTRAP:
            bootstrapComponents(Vue$$1);
            break
          default:
            break
        }
      },
      computed: {
        _config () {
          return this.config
        }
      },
      methods: {
        findModels (obj, models = []) {
          if (_.has(obj, 'config.model')) models.push(obj.config.model);
          if (_.isArray(_.get(obj, 'components'))) {
            _.forEach(obj.components, (c) => {
              this.findModels(c, models);
            });
          }
          if (_.isArray(_.get(obj, 'rows'))) {
            _.forEach(obj.rows, (row) => {
              if (_.isArray(_.get(row, 'columns'))) {
                _.forEach(row.columns, (col) => {
                  if (col.model) models.push(col.model);
                });
              }
            });
          }
          return models
        },
        syncModelProps () {
          _.forEach(_.uniq(this.findModels(this._config)), (model) => {
            if (!this.modelData.hasOwnProperty(model)) {
              Object.defineProperty(this.modelData, model, {
                configurable: true,
                enumerable: true,
                get: () => _.get(this.value, model),
                set: (v) => vueSet(this.value, model, v)
              });
            }
          });
        }
      },
      watch: {
        _config: {
          handler () {
            this.$nextTick(this.syncModelProps);
          },
          deep: true
        }
      },
      data () {
        return {
          modelData: {}
        }
      }
    });
  }
};

module.exports = formation;
