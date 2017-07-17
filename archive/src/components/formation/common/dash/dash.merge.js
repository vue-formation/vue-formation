/* eslint-disable */
import isHash from './dash.isHash'
import forEach from './dash.forEach'
import includes from './dash.includes'

// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  if (isHash(target) && isHash(source)) {
    for (const key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key], seen.slice())
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

function merge () {
  let args = [ ...arguments ]

  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}

  let target = args[0]
  let sources = args.slice(1)

  forEach(sources, (source) => {
    if (isHash(source)) mergeDeep(target, source)
  })
  return target
}

merge._accepts = [Object]
merge._dependencies = [
  'dash.isHash',
  'dash.forEach',
  'dash.includes'
]

export default merge
