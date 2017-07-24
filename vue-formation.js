(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VueFormation = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault$1((window.Vue));

/* eslint-disable */
function isArray(obj) {
  return Array.isArray(obj);
}

isArray._accepts = ['ANY'];

/* eslint-disable */
function forEach(obj, fn) {
  try {
    if (isArray(obj)) {
      var idx = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var val = _step.value;

          if (fn(val, idx) === false) break;
          idx++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      for (var key in obj) {
        if (fn(obj[key], key) === false) break;
      }
    }
  } catch (err) {
    return;
  }
}

forEach._accepts = [Object, Array];

/* eslint-disable */
function isString(obj) {
  return typeof obj === 'string';
}

isString._accepts = ['ANY'];

/* eslint-disable */
function toPath(pathString) {
  // taken from lodash - https://github.com/lodash/lodash
  var pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  var pathArray = [];

  if (isString(pathString)) {
    pathString.replace(pathRx, function (match, number, quote, string) {
      pathArray.push(quote ? string : number !== undefined ? Number(number) : match);
      return pathArray[pathArray.length - 1];
    });
  }
  return pathArray;
}

toPath._accepts = [String];

/* eslint-disable */
function get(obj, path, defaultValue) {
  var value = obj;
  var fields = isArray(path) ? path : toPath(path);
  if (fields.length === 0) return defaultValue;

  try {
    for (var f in fields) {
      if (!value[fields[f]]) return defaultValue;else value = value[fields[f]];
    }
  } catch (err) {
    return defaultValue;
  }
  return value;
}

get._accepts = [Object, Array];
get._dependencies = ['dash.isArray', 'dash.toPath'];

/* eslint-disable */
function has(obj, path) {
  var found = true;
  var fields = isArray(path) ? path : toPath(path);
  if (!fields.length) return false;
  forEach(fields, function (field) {
    if (obj[field] === undefined) {
      found = false;
      return false;
    }
    obj = obj[field];
  });
  return found;
}

has._accepts = [Object, Array];
has._dependencies = ['dash.forEach', 'dash.isArray', 'dash.toPath'];

/* eslint-disable */
function includes(obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1;
}

includes._accepts = [Array];

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint-disable */
function intersection() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  return args.reduce(function (prev, cur) {
    if (!isArray(prev) || !isArray(cur)) return [];
    var left = new Set(prev);
    var right = new Set(cur);
    var i = [].concat(toConsumableArray(left)).filter(function (item) {
      return right.has(item);
    });
    return [].concat(toConsumableArray(i));
  }, args[0]);
}

intersection._accepts = [Array];

/* eslint-disable */
function isBoolean(obj) {
  return obj === true || obj === false;
}

isBoolean._accepts = ['ANY'];

/* eslint-disable */
function isFunction(obj) {
  return typeof obj === 'function';
}

isFunction._accepts = ['ANY'];

/* eslint-disable */
function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj);
}

isNumber._accepts = ['ANY'];

/* eslint-disable */
function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

isObject._accepts = ['ANY'];

/* eslint-disable */
// ported from https://gist.github.com/tdukart/b87afb278c41245741ae7a0c355a0a0b
function kebabCase(string) {
  if (!isString(string)) return '';
  var result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z])/g, function (match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result;
}

kebabCase._accepts = [String];

/* eslint-disable */
/*
function range (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
}
*/

function range(start, end, step) {
  if (end === undefined && step === undefined) {
    end = start;
    start = 0;
    step = 1;
  } else if (step === undefined) {
    step = 1;
  }

  // non numbers return empty array
  if (!isNumber(start) || !isNumber(end) || !isNumber(step) || !step) return [];
  if (start === end) return [start];

  var count = start;
  var _range = [];

  if (start < end) {
    while (count < end) {
      _range.push(count);
      count += Math.abs(step);
    }
  } else {
    while (count > end) {
      _range.push(count);
      count -= Math.abs(step);
    }
  }

  return _range;
}

range._accepts = [Number];

/* eslint-disable */
function keys(obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj);
  } catch (err) {
    return [];
  }
}

keys._accepts = [Object, Array];
keys._dependencies = ['dash.isArray', 'dash.range'];

/* eslint-disable */
function map(obj, fn) {
  var output = [];
  forEach(obj, function (v, k) {
    return output.push(fn(v, k));
  });
  return output;
}

map._accepts = [Object, Array];

/* eslint-disable */
function isDate(obj) {
  return obj instanceof Date;
}

isDate._accepts = ['ANY'];

/* eslint-disable */
function isHash(obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj);
}

isHash._accepts = ['ANY'];
isHash._dependencies = ['dash.isArray', 'dash.isDate', 'dash.isObject'];

/* eslint-disable */
// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source) {
  var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (includes(seen, target) || includes(seen, source)) return target;
  seen = seen.concat([target, source]);

  if (isHash(target) && isHash(source)) {
    for (var key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, defineProperty({}, key, {}));
        mergeDeep(target[key], source[key], seen.slice());
      } else {
        Object.assign(target, defineProperty({}, key, source[key]));
      }
    }
  }
  return target;
}

function merge() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length === 0) return {};else if (args.length === 1) return args[0];else if (!isHash(args[0])) return {};

  var target = args[0];
  var sources = args.slice(1);

  forEach(sources, function (source) {
    if (isHash(source)) mergeDeep(target, source);
  });
  return target;
}

merge._accepts = [Object];
merge._dependencies = ['dash.isHash', 'dash.forEach', 'dash.includes'];

/* eslint-disable */
function identity(value) {
  return value;
}

identity._accepts = ['ANY'];

/* eslint-disable */
function reduce(collection, iteratee, accumulator) {
  if (!isObject(collection) && !isArray(collection)) return undefined;
  if (!isFunction(iteratee)) {
    accumulator = iteratee;
    iteratee = identity;
  }

  accumulator = accumulator !== undefined ? accumulator : isArray(collection) ? collection.length ? collection[0] : undefined : keys(collection).length ? collection[keys(collection)[0]] : undefined;

  forEach(collection, function (value, key) {
    accumulator = iteratee(accumulator, value, key, collection);
  });

  return accumulator;
}

reduce._accepts = [Object, Array];
reduce._dependencies = ['dash.forEach', 'dash.isObject', 'dash.isArray', 'dash.isFunction', 'dash.identity', 'dash.keys'];

/* eslint-disable */
function set$1(obj, path, val) {
  var fields = isArray(path) ? path : toPath(path);

  forEach(fields, function (field, idx) {
    if (idx === fields.length - 1) obj[field] = val;else if (!obj[field]) obj[field] = isNumber(field) ? [] : {};
    obj = obj[field];
  });
}

