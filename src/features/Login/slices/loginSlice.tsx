import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    token: '',
    isUserNameEntered: false,
    isTokenEntered: false,
    isLoginEnabled: false,
    loginError: ''
  },
  reducers: {
    SET_USERNAME: (state, action) => {
      state.username = action.payload
    },
    SET_TOKEN: (state, action) => {
      state.token = action.payload
    },
    SET_IS_USERNAME_ENTERED: (state, action) => {
      state.isUserNameEntered = action.payload
    },
    SET_IS_TOKEN_ENTERED: (state, action) => {
      state.isTokenEntered = action.payload
    },
    SET_IS_LOGIN_ENABLED: (state, action) => {
      state.isLoginEnabled = action.payload
    },
    SET_LOGIN_ERROR: (state, action) => {
      state.loginError = action.payload
    }
  }
})

export const {
  SET_USERNAME,
  SET_TOKEN,
  SET_IS_USERNAME_ENTERED,
  SET_IS_TOKEN_ENTERED,
  SET_IS_LOGIN_ENABLED,
  SET_LOGIN_ERROR
} = loginSlice.actions

export default loginSlice.reducer
