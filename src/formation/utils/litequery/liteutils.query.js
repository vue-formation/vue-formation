/* eslint-disable */
'use strict';

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
var each = function each(fn) {
  forEach(this.slice(0, this.length), function (v, k) {
    return fn.bind(v)(k, v);
  });
};

each._baseutil = true;

/* eslint-disable */
function mapWith(obj, fn) {
  var newObj = [];
  forEach(obj, function (v, k) {
    var value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj;
}

mapWith._accepts = [Object, Array];

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

/* eslint-disable */
function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
}

isObject._accepts = ['ANY'];

/* eslint-disable */
var mapNodes = function mapNodes(element, selector) {
  return mapWith(element.querySelectorAll(selector), function (v) {
    return isObject(v) ? v : undefined;
  });
};

mapNodes._chainable = false;
mapNodes._dependencies = ['dash.mapWith', 'dash.isObject'];

/* eslint-disable */
var _query = {
  each: each,
  mapNodes: mapNodes
};

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

query.Event = function Event(event, data, uuid) {
  var _this2 = this;

  classCallCheck(this, Event);

  forEach(event, function (v, k) {
    if (!k.match(/^[A-Z_]*$/)) _this2[k] = v;
  });
  this.originalEvent = event;
  this.handlerId = uuid;
  if (data) this.data = data;
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