set$1._accepts = [Object, Array];
set$1._dependencies = ['dash.isArray', 'dash.isNumber', 'dash.toPath', 'dash.forEach'];

/* eslint-disable */
function sum(array) {
  if (!Array.isArray(array) || !array.length) return 0;
  return array.reduce(function (total, val) {
    return total += val;
  });
}

sum._accepts = [Array];

/* eslint-disable */
function union() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  try {
    var u = args.reduce(function (prev, cur) {
      if (!isArray(prev) || !isArray(cur)) return [];
      return prev.concat(cur);
    }, []);

    return [].concat(toConsumableArray(new Set(u)));
  } catch (err) {
    console.error(err);
    return [];
  }
}

union._accepts = ['ANY'];

/* eslint-disable */
function uniq(list) {
  return isArray(list) ? [].concat(toConsumableArray(new Set(list))) : [];
}

uniq._accepts = [Array];

/* eslint-disable */
function without() {
  var output = [];
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (args.length < 2) return args.length ? args[0] : [];
  var search = args.slice(1);

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val);
  });
  return output;
}

without._accepts = [Array];
without._dependencies = ['dash.forEach', 'dash.includes'];

/* eslint-disable */
var _ = {
  forEach: forEach,
  get: get,
  has: has,
  includes: includes,
  intersection: intersection,
  isArray: isArray,
  isBoolean: isBoolean,
  isFunction: isFunction,
  isNumber: isNumber,
  isObject: isObject,
  isString: isString,
  kebabCase: kebabCase,
  keys: keys,
  map: map,
  merge: merge,
  reduce: reduce,
  set: set$1,
  sum: sum,
  toPath: toPath,
  union: union,
  uniq: uniq,
  without: without,
  range: range,
  isHash: isHash,
  identity: identity,
  isDate: isDate
};

var dash = Object.freeze({
	forEach: forEach,
	get: get,
	has: has,
	includes: includes,
	intersection: intersection,
	isArray: isArray,
	isBoolean: isBoolean,
	isFunction: isFunction,
	isNumber: isNumber,
	isObject: isObject,
	isString: isString,
	kebabCase: kebabCase,
	keys: keys,
	map: map,
	merge: merge,
	reduce: reduce,
	set: set$1,
	sum: sum,
	toPath: toPath,
	union: union,
	uniq: uniq,
	without: without,
	range: range,
	isHash: isHash,
	identity: identity,
	isDate: isDate,
	default: _
});

var INCREMENT = 0.01;

function calcTimeout(from, to, duration) {
  return Math.ceil(duration / (Math.abs(to - from) / INCREMENT));
}

function fadeIn(el, options) {
  el.style.opacity = 0;
  options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
  var toOpacity = options.toOpacity || 1;
  var ms = calcTimeout(0, toOpacity, options.duration || 200);

  var linear = function linear() {
    el.style.display = 'block';
    el.style.opacity = +el.style.opacity + INCREMENT;

    if (+el.style.opacity < toOpacity) {
      setTimeout(linear, ms);
    }
  };
  linear();
}

function fadeOut(el, options) {
  options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
  var ms = calcTimeout(+el.style.opacity, 0, options.duration || 200);
  var linear = function linear() {
    el.style.opacity = +el.style.opacity - INCREMENT;

    if (+el.style.opacity > 0) {
      setTimeout(linear, ms);
    } else {
      el.style.display = 'none';
    }
  };
  linear();
}

var animations = {
  fadeIn: fadeIn,
  fadeOut: fadeOut
};

function Backdrop$1(Vue$$1, version, vm) {
  var BackdropComponent = Vue$$1.extend({
    template: '<div>\n      ' + (version === 1 ? '' : '<transition name="formation-backdrop-fade">') + '\n      <div id="formation-backdrop" :style="style" v-show="show" transition="formation-backdrop-fade-vue1x"></div>\n      ' + (version === 1 ? '' : '</transition>') + '\n    </div>',
    created: function created() {
      var _this = this;

      this.$root = vm.$root;
      this.$root.$on('backdrop.show', function (requestedBy) {
        if (!_this.requestedBy && !_this.show) {
          _this.requestedBy = requestedBy;
          _this.show = true;
        }
      });
      this.$root.$on('backdrop.hide', function (requestedBy) {
        if (!_this.requestedBy || _this.requestedBy === requestedBy) {
          _this.show = false;
          _this.requestedBy = null;
        }
      });
      this.$root.$on('backdrop.hide.force', function (requestedBy) {
        _this.show = false;
        _this.requestedBy = null;
      });
    },
    data: function data() {
      return {
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 'auto',
          height: 'auto'
        },
        show: false,
        requestedBy: null
      };
    }
  });

  return {
    create: function create() {
      return new BackdropComponent();
    }
  };
}

function columnWidths(columns) {
  var COL_LIMIT = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  var filledFirst = false;
  var unset = 0;
  var runningCount = 0;
  var widths = map(columns, function (col, idx) {
    var remaining = columns.length - (idx + 1);
    if (isNumber(col.colspan)) {
      var currentWidth = col.colspan + runningCount + remaining > COL_LIMIT ? 1 : col.colspan;
      runningCount += currentWidth;
      return currentWidth;
    }
    unset++;
    return 0;
  });

  if (unset) {
    var sum$$1 = sum(widths);
    var defWidth = Math.floor((COL_LIMIT - sum$$1) / unset);
    var firstWidth = defWidth + COL_LIMIT % unset;
    forEach(widths, function (width, i) {
      if (!width) {
        if (!filledFirst) {
          widths[i] = firstWidth;
        } else {
          widths[i] = defWidth;
        }
      }
    });
  }
  return widths;
}

function compileTemplate(info, frameworks, framework, widgetName, interpolations) {
  var template = get(frameworks, '["' + framework + '"].components["' + widgetName + '"].template');
  if (!template) {
    template = '<div></div>';
    console.error('[vue-formation]: unable to find component "' + widgetName + '" in current ' + framework + ' framework');
  }

  // if template is a function call it and pass the version
  template = isFunction(template) ? template(info) : template;

  forEach(interpolations, function (_ref) {
    var tag = _ref.tag,
        value = _ref.value;

    template = template.replace(tag, value);
  });
  return template;
}

var BOOTSTRAP = 'bootstrap';
var MATERIALIZE = 'materialize';
var SEMANTICUI = 'semanticui';
var TAG_BINDINGS = '$$bindings$$';
var TAG_MODEL = '$$model$$';
var TAG_COMPONENTS = '$$components$$';
var TAG_DEFAULT_CLASS = '$$default_class$$';
var TAG_HEAD_COMPONENTS = '$$head_components$$';
var TAG_FOOT_COMPONENTS = '$$foot_components$$';

