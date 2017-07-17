import { makeTemplateBindings, extendMethods, extendProps } from './common/index'

export default function A (binding, framework, component, version) {
  let template = `<a ${makeTemplateBindings(binding)}>
  <component v-for="${version === 1 ? '(idx, c)' : '(c, idx)'} in components"
    :key="idx"
    :is="kebab('formation-' + c.type)"
    :config="c.config || {}"
    :components='c.components || []'
    :bindings="bindings"
    :framework="framework"
    :register="register"
    :event-hub="eventHub"
    ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>
</a>`

  return {
    template,
    name: 'formation-a',
    props: extendProps(version),
    methods: extendMethods({}),
    created () {
      this.register(this, this.components, this.bindings, this.framework)
    }
  }
}
