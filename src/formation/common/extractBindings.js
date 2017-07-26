import _ from '../utils/litedash/dash.index'

/**
 * extracts attributes, data, and events from the config and creates
 * an object that can be used to create a template with those bindings
 */
export default function extractBindings (component, types = {}) {
  let { type, config } = component
  let { attrs, data, on } = config || {}

  if (type) {
    types[type] = types[type] || { attrs: ['class'], data: [], on: [] }
    if (attrs) types[type].attrs = _.union(types[type].attrs, _.keys(attrs))
    if (data) types[type].data = _.union(types[type].data, _.keys(data))
    if (on) types[type].on = _.union(types[type].on, _.keys(on))
  }

  if (_.isArray(_.get(component, 'components'))) {
    _.forEach(component.components, (c) => {
      extractBindings(c, types)
    })
  }
  if (_.isArray(_.get(component, 'rows'))) {
    _.forEach(component.rows, (row) => {
      if (_.isArray(_.get(row, 'columns'))) {
        _.forEach(row.columns, (col) => {
          if (col.config) extractBindings(col, types)
        })
      }
    })
  }
  return types
}