var FRAMEWORKS = [BOOTSTRAP, MATERIALIZE, SEMANTICUI];

var constants = {
  BOOTSTRAP: BOOTSTRAP,
  MATERIALIZE: MATERIALIZE,
  SEMANTICUI: SEMANTICUI,
  FRAMEWORKS: FRAMEWORKS,
  TAG_BINDINGS: TAG_BINDINGS,
  TAG_MODEL: TAG_MODEL,
  TAG_COMPONENTS: TAG_COMPONENTS,
  TAG_DEFAULT_CLASS: TAG_DEFAULT_CLASS,
  TAG_HEAD_COMPONENTS: TAG_HEAD_COMPONENTS,
  TAG_FOOT_COMPONENTS: TAG_FOOT_COMPONENTS
};

/* eslint-disable */
function dbg() {
  return console.log.apply(console, [].concat(Array.prototype.slice.call(arguments)));
}

function mergeClass(c) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var obj = {};
  c = isString(c) ? c.split(/\s+/) : c;
  if (isArray(c)) {
    forEach(c, function (n) {
      obj[n] = true;
    });
  } else if (isObject(c)) {
    obj = c;
  }

  return merge({}, def, obj);
}

function defaultClass(hive, component) {
  var config = component.config;

  var _ref = config || {},
      type = _ref.type,
      attrs = _ref.attrs;

  var classKeys = keys(mergeClass({}, get(attrs, 'class', {})));
  var btnClassKeys = keys(hive);
  return type ? hive[type] || hive.default : !intersection(classKeys, btnClassKeys).length ? hive.default : '';
}

function ensureConfig(config) {
  if (!isObject(config)) return { attrs: {}, data: {}, on: {} };
  if (!isObject(config.attrs)) config.attrs = {};
  if (!isObject(config.data)) config.data = {};
  if (!isObject(config.on)) config.on = {};
  return config;
}

var KEYMAP = {
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

function isKey(e, key) {
  return includes(KEYMAP[key], e.key || e.code || e.keyCode || e.which);
}

function evalEvent(event, vm) {
  if (isFunction(event)) return function (e) {
    return event.bind(vm)(e, vm.config, vm.value);
  };
  if (!isObject(event)) return function () {
    return false;
  };

  var handler = event.handler,
      modifiers = event.modifiers;

  handler = isFunction(handler) ? handler : function () {
    return false;
  };

  modifiers = isArray(modifiers) ? modifiers : [];

  return function (e) {
    var keys$$1 = [];
    var modKeys = without(modifiers, 'stop', 'prevent', 'capture', 'self', 'once');
    var config = vm.config;
    var value = vm.value;

    forEach(modifiers, function (mod) {
      switch (mod) {
        case 'stop':
          e.stopPropagation();
          break;
        case 'prevent':
          e.preventDefault();
          break;
        case 'self':
          if (e.target !== vm.$el) return false;
          break;
        default:
          // get combo modifier keys
          if (mod === 'ctrl' && (isKey(e, mod) || e.ctrlKey)) {
            keys$$1.push(mod);
          }
          if (mod === 'alt' && (isKey(e, mod) || e.altKey)) {
            keys$$1.push(mod);
          }
          if (mod === 'shift' && (isKey(e, mod) || e.shiftKey)) {
            keys$$1.push(mod);
          }
          if (mod === 'meta' && (isKey(e, mod) || e.metaKey)) {
            keys$$1.push(mod);
          }

          // get keycode number keys
          if (isNumber(mod) && (e.keyCode === mod || e.which === mod)) {
            keys$$1.push(mod);
          }

          // get keymap keys or strings
          if (has(KEYMAP, mod)) {
            if (isKey(e, mod)) {
              keys$$1.push(mod);
            }
          } else if (isString(mod) && (e.key === mod || e.code === mod)) {
            keys$$1.push(mod);
          }
          break;
      }
    });

    // check that the correct key combo was entered
    if (modKeys.length && intersection(modKeys, keys$$1).length !== modKeys.length) return false;

    // call the original handler with hte
    handler.apply(vm, [e, config, value]);
  };
}

function evalProp(types, value, vm, config, data, defaultValue) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var type = _step.value;

      switch (type) {
        case Function:
          if (isFunction(value)) return value(vm, config, data);
          break;
        case Boolean:
          if (isBoolean(value)) return value;
          break;
        case String:
          if (isString(value)) return value;
          break;
        case Date:
          if (isDate(value)) return value;
          break;
        case Number:
          if (isNumber(value)) return value;
          break;
        case Object:
          if (isObject(value)) return JSON.stringify(value);
          break;
        default:
          break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return defaultValue;
}

function eventHandler(name, event) {
  var handler = get(this.config, 'on.' + name);
  return handler ? evalEvent(handler, this)(event) : null;
}

function extendMethods() {
  var methods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return merge({}, methods, {
    eventHandler: eventHandler,
    getAttr: function getAttr(name) {
      return evalProp([Function, String, Boolean, Number, Object], this.config.attrs[name], this, this.config, this.value, null);
    },
    getData: function getData(name) {
      return evalProp([Function, String, Boolean, Number, Object], this.config.data[name], this, this.config, this.value, null);
    },
    hasPath: function hasPath(obj, path) {
      return has(obj, path);
    },
    hasAttr: function hasAttr(name) {
      return has(this, 'config.attrs.' + name);
    },
    hasData: function hasData(name) {
      return has(this, 'config.data.' + name);
    },
    hasEvent: function hasEvent(name) {
      return has(this, 'config.on.' + name);
    },
    kebab: function kebab(name) {
      return kebabCase(name);
    },
    isString: function isString$$1(val) {
      return isString(val);
    }
  });
}

function extendProps(version) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var model = version === 1 ? {
    value: {
      type: Object,
      required: true,
      twoWay: true
    }
  } : {
    value: {
      type: Object,
      required: true
    }
  };

  return merge({}, props, model, {
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    components: {
      type: Array
    },
    bindings: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    version: {
      type: Number,
      default: version
    },
    register: {
      type: Function
    },
    eventHub: {
      type: Object
    },
    localHub: {
      type: Object
    },
    framework: {
      type: String
    },
    frameworks: {
      type: Object
    }
  });
}

/**
 * extracts attributes, data, and events from the config and creates
 * an object that can be used to create a template with those bindings
 */
