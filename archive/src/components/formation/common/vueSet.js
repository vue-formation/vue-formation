import _ from './dash/dash.index'
import Vue from 'vue'

export default function vueSet (obj, path, val, vue) {
  let $set = vue ? vue.set : Vue.set
  let value = obj
  let fields = _.isArray(path) ? path : _.toPath(path)

  _.forEach(fields, (part, idx) => {
    if (idx === fields.length - 1) $set(value, part, val)
    else if (!value.hasOwnProperty(part)) $set(value, part, _.isNumber(part) ? [] : {})
    value = value[part]
  })
}
