'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var VueMultiVersion = _interopDefault(require('vue-multi-version'));
var Vue = _interopDefault(require('vue'));

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

/* eslint-disable */
let isString = function (obj) {
  return typeof obj === 'string'
};

isString._accepts = ['ANY'];

/* eslint-disable */
let capitalize = function (str) {
  return isString(str) && str.length ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : str
};

capitalize._accepts = [String];

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
let isObject = function (obj) {
  return typeof obj === 'object' && obj !== null
};

isObject._accepts = ['ANY'];

/* eslint-disable */
let isFunction = function (obj) {
  return typeof obj === 'function'
};

isFunction._accepts = ['ANY'];

/* eslint-disable */
let contains = function (list, obj) {
  return list.reduce((prev, cur) => (cur === obj && prev), false)
};

contains._accepts = [Array];

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
// import isArray from './isArray'
// import isDate from './isDate'
// import clone from './clone'

// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source]);

  if (isHash(target) && isHash(source)) {
    for (const key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key], seen.slice());
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return target
}

/*
function _arrayMerge (target, source, seen) {
  forEach(source, (val, i) => {
    if (isArray(val) && !isArray(target[i])) target[i] = val
    else if (target[i] !== undefined) _merge(target[i], val, clone(seen))
    else target.push(val)
  })
}

function _merge (target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  forEach(source, (s, k) => {
    let t = target[k]
    if (t === undefined && isHash(s)) target[k] = _merge({}, s, clone(seen))
    else if (isHash(t) && isHash(s)) target[k] = _merge(t, s, clone(seen))
    else if (isArray(s) && !isArray(t)) target[k] = s
    else if (isArray(s)) forEach(s, (val, i) => _arrayMerge(t, s, seen))
    else if (isDate(s)) target[k] = new Date(s)
    else target[k] = s
  })
  return target
}
*/

let merge = function () {
  let args = [ ...arguments ];

  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}

  let target = args[0];
  let sources = args.slice(1);

  forEach(sources, (source) => {
    if (isHash(source)) mergeDeep(target, source);
  });
  return target
};

merge._accepts = [Object];
merge._dependencies = [
  'dash.isHash',
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
let clone = function (obj, deep = false) {
  if (isArray(obj)) return deep ? map(obj, (o) => clone(o, true)) : obj.slice(0)
  if (isHash(obj)) return deep ? merge({}, obj) : Object.assign({}, obj)
  if (isDate(obj) && deep) return new Date(obj)
  return obj
};

clone._accepts = [Object, Array];
clone._dependencies = [
  'dash.isArray',
  'dash.isHash',
  'dash.isDate',
  'dash.merge',
  'dash.map'
];

/* eslint-disable */
let circular = function (obj, value = '[Circular]') {
  let circularEx = (_obj, key = null, seen = []) => {
    seen.push(_obj);
    if (isObject(_obj)) {
      forEach(_obj, (o, i) => {
        if (contains(seen, o)) _obj[i] = isFunction(value) ? value(_obj, key, clone(seen)) : value;
        else circularEx(o, i, clone(seen));
      });
    }
    return _obj
  };

  if (!obj) throw new Error('circular requires an object to examine')
  return circularEx(obj, value)
};

circular._accepts = [Object, Array];
circular._dependencies = [
  'dash.forEach',
  'dash.isObject',
  'dash.isFunction',
  'dash.contains',
  'dash.clone'
];

/* eslint-disable */
let difference = function () {
  let args = [ ...arguments ];
  if (!args.length) return []

  return args.reduce((prev, cur) => {
    if (!isArray(prev) || !isArray(cur)) return []
    let left = new Set(prev);
    let right = new Set(cur);
    let d = [ ...left ].filter(item => !right.has(item));
    return [ ...d ]
  }, args[0])
};

difference._accepts = [Array];

/* eslint-disable */
let ensureArray = function (obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj]
};

ensureArray._accepts = ['ANY'];