function extractBindings$1(component) {
  var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = component.type,
      config = component.config;

  var _ref = config || {},
      attrs = _ref.attrs,
      data = _ref.data,
      on = _ref.on;

  if (type) {
    types[type] = types[type] || { attrs: ['class'], data: [], on: [] };
    if (attrs) types[type].attrs = union(types[type].attrs, keys(attrs));
    if (data) types[type].data = union(types[type].data, keys(data));
    if (on) types[type].on = union(types[type].on, keys(on));
  }

  if (isArray(get(component, 'components'))) {
    forEach(component.components, function (c) {
      extractBindings$1(c, types);
    });
  }
  if (isArray(get(component, 'rows'))) {
    forEach(component.rows, function (row) {
      if (isArray(get(row, 'columns'))) {
        forEach(row.columns, function (col) {
          if (col.config) extractBindings$1(col.config, types);
        });
      }
    });
  }
  return types;
}

function makeTemplateBindings(binding) {
  var attrs = binding.attrs,
      data = binding.data,
      on = binding.on;

  var bindings = [];

  forEach(attrs, function (attr) {
    bindings.push(':' + attr + '="hasAttr(\'' + attr + '\') ? getAttr(\'' + attr + '\') : null"');
  });

  forEach(data, function (datum) {
    bindings.push(':data-' + datum + '="hasData(\'' + datum + '\') ? getData(\'' + datum + '\') : null"');
  });

  forEach(on, function (evt) {
    bindings.push('v-on:' + evt + '="hasEvent(\'' + evt + '\') ? eventHandler(\'' + evt + '\', $event) : null"');
  });

  return bindings.join(' ');
}

function nestedComponents(version) {
  var componentsObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'components';

  return '\n<component v-for="' + (version === 1 ? '(idx, c)' : '(c, idx)') + ' in ' + componentsObject + '"\n  :key="idx"\n  :is="kebab(\'formation-\' + c.type)"\n  :config="c.config || {}"\n  :components=\'c.components || []\'\n  :bindings="bindings"\n  :framework="framework"\n  :frameworks="frameworks"\n  :register="register"\n  :event-hub="eventHub"\n  :local-hub="localHub"\n  :version="' + version + '"\n  ' + (version === 1 ? ':value.sync' : 'v-model') + '="value">\n</component>';
}

var registerComponents$1 = function (Vue$$1, version, widgets) {
  return function registerFormationComponents(vm, components, bindings, framework, frameworks, refresh) {
    forEach(components, function (component) {
      var type = component.type;

      var binding = get(bindings, type);
      if (binding) {
        forEach(widgets, function (widget, name) {
          var typeName = kebabCase(name);
          if (typeName === type && (!has(vm.$options.components, 'formation-' + typeName) || refresh)) {
            vm.$options.components['formation-' + typeName] = Vue$$1.extend(widget(bindings[typeName], framework, frameworks, component, version));
          }
        });
      }
    });
  };
};

// import query from '../utils/litequery/liteutils.query'
var common = {
  animations: animations,
  Backdrop: Backdrop$1,
  columnWidths: columnWidths,
  compileTemplate: compileTemplate,
  constants: constants,
  dbg: dbg,
  defaultClass: defaultClass,
  ensureConfig: ensureConfig,
  dash: dash,
  evalEvent: evalEvent,
  evalProp: evalProp,
  eventHandler: eventHandler,
  extendMethods: extendMethods,
  extendProps: extendProps,
  extractBindings: extractBindings$1,
  makeTemplateBindings: makeTemplateBindings,
  mergeClass: mergeClass,
  //  query,
  nestedComponents: nestedComponents,
  registerComponents: registerComponents$1
};

var bootstrap = {
  name: 'bootstrap',
  maxCols: 12,
  components: {
    'a': {
      template: '<a ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</a>'
    },
    'button': {
      classMap: {
        default: 'btn-default',
        primary: 'btn-primary',
        success: 'btn-success',
        info: 'btn-info',
        warning: 'btn-warning',
        danger: 'btn-danger',
        link: 'btn-link'
      },
      template: '<button type="button" class="btn ' + TAG_DEFAULT_CLASS + '" ' + TAG_BINDINGS + '>\n        <span v-if=\'config.iconClassLeft\' :class="config.iconClassLeft"></span>\n        <span v-if="config.text" v-text="config.text"></span>\n        <span v-if=\'config.iconClassRight\' :class="config.iconClassRight"></span>\n        <div v-if="config.html" v-html="config.html"></div>\n      </button>'
    },
    'container': {
      template: '<div class="container" ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'div': {
      template: '<div ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'form-grid': {
      columnClass: function columnClass(width) {
        return ['col-sm-' + width];
      },
      template: function template(_ref) {
        var version = _ref.version;

        return '<div ' + TAG_BINDINGS + '>\n          <form role="form">\n            <div v-for="(' + (version === 1 ? 'rIdx, row' : 'row, rIdx') + ') in config.rows">\n              <div class="row form-group">\n                <div v-for="(' + (version === 1 ? 'cIdx, col' : 'col, cIdx') + ') in row.columns" :class="columnClass(rIdx, cIdx)">\n                  <label style="width: 100%">\n                    {{col.label}}\n                    <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">\n                        *\n                    </span>\n                    ' + TAG_COMPONENTS + '\n                  </label>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>';
      }
    },
    'modal': {
      template: function template(_ref2) {
        var version = _ref2.version;

        return '<div ' + TAG_BINDINGS + '>\n          ' + (version === 1 ? '' : '<transition name="formation-fade">') + '\n          <div v-show="show" ' + (version === 1 ? 'transition="formation-fade-vue1x"' : '') + ' \n          :class="{ \'formation-modal-blur-area\': dismissable }" @click="dismiss" @keyup.esc="dismiss"\n          :style="{ zIndex: zIndex, position: \'fixed\', top: 0, left: 0, right: 0, bottom: 0, width: \'auto\', height: \'auto\' }">\n            <div class="modal-dialog">\n              <div class="modal-content">\n                <div class="modal-header" v-if="hasPath(config, \'header\')">\n                  <h4 class="modal-title" v-if="hasPath(config, \'header.text\')" v-text="config.header.text"></h4>\n                  ' + TAG_HEAD_COMPONENTS + '\n                </div>\n                <div class="modal-body">\n                  <p v-if="hasPath(config, \'body.text\')" v-text="config.body.text"></p>\n                  ' + TAG_COMPONENTS + '\n                </div>\n                <div class="modal-footer" v-if="hasPath(config, \'footer\')">\n                  ' + TAG_FOOT_COMPONENTS + '\n                  <button class="btn btn-default" v-if="hasPath(config, \'footer.closeButton\')" type="button" \n                  @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : \'Close\'"></button>\n                </div>\n              </div>\n            </div>\n          </div>\n          ' + (version === 1 ? '' : '</transition>') + '\n        </div>';
      }
    },
    'text-input': {
      template: '<input type="text" class="form-control" ' + TAG_MODEL + ' ' + TAG_BINDINGS + '>'
    }
  }
};

