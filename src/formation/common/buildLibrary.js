import _ from '../utils/litedash/dash.index'
import baseComponents from '../components/index'
import common from './index'

export default function buildLibrary (options, plugins) {
  let components = _.merge({}, baseComponents, _.get(options, 'components', {}))

  // process any plugins
  _.forEach(plugins, plugin => {
    if (_.isFunction(plugin.components)) _.merge(components, plugin.components(common))
  })

  return { components }
}
