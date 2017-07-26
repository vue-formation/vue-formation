/* eslint-disable */
import isString from './dash.isString'

function properCase (string, separator = ' ') {
  if (!isString(string)) return ''
  return string.replace(/[\s-_]+/g, '-')
    .split('-')
    .map(v => {
      return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
    }).join(separator)
}

properCase._accepts = [String]

export default properCase
