import axios from 'axios'
// import router from '@/routes'

const apiPrefix = '/e_api'

const ELearnAxios = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const onError = error => Promise.reject(error)
// const { status } = error.response
// if (status === 404) {
//   Message.error(error.response.data)
// } else if (status === 401) {
//   // Message.warning('权限认证失败或登录过期，请重新登录')
//   store.dispatch('TEACHER_LOGOUT')
//   router.push({ path: '/login' })
// } else if (status >= 500) {
//   // Message.error('服务器错误')
// } else if (status === 422) {
//   // Message.error(error.response.data.message)
// } else if (status === 400) {
//   // Message.error(error.response.data.message)
// }

const httpGet = async (url, config) => {
  try {
    const response = await ELearnAxios.get(`${apiPrefix}${url}`, config)
    return response
  } catch (error) {
    onError(error)
    return Promise.reject(error)
  }
}

const httpPost = async (url, data, config) => {
  try {
    const response = await ELearnAxios.post(`${apiPrefix}${url}`, data, config)
    return response
  } catch (error) {
    onError(error)
    return Promise.reject(error)
  }
}

const httpPut = async (url, data, config) => {
  try {
    const response = await ELearnAxios.put(`${apiPrefix}${url}`, data, config)
    return response
  } catch (error) {
    onError(error)
    return Promise.reject(error)
  }
}

const httpDelete = async (url, config) => {
  try {
    const response = await ELearnAxios.delete(`${apiPrefix}${url}`, config)
    return response
  } catch (error) {
    onError(error)
    return Promise.reject(error)
  }
}

export {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
}
