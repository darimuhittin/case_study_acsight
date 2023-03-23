import { lazy, Suspense } from 'react'

import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
// import Navigation from 'common/components/Navigation'
import store from 'app/store'
import { Provider } from 'react-redux'
// import Footer from 'common/components/Footer/Footer'
import { QueryClient, QueryClientProvider } from 'react-query'
import MobileMenu from '../common/components/MobileMenu'

const Login = lazy(async () => await import('features/Login'))
const Users = lazy(async () => await import('features/Users'))
const Details = lazy(async () => await import('features/Details'))

const NotFound = lazy(async () => await import('features/NotFound'))
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
            {/* <Topbar />
          <MobileHeader /> */}
            {/* {location.pathname !== '/consumer/login' && <Navigation />} */}
            <MobileMenu />
            <Routes>
              {/* <Route exact path="/auth" component={AuthCmp} /> */}
              <Route path="/" element={<Navigate to={'/consumer/login'} />} />
              <Route path="/consumer/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id/todos" element={<Details />} />
              {/* <Route exact path="/products" element={<Products />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/features" element={<Features />} />
          <Route exact path="/tags" element={<Tags />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* {location.pathname !== '/consumer/login' && <Footer />} */}
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  )
}

export default Routing
