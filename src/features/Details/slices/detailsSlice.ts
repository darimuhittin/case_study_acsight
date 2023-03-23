import { createSlice } from '@reduxjs/toolkit'

export const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    isAddTodoModalOpen: false
  },
  reducers: {
    SET_ADD_TODO_MODAL_OPEN: (state, action) => {
      return {
        ...state,
        isAddTodoModalOpen: action.payload
      }
    }
  }
})

export const { SET_ADD_TODO_MODAL_OPEN } = detailsSlice.actions

export default detailsSlice.reducer
