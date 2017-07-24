import Prism from 'prismjs'

const plugins = {
  'autolinker': { css: true },
  'autoloader': {},
  'command-line': { css: true },
  'copy-to-clipboard': {},
  'custom-class': {},
  'data-uri-highlight': {},
  'file-highlight': {},
  'highlight-keywords': {},
  'ie8': { css: true },
  'jsonp-highlight': {},
  'keep-markup': {},
  'line-highlight': { css: true },
  'line-numbers': { css: true },
  'normalize-whitespace': {},
  'previewer-angle': { css: true },
  'previewer-base': { css: true },
  'previewer-color': { css: true },
  'previewer-easing': { css: true },
  'previewer-gradient': { css: true },
  'previewer-time': { css: true },
  'remove-initial-line-feed': {},
  'show-invisibles': { css: true },
  'show-language': {},
  'toolbar': { css: true },
  'unescaped-markup': { css: true },
  'wpd': { css: true }
}

export default {
  components ({ extendProps, extendMethods, makeTemplateBindings, dash }) {
    return {
      SourceCode (binding, framework, frameworks, component, version) {
        return {
          components: { Prism },
          template: `<pre ${makeTemplateBindings(binding)}><code :class="codeClass" v-text="source"></code></pre>`,
          computed: {
            source () {
              return typeof this.config.source === 'string'
                ? this.config.source
                : ''
            },
            language () {
              return this.config.language || 'javascript'
            },
            plugins () {
              return Array.isArray(this.config.plugins)
                ? this.config.plugins
                : []
            },
            use () {
              return typeof this.config.use === 'function'
                ? this.config.use
                : () => true
            },
            preClass () {
              return {
                'command-line': this.hasPlugin('command-line')
              }
            },
            codeClass () {
              return {
                [`language-${this.language}`]: true
              }
            }
          },
          name: 'formation-source-code',
          props: extendProps(version),
          methods: extendMethods({
            render () {
              this.codeText = this.code || this.$el.innerText
              this.$el.firstChild.innerHTML = this.codeText
              Prism.highlightElement(this.$el.firstChild)
            },
            hasPlugin (plugin) {
              return this.plugins.indexOf(plugin) !== -1
            }
          }),
          created () {
            if (!Prism.languages[this.language]) {
              require(`prismjs/components/prism-${this.language}`)
            }

            this.plugins.forEach(plugin => {
              let p = plugins[plugin] || {}
              if (p) require(`prismjs/plugins/${plugin}/prism-${plugin}`)
              if (p.css) require(`prismjs/plugins/${plugin}/prism-${plugin}.css`)
            })

            this.use(Prism, this)
          },
          mounted () {
            this.render()
          },
          ready () {
            this.render()
          },
          data () {
            return {
              codeText: null
            }
          }
        }
      }
    }
  }
}