/* eslint-disable */
// taken from lodash - https://github.com/lodash/lodash
let escapeRegExp = function (str) {
  let reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  let reHasRegExpChar = RegExp(reRegExpChar.source);
  str = toString(str);
  return (str && reHasRegExpChar.test(str)) ? str.replace(reRegExpChar, '\\$&') : str
};

escapeRegExp._accepts = [String];

/* eslint-disable */
let filter = function (obj, fn) {
  let newObj = [];
  if (!isArray(obj)) return newObj
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v);
  });
  return newObj
};

filter._accepts = [Array];
filter._dependencies = [
  'dash.isArray',
  'dash.forEach'
];

/* eslint-disable */
let find = function (obj, fn, def) {
  let found = def || null;
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v;
      return false
    }
  });
  return found
};

find._accepts = [Object, Array];

/* eslint-disable */
let toPath = function (pathString) {
  // taken from lodash - https://github.com/lodash/lodash
  let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  let pathArray = [];

  if (isString(pathString)) {
    pathString.replace(pathRx, (match, number, quote, string) => {
      pathArray.push(quote ? string : (number !== undefined) ? Number(number) : match);
      return pathArray[pathArray.length - 1]
    });
  }
  return pathArray
};

toPath._accepts = [String];

/* eslint-disable */
let get = function (obj, path, defaultValue) {
  let value = obj;
  let fields = isArray(path) ? path : toPath(path);
  if (fields.length === 0) return defaultValue

  try {
    for (let f in fields) {
      if (!value[fields[f]]) return defaultValue
      else value = value[fields[f]];
    }
  } catch (err) {
    return defaultValue
  }
  return value
};

get._accepts = [Object, Array];
get._dependencies = [
  'dash.isArray',
  'dash.toPath'
];

/* eslint-disable */
let has = function (obj, path) {
  let found = true;
  let fields = isArray(path) ? path : toPath(path);
  if (!fields.length) return false
  forEach(fields, (field) => {
    if (obj[field] === undefined) {
      found = false;
      return false
    }
    obj = obj[field];
  });
  return found
};

has._accepts = [Object, Array];
has._dependencies = [
  'dash.forEach',
  'dash.isArray',
  'dash.toPath'
];

/* eslint-disable */
let intersection = function () {
  let args = [ ...arguments ];
  if (!args.length) return []

  return args.reduce((prev, cur) => {
    if (!isArray(prev) || !isArray(cur)) return []
    let left = new Set(prev);
    let right = new Set(cur);
    let i = [ ...left ].filter(item => right.has(item));
    return [ ...i ]
  }, args[0])
};

intersection._accepts = [Array];

/* eslint-disable */
let isBoolean = function (obj) {
  return obj === true || obj === false
};

isBoolean._accepts = ['ANY'];

/* eslint-disable */
let isNumber = function (obj) {
  return typeof obj === 'number' && !isNaN(obj)
};

isNumber._accepts = ['ANY'];

/* eslint-disable */
let isPromise = function (obj) {
  return obj && isFunction(obj.then) && isFunction(obj.catch)
};

isPromise._accepts = ['ANY'];

/* eslint-disable */
// ported from https://gist.github.com/tdukart/b87afb278c41245741ae7a0c355a0a0b
let kebabCase = function (string) {
  if (!isString(string)) return ''
  let result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z])/g, function(match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase()
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result
};

kebabCase._accepts = [String];

/* eslint-disable */
let range = function (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
};

range._accepts = [Number];

/* eslint-disable */
let keys = function (obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj)
  } catch (err) {
    return []
  }
};

keys._accepts = [Object, Array];
keys._dependencies = [
  'dash.isArray',
  'dash.range'
];

/* eslint-disable */
let mapValues = function (obj, fn) {
  let newObj = {};
  forEach(obj, (v, k) => {
    newObj[k] = fn(v);
  });
  return newObj
};

