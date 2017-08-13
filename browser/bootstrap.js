(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TAG_BINDINGS = '$$bindings$$';
var TAG_MODEL = '$$model$$';
var TAG_COMPONENTS = '$$components$$';

var TAG_HEAD_COMPONENTS = '$$head_components$$';
var TAG_FOOT_COMPONENTS = '$$foot_components$$';

var BUTTON_CLASS_MAP = {
  default: 'btn-default',
  primary: 'btn-primary',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  danger: 'btn-danger',
  link: 'btn-link'
};

function columnClass(width) {
  return ['col-sm-' + width];
}

var bootstrap = {
  name: 'bootstrap',
  maxCols: 12,
  columnClass: columnClass,
  buttonClassMap: BUTTON_CLASS_MAP,
  components: {
    A: {
      template: '<a ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</a>'
    },
    Button: {
      classMap: BUTTON_CLASS_MAP,
      template: function template(f, binding, component) {
        return '<button type="button" class="btn ' + f.common.defaultClass(BUTTON_CLASS_MAP, component) + '" ' + TAG_BINDINGS + '>\n          {{config.text}}\n          ' + TAG_COMPONENTS + '\n        </button>';
      }
    },
    Container: {
      template: '<div class="container" ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    Div: {
      template: '<div ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</div>'
    },
    FormGrid: {
      template: function template(_ref) {
        var version = _ref.version;

        return '<div ' + TAG_BINDINGS + '>\n          <form role="form">\n            <div v-for="(' + (version === 1 ? 'rIdx, row' : 'row, rIdx') + ') in config.rows">\n              <div class="row form-group">\n                <div v-for="(' + (version === 1 ? 'cIdx, col' : 'col, cIdx') + ') in row.columns" :class="columnClass(rIdx, cIdx)">\n                  <label style="width: 100%">\n                    {{col.label}}\n                    <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">\n                        *\n                    </span>\n                    ' + TAG_COMPONENTS + '\n                  </label>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>';
      }
    },
    Modal: {
      template: function template(_ref2) {
        var version = _ref2.version;

        return '<div ' + TAG_BINDINGS + '>\n          ' + (version === 1 ? '' : '<transition name="formation-fade">') + '\n          <div v-show="show" ' + (version === 1 ? 'transition="formation-fade-vue1x"' : '') + ' \n          :class="{ \'formation-modal-blur-area\': dismissable }" @click="dismiss" @keyup.esc="dismiss"\n          :style="{ zIndex: zIndex, position: \'fixed\', top: 0, left: 0, right: 0, bottom: 0, width: \'auto\', height: \'auto\' }">\n            <div class="modal-dialog">\n              <div class="modal-content">\n                <div class="modal-header" v-if="hasPath(config, \'header\')">\n                  <h4 class="modal-title" v-if="hasPath(config, \'header.text\')" v-text="config.header.text"></h4>\n                  ' + TAG_HEAD_COMPONENTS + '\n                </div>\n                <div class="modal-body">\n                  <p v-if="hasPath(config, \'body.text\')" v-text="config.body.text"></p>\n                  ' + TAG_COMPONENTS + '\n                </div>\n                <div class="modal-footer" v-if="hasPath(config, \'footer\')">\n                  ' + TAG_FOOT_COMPONENTS + '\n                  <button class="btn btn-default" v-if="hasPath(config, \'footer.closeButton\')" type="button" \n                  @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : \'Close\'"></button>\n                </div>\n              </div>\n            </div>\n          </div>\n          ' + (version === 1 ? '' : '</transition>') + '\n        </div>';
      }
    },
    TextInput: {
      template: '<input type="text" class="form-control" ' + TAG_MODEL + ' ' + TAG_BINDINGS + '>'
    }
  }
};

module.exports = bootstrap;

},{}]},{},[1]);