var materialize = {
  name: 'materialize',
  maxCols: 12,
  components: {
    'a': {
      template: '<a ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</a>'
    },
    'button': {
      classMap: {
        default: 'teal',
        primary: 'blue',
        success: 'green',
        info: 'cyan',
        warning: 'amber',
        danger: 'red',
        link: 'btn-flat'
      },
      template: '<button type="button" class="btn ' + TAG_DEFAULT_CLASS + '" ' + TAG_BINDINGS + '>\n        <i v-if=\'config.iconClassLeft\' class="material-icons left" :class="config.iconClassLeft"></i>\n        <span v-if="config.text" v-text="config.text"></span>\n        <i v-if=\'config.iconClassRight\' class="material-icons right" :class="config.iconClassRight"></i>\n        <div v-if="config.html" v-html="config.html"></div>\n      </button>'
    },
    'container': {
      template: '<div class="container" ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'div': {
      template: '<div ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'form-grid': {
      columnClass: function columnClass(width) {
        return ['s' + width];
      },
      template: function template(_ref) {
        var version = _ref.version;

        return '<div ' + TAG_BINDINGS + '>\n          <form class="col s12">\n            <div v-for="(' + (version === 1 ? 'rIdx, row' : 'row, rIdx') + ') in config.rows" class="row">\n              <div v-for="(' + (version === 1 ? 'cIdx, col' : 'col, cIdx') + ') in row.columns" class="col input-field" :class="columnClass(rIdx, cIdx)">\n                ' + TAG_COMPONENTS + '\n                <label :class="{ active: isFocused[\'r\' + rIdx + \'c\' + cIdx] || value[col.config.model] || col.config.placeholder }">\n                  {{col.label}}\n                  <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">\n                      *\n                  </span>\n                </label>\n              </div>\n            </div>\n          </form>\n        </div>';
      }
    },
    'modal': {
      template: function template(_ref2) {
        var version = _ref2.version;

        return '<div ' + TAG_BINDINGS + '>\n          ' + (version === 1 ? '' : '<transition name="formation-fade">') + '\n          <div v-show="show" ' + (version === 1 ? 'transition="formation-fade-vue1x"' : '') + '\n          :class="{ \'formation-modal-blur-area\': dismissable }" @click="dismiss"\n          :style="{ position: \'fixed\', top: 0, left: 0, right: 0, bottom: 0, height: \'auto\', width: \'auto\', \'z-index\': zIndex }">\n            <div class="modal" style="display: block; top: 10%;">\n              <div class="modal-content">\n                <h4 v-if="hasPath(config, \'header.text\') && !hasPath(config, \'header.components\')"\n                v-text="config.header.text"></h4>\n                ' + TAG_HEAD_COMPONENTS + '\n                <p v-if="hasPath(config, \'body.text\')" v-text="config.body.text"></p>\n                ' + TAG_COMPONENTS + '\n              </div>\n              <div class="modal-footer" v-if="hasPath(config, \'footer\')">\n                ' + TAG_FOOT_COMPONENTS + '\n                <button class="btn teal" v-if="hasPath(config, \'footer.closeButton\')" type="button" \n                @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : \'Close\'"></button>\n              </div>\n            </div>\n          </div>\n          ' + (version === 1 ? '' : '</transition>') + '\n        </div>';
      }
    },
    'text-input': {
      template: '<input type="text" class="validate" ' + TAG_MODEL + ' ' + TAG_BINDINGS + '>'
    }
  }
};

var semanticui = {
  name: 'semanticui',
  maxCols: 16,
  components: {
    'a': {
      template: '<a ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</a>'
    },
    'button': {
      classMap: {
        default: 'basic',
        primary: 'primary',
        success: 'positive',
        info: 'teal',
        warning: 'orange',
        danger: 'negative',
        link: 'basic'
      },
      template: '<button type="button" class="ui button ' + TAG_DEFAULT_CLASS + '" ' + TAG_BINDINGS + '>\n        <i v-if=\'config.iconClassLeft\' class="icon" :class="config.iconClassLeft"></i>\n        <span v-if="config.text" v-text="config.text"></span>\n        <i v-if=\'config.iconClassRight\' class="icon" :class="config.iconClassRight"></i>\n        <div v-if="config.html" v-html="config.html"></div>\n      </button>'
    },
    'container': {
      template: '<div class="container" ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'div': {
      template: '<div ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    'form-grid': {
      columnClass: function columnClass(width) {
        var w = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen'];

        return [w[width], 'wide', 'field'];
      },
      template: function template(_ref) {
        var version = _ref.version;

        return '<div ' + TAG_BINDINGS + '>\n          <form class="ui form">\n            <div class="field" v-for="(' + (version === 1 ? 'rIdx, row' : 'row, rIdx') + ') in config.rows">\n              <div class="fields">\n                <div v-for="(' + (version === 1 ? 'cIdx, col' : 'col, cIdx') + ') in row.columns" :class="columnClass(rIdx, cIdx)">\n                  <label style="width: 100%">\n                    {{col.label}}\n                    <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">\n                        *\n                    </span>\n                    ' + TAG_COMPONENTS + '\n                  </label>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>';
      }
    },
    'modal': {
      template: function template(_ref2) {
        var version = _ref2.version;

        return '<div ' + TAG_BINDINGS + '>\n          ' + (version === 1 ? '' : '<transition name="formation-fade">') + '\n          <div v-show="show" ' + (version === 1 ? 'transition="formation-fade-vue1x"' : '') + '\n          :class="{ \'formation-modal-blur-area\': dismissable }" @click="dismiss"\n          :style="{ position: \'fixed\', top: 0, left: 0, right: 0, bottom: 0, height: \'auto\', width: \'auto\', \'z-index\': zIndex }">\n            <div class="ui modal" style="display: block; top: 10%;">\n              <div class="header" v-if="hasPath(config, \'header.text\') && !hasPath(config, \'header.components\')"\n              v-text="config.header.text"></div>\n              <div class="header" v-if="hasPath(config, \'header.components\')">\n                ' + TAG_HEAD_COMPONENTS + '\n              </div>\n              <div class="content">\n                <p v-if="hasPath(config, \'body.text\')" v-text="config.body.text"></p>\n                ' + TAG_COMPONENTS + '\n              </div>\n              <div class="actions">\n                ' + TAG_FOOT_COMPONENTS + '\n                <button class="ui button basic" v-if="hasPath(config, \'footer.closeButton\')" type="button" \n                @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : \'Close\'"></button>\n              </div>\n            </div>\n          </div>\n          ' + (version === 1 ? '' : '</transition>') + '\n        </div>';
      }
    },
    'text-input': {
      template: '<div class="ui input"><input type="text" ' + TAG_MODEL + ' ' + TAG_BINDINGS + '></div>'
    }
  }
};

