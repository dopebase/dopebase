import axios from 'axios'
import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from './types'
import setAuthToken from '../utils/setAuthToken'
import { websiteURL } from '../../../config/config'

// Register User
export const registerUser = (userData, router, dispatch2) => dispatch => {
  const endpoint = `${websiteURL}api/auth/register`
  console.log(userData)
  console.log(endpoint)
  axios
    .post(endpoint, userData)
    .then(response => {
      dispatch2(
        loginUser(
          { ...response.data, password: userData.password },
          router,
          dispatch2,
        ),
      )
    }) // re-direct to login on successful register
    .catch(err => {
      console.log(err)
      dispatch2({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// Login - get user token
export const loginUser = (loginData, router, dispatch2) => dispatch => {
  const endpoint = `${websiteURL}api/auth/login`
  axios
    .post(endpoint, loginData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token, userData } = res.data
      localStorage.setItem('jwtToken', token)
      // Set token to Auth header
      setAuthToken(token)
      if (userData?.role === 'admin' || userData?.role === 'employee') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    })
    .catch(err =>
      dispatch2({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
}

// Log user out
export const logoutUser = (dispatch, router) => dispatch2 => {
  // If database is mongoDB
  // Remove token from local storage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  dispatch(setCurrentUser(null))
  router.push('/login')
}

// Reset Password
export const resetPassword = (userData, router, dispatch2) => dispatch => {
  const endpoint = `${websiteURL}api/auth/resetPassword`
  axios
    .post(endpoint, userData)
    .then(response => {
      const data = response.data
      if (data.error) {
        dispatch2({
          type: GET_ERRORS,
          payload: data.error,
        })
      } else {
        dispatch2(
          loginUser(
            { ...data, password: userData.password },
            router,
            dispatch2,
          ),
        )
      }
    }) // re-direct to login on successful register
    .catch(err => {
      dispatch2({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}
