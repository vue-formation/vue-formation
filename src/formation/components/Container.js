import {
  makeTemplateBindings,
  extendMethods,
  extendProps,
  compileTemplate,
  nestedComponents
} from '../common/index'
import { TAG_COMPONENTS, TAG_BINDINGS } from '../common/constants'

export default function Container (binding, framework, frameworks, component, version) {
  let info = {
    binding,
    framework: frameworks[framework],
    component,
    version
  }

  return {
    template: compileTemplate(info, frameworks, framework, 'container', [
      {
        tag: TAG_BINDINGS,
        value: ` ${makeTemplateBindings(binding)} `
      },
      {
        tag: TAG_COMPONENTS,
        value: nestedComponents(version)
      }
    ]),
    name: 'formation-container',
    props: extendProps(version),
    methods: extendMethods(),
    created () {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks)
    }
  }
}
