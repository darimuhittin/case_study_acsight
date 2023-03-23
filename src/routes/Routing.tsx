import { lazy, Suspense } from 'react'

import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
// import Navigation from 'common/components/Navigation'
import store from 'app/store'
import { Provider } from 'react-redux'
// import Footer from 'common/components/Footer/Footer'
import { QueryClient, QueryClientProvider } from 'react-query'

const Login = lazy(async () => await import('features/Login'))
const Users = lazy(async () => await import('features/Users'))
const Details = lazy(async () => await import('features/Details'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true // default: true
    }
  }
})

const Routing = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to={'/consumer/login'} />} />
              <Route path="/consumer/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id/todos" element={<Details />} />

              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  )
}

export default Routing
