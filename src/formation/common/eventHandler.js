import _ from '../utils/litedash/dash.index'
import evalEvent from './evalEvent'

export default function eventHandler (name, event) {
  let handler = _.get(this.config, `on.${name}`)
  return handler
    ? evalEvent(handler, this)(event)
    : null
}
