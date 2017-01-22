(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$_ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* eslint-disable */
var isArray = function isArray(obj) {
  return Array.isArray(obj);
};

isArray._accepts = ['ANY'];

/* eslint-disable */
var forEach = function forEach(obj, fn) {
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
};

forEach._accepts = [Object, Array];

/* eslint-disable */
var addClass = function addClass(className) {
  var classList = Array.isArray(className) ? className : className.split(/\s+/);
  this.each(function (i, el) {
    forEach(classList, function (clazz) {
      return el.classList.add(clazz);
    });
  });
  /*
  each(this, function (i, el) {
    each(classList, function (j, clazz) {
      el.classList.add(clazz)
    })
  })
  */
};

addClass._dependencies = ['query.each', 'dash.forEach'];

/* eslint-disable */
var isString = function isString(obj) {
  return typeof obj === 'string';
};

isString._accepts = ['ANY'];

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





























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint-disable */
var isObject = function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
};

isObject._accepts = ['ANY'];

/* eslint-disable */
var rx = /^data-(.+)/;

function getAttrs(node) {
  var obj = {};

  forEach(node.attributes, function (attr) {
    var name = attr.name,
        nodeName = attr.nodeName,
        localName = attr.localName,
        value = attr.value,
        nodeValue = attr.nodeValue,
        textContent = attr.textContent;

    name = name || nodeName || localName;
    value = value || nodeValue || textContent;

    if (isString(name) && name.match(rx)) {
      obj[name.replace(rx, '$1')] = value;
    }
  });
  return obj;
}

function hasAttr(node, attrName) {
  var has = false;
  if (!node || !node.attributes) return has;
  forEach(node.attributes, function () {
    var _attr = attr,
        name = _attr.name,
        nodeName = _attr.nodeName,
        localName = _attr.localName;

    name = name || nodeName || localName;
    if (name === 'data-' + attrName) {
      has = true;
      return false;
    }
  });
  return has;
}

function setAttr(node, key, value) {
  if (hasAttr(node, key)) {
    node.setAttribute('data-' + key, value);
  } else {
    var _attr2 = document.createAttribute('data-' + key);
    _attr2.value = value;
    node.setAttributeNode(_attr2);
  }
}

var data = function data(key, val) {
  var node = this[0];

  if (!node) {
    return null;
  } else if (!key) {
    return getAttrs(node);
  } else if (key && val === undefined) {
    if (isString(key)) {
      return getAttrs(node)[key];
    } else if (isObject(key)) {
      return forEach(key, function (v, k) {
        setAttr(node, k, v);
      });
    }
  }

  // set a key/value
  setAttr(node, key, val);
};

/* eslint-disable */
var each = function each(fn) {
  forEach(this.slice(0, this.length), function (v, k) {
    return fn.bind(v)(k, v);
  });
};

each._baseutil = true;

/* eslint-disable */
var mapWith = function mapWith(obj, fn) {
  var newObj = [];
  forEach(obj, function (v, k) {
    var value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj;
};

mapWith._accepts = [Object, Array];

/* eslint-disable */
var mapNodes = function mapNodes(element, selector) {
  return mapWith(element.querySelectorAll(selector), function (v) {
    return isObject(v) ? v : undefined;
  });
};

mapNodes._chainable = false;
mapNodes._dependencies = ['dash.mapWith', 'dash.isObject'];

/* eslint-disable */
var union = function union() {
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
};

union._accepts = ['ANY'];

/* eslint-disable */
var find = function find(selector) {
  var results = [];
  this.each(function () {
    results = union(results, mapNodes(this, selector));
  });
  return this.init(results, this);
};

find._terminates = true;
find._dependencies = ['query.mapNodes', 'query.each', 'dash.union'];

/* eslint-disable */
var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

isFunction._accepts = ['ANY'];

/* eslint-disable */
var isDate = function isDate(obj) {
  return obj instanceof Date;
};

isDate._accepts = ['ANY'];

/* eslint-disable */
var isHash = function isHash(obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj);
};

isHash._accepts = ['ANY'];
isHash._dependencies = ['dash.isArray', 'dash.isDate', 'dash.isObject'];

/* eslint-disable */
var includes = function includes(obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1;
};

includes._accepts = [Array];

/* eslint-disable */
var without = function without() {
  var output = [];
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (args.length < 2) return args.length ? args[0] : [];
  var search = args.slice(1);

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val);
  });
  return output;
};

without._accepts = [Array];
without._dependencies = ['dash.forEach', 'dash.includes'];

/* eslint-disable */
var map = function map(obj, fn) {
  var output = [];
  forEach(obj, function (v, k) {
    return output.push(fn(v, k));
  });
  return output;
};

map._accepts = [Object, Array];