mapValues._accepts = [Object, Array];

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
let omitBy = function (obj, fn) {
  let newObj = {};
  if (!isHash(obj)) return newObj
  forEach(obj, (v, k) => {
    if (!fn(v, k)) newObj[k] = v;
  });
  return newObj
};

omitBy._accepts = [Object];
omitBy._dependencies = [
  'dash.isHash',
  'dash.forEach'
];

/* eslint-disable */
let pickBy = function (obj, fn) {
  let newObj = {};
  if (!isHash(obj)) return newObj
  forEach(obj, (v, k) => {
    if (fn(v, k)) newObj[k] = v;
  });
  return newObj
};

pickBy._accepts = [Object];
pickBy._dependencies = [
  'dash.isHash',
  'dash.forEach'
];

/* eslint-disable */
let pretty = function (obj, space = '  ') {
  try {
    return JSON.stringify(obj, null, space)
  } catch (err) {
    console.error(err);
    return ''
  }
};

pretty._accepts = [Object, Array, Date];

/* eslint-disable */
let set = function (obj, path, val) {
  let fields = isArray(path) ? path : toPath(path);

  forEach(fields, (field, idx) => {
    if (idx === fields.length - 1) obj[field] = val;
    else if (!obj[field]) obj[field] = isNumber(field) ? [] : {};
    obj = obj[field];
  });
};

set._accepts = [Object, Array];
set._dependencies = [
  'dash.isArray',
  'dash.isNumber',
  'dash.toPath',
  'dash.forEach'
];

/* eslint-disable */
let stringify = function (obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj)
    else if (has(obj, 'toString')) return obj.toString()
    else return String(obj)
  } catch (err) {}
  return ''
};

stringify._accepts = ['ANY'];
stringify._dependencies = [
  'dash.has',
  'dash.isArray',
  'dash.isHash'
];

/* eslint-disable */
let toLower = function (string) {
  return isString(string) ? string.toLowerCase() : ''
};

toLower._accepts = [String];

/* eslint-disable */
let toUpper = function (string) {
  return isString(string) ? string.toUpperCase() : ''
};

toUpper._accepts = [String];

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
let uniq = function (list) {
  return isArray(list) ? [ ...new Set(list) ] : []
};

uniq._accepts = [Array];

/* eslint-disable */
// taken from hat - https://github.com/substack/node-hat
let uuid = function (bits, base) {
  if (!base) base = 16;
  if (bits === undefined) bits = 128;
  if (bits <= 0) return '0'

  let digits = Math.log(Math.pow(2, bits)) / Math.log(base);
  for (let i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
  }

  let rem = digits - Math.floor(digits);

  let res = '';

  for (let i = 0; i < Math.floor(digits); i++) {
    let x = Math.floor(Math.random() * base).toString(base);
    res = x + res;
  }

  if (rem) {
    let b = Math.pow(base, rem);
    let x = Math.floor(Math.random() * b).toString(base);
    res = x + res;
  }

  let parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return uuid(bits, base)
  }
  else return res
};

uuid._accepts = [];

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
var _dash = {
  capitalize,
  circular,
  clone,
  contains,
  difference,
  ensureArray,
  escapeRegExp,
  filter,
  find,
  forEach,
  get,
  has,
  includes,
  intersection,
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isHash,
  isNumber,
  isObject,
  isPromise,
  isString,
  kebabCase,
  keys,
  map,
  mapValues,
  mapWith,
  merge,
  omitBy,
  pickBy,
  pretty,
  range,
  set,
  stringify,
  toLower,
  toPath,
  toUpper,
  union,
  uniq,
  uuid,
  without
};

/* eslint-disable */
let DashChain = function (obj) {
  this._value = obj;
};

DashChain.prototype.value = function () {
  return this._value
};

let dash = function (obj) {
  return new DashChain(obj)
};

