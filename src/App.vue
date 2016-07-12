<script type="text/babel">
  import Prism from 'prismjs'
  import Main from './components/Main'
  import HeadCss from './components/HeadCss'
  import store from './vuex/store'

  import 'prismjs/themes/prism.css'
  import 'prismjs/plugins/show-language/prism-show-language.css'

  Prism.languages.flowtype = Prism.languages.extend('javascript', {})

  export default {
    store,
    components: { Main, HeadCss },
    created () {
      /* Taken From example http://prismjs.com/plugins/show-language/ */
      var Languages = {}
      Prism.hooks.add('before-highlight', function (env) {
        let pre = env.element.parentNode
        if (!pre || !/pre/i.test(pre.nodeName)) {
          return
        }
        if (env.element.classList.contains('no-language-label')) return
        let language = pre.getAttribute('data-language') ||
          Languages[env.language] ||
          (env.language.substring(0, 1).toUpperCase() + env.language.substring(1))

        let langOverride = env.element.getAttribute('data-language-override')

        let sib = pre.previousSibling
        var div, div2
        if (sib && /\s*\bprism-show-language\b\s*/.test(sib.className) &&
          sib.firstChild &&
          /\s*\bprism-show-language-label\b\s*/.test(sib.firstChild.className)) {
          div2 = sib.firstChild
        } else {
          div = document.createElement('div')
          div2 = document.createElement('div')
          div2.className = 'prism-show-language-label'
          div.className = 'prism-show-language'
          div.appendChild(div2)
          pre.parentNode.insertBefore(div, pre)
        }
        div2.innerHTML = langOverride || language
      })
      this.$nextTick(() => {
        Prism.highlightAll()
      })
    }
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
