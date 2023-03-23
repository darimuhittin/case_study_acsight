import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'details',
  initialState: {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: '',
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    isAddUserModalOpen: false,
    editError: '',
    deleteError: ''
  },
  reducers: {
    SET_DATA: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    },
    SET_USER_DATA_ALL: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        gender: action.payload.gender,
        status: action.payload.status
      }
    },
    SET_EDIT_MODAL_OPEN: (state, action) => {
      return {
        ...state,
        isEditModalOpen: action.payload
      }
    },
    SET_ADD_USER_MODAL_OPEN: (state, action) => {
      return {
        ...state,
        isAddUserModalOpen: action.payload
      }
    },
    SET_EDIT_ERROR: (state, action) => {
      return {
        ...state,
        editError: action.payload
      }
    },
    SET_DELETE_MODAL_OPEN: (state, action) => {
      return {
        ...state,
        isDeleteModalOpen: action.payload
      }
    },
    SET_DELETE_ERROR: (state, action) => {
      return {
        ...state,
        deleteError: action.payload
      }
    }
  }
})

export const {
  SET_DATA,
  SET_EDIT_MODAL_OPEN,
  SET_ADD_USER_MODAL_OPEN,
  SET_EDIT_ERROR,
  SET_USER_DATA_ALL,
  SET_DELETE_MODAL_OPEN,
  SET_DELETE_ERROR
} = usersSlice.actions

export default usersSlice.reducer
