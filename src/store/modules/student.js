const STUDENT_LOGIN = 'STUDENT_LOGIN'
const STUDENT_LOGOUT = 'STUDENT_LOGOUT'

const state = {
  student: JSON.parse(localStorage.getItem('student'))
            || JSON.parse(sessionStorage.getItem('student'))
              || {},
}

const mutations = {
  [STUDENT_LOGIN](loginState, student) {
    Object.assign(loginState.student, student)
  },
  [STUDENT_LOGOUT](logoutState) {
    Object.assign(logoutState.student, {})
    logoutState.student = {}
  },
}

const actions = {
  [STUDENT_LOGIN]({ commit }, payload) {
    if (payload.remember) {
      localStorage.setItem('student', JSON.stringify(payload.student))
    } else {
      sessionStorage.setItem('student', JSON.stringify(payload.student))
    }
    commit(STUDENT_LOGIN, payload.student)
  },
  [STUDENT_LOGOUT]({ commit }) {
    localStorage.removeItem('student')
    sessionStorage.removeItem('student')
    commit(STUDENT_LOGOUT)
  },
}

export default {
  state,
  mutations,
  actions,
}
