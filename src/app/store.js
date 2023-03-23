import { configureStore } from '@reduxjs/toolkit'
import loginReducer from 'features/Login/slices/loginSlice'
import globalReducer from 'slices/globalSlice'
import usersReducer from '../features/Users/slices/usersSlice'
import detailsReducer from '../features/Details/slices/detailsSlice'

export default configureStore({
  reducer: {
    login: loginReducer,
    global: globalReducer,
    users: usersReducer,
    details: detailsReducer
  }
})
