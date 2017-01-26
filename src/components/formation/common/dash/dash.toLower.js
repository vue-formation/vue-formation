/* eslint-disable */
import isString from './dash.isString'

function toLower (string) {
  return isString(string) ? string.toLowerCase() : ''
}

toLower._accepts = [String]

export default toLower
