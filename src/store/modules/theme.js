const CHANGE_THEME = 'CHANGE_THEME'

const state = {
  isDark: JSON.parse(localStorage.getItem('isDark')) || true,
}

const mutations = {
  [CHANGE_THEME](themeState, theme) {
    Object.assign(themeState, { isDark: theme })
  },
}

const actions = {
  [CHANGE_THEME]({ commit }, payload) {
    localStorage.setItem('isDark', JSON.stringify(payload.theme))
    commit(CHANGE_THEME, payload.theme)
  },
}

export default {
  state,
  mutations,
  actions,
}