/* eslint-disable */
function removeEvent(store, el, event, handler, uuid) {
  var toRemove = [];

  var _event$split = event.split(/\.(.+)?/),
      _event$split2 = slicedToArray(_event$split, 2),
      evt = _event$split2[0],
      ns = _event$split2[1];

  forEach(store.active, function (e) {
    var isElement = e.el === el;
    var isNS = e.ns === ns || !e.ns && !ns;
    var isEvent = e.event === event && isNS;
    var isHandler = e.handler === handler;
    var foundUUID = uuid === e.uuid;
    var foundEvent = isElement && (!event || isEvent && (isHandler || !handler));
    if (foundUUID || foundEvent) {
      toRemove.push(e);
      if (isFunction(e.off)) e.off();
    }
  });
  store.active = without.apply(this, [store.active].concat(toRemove));
}

var off = function off(events, selector, handler) {
  var queue = [];

  if (isFunction(selector) && !handler) {
    handler = selector;
    selector = undefined;
  }

  var base = selector ? this.find(selector) : this;

  if (isString(events)) {
    queue = map(events.split(/\s+/g), function (event) {
      return { event: event, handler: handler };
    });
  } else if (events instanceof this.$root.Event) {
    queue = [{ uuid: events.handlerId }];
  } else if (isHash(events)) {
    forEach(events, function (h, e) {
      queue = union(queue, map(e.split(/\s+/g), function (event) {
        return { event: event, handler: h };
      }));
    });
  } else if (!events) {
    base.each(function () {
      removeEvent(base.$root.event, this);
    });
    return this;
  }

  base.each(function () {
    var _this = this;

    forEach(queue, function (q) {
      return removeEvent(base.$root.event, _this, q.event, q.handler, q.uuid);
    });
  });

  return this;
};

off._dependencies = ['dash.isFunction', 'dash.isString', 'dash.isHash', 'dash.forEach', 'dash.union', 'dash.without', 'dash.map'];

/* eslint-disable */
function offHandler(el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler, false);
    return function () {
      return el.removeEventListener(event, handler, false);
    };
  } else if (el.attachEvent) {
    el.attachEvent(event, handler);
    return function () {
      return el.detachEvent(event, handler);
    };
  }
  return function () {
    return false;
  };
}

function addEvents(one, events, selector, data, fn) {
  if (!isString(selector)) {
    fn = data;
    data = selector;
    selector = undefined;
  }
  if (!isFunction(fn) && isFunction(data)) {
    fn = data;
    data = undefined;
  }
  if (!fn) fn = function fn() {
    return false;
  };

  var base = selector ? this.find(selector) : this;
  var uuid = base.$root.uuid();

  base.each(function (i, el) {
    var handler = function handler(event) {
      var e = new base.$root.Event(event, data, uuid);
      fn.call(el, e);
      if (one) base.off(e);
    };
    var prefix = !el.addEventListener ? 'on' : '';

    forEach(events.split(/\s+/g), function (event) {
      var _event$split = event.split(/\.(.+)?/),
          _event$split2 = slicedToArray(_event$split, 2),
          evt = _event$split2[0],
          ns = _event$split2[1];

      event = evt;
      var off = offHandler(el, '' + prefix + evt, handler);
      base.$root.event.active.push({ el: el, event: event, ns: ns, handler: handler, off: off, uuid: uuid });
    });
  });
}

var onEvent = function onEvent(one, events, selector, data, fn) {
  var _this = this;

  if (isHash(events)) forEach(events, function (h, e) {
    return addEvents.call(_this, one, e, selector, data, h);
  });else if (isString(events)) addEvents.call(this, one, events, selector, data, fn);
  return this;
};

onEvent._chainable = false;
onEvent._dependencies = ['dash.isFunction', 'dash.isString', 'dash.isHash', 'dash.forEach', 'query.each', 'query.find'];

/* eslint-disable */
var on = function on(events, selector, data, fn) {
  onEvent.call(this, false, events, selector, data, fn);
  return this;
};

/* eslint-disable */
var one = function one(events, selector, data, fn) {
  onEvent.call(this, true, events, selector, data, fn);
  return this;
};

/* eslint-disable */
var _query = {
  addClass: addClass,
  data: data,
  each: each,
  find: find,
  mapNodes: mapNodes,
  off: off,
  on: on,
  one: one,
  onEvent: onEvent
};

/* eslint-disable */
var infoName = 'liteutils';
var infoVersion = '0.1.0';

var arr = [];

var lQuery = function lQuery(selector, context) {
  var _this = this;

  context = context || document;
  if (selector !== document) this.prevObject = context instanceof lQuery ? context : new query.fn.init(context);
  var nodes = [];
  if (Array.isArray(selector)) nodes = selector;else if (selector instanceof lQuery) nodes = selector.slice(0, nodes.length);else if (typeof selector === 'string') nodes = mapNodes(context, selector);else nodes = [selector];
  this.length = nodes.length;
  forEach(nodes, function (node, idx) {
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

query.Event = function Event(event, data$$1, uuid) {
  var _this2 = this;

  classCallCheck(this, Event);

  forEach(event, function (v, k) {
    if (!k.match(/^[A-Z_]*$/)) _this2[k] = v;
  });
  this.originalEvent = event;
  this.handlerId = uuid;
  if (data$$1) this.data = data$$1;
};

forEach(_query, function (fn, name) {
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

module.exports = query;

},{}]},{},[1])(1)
});