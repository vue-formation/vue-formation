/* eslint-disable */
let range = function (number = 0, increment = 1) {
  return [ ...Array(number).keys() ].map(i => i * increment)
}

range._accepts = [Number]

export default range
