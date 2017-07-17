/* eslint-disable */
// taken from lodash - https://github.com/lodash/lodash
function escapeRegExp (str) {
  let reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  let reHasRegExpChar = RegExp(reRegExpChar.source)
  str = toString(str)
  return (str && reHasRegExpChar.test(str)) ? str.replace(reRegExpChar, '\\$&') : str
}

escapeRegExp._accepts = [String]

export default escapeRegExp
