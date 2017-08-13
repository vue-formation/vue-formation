'use strict';

var TAG_BINDINGS = '$$bindings$$';
var TAG_MODEL = '$$model$$';
var TAG_COMPONENTS = '$$components$$';

var TAG_HEAD_COMPONENTS = '$$head_components$$';
var TAG_FOOT_COMPONENTS = '$$foot_components$$';

var BUTTON_CLASS_MAP = {
  default: 'teal',
  primary: 'blue',
  success: 'green',
  info: 'cyan',
  warning: 'amber',
  danger: 'red',
  link: 'btn-flat'
};

function columnClass(width) {
  return ['s' + width];
}

var materialize = {
  name: 'materialize',
  maxCols: 12,
  columnClass: columnClass,
  buttonClassMap: BUTTON_CLASS_MAP,
  components: {
    A: {
      template: '<a ' + TAG_BINDINGS + '>' + TAG_COMPONENTS + '</a>'
    },
    Button: {
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

        return '<div ' + TAG_BINDINGS + '>\n          <form class="col s12">\n            <div v-for="(' + (version === 1 ? 'rIdx, row' : 'row, rIdx') + ') in config.rows" class="row">\n              <div v-for="(' + (version === 1 ? 'cIdx, col' : 'col, cIdx') + ') in row.columns" class="col input-field" :class="columnClass(rIdx, cIdx)">\n                ' + TAG_COMPONENTS + '\n                <label :class="{ active: isFocused[\'r\' + rIdx + \'c\' + cIdx] || value[col.config.model] || col.config.placeholder }">\n                  {{col.label}}\n                  <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">\n                      *\n                  </span>\n                </label>\n              </div>\n            </div>\n          </form>\n        </div>';
      }
    },
    Modal: {
      template: function template(_ref2) {
        var version = _ref2.version;

        return '<div ' + TAG_BINDINGS + '>\n          ' + (version === 1 ? '' : '<transition name="formation-fade">') + '\n          <div v-show="show" ' + (version === 1 ? 'transition="formation-fade-vue1x"' : '') + '\n          :class="{ \'formation-modal-blur-area\': dismissable }" @click="dismiss"\n          :style="{ position: \'fixed\', top: 0, left: 0, right: 0, bottom: 0, height: \'auto\', width: \'auto\', \'z-index\': zIndex }">\n            <div class="modal" style="display: block; top: 10%;">\n              <div class="modal-content">\n                <h4 v-if="hasPath(config, \'header.text\') && !hasPath(config, \'header.components\')"\n                v-text="config.header.text"></h4>\n                ' + TAG_HEAD_COMPONENTS + '\n                <p v-if="hasPath(config, \'body.text\')" v-text="config.body.text"></p>\n                ' + TAG_COMPONENTS + '\n              </div>\n              <div class="modal-footer" v-if="hasPath(config, \'footer\')">\n                ' + TAG_FOOT_COMPONENTS + '\n                <button class="btn teal" v-if="hasPath(config, \'footer.closeButton\')" type="button" \n                @click="hideModal" v-text="isString(config.footer.closeButton) ? config.footer.closeButton : \'Close\'"></button>\n              </div>\n            </div>\n          </div>\n          ' + (version === 1 ? '' : '</transition>') + '\n        </div>';
      }
    },
    TextInput: {
      template: '<input type="text" class="validate" ' + TAG_MODEL + ' ' + TAG_BINDINGS + '>'
    }
  }
};

module.exports = materialize;
