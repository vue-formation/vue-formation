export const changeTheme = ({dispatch}, theme) => {
  dispatch('CHANGE_THEME', theme)
}
export const customTheme = ({dispatch}, theme) => {
  dispatch('CUSTOM_THEME', theme)
}
export const changeInvertedLogo = ({dispatch}, inverted) => {
  dispatch('CHANGE_INVERTED_LOGO', inverted)
}
export const activateMainTab = ({dispatch}, tab) => {
  dispatch('ACTIVATE_MAIN_TAB', tab)
}
