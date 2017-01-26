/* eslint-disable */
import ensureArray from './dash.ensureArray'

function castArray (value) {
  return ensureArray(value)
}

castArray._accepts = ['ANY']

export default castArray