var baseFrameworks = {
  bootstrap: bootstrap,
  materialize: materialize,
  semanticui: semanticui
};

/*
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Deep set Vue.js objects
 */
// import Vue from 'vue'

var INVALID_KEY_RX = /^\d|[^a-zA-Z0-9_]/gm;

/**
 * returns true if object is non empty object
 * @param obj
 * @returns {boolean|*}
 */
function isHash$2(obj) {
  return _.isObject(obj) && !_.isArray(obj) && !_.isDate(obj) && !_.isEmpty(obj);
}

/**
 * joins 2 paths
 * @param base
 * @param path
 * @returns {string}
 */
function pathJoin(base, path) {
  try {
    var connector = path.match(/^\[/) ? '' : '.';
    return '' + (base || '') + (base ? connector : '') + path;
  } catch (error) {
    return '';
  }
}

/**
 * generates an array of paths to use when creating an abstracted object
 * @param obj
 * @param current
 * @param paths
 * @returns {Array|*}
 */
function getPaths(obj) {
  var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (isHash$2(obj)) {
    _.forEach(obj, function (val, key) {
      var k = key.match(INVALID_KEY_RX) ? '["' + key + '"]' : '.' + key;
      var cur = ('' + current + k).replace(/^\./, '');
      paths.push(cur);
      if (isHash$2(val)) getPaths(val, cur, paths);
    });
  }
  return _.uniq(paths);
}

/**
 * converts a path string to one usable by deepModel
 * @param path
 * @returns {*}
 */


/**
 * deep sets a Vue.js object creating reactive properties if they do not exist
 * @param obj
 * @param path
 * @param value
 */
function vueSet(obj, path, value, Vue$$1) {
  var fields = _.isArray(path) ? path : _.toPath(path);
  var prop = fields.shift();

  if (!fields.length) return Vue$$1.nextTick(function () {
    return Vue$$1.set(obj, prop, value);
  });
  if (!_.has(obj, prop)) Vue$$1.set(obj, prop, _.isNumber(prop) ? [] : {});
  Vue$$1.nextTick(function () {
    return vueSet(obj[prop], fields, value);
  });
}

/**
 * deep sets a vuex object creating reactive properties if they do not exist
 * @param path
 * @param value
 */
function vuexSet(path, value, Vue$$1) {
  var store = _.get(this, '$store');
  if (!store) throw new Error('VueDeepSet: could not find vuex store object on instance');
  store[store.commit ? 'commit' : 'dispatch']('VUEX_DEEP_SET', { path: path, value: value, Vue: Vue$$1 });
}

/**
 * vuex mutation to set an objects value at a specific path
 * @param state
 * @param args
 */
function VUEX_DEEP_SET(state, args) {
  vueSet(state, args.path, args.value, args.Vue);
}

/**
 * helper function to extend a mutation object
 * @param mutations
 * @returns {*}
 */
function extendMutation() {
  var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign(mutations, { VUEX_DEEP_SET: VUEX_DEEP_SET });
}

/**
 * returns an object that can deep set fields in a vuex store
 * @param vuexPath
 * @returns {{}}
 */
function vuexModel(vuexPath, Vue$$1) {
  var _this = this;

  if (!_.isString(vuexPath)) throw new Error('VueDeepSet: invalid vuex path string');

  if ((typeof Proxy === 'undefined' ? 'undefined' : _typeof(Proxy)) === undefined) {
    var model = {};
    var obj = _.get(this.$store.state, vuexPath);
    _.forEach(getPaths(obj), function (path) {
      var propPath = pathJoin(vuexPath, path);
      Object.defineProperty(model, path, {
        configurable: true,
        enumerable: true,
        get: function get$$1() {
          return _.get(_this.$store.state, propPath);
        },
        set: function set$$1(value) {
          vuexSet.call(_this, propPath, value, Vue$$1);
        }
      });
    });
    return model;
  } else {
    return new Proxy(_.get(this.$store.state, vuexPath, this.$store.state), {
      get: function get$$1(target, property) {
        return _.get(_this.$store.state, pathJoin(vuexPath, property));
      },
      set: function set$$1(target, property, value) {
        vuexSet.call(_this, pathJoin(vuexPath, property), value, Vue$$1);
        return true;
      },
      has: function has$$1(target, property) {
        return true;
      }
    });
  }
}

/**
 * returns an object that can deep set fields in a vue.js object
 * @param obj
 * @returns {Array}
 */
function vueModel(obj, Vue$$1) {
  var _this2 = this;

  if (!_.isObject(obj)) throw new Error('VueDeepSet: invalid object');

  if (typeof Proxy === 'undefined') {
    var model = {};
    _.forEach(getPaths(obj), function (path) {
      Object.defineProperty(model, path, {
        configurable: true,
        enumerable: true,
        get: function get$$1() {
          return _.get(obj, path);
        },
        set: function set$$1(value) {
          vueSet.call(_this2, obj, path, value, Vue$$1);
        }
      });
    });
    return model;
  } else {
    return new Proxy(obj, {
      get: function get$$1(target, property) {
        return _.get(target, property);
      },
      set: function set$$1(target, property, value) {
        vueSet.call(_this2, target, property, value, Vue$$1);
        return true;
      },
      has: function has$$1(target, property) {
        return true;
      }
    });
  }
}

/**
 * creates a vuex model if the arg is a string, vue model otherwise
 * @param arg
 * @returns {{}}
 */


/**
 * plugin
 * @param Vue
 */

function A(binding, framework, frameworks, component, version) {
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'a', [{
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }, {
      tag: TAG_COMPONENTS,
      value: nestedComponents(version)
    }]),
    name: 'formation-a',
    props: extendProps(version),
    methods: extendMethods({}),
    created: function created() {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks);
    }
  };
}

