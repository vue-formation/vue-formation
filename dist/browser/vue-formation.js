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
function mapKeys(obj, fn) {
  var newObj = {};
  forEach(obj, function (v, k) {
    var newKey = fn(v, k);
    newObj[typeof newKey === 'string' ? newKey : k] = v;
  });
  return newObj;
}

mapKeys._accepts = [Object];

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
function omitBy(obj, fn) {
  var newObj = {};
  if (!isHash(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (!fn(v, k)) newObj[k] = v;
  });
  return newObj;
}

omitBy._accepts = [Object];
omitBy._dependencies = ['dash.isHash', 'dash.forEach'];

/* eslint-disable */
function omit(obj, omits) {
  omits = Array.isArray(omits) ? omits : [];
  return omitBy(obj, function (v, k) {
    return omits.indexOf(k) !== -1;
  });
}

omit._accepts = [Object];
omit._dependencies = ['dash.omitBy'];

/* eslint-disable */
function properCase(string) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

  if (!isString(string)) return '';
  return string.replace(/[\s-_]+/g, '-').split('-').map(function (v) {
    return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
  }).join(separator);
}

properCase._accepts = [String];

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
var _dash = {
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
  mapKeys: mapKeys,
  merge: merge,
  omit: omit,
  properCase: properCase,
  reduce: reduce,
  set: set$1,
  sum: sum,
  toPath: toPath,
  union: union,
  uniq: uniq,
  without: without,
  range: range,
  isHash: isHash,
  omitBy: omitBy,
  identity: identity,
  isDate: isDate
};

var DashChain = function DashChain(obj) {
  this._value = obj;
};

DashChain.prototype.value = function () {
  return this._value;
};

var dash = function dash(obj) {
  return new DashChain(obj);
};

var _loop = function _loop(name) {
  var fn = _dash[name];
  dash[name] = fn;
  if (fn._chainable !== false) {
    DashChain.prototype[name] = function () {
      var args = [this._value].concat([].concat(Array.prototype.slice.call(arguments)));
      this._value = fn.apply(this, args);
      return fn._terminates === true ? this._value : this;
    };
  }
};

for (var name in _dash) {
  _loop(name);
}

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

function A(info) {
  return info.f.common.extendComponent(info, [], {}, true);
}

function Button(info) {
  return info.f.common.extendComponent(info, [], {}, true);
}

function Container(info) {
  return info.f.common.extendComponent(info, [], {}, true);
}

function Div(info) {
  return info.f.common.extendComponent(info, [], {}, true);
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

function FormGrid(info) {
  var COL_LIMIT = dash.get(info.f.framework, 'maxCols', 12);
  var colClasser = dash.get(info.f.framework, 'columnClass', function () {
    return [];
  });

  return info.f.common.extendComponent(info, [{
    tag: TAG_COMPONENTS,
    value: '<component :is="kebab(\'formation-\' + col.type)"\n          :config="col.config || {}"\n          :components=\'col.components || []\'\n          ' + (info.f.version === 1 ? ':value.sync' : 'v-model') + '="value">\n        </component>'
  }], {
    methods: {
      columnClass: function columnClass(rowIdx, colIdx) {
        return colClasser(dash.get(info.f.common.columnWidths(dash.get(this.config, 'rows[' + rowIdx + '].columns'), COL_LIMIT), '[' + colIdx + ']', 1));
      }
    },
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
      info.f.common.registerComponents(this, info.f, { components: this._components });
    }
  });
}

