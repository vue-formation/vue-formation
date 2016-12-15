var _ = require('lodash')
var data = {}
var obj = {}
var model = 'fdata'

Object.defineProperty(obj, model, {
  configurable: true,
  enumerable: true,
  get: () => _.get(data, model),
  set: (v) => _.set(data, model, v)
})

console.log(obj)

obj.fdata = { val: {} }

obj.fdata.val = 2

console.log(obj)
console.log(obj.fdata)
