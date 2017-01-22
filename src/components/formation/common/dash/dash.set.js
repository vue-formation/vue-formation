/* eslint-disable */
import isArray from './dash.isArray'
import isNumber from './dash.isNumber'
import toPath from './dash.toPath'
import forEach from './dash.forEach'

let set = function (obj, path, val) {
  let fields = isArray(path) ? path : toPath(path)

  forEach(fields, (field, idx) => {
    if (idx === fields.length - 1) obj[field] = val
    else if (!obj[field]) obj[field] = isNumber(field) ? [] : {}
    obj = obj[field]
  })
}

set._accepts = [Object, Array]
set._dependencies = [
  'dash.isArray',
  'dash.isNumber',
  'dash.toPath',
  'dash.forEach'
]

export default set
