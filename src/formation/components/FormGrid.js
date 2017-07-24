import * as _ from '../utils/litedash/dash'
import {
  makeTemplateBindings,
  extendMethods,
  extendProps,
  compileTemplate,
  columnWidths,
  extractBindings
} from '../common/index'
import { TAG_COMPONENTS, TAG_BINDINGS } from '../common/constants'

export default function FormGrid (binding, framework, frameworks, component, version) {
  let f = _.get(frameworks, `["${framework}"]`, {})
  let COL_LIMIT = _.get(f, 'maxCols', 12)
  let colClasser = _.get(f, 'components["form-grid"].columnClass', () => [])
  let info = {
    binding,
    framework: frameworks[framework],
    component,
    version
  }

  return {
    template: compileTemplate(info, frameworks, framework, 'form-grid', [
      {
        tag: TAG_BINDINGS,
        value: ` ${makeTemplateBindings(binding)} `
      },
      {
        tag: TAG_COMPONENTS,
        value: `<component :is="kebab('formation-' + col.type)"
          :config="col.config || {}"
          :components='col.components || []'
          :bindings="bindings"
          :framework="framework"
          :frameworks="frameworks"
          :register="register"
          :event-hub="eventHub"
          :local-hub="localHub"
          :version="${version}"
          ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>`
      }
    ]),
    name: 'formation-form-grid',
    props: extendProps(version),
    methods: extendMethods({
      columnClass (rowIdx, colIdx) {
        return colClasser(_.get(
          columnWidths(
            _.get(this.config, `rows[${rowIdx}].columns`),
            COL_LIMIT
          ),
          `[${colIdx}]`,
          1
        ))
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
      this.register(this, this._components, extractBindings(this.config), this.framework, this.frameworks)
    }
  }
}