function Button(binding, framework, frameworks, component, version) {
  var classMap = get(frameworks, '["' + framework + '"].components.button.classMap', {});
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  var template = compileTemplate(info, frameworks, framework, 'button', [{
    tag: TAG_BINDINGS,
    value: ' ' + makeTemplateBindings(binding) + ' '
  }, {
    tag: TAG_DEFAULT_CLASS,
    value: defaultClass(classMap, component)
  }]);

  return {
    template: template,
    name: 'formation-button',
    props: extendProps(version),
    methods: extendMethods(),
    created: function created() {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks);
    },
    data: function data() {
      return {
        renderShow: true
      };
    }
  };
}

function Container(binding, framework, frameworks, component, version) {
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'container', [{
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }, {
      tag: TAG_COMPONENTS,
      value: nestedComponents(version)
    }]),
    name: 'formation-container',
    props: extendProps(version),
    methods: extendMethods(),
    created: function created() {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks);
    }
  };
}

function Div(binding, framework, frameworks, component, version) {
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'div', [{
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }, {
      tag: TAG_COMPONENTS,
      value: nestedComponents(version)
    }]),
    name: 'formation-div',
    props: extendProps(version),
    methods: extendMethods(),
    created: function created() {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks);
    }
  };
}

function FormGrid(binding, framework, frameworks, component, version) {
  var f = get(frameworks, '["' + framework + '"]', {});
  var COL_LIMIT = get(f, 'maxCols', 12);
  var colClasser = get(f, 'components["form-grid"].columnClass', function () {
    return [];
  });
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'form-grid', [{
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }, {
      tag: TAG_COMPONENTS,
      value: '<component :is="kebab(\'formation-\' + col.type)"\n          :config="col.config || {}"\n          :components=\'col.components || []\'\n          :bindings="bindings"\n          :framework="framework"\n          :frameworks="frameworks"\n          :register="register"\n          :event-hub="eventHub"\n          :version="' + version + '"\n          ' + (version === 1 ? ':value.sync' : 'v-model') + '="value"></component>'
    }]),
    name: 'formation-form-grid',
    props: extendProps(version),
    methods: extendMethods({
      columnClass: function columnClass(rowIdx, colIdx) {
        return colClasser(get(columnWidths(get(this.config, 'rows[' + rowIdx + '].columns'), COL_LIMIT), '[' + colIdx + ']', 1));
      }
    }),
    computed: {
      _components: function _components() {
        return this.config.rows.reduce(function (acc, row) {
          return acc.concat(row.columns);
        }, []);
      }
    },
    data: function data() {
      return {
        isFocused: {}
      };
    },
    created: function created() {
      this.register(this, this._components, this.bindings, this.framework, this.frameworks);
    }
  };
}

function Modal(binding, framework, frameworks, component, version) {
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'modal', [{
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }, {
      tag: TAG_HEAD_COMPONENTS,
      value: nestedComponents(version, 'headerComponents')
    }, {
      tag: TAG_COMPONENTS,
      value: nestedComponents(version, 'bodyComponents')
    }, {
      tag: TAG_FOOT_COMPONENTS,
      value: nestedComponents(version, 'footerComponents')
    }]),
    name: 'formation-modal',
    props: extendProps(version),
    computed: {
      headerComponents: function headerComponents() {
        return _.get(this, 'config.header.components', []);
      },
      bodyComponents: function bodyComponents() {
        return _.get(this, 'config.body.components', []);
      },
      footerComponents: function footerComponents() {
        return _.get(this, 'config.footer.components', []);
      }
    },
    methods: extendMethods({
      dismiss: function dismiss(e) {
        if (e.target.classList.contains('formation-modal-blur-area')) {
          this.hideModal();
        }
      },
      showModal: function showModal() {
        var _this = this;

        this.eventHub.$emit('backdrop.show', this._uid);
        window.setTimeout(function () {
          _this.show = true;
        }, 100);
      },
      hideModal: function hideModal() {
        var _this2 = this;

        this.show = false;
        window.setTimeout(function () {
          _this2.eventHub.$emit('backdrop.hide', _this2._uid);
        }, 100);
      }
    }),
    created: function created() {
      var _this3 = this;

      var name = this.config.name;

      if (name) {
        this.eventHub.$on(name + '.modal.show', this.showModal);
        this.eventHub.$on(name + '.modal.hide', this.hideModal);
      }
      this.eventHub.$on('modal.show', this.showModal);
      this.eventHub.$on('modal.hide', this.hideModal);
      this.localHub.$on('Escape', function () {
        if (_this3.show) _this3.hideModal();
      });

      // register the individual modal components
      if (this.headerComponents.length) {
        this.register(this, this.headerComponents, this.bindings, this.framework, this.frameworks);
      }
      if (this.bodyComponents.length) {
        this.register(this, this.bodyComponents, this.bindings, this.framework, this.frameworks);
      }
      if (this.footerComponents.length) {
        this.register(this, this.footerComponents, this.bindings, this.framework, this.frameworks);
      }
    },
    data: function data() {
      return {
        show: false,
        zIndex: this.config.zIndex || 9000,
        dismissable: this.config.dismissable !== false
      };
    }
  };
}

function TextInput(binding, framework, frameworks, component, version) {
  var info = {
    binding: binding,
    framework: frameworks[framework],
    component: component,
    version: version
  };

  return {
    template: compileTemplate(info, frameworks, framework, 'text-input', [{
      tag: TAG_MODEL,
      value: ' v-model="value[config.model]" '
    }, {
      tag: TAG_BINDINGS,
      value: ' ' + makeTemplateBindings(binding) + ' '
    }]),
    name: 'formation-text-input',
    props: extendProps(version),
    methods: extendMethods({
      validate: function validate() {
        return this.touched && this.valid;
      }
    }),
    created: function created() {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks);
    },

    computed: {
      _value: function _value() {
        return has(this.config, 'model') ? this.value[this.config.model] : null;
      }
    },
    watch: {
      _value: function _value(val) {
        this.touched = true;
        this.valid = isFunction(this.config.validate) ? this.config.validate.call(this, val) : true;
      }
    },
    data: function data() {
      return {
        valid: false,
        touched: false
      };
    }
  };
}

var baseWidgets = {
  A: A,
  Button: Button,
  Container: Container,
  Div: Div,
  FormGrid: FormGrid,
  Modal: Modal,
  TextInput: TextInput
};

var extractBindings$$1 = common.extractBindings;
var registerComponents = common.registerComponents;
var _dbg = common.dbg;
var Backdrop$$1 = common.Backdrop;