function Modal(info) {
  return info.f.common.extendComponent(info, [{
    tag: info.f.common.constants.TAG_HEAD_COMPONENTS,
    value: info.f.common.nestedComponents(info.f.version, 'headerComponents')
  }, {
    tag: info.f.common.constants.TAG_COMPONENTS,
    value: info.f.common.nestedComponents(info.f.version, 'bodyComponents')
  }, {
    tag: info.f.common.constants.TAG_FOOT_COMPONENTS,
    value: info.f.common.nestedComponents(info.f.version, 'footerComponents')
  }], {
    methods: {
      dismiss: function dismiss(e) {
        if (e.target.classList.contains('formation-modal-blur-area')) {
          this.hideModal();
        }
      },
      showModal: function showModal() {
        var _this = this;

        this.emitEvent('backdrop.show', this._uid);
        window.setTimeout(function () {
          _this.show = true;
        }, 100);
      },
      hideModal: function hideModal() {
        var _this2 = this;

        this.show = false;
        window.setTimeout(function () {
          _this2.emitEvent('backdrop.hide', _this2._uid);
        }, 100);
      }
    },
    computed: {
      headerComponents: function headerComponents() {
        return dash.get(this, 'config.header.components', []);
      },
      bodyComponents: function bodyComponents() {
        return dash.get(this, 'config.body.components', []);
      },
      footerComponents: function footerComponents() {
        return dash.get(this, 'config.footer.components', []);
      }
    },
    data: function data() {
      return {
        show: false,
        zIndex: this.config.zIndex || 9000,
        dismissable: this.config.dismissable !== false
      };
    },
    created: function created() {
      var _this3 = this;

      var name = this.config.name;

      if (name) {
        this.onEvent(name + '.modal.show', this.showModal);
        this.onEvent(name + '.modal.hide', this.hideModal);
      }

      this.onEvent('modal.hide', this.hideModal);
      this.onLocalEvent('Escape', function () {
        if (_this3.show) _this3.hideModal();
      });

      // register the individual modal components
      if (this.headerComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.headerComponents });
      }
      if (this.bodyComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.bodyComponents });
      }
      if (this.footerComponents.length) {
        info.f.common.registerComponents(this, info.f, { components: this.footerComponents });
      }
    }
  });
}

function TextInput(info) {
  return info.f.common.extendComponent(info, [{
    tag: info.f.common.constants.TAG_MODEL,
    value: ' v-model="value[config.model]" '
  }], {
    methods: {
      validate: function validate() {
        return this.touched && this.valid;
      }
    },
    computed: {
      _value: function _value() {
        return dash.has(this.config, 'model') ? this.value[this.config.model] : null;
      }
    },
    watch: {
      _value: function _value(val) {
        this.touched = true;
        this.valid = dash.isFunction(this.config.validate) ? this.config.validate.call(this, val) : true;
      }
    },
    data: function data() {
      return {
        valid: false,
        touched: false
      };
    }
  });
}

var baseComponents = {
  A: A,
  Button: Button,
  Container: Container,
  Div: Div,
  FormGrid: FormGrid,
  Modal: Modal,
  TextInput: TextInput
};

function buildLibrary$1(options, plugins) {
  var components = dash.merge({}, baseComponents, dash.get(options, 'components', {}));

  // process any plugins
  dash.forEach(plugins, function (plugin) {
    if (dash.isFunction(plugin.components)) dash.merge(components, plugin.components(common));
  });

  return { components: components };
}

