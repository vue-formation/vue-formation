/* eslint-disable */
import isArray from './dash.isArray'

let union = function () {
  let args = [ ...arguments ]
  if (!args.length) return []

  try {
    let u = args.reduce((prev, cur) => {
      if (!isArray(prev) || !isArray(cur)) return []
      return prev.concat(cur)
    }, [])

    return [ ...new Set(u) ]
  } catch (err) {
    console.error(err)
    return []
  }
}

union._accepts = ['ANY']

export default union
