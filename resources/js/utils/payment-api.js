import axios from 'axios'

const _token = 'FLWSECK_TEST-dc7bc13f672d2d088cd8525227f3e445-X'
export default function api () {
  const makeRequest = axios.create({
    baseURL: process.env.MIX_REACT_APP_PAYMENT_PATH,
    headers: {
      Authorization: `Bearer ${_token}`
      // Accept: 'application/json',
      // 'Content-Type': 'application/json'
    }
  })

  makeRequest.interceptors.request.use(function (config) {
    //
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  makeRequest.interceptors.response.use(response => {
    return response
  }, error => {
    const code = error && error.response ? error.response.status : 0
    if (code === 401 || code === 403 || code === 419) {
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
  )

  return makeRequest
}