function columnWidths(columns) {
  var COL_LIMIT = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 12;

  var filledFirst = false;
  var unset = 0;
  var runningCount = 0;
  var widths = dash.map(columns, function (col, idx) {
    var remaining = columns.length - (idx + 1);
    if (dash.isNumber(col.colspan)) {
      var currentWidth = col.colspan + runningCount + remaining > COL_LIMIT ? 1 : col.colspan;
      runningCount += currentWidth;
      return currentWidth;
    }
    unset++;
    return 0;
  });

  if (unset) {
    var sum = dash.sum(widths);
    var defWidth = Math.floor((COL_LIMIT - sum) / unset);
    var firstWidth = defWidth + COL_LIMIT % unset;
    dash.forEach(widths, function (width, i) {
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

var compileTemplate = function (f, binding, component, name, interpolations) {
  name = dash.properCase(name.replace(/^formation-/i, ''), '');
  var template = dash.get(f.framework.components, name + '.template');
  interpolations = dash.isArray(interpolations) ? interpolations : [];

  if (!template) {
    template = '<div></div>';
    console.error('[vue-formation]: unable to find component "' + name + '" in current ' + f.frameworkName + ' framework');
  }

  // generate the template code if a function is passed. this is also an opportunity to add more
  // interpolations and bindings
  template = dash.isFunction(template) ? template(f, binding, component, name, interpolations) : template;

  // add default interpolations, to override these the interpolation can be specified in the object
  interpolations.push({
    tag: TAG_BINDINGS,
    value: ' ' + f.common.makeTemplateBindings(binding) + ' '
  });

  dash.forEach(interpolations, function (_ref) {
    var tag = _ref.tag,
        value = _ref.value;

    template = template.replace(tag, value);
  });
  return template;
};

/* eslint-disable */
function dbg() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (args.length) {
    var msg = ['[vue-formation]:'].concat(args);
    return args[0] instanceof Error ? console.warn.apply(console, msg) : console.log.apply(console, msg);
  }
}

function mergeClass(c) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var obj = {};
  c = dash.isString(c) ? c.split(/\s+/) : c;
  if (dash.isArray(c)) {
    dash.forEach(c, function (n) {
      obj[n] = true;
    });
  } else if (dash.isObject(c)) {
    obj = c;
  }

  return dash.merge({}, def, obj);
}

function defaultClass(hive, component) {
  var config = component.config;

  var _ref = config || {},
      type = _ref.type,
      attrs = _ref.attrs;

  var classKeys = dash.keys(mergeClass({}, dash.get(attrs, 'class', {})));
  var btnClassKeys = dash.keys(hive);
  return type ? hive[type] || hive.default : !dash.intersection(classKeys, btnClassKeys).length ? hive.default : '';
}

function ensureConfig(config) {
  if (!dash.isObject(config)) return { attrs: {}, data: {}, on: {} };
  if (!dash.isObject(config.attrs)) config.attrs = {};
  if (!dash.isObject(config.data)) config.data = {};
  if (!dash.isObject(config.on)) config.on = {};
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
  return dash.includes(KEYMAP[key], e.key || e.code || e.keyCode || e.which);
}

function evalEvent(event, vm) {
  if (dash.isFunction(event)) return function (e) {
    return event.bind(vm)(e, vm.config, vm.value);
  };
  if (!dash.isObject(event)) return function () {
    return false;
  };

  var handler = event.handler,
      modifiers = event.modifiers;

  handler = dash.isFunction(handler) ? handler : function () {
    return false;
  };

  modifiers = dash.isArray(modifiers) ? modifiers : [];

  return function (e) {
    var keys = [];
    var modKeys = dash.without(modifiers, 'stop', 'prevent', 'capture', 'self', 'once');
    var config = vm.config;
    var value = vm.value;

    dash.forEach(modifiers, function (mod) {
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
          break;
      }
    });

    // check that the correct key combo was entered
    if (modKeys.length && dash.intersection(modKeys, keys).length !== modKeys.length) return false;

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
          if (dash.isFunction(value)) return value(vm, config, data);
          break;
        case Boolean:
          if (dash.isBoolean(value)) return value;
          break;
        case String:
          if (dash.isString(value)) return value;
          break;
        case Date:
          if (dash.isDate(value)) return value;
          break;
        case Number:
          if (dash.isNumber(value)) return value;
          break;
        case Object:
          if (dash.isObject(value)) return JSON.stringify(value);
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
  var handler = dash.get(this.config, 'on.' + name);
  return handler ? evalEvent(handler, this)(event) : null;
}

function extendComponent(_ref, interpolations, def, extendComponents) {
  var f = _ref.f,
      binding = _ref.binding,
      component = _ref.component,
      name = _ref.name;

  var model = f.version === 1 ? { value: { type: Object, required: true, twoWay: true } } : { value: { type: Object, required: true }

    // if extend components, add a components interpolation
  };if (extendComponents) {
    interpolations.push({
      tag: f.common.constants.TAG_COMPONENTS,
      value: f.common.nestedComponents(f.version)
    });
  }

  var extended = {
    name: name,
    template: def.template || f.common.compileTemplate(f, binding, component, name, interpolations),
    props: dash.merge({}, def.props, model, {
      config: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      components: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    }),
    methods: dash.merge({}, def.methods, {
      eventHandler: f.common.eventHandler,
      emitEvent: function emitEvent(event, value) {
        f.eventHub.$emit(event, value);
      },
      onEvent: function onEvent(event, handler) {
        f.eventHub.$on(event, handler);
      },
      offEvent: function offEvent(event, handler) {
        f.eventHub.$off(event, handler);
      },
      emitLocalEvent: function emitLocalEvent(event, value) {
        f.localHub.$emit(event, value);
      },
      onLocalEvent: function onLocalEvent(event, handler) {
        f.localHub.$on(event, handler);
      },
      offLocalEvent: function offLocalEvent(event, handler) {
        f.localHub.$off(event, handler);
      },
      getAttr: function getAttr(name) {
        return f.common.evalProp([Function, String, Boolean, Number, Object], this.config.attrs[name], this, this.config, this.value, null);
      },
      getData: function getData(name) {
        return f.common.evalProp([Function, String, Boolean, Number, Object], this.config.data[name], this, this.config, this.value, null);
      },
      hasPath: function hasPath(obj, path) {
        return dash.has(obj, path);
      },
      hasAttr: function hasAttr(name) {
        return dash.has(this, 'config.attrs.' + name);
      },
      hasData: function hasData(name) {
        return dash.has(this, 'config.data.' + name);
      },
      hasEvent: function hasEvent(name) {
        return dash.has(this, 'config.on.' + name);
      },
      kebab: function kebab(name) {
        return dash.kebabCase(name);
      },
      isString: function isString(val) {
        return dash.isString(val);
      }
    })

    // if extend components add a modified created hook
  };if (extendComponents) {
    extended.created = function created() {
      f.common.registerComponents(this, f, this);
      if (dash.isFunction(def.created)) def.created.call(this);
    };
  }

  // merge everything together, do not merge keys that have been manually extended
  return dash.merge(extended, dash.omit(def, dash.keys(extended)));
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
    if (attrs) types[type].attrs = dash.union(types[type].attrs, dash.keys(attrs));
    if (data) types[type].data = dash.union(types[type].data, dash.keys(data));
    if (on) types[type].on = dash.union(types[type].on, dash.keys(on));
  }

  if (dash.isArray(dash.get(component, 'components'))) {
    dash.forEach(component.components, function (c) {
      extractBindings$1(c, types);
    });
  }
  if (dash.isArray(dash.get(component, 'rows'))) {
    dash.forEach(component.rows, function (row) {
      if (dash.isArray(dash.get(row, 'columns'))) {
        dash.forEach(row.columns, function (col) {
          if (col.config) extractBindings$1(col, types);
        });
      }
    });
  }
  return types;
}

function getVueVersion$1(Vue$$1) {
  return Number((dash.isString(Vue$$1.version) ? Vue$$1.version : '2.0.0').split('.')[0]);
}

function makeTemplateBindings(binding) {
  var attrs = binding.attrs,
      data = binding.data,
      on = binding.on;

  var bindings = [];

  dash.forEach(attrs, function (attr) {
    bindings.push(':' + attr + '="hasAttr(\'' + attr + '\') ? getAttr(\'' + attr + '\') : null"');
  });

  dash.forEach(data, function (datum) {
    bindings.push(':data-' + datum + '="hasData(\'' + datum + '\') ? getData(\'' + datum + '\') : null"');
  });

  dash.forEach(on, function (evt) {
    bindings.push('v-on:' + evt + '="hasEvent(\'' + evt + '\') ? eventHandler(\'' + evt + '\', $event) : null"');
  });

  return bindings.join(' ');
}

/* eslint-disable */
function isArray$2(obj) {
  return Array.isArray(obj);
}

isArray$2._accepts = ['ANY'];

/* eslint-disable */
function forEach$2(obj, fn) {
  try {
    if (isArray$2(obj)) {
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

forEach$2._accepts = [Object, Array];

/* eslint-disable */
var each = function each(fn) {
  forEach$2(this.slice(0, this.length), function (v, k) {
    return fn.bind(v)(k, v);
  });
};

each._baseutil = true;

/* eslint-disable */
function mapWith(obj, fn) {
  var newObj = [];
  forEach$2(obj, function (v, k) {
    var value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj;
}

mapWith._accepts = [Object, Array];

/* eslint-disable */
function isObject$2(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

isObject$2._accepts = ['ANY'];

/* eslint-disable */
var mapNodes = function mapNodes(element, selector) {
  return mapWith(element.querySelectorAll(selector), function (v) {
    return isObject$2(v) ? v : undefined;
  });
};

mapNodes._chainable = false;
mapNodes._dependencies = ['dash.mapWith', 'dash.isObject'];

/* eslint-disable */
function union$2() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  try {
    var u = args.reduce(function (prev, cur) {
      if (!isArray$2(prev) || !isArray$2(cur)) return [];
      return prev.concat(cur);
    }, []);

    return [].concat(toConsumableArray(new Set(u)));
  } catch (err) {
    console.error(err);
    return [];
  }
}

union$2._accepts = ['ANY'];

/* eslint-disable */
var find = function find(selector) {
  var results = [];
  this.each(function () {
    results = union$2(results, mapNodes(this, selector));
  });
  return this.init(results, this);
};

find._terminates = true;
find._dependencies = ['query.mapNodes', 'query.each', 'dash.union'];

/* eslint-disable */
var _query = {
  each: each,
  find: find,
  mapNodes: mapNodes
};

/* eslint new-cap: ["error", { "newIsCap": false }] */
var infoName = 'liteutils';
var infoVersion = '0.1.0';

var arr = [];

function htmlGenerator(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.childNodes;
}

var lQuery = function lQuery(selector, context) {
  var _this = this;

  var nodes = [];
  context = context || document;

  if (selector !== document) {
    this.prevObject = context instanceof lQuery ? context : new query.fn.init(context);
  }

  if (Array.isArray(selector)) {
    nodes = selector;
  } else if (selector instanceof lQuery) {
    nodes = selector.slice(0, nodes.length);
  } else if (typeof selector === 'string') {
    nodes = selector.match(/^</) ? htmlGenerator(selector) : mapNodes(context, selector);
  } else {
    nodes = [selector];
  }

  this.length = nodes.length;

  forEach$2(nodes, function (node, idx) {
    _this[idx] = node;
  });
};

var query = function query(selector, context) {
  return new query.fn.init(selector, context);
};

query.fn = {
  init: function init(selector, context) {
    lQuery.prototype = query.fn;
    return new lQuery(selector, context);
  }
};

query.event = {
  active: []
};

query.uuid = function () {
  return '' + infoName + Date.now();
};

query.Event = function Event(event, data, uuid) {
  var _this2 = this;

  classCallCheck(this, Event);

  forEach$2(event, function (v, k) {
    if (!k.match(/^[A-Z_]*$/)) _this2[k] = v;
  });
  this.originalEvent = event;
  this.handlerId = uuid;
  if (data) this.data = data;
};

forEach$2(_query, function (fn, name) {
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

query.fn[Symbol.iterator] = function values() {
  var _this3 = this;

  var nextIndex = 0;
  return {
    next: function next() {
      return nextIndex < _this3.length ? { value: _this3[nextIndex++], done: false } : { done: true };
    }
  };
};

function nestedComponents(version) {
  var componentsObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'components';

  return '\n<component v-for="' + (version === 1 ? '(idx, c)' : '(c, idx)') + ' in ' + componentsObject + '"\n  :key="idx"\n  :is="kebab(\'formation-\' + c.type)"\n  :config="c.config || {}"\n  :components=\'c.components || []\'\n  ' + (version === 1 ? ':value.sync' : 'v-model') + '="value">\n</component>';
}

function registerComponents$1(vm, f, config, refresh) {
  var bindings = f.common.extractBindings(config);
  dash.forEach(config.components, function (component) {
    if (!dash(component).get('type').isString().value()) return;

    var shortName = dash.kebabCase(component.type.replace(/^formation-/i, '')).toLowerCase();
    var name = 'formation-' + shortName;
    var properName = dash.properCase(shortName, '');
    var binding = bindings[shortName];
    var obj = dash.get(f.components, properName);

    if (binding && obj && (!dash.has(vm.$options.components, name) || refresh)) {
      var c = obj({ f: f, binding: binding, component: component, name: name, properName: properName, shortName: shortName });
      vm.$options.components[name] = f.vue.extend(c);
    }
  });
}

var common = {
  Backdrop: Backdrop$1,
  buildLibrary: buildLibrary$1,
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
  extendComponent: extendComponent,
  extractBindings: extractBindings$1,
  getVueVersion: getVueVersion$1,
  makeTemplateBindings: makeTemplateBindings,
  mergeClass: mergeClass,
  query: query,
  nestedComponents: nestedComponents,
  registerComponents: registerComponents$1
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
  return dash.isObject(obj) && !dash.isArray(obj) && !dash.isDate(obj) && !dash.isEmpty(obj);
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
    dash.forEach(obj, function (val, key) {
      var k = key.match(INVALID_KEY_RX) ? '["' + key + '"]' : '.' + key;
      var cur = ('' + current + k).replace(/^\./, '');
      paths.push(cur);
      if (isHash$2(val)) getPaths(val, cur, paths);
    });
  }
  return dash.uniq(paths);
}

var VUEX_MUTATION = 'VUEX_DEEP_SET';

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
  var fields = dash.isArray(path) ? path : dash.toPath(path);
  var prop = fields.shift();

  if (!fields.length) return Vue$$1.nextTick(function () {
    return Vue$$1.set(obj, prop, value);
  });
  if (!dash.has(obj, prop)) Vue$$1.set(obj, prop, dash.isNumber(prop) ? [] : {});
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
  var store = dash.get(this, '$store');
  if (!store) throw new Error('VueDeepSet: could not find vuex store object on instance');
  store[store.commit ? 'commit' : 'dispatch'](VUEX_MUTATION, { path: path, value: value, Vue: Vue$$1 });
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

  if (!dash.isString(vuexPath)) throw new Error('VueDeepSet: invalid vuex path string');

  if ((typeof Proxy === 'undefined' ? 'undefined' : _typeof(Proxy)) === undefined) {
    var model = {};
    var obj = dash.get(this.$store.state, vuexPath);
    dash.forEach(getPaths(obj), function (path) {
      var propPath = pathJoin(vuexPath, path);
      Object.defineProperty(model, path, {
        configurable: true,
        enumerable: true,
        get: function get() {
          return dash.get(_this.$store.state, propPath);
        },
        set: function set$$1(value) {
          vuexSet.call(_this, propPath, value, Vue$$1);
        }
      });
    });
    return model;
  } else {
    return new Proxy(dash.get(this.$store.state, vuexPath, this.$store.state), {
      get: function get(target, property) {
        return dash.get(_this.$store.state, pathJoin(vuexPath, property));
      },
      set: function set$$1(target, property, value) {
        vuexSet.call(_this, pathJoin(vuexPath, property), value, Vue$$1);
        return true;
      },
      has: function has(target, property) {
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

  if (!dash.isObject(obj)) throw new Error('VueDeepSet: invalid object');

  if (typeof Proxy === 'undefined') {
    var model = {};
    dash.forEach(getPaths(obj), function (path) {
      Object.defineProperty(model, path, {
        configurable: true,
        enumerable: true,
        get: function get() {
          return dash.get(obj, path);
        },
        set: function set$$1(value) {
          vueSet.call(_this2, obj, path, value, Vue$$1);
        }
      });
    });
    return model;
  } else {
    return new Proxy(obj, {
      get: function get(target, property) {
        return dash.get(target, property);
      },
      set: function set$$1(target, property, value) {
        vueSet.call(_this2, target, property, value, Vue$$1);
        return true;
      },
      has: function has(target, property) {
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

var extractBindings$$1 = common.extractBindings;
var registerComponents$$1 = common.registerComponents;
var _dbg = common.dbg;
var Backdrop$$1 = common.Backdrop;
var getVueVersion$$1 = common.getVueVersion;
var buildLibrary$$1 = common.buildLibrary;


function formation(Vue$$1, options, plugins) {
  var VUE_VERSION = getVueVersion$$1(Vue$$1);
  var DEBUG = Boolean(dash.get(options, 'slient', !Vue$$1.config.silent));

  var _buildLibrary = buildLibrary$$1(options, plugins),
      components = _buildLibrary.components;

  return {
    name: 'formation',
    template: '\n      <div class="formation formation-root">\n        <div v-if="compiled" :class="[\'formation-\' + framework.name, \'formation-framework\']">\n          <component v-for="' + (VUE_VERSION === 1 ? '(idx, c)' : '(c, idx)') + ' in config.components || []"\n          :key="idx"\n          :is="\'formation-\' + c.type"\n          :config="c.config || {}"\n          :components="c.components || []"\n          ' + (VUE_VERSION === 1 ? ':value.sync' : 'v-model') + '="modelData"></component>\n        </div>\n      </div>',
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
        type: Object,
        required: true,
        validator: function validator(value) {
          return dash.has(value, 'name');
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
        default: DEBUG
      }
    },
    vuex: VUE_VERSION === 1 ? {} : undefined,
    created: function created() {
      // check if vuex mutation has been included
      if (this.vuex && !dash.has(this, '$store._mutations["' + VUEX_MUTATION + '"]')) {
        this.dbg(new Error('unable to find formation mutation "' + VUEX_MUTATION + '", ' + 'please ensure it is included during the Vuex store initialization. Defaulting to object model'));
      }

      this.createEventListeners();
    },
    beforeDestroy: function beforeDestroy() {
      this.removeEventListeners();
    },

    computed: {
      modelData: function modelData() {
        return this.vuex && dash.has(this, '$store._mutations["' + VUEX_MUTATION + '"]') ? vuexModel.call(this, this.vuex, Vue$$1) : vueModel.call(this, this.value, Vue$$1);
      },
      _bindings: function _bindings() {
        return extractBindings$$1(this._config);
      },
      _config: function _config() {
        return this.config;
      },
      formationRoot: function formationRoot() {
        return {
          vue: Vue$$1,
          vm: this,
          root: this.$root,
          version: VUE_VERSION,
          framework: this.framework,
          frameworkName: this.framework.name,
          eventHub: this.eventHub,
          localHub: this.localHub,
          components: this.components,
          common: common
        };
      }
    },
    methods: {
      render: function render() {
        this.updateComponents(true);
        this.compiled = false;
        this.compiled = true;
      },
      dbg: function dbg$$1() {
        if (this.debug) _dbg.apply(this, [].concat(Array.prototype.slice.call(arguments)));
      },
      updateComponents: function updateComponents(refresh) {
        registerComponents$$1(this, this.formationRoot, this._config, refresh);
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
      },
      createEventListeners: function createEventListeners() {
        var _this = this;

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
      removeEventListeners: function removeEventListeners() {
        this.$root.$off('backdrop.show', this.createBackdrop);
        document.removeEventListener('keyup', this.domKeyupListener);
      }
    },
    watch: {
      framework: function framework() {
        this.eventHub.$emit(this.name + '.render.components');
      }
    },
    data: function data() {
      return {
        components: components,
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