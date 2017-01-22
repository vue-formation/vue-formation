/* eslint-disable */
import isString from './dash.isString'

let toLower = function (string) {
  return isString(string) ? string.toLowerCase() : ''
}

toLower._accepts = [String]

export default toLower