for (const name in _dash) {
  let fn = _dash[name];
  dash[name] = fn;
  if (fn._chainable !== false) {
    DashChain.prototype[name] = function () {
      let args = [this._value].concat([ ...arguments ]);
      this._value = fn.apply(this, args);
      return fn._terminates == true ? this._value : this
    };
  }
}

function mergeClass (c, def = {}) {
  let obj = {};
  c = dash.isString(c) ? c.split(/\s+/) : c;
  if (dash.isArray(c)) {
    dash.forEach(c, (n) => { obj[n] = true; });
  } else if (dash.isObject(c)) {
    obj = c;
  }

  return dash.merge({}, def, obj)
}

function defaultClass (hive, component) {
  let { config } = component;
  let { type, attrs } = config || {};
  let classKeys = dash.keys(mergeClass({}, dash.get(attrs, 'class', {})));
  let btnClassKeys = dash.keys(hive);
  return type
    ? hive[type] || hive.default
    : !dash.intersection(classKeys, btnClassKeys).length
      ? hive.default
      : ''
}

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
  return dash.includes(KEYMAP[key], e.key || e.code || e.keyCode || e.which)
}

function evalEvent (event, vm) {
  if (dash.isFunction(event)) return (e) => event.bind(vm)(e, vm.config, vm.value)
  if (!dash.isObject(event)) return () => false

  let { handler, modifiers } = event;
  handler = dash.isFunction(handler)
    ? handler
    : () => false;

  modifiers = dash.isArray(modifiers)
    ? modifiers
    : [];

  return function (e) {
    let keys = [];
    let modKeys = dash.without(modifiers, 'stop', 'prevent', 'capture', 'self', 'once');
    let config = vm.config;
    let value = vm.value;

    dash.forEach(modifiers, (mod) => {
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
          if (dash.isNumber(mod) && (e.keyCode === mod || e.which === mod)) {
            keys.push(mod);
          }

          // get keymap keys or strings
          if (dash.has(KEYMAP, mod)) {
            if (isKey(e, mod)) {
              keys.push(mod);
            }
          } else if (dash.isString(mod) && (e.key === mod || e.code === mod)) {
            keys.push(mod);
          }
          break
      }
    });

    // check that the correct key combo was entered
    if (modKeys.length && dash.intersection(modKeys, keys).length !== modKeys.length) return false

    // call the original handler with hte
    handler.apply(vm, [e, config, value]);
  }
}

function evalProp (types, value, vm, config, data, defaultValue) {
  for (let type of types) {
    switch (type) {
      case Function:
        if (dash.isFunction(value)) return value(vm, config, data)
        break
      case Boolean:
        if (dash.isBoolean(value)) return value
        break
      case String:
        if (dash.isString(value)) return value
        break
      case Date:
        if (dash.isDate(value)) return value
        break
      case Number:
        if (dash.isNumber(value)) return value
        break
      default:
        break
    }
  }
  return defaultValue
}

function eventHandler (name, event) {
  let handler = dash.get(this.config, `on.${name}`);
  return handler
    ? evalEvent(handler, this)(event)
    : null
}

function extendMethods (methods) {
  return dash.merge({}, methods, {
    eventHandler,
    getAttr (name) {
      return evalProp(
        [Function, String, Boolean, Number],
        this.config.attrs[name],
        this,
        this.config,
        this.value,
        null
      )
    },
    getData (name) {
      return evalProp(
        [Function, String, Boolean, Number],
        this.config.data[name],
        this,
        this.config,
        this.value,
        null
      )
    },
    hasAttr (name) {
      return dash.has(this, `config.attrs.${name}`)
    },
    hasData (name) {
      return dash.has(this, `config.data.${name}`)
    },
    hasEvent (name) {
      return dash.has(this, `config.on.${name}`)
    },
    kebab (name) {
      return dash.kebabCase(name)
    }
  })
}

/**
 * extracts attributes, data, and events from the config and creates
 * an object that can be used to create a template with those bindings
 */
