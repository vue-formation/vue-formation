import _ from '../utils/litedash/dash.index'
import baseFrameworks from '../frameworks/index'
import baseComponents from '../components/index'
import common from './index'

export default function buildLibrary (options, plugins) {
  let frameworks = _.merge({}, baseFrameworks, _.get(options, 'frameworks', {}))
  let components = _.merge({}, baseComponents, _.get(options, 'components', {}))

  // process any plugins
  _.forEach(plugins, plugin => {
    if (_.isFunction(plugin.components)) _.merge(components, plugin.components(common))
    if (_.has(plugin, 'frameworks')) _.merge(frameworks, plugin.frameworks)
  })

  return { frameworks, components }
}
