/* eslint-disable */
let pretty = function (obj, space = '  ') {
  try {
    return JSON.stringify(obj, null, space)
  } catch (err) {
    console.error(err)
    return ''
  }
}

pretty._accepts = [Object, Array, Date]

export default pretty