function extractBindings (component, types = {}) {
  let { type, config } = component;
  let { attrs, data, on } = config || {};

  if (type) {
    types[type] = types[type] || { attrs: ['class'], data: [], on: [] };
    if (attrs) types[type].attrs = dash.union(types[type].attrs, dash.keys(attrs));
    if (data) types[type].data = dash.union(types[type].data, dash.keys(data));
    if (on) types[type].on = dash.union(types[type].on, dash.keys(on));
  }

  if (dash.isArray(dash.get(component, 'components'))) {
    dash.forEach(component.components, (c) => {
      extractBindings(c, types);
    });
  }
  if (dash.isArray(dash.get(component, 'rows'))) {
    dash.forEach(component.rows, (row) => {
      if (dash.isArray(dash.get(row, 'columns'))) {
        dash.forEach(row.columns, (col) => {
          if (col.config) extractBindings(col.config, types);
        });
      }
    });
  }
  return types
}

function makeTemplateBindings (binding) {
  let { attrs, data, on } = binding;
  let bindings = [];

  dash.forEach(attrs, (attr) => {
    bindings.push(`:${attr}="hasAttr('${attr}') ? getAttr('${attr}') : null"`);
  });

  dash.forEach(data, (datum) => {
    bindings.push(`:data-${datum}="hasData('${datum}') ? getData('${datum}') : null"`);
  });

  dash.forEach(on, (evt) => {
    bindings.push(`v-on:${evt}="hasEvent('${evt}') ? eventHandler('${evt}', $event) : null"`);
  });

  return bindings.join(' ')
}

/* eslint-disable */
let isArray$2 = function (obj) {
  return Array.isArray(obj)
};

isArray$2._accepts = ['ANY'];