function formation(Vue$$1, options, plugins) {
  var VUE_VERSION = Number((isString(Vue$$1.version) ? Vue$$1.version : '2.0.0').split('.')[0]);
  var frameworks = merge({}, baseFrameworks, get(options, 'frameworks', {}));
  var widgets = merge({}, baseWidgets, get(options, 'components', {}));

  // process any plugins
  forEach(plugins, function (plugin) {
    if (isFunction(plugin.components)) merge(widgets, plugin.components(common));
    if (has(plugin, 'frameworks')) merge(frameworks, plugin.frameworks);
  });

  return {
    name: 'formation',
    template: '\n      <div :class="[\'formation\']">\n        <div v-if="compiled" :class="rootClass">\n          <component v-for="' + (VUE_VERSION === 1 ? '(idx, c)' : '(c, idx)') + ' in config.components || []"\n          :key="idx"\n          :is="\'formation-\' + c.type"\n          :config="c.config || {}"\n          :components="c.components || []"\n          :bindings="_bindings"\n          :framework="framework"\n          :frameworks="frameworks"\n          :register="register"\n          :event-hub="eventHub"\n          :local-hub="localHub"\n          :version="' + VUE_VERSION + '"\n          ' + (VUE_VERSION === 1 ? ':value.sync' : 'v-model') + '="modelData"></component>\n        </div>\n      </div>',
    props: {
      value: {
        type: Object,
        default: function _default() {
          return {};
        },

        twoWay: VUE_VERSION === 1 ? true : undefined
      },
      vuex: {
        type: String
      },
      name: {
        type: String,
        default: 'formation-' + Date.now()
      },
      config: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      framework: {
        type: String,
        default: BOOTSTRAP,
        validator: function validator(value) {
          return has(frameworks, value);
        }
      },
      eventHub: {
        type: Object,
        default: function _default() {
          return new Vue$$1();
        }
      },
      debug: {
        type: Boolean,
        default: false
      }
    },
    vuex: VUE_VERSION === 1 ? {} : undefined,
    created: function created() {
      var _this = this;

      this.dbg('Vue', VUE_VERSION);

      // check vuex mutation has been included
      if (this.vuex) {
        if (!has(this, '$store._mutations.VUEX_DEEP_SET')) {
          console.warn('[vue-formation]: unable to find formation mutation "VUEX_DEEP_SET", ' + 'please ensure it is included during the Vuex store initialization');
        }
      }

      // this bit of code is used to re-render the child-components should the framework change
      this.eventHub.$on('render.components', function () {
        return _this.render();
      });
      if (this.name) this.eventHub.$on(this.name + '.render.components', function () {
        return _this.render();
      });
      this.eventHub.$emit(this.name + '.render.components');

      // watch for backdrop events
      this.$root.$on('backdrop.show', this.createBackdrop);
      this.eventHub.$on('backdrop.show', function (requestedBy) {
        _this.$root.$emit('backdrop.show', _this.name + '-' + requestedBy);
      });
      this.eventHub.$on('backdrop.hide', function (requestedBy) {
        _this.$root.$emit('backdrop.hide', _this.name + '-' + requestedBy);
      });

      document.addEventListener('keyup', this.domKeyupListener);
    },
    beforeDestroy: function beforeDestroy() {
      this.$root.$off('backdrop.show', this.createBackdrop);
      document.removeEventListener('keyup', this.domKeyupListener);
    },

    computed: {
      rootClass: function rootClass() {
        return ['formation', 'formation-' + this.framework];
      },
      modelData: function modelData() {
        return this.vuex ? this.vuexModel(this.vuex, Vue$$1) : this.vueModel(this.value, Vue$$1);
      },
      _bindings: function _bindings() {
        return extractBindings$$1(this._config);
      },
      _config: function _config() {
        return this.config;
      }
    },
    methods: {
      vueModel: vueModel,
      vuexModel: vuexModel,
      render: function render() {
        this.updateComponents(true);
        this.compiled = false;
        this.compiled = true;
      },
      dbg: function dbg$$1() {
        if (this.debug) _dbg.apply(this, [].concat(Array.prototype.slice.call(arguments)));
      },
      register: function register(vm, components, bindings, framework, frameworks, refresh) {
        return registerComponents(Vue$$1, VUE_VERSION, widgets)(vm, components, bindings, framework, frameworks, refresh);
      },
      updateComponents: function updateComponents(refresh) {
        this.register(this, this._config.components, this._bindings, this.framework, this.frameworks, refresh);
      },
      createBackdrop: function createBackdrop(requestedBy) {
        /*
         * The backdrop is a special case component since we only want 1 to exist in a vue application
         * it is manually created, appended, and mounted to the root app element. the backdrop also
         * uses the root elements eventing system to communicate
         */
        if (!document.getElementById('formation-backdrop')) {
          var backdrop = document.createElement('div');
          backdrop.setAttribute('id', 'formation-backdrop');
          this.$root.$el.appendChild(backdrop);
          Backdrop$$1(Vue$$1, VUE_VERSION, this).create().$mount('#formation-backdrop');
          this.$root.$emit('backdrop.show', requestedBy);
        }
      },
      domKeyupListener: function domKeyupListener(e) {
        switch (e.keyCode) {
          case 27:
            this.localHub.$emit('Escape');
        }
      }
    },
    watch: {
      framework: function framework() {
        this.eventHub.$emit(this.name + '.render.components');
      }
    },
    data: function data() {
      return {
        frameworks: frameworks,
        compiled: true,
        localHub: new Vue$$1()
      };
    }
  };
}

var component = function (plugins) {
  return formation(Vue, {}, plugins);
};

/**
 * @name vue-formation
 * @author Branden Horiuchi <bhoriuchi@gmail.com>
 * @description Build full layouts in a programmatic way with JSON style objects
 */
var VueFormation = function () {
  function VueFormation() {
    classCallCheck(this, VueFormation);
  }

  createClass(VueFormation, [{
    key: 'use',
    value: function use(plugin) {
      this.plugins.push(plugin);
    }
  }, {
    key: 'extendMutation',
    value: function extendMutation$$1(mutations) {
      return extendMutation(mutations);
    }
  }, {
    key: 'install',
    value: function install$$1(Vue$$1, options) {
      Vue$$1.component('formation', formation(Vue$$1, options, this.plugins));
    }
  }, {
    key: 'component',
    get: function get() {
      return component(this.plugins);
    }
  }]);
  return VueFormation;
}();

VueFormation.plugins = VueFormation.prototype.plugins = [];

VueFormation.use = function (plugin) {
  this.plugins.push(plugin);
};

VueFormation.install = function (Vue$$1, options) {
  Vue$$1.component('formation', formation(Vue$$1, options, this.plugins));
};

module.exports = VueFormation;

},{}]},{},[1])(1)
});