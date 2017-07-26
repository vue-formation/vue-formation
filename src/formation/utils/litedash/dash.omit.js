/* eslint-disable */
import omitBy from './dash.omitBy'

function omit (obj, omits) {
  omits = Array.isArray(omits) ? omits : []
  return omitBy(obj, (v, k) => {
    return omits.indexOf(k) !== -1
  })
}

omit._accepts = [Object]
omit._dependencies = [
  'dash.omitBy'
]

export default omit
