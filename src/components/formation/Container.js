import { makeTemplateBindings, extendMethods, extendProps } from './common/index'

export default function Container (binding, framework, component, version) {
  let template = `<div class="container" ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config"
    :components='c.components'
    :bindings="bindings"
    :framework="framework"
    :version="${version}"
    ${version === 1 ? ':value.sync' : 'v-model'}="value"></component>
</div>`

  return {
    template,
    name: 'formation-container',
    props: extendProps(version),
    methods: extendMethods(),
    created () {
      this.$formationRegisterComponents(this, this.components, this.bindings, this.framework)
    }
  }
}
