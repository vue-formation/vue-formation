import _ from '../utils/litedash/dash.index'
import { TAG_BINDINGS } from '../common/constants'

export default function (f, binding, component, name, interpolations) {
  name = _.properCase(name.replace(/^formation-/i, ''), '')
  let template = _.get(f.framework.components, `${name}.template`)
  interpolations = _.isArray(interpolations)
    ? interpolations
    : []

  if (!template) {
    template = '<div></div>'
    console.error(`[vue-formation]: unable to find component "${name}" in current ${f.frameworkName} framework`)
  }

  // generate the template code if a function is passed. this is also an opportunity to add more
  // interpolations and bindings
  template = _.isFunction(template) ? template(f, binding, component, name, interpolations) : template

  // add default interpolations, to override these the interpolation can be specified in the object
  interpolations.push({
    tag: TAG_BINDINGS,
    value: ` ${f.common.makeTemplateBindings(binding)} `
  })

  _.forEach(interpolations, ({ tag, value }) => {
    template = template.replace(tag, value)
  })
  return template
}
