import * as _ from '../utils/litedash/dash'

export default function compileTemplate (version, frameworks, framework, widgetName, interpolations) {
  let template = _.get(frameworks, `["${framework}"].components["${widgetName}"].template`)
  if (!template) {
    template = '<div></div>'
    console.error(`[vue-formation]: unable to find component "${widgetName}" in current ${framework} framework`)
  }

  // if template is a function call it and pass the version
  template = _.isFunction(template)
    ? template(version)
    : template

  _.forEach(interpolations, ({ tag, value }) => {
    template = template.replace(tag, value)
  })
  return template
}
