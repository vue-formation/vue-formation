import * as _ from '../utils/litedash/dash'
import {
  makeTemplateBindings,
  extendMethods,
  extendProps,
  defaultClass,
  compileTemplate
} from '../common/index'
import { TAG_BINDINGS, TAG_DEFAULT_CLASS } from '../common/constants'

export default function Button (binding, framework, frameworks, component, version) {
  let classMap = _.get(frameworks, `["${framework}"].components.button.classMap`, {})
  let info = {
    binding,
    framework: frameworks[framework],
    component,
    version
  }

  let template = compileTemplate(info, frameworks, framework, 'button', [
    {
      tag: TAG_BINDINGS,
      value: ` ${makeTemplateBindings(binding)} `
    },
    {
      tag: TAG_DEFAULT_CLASS,
      value: defaultClass(classMap, component)
    }
  ])

  return {
    template,
    name: 'formation-button',
    props: extendProps(version),
    methods: extendMethods(),
    created () {
      this.register(this, this.components, this.bindings, this.framework, this.frameworks)
    },
    data () {
      return {
        renderShow: true
      }
    }
  }
}
