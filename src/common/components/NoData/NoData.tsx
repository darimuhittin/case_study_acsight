import classNames from 'common/util/classNames'
import styles from './NoData.module.scss'
const NoData = (): JSX.Element => {
  return (
    <div
      className={classNames(
        'd-flex flex-column align-items-center justify-content-center',
        styles.container
      )}>
      <h1 className={styles.header}>No data found.</h1>
      <img src="/images/no-data2.png" alt="No Data" width={'20%'} />
    </div>
  )
}

export default NoData
