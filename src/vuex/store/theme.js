import * as _ from '../../utils/utils'

export const FORMATION_KEY = 'vue-formation'

const cookie = {
  logoInverted: false,
  collapsed: {},
  mainTab: 'about',
  theme: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css',
  themes: [
    {
      value: 'customurl',
      text: 'Custom URL'
    },
    {
      value: null,
      text: 'Bootstrap'
    },
    {
      value: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.css',
      text: 'Bootstrap Theme'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/flatly/bootstrap.min.css',
      text: 'Flatly'
    },
    {
      value: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css',
      text: 'Paper'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cerulean/bootstrap.min.css',
      text: 'Cerulean'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css',
      text: 'Cosmo'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cyborg/bootstrap.min.css',
      text: 'Cyborg'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/darkly/bootstrap.min.css',
      text: 'Darkly'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css',
      text: 'Journal'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/lumen/bootstrap.min.css',
      text: 'Lumen'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/readable/bootstrap.min.css',
      text: 'Readable'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/sandstone/bootstrap.min.css',
      text: 'Sandstone'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/simplex/bootstrap.min.css',
      text: 'Simplex'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/slate/bootstrap.min.css',
      text: 'Slate'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/spacelab/bootstrap.min.css',
      text: 'Spacelab'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/superhero/bootstrap.min.css',
      text: 'Superhero'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css',
      text: 'United'
    },
    {
      value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/yeti/bootstrap.min.css',
      text: 'Yeti'
    }
  ]
}

function parseCookie () {
  let localCookie = localStorage.getItem(FORMATION_KEY)
  if (localCookie) {
    try {
      return JSON.parse(localCookie)
    } catch (err) {}
  }
  return cookie
}
function setCookie (state, data) {
  try {
    /* global localStorage */
    localStorage.setItem(FORMATION_KEY, JSON.stringify(data))
    state.cookie = data
  } catch (err) {}
}

export const state = {
  /* global localStorage */
  cookie: JSON.parse(localStorage.getItem(FORMATION_KEY)) || cookie
}

export const mutations = {
  CHANGE_THEME (state, theme) {
    let data = parseCookie()
    data.theme = theme
    setCookie(state, data)
  },
  CUSTOM_THEME (state, theme) {
    let data = parseCookie()
    let found = _.find(data.themes, (t) => {
      return t.value === theme
    })
    let customs = _.filter(data.themes, (t) => {
      return Array.isArray(t.text.match(/^Custom[0-9]]/))
    })
    if (!found) {
      data.themes.push({
        text: `Custom${customs.length + 1}`,
        value: theme
      })
    }
    setCookie(state, data)
  },
  CHANGE_INVERTED_LOGO (state, inverted) {
    let data = parseCookie()
    data.logoInverted = inverted
    setCookie(state, data)
  },
  ACTIVATE_MAIN_TAB (state, tab) {
    let data = parseCookie()
    data.mainTab = tab
    setCookie(state, data)
  },
  SET_COLLAPSED (state, tab, collapsed) {
    let data = parseCookie()
    data.collapsed = data.collapsed || {}
    data.collapsed[tab] = collapsed
    setCookie(state, data)
  }
}
