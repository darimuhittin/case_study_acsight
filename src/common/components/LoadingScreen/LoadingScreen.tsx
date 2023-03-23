import { Spinner } from 'react-bootstrap'
import styles from './LoadingScreen.module.scss'

const LoadingScreen = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: '3rem',
          height: '3rem',
          margin: 'auto',
          display: 'block'
        }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingScreen
