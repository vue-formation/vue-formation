import _ from './dash/dash.index'
import evalProp from './evalProp'

export default function getAttr (name, types) {
  let accept = [Function]
  _.forEach(types.split(','), (type) => {
    switch (type) {
      case 'Function':
        accept.push(Function)
        break
      case 'String':
        accept.push(String)
        break
      case 'Number':
        accept.push(Number)
        break
      case 'Boolean':
        accept.push(Boolean)
        break
      default:
        break
    }
  })

  return evalProp(
    accept,
    this.config.attrs[name],
    this,
    this.config,
    this.value,
    null
  )
}
