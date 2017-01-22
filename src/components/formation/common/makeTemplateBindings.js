import _ from './dash/dash.index'

export default function makeTemplateBindings (binding) {
  let { attrs, data, on } = binding
  let bindings = []

  _.forEach(attrs, (attr) => {
    bindings.push(`:${attr}="hasAttr('${attr}') ? getAttr('${attr}') : null"`)
  })

  _.forEach(data, (datum) => {
    bindings.push(`:data-${datum}="hasData('${datum}') ? getData('${datum}') : null"`)
  })

  _.forEach(on, (evt) => {
    bindings.push(`v-on:${evt}="hasEvent('${evt}') ? eventHandler('${evt}', $event) : null"`)
  })

  return bindings.join(' ')
}