/* eslint-disable */
let forEach$2 = function (obj, fn) {
  try {
    if (isArray$2(obj)) {
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

forEach$2._accepts = [Object, Array];

/* eslint-disable */
let addClass = function (className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/);
  this.each(function (i, el) {
    forEach$2(classList, (clazz) => el.classList.add(clazz));
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
let isString$2 = function (obj) {
  return typeof obj === 'string'
};

isString$2._accepts = ['ANY'];

/* eslint-disable */
let isObject$2 = function (obj) {
  return typeof obj === 'object' && obj !== null
};

isObject$2._accepts = ['ANY'];

/* eslint-disable */
let rx = /^data-(.+)/;

function getAttrs (node) {
  let obj = {};

  forEach$2(node.attributes, (attr) => {
    let { name, nodeName, localName, value, nodeValue, textContent } = attr;
    name = name || nodeName || localName;
    value = value || nodeValue || textContent;

    if (isString$2(name) && name.match(rx)) {
      obj[name.replace(rx, '$1')] = value;
    }
  });
  return obj
}

function hasAttr (node, attrName) {
  let has = false;
  if (!node || !node.attributes) return has
  forEach$2(node.attributes, () => {
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
    if (isString$2(key)) {
      return getAttrs(node)[key]
    } else if (isObject$2(key)) {
      return forEach$2(key, (v, k) => {
        setAttr(node, k, v);
      })
    }
  }

  // set a key/value
  setAttr(node, key, val);
};

/* eslint-disable */
let each = function (fn) {
  forEach$2(this.slice(0, this.length), (v, k) => fn.bind(v)(k, v));
};

each._baseutil = true;

/* eslint-disable */
let mapWith$2 = function (obj, fn) {
  let newObj = [];
  forEach$2(obj, (v, k) => {
    let value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj
};

mapWith$2._accepts = [Object, Array];

/* eslint-disable */
let mapNodes = function (element, selector) {
  return mapWith$2(element.querySelectorAll(selector), (v) => isObject$2(v) ? v : undefined)
};

mapNodes._chainable = false;
mapNodes._dependencies = [
  'dash.mapWith',
  'dash.isObject'
];

/* eslint-disable */
let union$2 = function () {
  let args = [ ...arguments ];
  if (!args.length) return []

  try {
    let u = args.reduce((prev, cur) => {
      if (!isArray$2(prev) || !isArray$2(cur)) return []
      return prev.concat(cur)
    }, []);

    return [ ...new Set(u) ]
  } catch (err) {
    console.error(err);
    return []
  }
};

union$2._accepts = ['ANY'];

/* eslint-disable */
let find$2 = function (selector) {
  let results = [];
  this.each(function () {
    results = union$2(results, mapNodes(this, selector));
  });
  return this.init(results, this)
};

find$2._terminates = true;
find$2._dependencies = [
  'query.mapNodes',
  'query.each',
  'dash.union'
];

/* eslint-disable */
let isFunction$2 = function (obj) {
  return typeof obj === 'function'
};

isFunction$2._accepts = ['ANY'];

/* eslint-disable */
let isDate$2 = function (obj) {
  return obj instanceof Date
};

isDate$2._accepts = ['ANY'];

/* eslint-disable */
let isHash$2 = function (obj) {
  return isObject$2(obj) && !isArray$2(obj) && !isDate$2(obj)
};

isHash$2._accepts = ['ANY'];
isHash$2._dependencies = [
  'dash.isArray',
  'dash.isDate',
  'dash.isObject'
];

/* eslint-disable */
let includes$2 = function (obj, key) {
  return isArray$2(obj) && obj.indexOf(key) !== -1
};

includes$2._accepts = [Array];

/* eslint-disable */
let without$2 = function () {
  let output = [];
  let args = [ ...arguments ];
  if (args.length < 2) return args.length ? args[0] : []
  let search = args.slice(1);

  forEach$2(args[0], function (val) {
    if (!includes$2(search, val)) output.push(val);
  });
  return output
};

without$2._accepts = [Array];
without$2._dependencies = [
  'dash.forEach',
  'dash.includes'
];

/* eslint-disable */
let map$2 = function (obj, fn) {
  let output = [];
  forEach$2(obj, (v, k) => output.push(fn(v, k)));
  return output
};

map$2._accepts = [Object, Array];

/* eslint-disable */
function removeEvent (store, el, event, handler, uuid) {
  let toRemove = [];
  let [ evt, ns ] = event.split(/\.(.+)?/);
  forEach$2(store.active, (e) => {
    let isElement = e.el === el;
    let isNS = e.ns === ns || !e.ns && !ns;
    let isEvent = e.event === event && isNS;
    let isHandler = e.handler === handler;
    let foundUUID = uuid === e.uuid;
    let foundEvent = isElement && (!event || (isEvent && (isHandler || !handler)));
    if (foundUUID || foundEvent) {
      toRemove.push(e);
      if (isFunction$2(e.off)) e.off();
    }
  });
  store.active = without$2.apply(this, [store.active].concat(toRemove));
}

let off = function (events, selector, handler) {
  let queue = [];

  if (isFunction$2(selector) && !handler) {
    handler = selector;
    selector = undefined;
  }

  let base = selector ? this.find(selector) : this;

  if (isString$2(events)) {
    queue = map$2(events.split(/\s+/g), (event) => {
      return { event, handler }
    });
  } else if (events instanceof this.$root.Event) {
    queue = [ { uuid: events.handlerId } ];
  } else if (isHash$2(events)) {
    forEach$2(events, (h, e) => {
      queue = union$2(queue, map$2(e.split(/\s+/g), (event) => {
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
    forEach$2(queue, (q) => removeEvent(base.$root.event, this, q.event, q.handler, q.uuid));
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
  if (!isString$2(selector)) {
    fn = data;
    data = selector;
    selector = undefined;
  }
  if (!isFunction$2(fn) && isFunction$2(data)) {
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

    forEach$2(events.split(/\s+/g), (event) => {
      let [ evt, ns ] = event.split(/\.(.+)?/);
      event = evt;
      let off = offHandler(el, `${prefix}${evt}`, handler);
      base.$root.event.active.push({ el, event, ns, handler, off, uuid });
    });
  });
}

let onEvent = function (one, events, selector, data, fn) {
  if (isHash$2(events)) forEach$2(events, (h, e) => addEvents.call(this, one, e, selector, data, h));
  else if (isString$2(events)) addEvents.call(this, one, events, selector, data, fn);
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
  find: find$2,
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
  forEach$2(nodes, (node, idx) => {
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
    forEach$2(event, (v, k) => {
      if (!k.match(/^[A-Z_]*$/)) this[k] = v;
    });
    this.originalEvent = event;
    this.handlerId = uuid;
    if (data$$1) this.data = data$$1;
  }
};

forEach$2(_query, (fn, name) => {
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

const BTN_CLASS = {
  [BOOTSTRAP]: {
    default: 'btn-default',
    primary: 'btn-primary',
    success: 'btn-success',
    info: 'btn-info',
    warning: 'btn-warning',
    danger: 'btn-danger',
    link: 'btn-link'
  },
  [MATERIALIZE]: {
    default: 'teal',
    primary: 'blue',
    success: 'green',
    info: 'cyan',
    warning: 'amber',
    danger: 'red',
    link: 'btn-flat'
  },
  [SEMANTICUI]: {
    default: 'basic',
    primary: 'primary',
    success: 'positive',
    info: 'teal',
    warning: 'orange',
    danger: 'negative',
    link: 'basic'
  }
};

function Button (binding, framework, component) {
  let template = '';
  let btnClass = defaultClass(BTN_CLASS[framework], component);

  switch (framework) {
    case BOOTSTRAP:
      template = `
<button type="button" class="btn ${btnClass}" ${makeTemplateBindings(binding)}>
  <span v-if='config.iconClassLeft' :class="config.iconClassLeft"></span>
  <span v-if="config.text" v-text="config.text"></span>
  <span v-if='config.iconClassRight' :class="config.iconClassRight"></span>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`;
      break

    case MATERIALIZE:
      template = `
<button type="button" class="btn ${btnClass}" ${makeTemplateBindings(binding)}>
  <i v-if='config.iconClassLeft' class="material-icons left" :class="config.iconClassLeft"></i>
  <span v-if="config.text" v-text="config.text"></span>
  <i v-if='config.iconClassRight' class="material-icons right" :class="config.iconClassRight"></i>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`;
      break

    case SEMANTICUI:
      template = `
<button type="button" class="ui button ${btnClass}" ${makeTemplateBindings(binding)}>
  <i v-if='config.iconClassLeft' class="icon" :class="config.iconClassLeft"></i>
  <span v-if="config.text" v-text="config.text"></span>
  <i v-if='config.iconClassRight' class="icon" :class="config.iconClassRight"></i>
  <div v-if="config.html" v-html="config.html"></div>
</button>
`;
      break

    default:
      break
  }
  return {
    template,
    name: 'formation-button',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return dash.includes(FRAMEWORKS, value)
        }
      }
    },
    methods: extendMethods({}),
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework);
    }
  }
}

function Container (binding, framework) {
  let template = `<div class="container" ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config"
    :components='c.components'
    :bindings="bindings"
    :framework="framework"
    :value.sync="value"></component>
</div>`;

  return {
    template,
    name: 'formation-container',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return dash.includes(FRAMEWORKS, value)
        }
      }
    },
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework);
    },
    methods: extendMethods({})
  }
}

function Div (binding, framework) {
  let template = `<div ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config"
    :components='c.components'
    :bindings="bindings"
    :framework="framework"
    :value.sync="value"></component>
</div>`;

  return {
    template,
    name: 'formation-div',
    props: {
      value: { type: Object },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return {} } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return dash.includes(FRAMEWORKS, value)
        }
      }
    },
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework);
    },
    methods: extendMethods({})
  }
}

function TextInput (binding, framework) {
  let template = '';

  switch (framework) {
    case BOOTSTRAP:
      template = `
<input type="text" class="form-control" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
`;
      break

    case MATERIALIZE:
      template = `
<input type="text" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
`;
      break

    case SEMANTICUI:
      template = `
<div class="ui input">
  <input type="text" v-model="value[config.model]" ${makeTemplateBindings(binding)}>
</div>
`;
      break

    default:
      break
  }

  // return the vue.js component
  return {
    template,
    name: 'formation-text-input',
    props: {
      value: {
        type: Object,
        required: true,
        twoWay: VueMultiVersion.select(true, undefined)
      },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } },
      bindings: { type: Object, default () { return {} } },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator (value) {
          return dash.includes(FRAMEWORKS, value)
        }
      }
    },
    methods: extendMethods({}),
    created () {
      this.$registerFormationComponents(this, this.components, this.bindings, this.framework);
    }
  }
}

