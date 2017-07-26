export default function nestedComponents (version, componentsObject = 'components') {
  return `
<component v-for="${version === 1 ? '(idx, c)' : '(c, idx)'} in ${componentsObject}"
  :key="idx"
  :is="kebab('formation-' + c.type)"
  :config="c.config || {}"
  :components='c.components || []'
  ${version === 1 ? ':value.sync' : 'v-model'}="value">
</component>`
}
