/* eslint-disable */
function contains (list, obj) {
  return list.reduce((prev, cur) => (cur === obj && prev), false)
}

contains._accepts = [Array]

export default contains