var registerFormationComponents = function (Vue$$1) {
  return function registerFormationComponents (vm, components, bindings, framework) {
    dash.forEach(components, (component) => {
      let { type } = component;
      let binding = dash.get(bindings, type);
      if (binding) {
        switch (type) {
          case 'button':
            vm.$options.components['formation-button'] = Vue$$1.extend(Button(bindings['button'], framework, component));
            break
          case 'container':
            vm.$options.components['formation-container'] = Vue$$1.extend(Container(bindings['container'], framework, component));
            break
          case 'div':
            vm.$options.components['formation-div'] = Vue$$1.extend(Div(bindings['div'], framework, component));
            break
          case 'text-input':
            vm.$options.components['formation-text-input'] = Vue$$1.extend(TextInput(bindings['text-input'], framework, component));
            break
          default:
            break
        }
      }
    });
  }
};

function vueSet (obj, path, val) {
  let value = obj;
  let fields = dash.isArray(path) ? path : dash.toPath(path);
  for (let f in fields) {
    let idx = Number(f);
    let p = fields[idx];
    if (idx === fields.length - 1) Vue.set(value, p, val);
    else if (!value[p]) Vue.set(value, p, dash.isNumber(p) ? [] : {});
    value = value[p];
  }
}

var formation = {
  install (Vue$$1) {
    // create a new multi version instance
    let multi = VueMultiVersion(Vue$$1);
    let registerFormationComponents$$1 = registerFormationComponents(Vue$$1);

    // register global formation register function
    Vue$$1.prototype.$registerFormationComponents = registerFormationComponents$$1;

    // register the formation component
    Vue$$1.component('formation', {
      name: 'formation',
      template: `
<div class="formation">
  <component v-for="c in _config.components"
    :is="'formation-' + c.type"
    :config="c.config"
    :components='c.components'
    :bindings="_bindings"
    :framework="framework"
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
            return dash.includes(FRAMEWORKS, value)
          }
        }
      },
      created () {
        this.syncModelProps();
        registerFormationComponents$$1(this, this._config.components, this._bindings, this.framework);
      },
      computed: {
        _bindings () {
          return extractBindings(this._config)
        },
        _config () {
          return this.config
        }
      },
      methods: {
        findModels (obj, models = []) {
          if (dash.has(obj, 'config.model')) models.push(obj.config.model);
          if (dash.isArray(dash.get(obj, 'components'))) {
            dash.forEach(obj.components, (c) => {
              this.findModels(c, models);
            });
          }
          if (dash.isArray(dash.get(obj, 'rows'))) {
            dash.forEach(obj.rows, (row) => {
              if (dash.isArray(dash.get(row, 'columns'))) {
                dash.forEach(row.columns, (col) => {
                  if (col.model) models.push(col.model);
                });
              }
            });
          }
          return models
        },
        syncModelProps () {
          dash.forEach(dash.uniq(this.findModels(this._config)), (model) => {
            if (!this.modelData.hasOwnProperty(model)) {
              Object.defineProperty(this.modelData, model, {
                configurable: true,
                enumerable: true,
                get: () => dash.get(this.value, model),
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
