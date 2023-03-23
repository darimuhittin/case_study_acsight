import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isMobileMenuOpen: false
  },
  reducers: {
    OPEN_MOBILE_MENU: (state) => {
      state.isMobileMenuOpen = true
    },
    CLOSE_MOBILE_MENU: (state) => {
      state.isMobileMenuOpen = false
    }
  }
})

export const { OPEN_MOBILE_MENU, CLOSE_MOBILE_MENU } = globalSlice.actions

export default globalSlice.reducer
