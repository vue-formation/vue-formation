/* eslint-disable */
function ensureArray (obj) {
  if (!arguments.length) return []
  return Array.isArray(obj) ? obj : [obj]
}

ensureArray._accepts = ['ANY']

export default ensureArray
