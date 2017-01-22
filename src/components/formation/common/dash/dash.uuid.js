/* eslint-disable */
// taken from hat - https://github.com/substack/node-hat
let uuid = function (bits, base) {
  if (!base) base = 16
  if (bits === undefined) bits = 128
  if (bits <= 0) return '0'

  let digits = Math.log(Math.pow(2, bits)) / Math.log(base)
  for (let i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i
  }

  let rem = digits - Math.floor(digits)

  let res = ''

  for (let i = 0; i < Math.floor(digits); i++) {
    let x = Math.floor(Math.random() * base).toString(base)
    res = x + res
  }

  if (rem) {
    let b = Math.pow(base, rem)
    let x = Math.floor(Math.random() * b).toString(base)
    res = x + res
  }

  let parsed = parseInt(res, base)
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return uuid(bits, base)
  }
  else return res
}

uuid._accepts = []

export default uuid
