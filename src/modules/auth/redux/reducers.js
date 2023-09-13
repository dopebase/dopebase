import { SET_CURRENT_USER, USER_LOADING, GET_ERRORS } from './types'

const initialState = {
  user: {},
  loading: false,
  errors: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action)
      return {
        ...state,
        user: action.payload,
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ERRORS:
      return { errors: action.payload }
    default:
      return state
  }
}

export default authReducer
