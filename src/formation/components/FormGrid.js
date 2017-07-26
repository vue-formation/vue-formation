import _ from '../utils/litedash/dash.index'
import { TAG_COMPONENTS } from '../common/constants'

export default function FormGrid (info) {
  let COL_LIMIT = _.get(info.f.framework, 'maxCols', 12)
  let colClasser = _.get(info.f.framework, 'columnClass', () => [])

  return info.f.common.extendComponent(info, [
    {
      tag: TAG_COMPONENTS,
      value: `<component :is="kebab('formation-' + col.type)"
          :config="col.config || {}"
          :components='col.components || []'
          ${info.f.version === 1 ? ':value.sync' : 'v-model'}="value">
        </component>`
    }
  ], {
    methods: {
      columnClass (rowIdx, colIdx) {
        return colClasser(_.get(
          info.f.common.columnWidths(
            _.get(this.config, `rows[${rowIdx}].columns`),
            COL_LIMIT
          ),
          `[${colIdx}]`,
          1
        ))
      }
    },
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
      info.f.common.registerComponents(this, info.f, { components: this._components })
    }
  })
}
