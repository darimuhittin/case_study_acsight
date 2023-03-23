import { useEffect } from 'react'

import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import classNames from '../../common/util/classNames'
import { useSelector, useDispatch } from 'react-redux'

import {
  SET_USERNAME,
  SET_TOKEN,
  SET_IS_USERNAME_ENTERED,
  SET_IS_TOKEN_ENTERED,
  SET_IS_LOGIN_ENABLED
} from './slices/loginSlice'

import styles from './Login.module.scss'
// import TokenInput from '../../common/components/NEW/TokenInput/TokenInput'

const Login = (): JSX.Element => {
  const {
    username,
    token,
    isUserNameEntered,
    isTokenEntered,
    isLoginEnabled,
    loginError
  }: {
    username: string
    token: string
    isUserNameEntered: boolean
    isTokenEntered: boolean
    isLoginEnabled: boolean
    loginError: string
  } = useSelector((state: any) => state.login)

  const tokenRegexp = /^(?=.*[A-Za-z])(?=.*\d).+$/i
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // DEBOUNCE EFFECTS
  useEffect(() => {
    if (username.length > 0) {
      if (isUserNameEntered) return
      const id = setTimeout(() => {
        dispatch(SET_IS_USERNAME_ENTERED(true))
      }, 1000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [username])

  useEffect(() => {
    if (token.length > 0) {
      if (isTokenEntered) return
      const id = setTimeout(() => {
        dispatch(SET_IS_TOKEN_ENTERED(true))
      }, 1000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [token])

  useEffect(() => {
    if (username.length > 2 && tokenRegexp.test(token)) {
      dispatch(SET_IS_LOGIN_ENABLED(true))
    } else {
      dispatch(SET_IS_LOGIN_ENABLED(false))
    }
  }, [username, token])

  const isUserNameValid = (): boolean => {
    if (!isUserNameEntered) {
      return true
    } else if (username.length < 3) {
      return false
    } else {
      return true
    }
  }

  const isTokenValid = (): boolean => {
    if (!isTokenEntered) {
      return true
    } else if (!tokenRegexp.test(token)) {
      return false
    } else {
      return true
    }
  }

  const handleLogin = (): void => {
    localStorage.setItem('xvfci', token)
    navigate('/users')
  }

  // const newLocal = <TokenInput
  //   className={styles.input_control}
  //   isInvalid={!isTokenValid()}
  //   onChange={(e) => dispatch(SET_TOKEN(e.target.value))}
  //   value={token}
  //   placeholder="Enter token" />
  return (
    <div style={{ color: '#000' }}>
      <Row className="m-0">
        <Col xs={12} lg={6} className={styles.left}>
          <Container className={styles.left_container}>
            <div className={styles.left_inner}>
              <span className={styles.left_inner__header}>dari</span>
              <div>
                <h3>Welcome to</h3>
                <h2>We&apos;re a Digital Agency.</h2>
                <p className={styles.left_inner__p}>
                  We are glad to see you again! Get access to your Orders, Wishlist and
                  Recommendations.
                </p>
              </div>
              <div>
                <span className="d-block">Don&apos;t have an account?</span>
                <Link to="#" className={styles.left_inner__reg}>
                  Register
                </Link>
              </div>
            </div>
          </Container>
        </Col>
        <Col xs={12} lg={6} className={styles.right}>
          <Container>
            <div className={styles.right__inner}>
              <h1 className="mb-5">Log In</h1>
              <h2 className={classNames('mb-8', styles.h2)}>Log In to try our amazing services</h2>
              <Form>
                <Form.Group className="mb-7">
                  <Form.Label className={styles.input_label}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    className={classNames(styles.input_control)}
                    minLength={3}
                    isInvalid={!isUserNameValid()}
                    onChange={(e) => dispatch(SET_USERNAME(e.target.value))}
                    value={username}
                  />
                  <span
                    className={classNames(
                      'text-danger',
                      styles.error_text,
                      !isUserNameValid() ? 'd-block' : 'invisible'
                    )}>
                    Username must be at least 3 characters long !
                  </span>
                </Form.Group>
                <Form.Group className="mb-7">
                  <Form.Label className={styles.input_label}>Token</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your token"
                    className={classNames(styles.input_control)}
                    isInvalid={!isTokenValid()}
                    onChange={(e) => dispatch(SET_TOKEN(e.target.value))}
                    value={token}
                  />
                  <span
                    className={classNames(
                      'text-danger',
                      styles.error_text,
                      !isTokenValid() ? 'd-block' : 'invisible'
                    )}>
                    Token must contain at least one letter and one number !
                  </span>
                </Form.Group>
                <Button
                  variant="primary"
                  className={styles.btn}
                  disabled={!isLoginEnabled}
                  onClick={handleLogin}>
                  Log In
                </Button>{' '}
                <span
                  className={classNames(
                    'text-danger',
                    styles.error_text,
                    loginError.length > 0 ? 'd-block' : 'invisible'
                  )}>
                  {loginError}
                </span>
              </Form>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  )
}

export default Login
