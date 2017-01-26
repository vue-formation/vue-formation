import {
  columnWidths,
  makeTemplateBindings,
  extendMethods,
  extendProps,
  dash as _
} from './common/index'
import widgets from './index'
import { BOOTSTRAP, SEMANTICUI, MATERIALIZE } from './common/constants'

export default function FormGrid (binding, framework, component, version) {
  let template = ''
  let COL_LIMIT = 12
  let rowArgs = 'row, rIdx'
  let colArgs = 'col, cIdx'

  switch (version) {
    case 1:
      rowArgs = 'rIdx, row'
      colArgs = 'cIdx, col'
      break
    default:
      break
  }

  switch (framework) {
    /*
     * Bootstrap base template
     */
    case BOOTSTRAP:
      COL_LIMIT = 12
      template = `
<div ${makeTemplateBindings(binding)}>
  <form role="form" :class="formatClass()">
    <div v-for="(${rowArgs}) in config.rows">
      <div class="row form-group">
        <div v-for="(${colArgs}) in row.columns" :class="columnClass(rIdx, cIdx)">
          <label style="width: 100%">
            {{col.label}}
            <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">
                *
            </span>
            <component v-if="hasWidget(col.type)"
              :is="kebab('formation-' + col.type)"
              :config="col.config || {}"
              :components='col.components || []'
              :bindings="bindings"
              :framework="framework"
              :register="register"
              :event-hub="eventHub"
              :version="${version}"
              ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>
          </label>
        </div>
      </div>
    </div>
  </form>
</div>
`
      break

    /*
     * Materialize CSS base template
     */
    case MATERIALIZE:
      COL_LIMIT = 12
      template = `
<div ${makeTemplateBindings(binding)}>
  <div class="row">
    <form class="col s12">
      <div v-for="(${rowArgs}) in config.rows" class="row">
        <div v-for="(${colArgs}) in row.columns" class="col input-field" :class="columnClass(rIdx, cIdx)">
          <component v-if="hasWidget(col.type)"
            :is="kebab('formation-' + col.type)"
            :config="col.config || {}"
            :components='col.components || []'
            :bindings="bindings"
            :framework="framework"
            :register="register"
            :event-hub="eventHub"
            :version="${version}"
            ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>
          <label :class="{ active: isFocused['r' + rIdx + 'c' + cIdx] || value[col.config.model] || col.config.placeholder }">
            {{col.label}}
            <span v-if="config.decorateRequired !== false && col.required && col.label" class="text-danger">
                *
            </span>
          </label>
        </div>
      </div>
    </form>
  </div>
</div>
`
      break

    /*
     * SemanticUI base template
     */
    case SEMANTICUI:
      template = `
<div ${makeTemplateBindings(binding)}>
</div>
`
      break

    default:
      break
  }

  return {
    template,
    name: 'formation-form-grid',
    props: extendProps(version),
    methods: extendMethods({
      hasWidget (widget) {
        if (!_.isString(widget)) return false
        return _.includes(
          _.map(_.keys(widgets), _.toLower),
          _.toLower(widget.replace(/-/g, ''))
        )
      },
      formatClass () {
        let format = _.get(this.config, 'format')

        switch (framework) {
          case BOOTSTRAP:
            return {
              'form-inline': format === 'inline',
              'form-horizontal': format === 'horizontal'
            }

          default:
            return {}
        }
      },
      columnClass (rowIdx, colIdx) {
        let width = _.get(
          columnWidths(
            _.get(this.config, `rows[${rowIdx}].columns`),
            COL_LIMIT
          ),
          `[${colIdx}]`,
          1
        )

        switch (framework) {
          case BOOTSTRAP:
            return [
              `col-xs-${width}`,
              `col-sm-${width}`,
              `col-md-${width}`,
              `col-lg-${width}`
            ]
          default:
            return []
        }
      }
    }),
    computed: {
      _components () {
        return this.config.rows.reduce((acc, row) => acc.concat(row.columns), [])
      }
    },
    data () {
      return {
        isFocused: {}
      }
    },
    created () {
      this.register(this, this._components, this.bindings, this.framework)
    }
  }
}
