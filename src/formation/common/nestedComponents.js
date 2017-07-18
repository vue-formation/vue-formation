export default function nestedComponents (version) {
  return `
<component v-for="${version === 1 ? '(idx, c)' : '(c, idx)'} in components"
  :key="idx"
  :is="kebab('formation-' + c.type)"
  :config="c.config || {}"
  :components='c.components || []'
  :bindings="bindings"
  :framework="framework"
  :frameworks="frameworks"
  :register="register"
  :event-hub="eventHub"
  :version="${version}"
  ${version === 1 ? ':value.sync' : 'v-model'}="value">
</component>`
}
