import { makeTemplateBindings, extendMethods, extendProps } from './common/index'

export default function Div (binding, framework, component, version) {
  let template = `<div ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config || {}"
    :components='c.components || []'
    :bindings="bindings"
    :framework="framework"
    :register="register"
    :event-hub="eventHub"
    :version="${version}"
    ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>
</div>`

  return {
    template,
    name: 'formation-div',
    props: extendProps(version),
    methods: extendMethods(),
    created () {
      this.register(this, this.components, this.bindings, this.framework)
    }
  }
}
