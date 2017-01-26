/* eslint-disable */
function first (array) {
  return (!Array.isArray(array) || !array.length)
    ? undefined
    : array[0]
}

first._accepts = [Array]

export default first
