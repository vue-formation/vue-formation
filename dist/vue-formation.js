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

var TextInput = {
    template: `
<input type="text" :class="clazz" v-model="value[config.model]">
`,
    name: 'formation-text-input',
    props: {
      value: {
        type: Object,
        required: true,
        twoWay: VueMultiVersion.select(true, undefined)
      },
      config: { type: Object, default () { return {} } },
      components: { type: Array, default () { return [] } }
    },
    computed: {
      clazz () {
        return mergeClass({
          'form-control': true
        }, this.config.class)
      }
    }
  };

var bootstrapComponents = function (Vue$$1) {
  Vue$$1.component('formation-button', Vue$$1.extend(Button));
  Vue$$1.component('formation-container', Vue$$1.extend(Container));
  Vue$$1.component('formation-div', Vue$$1.extend(Div));
  Vue$$1.component('formation-text-input', Vue$$1.extend(TextInput));
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
