import _ from '../utils/litedash/dash.index'

export default function ensureConfig (config) {
  if (!_.isObject(config)) return { attrs: {}, data: {}, on: {} }
  if (!_.isObject(config.attrs)) config.attrs = {}
  if (!_.isObject(config.data)) config.data = {}
  if (!_.isObject(config.on)) config.on = {}
  return config
}
