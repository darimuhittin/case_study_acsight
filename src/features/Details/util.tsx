import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { DateTime } from 'luxon'

import styles from './Details.module.scss'

export const columnsData = [
  {
    Header: '#',
    accessor: 'id' // accessor is the "key" in the data
  },
  {
    Header: 'Title',
    accessor: 'title'
  },
  {
    Header: 'Date',
    accessor: 'due_on',
    Cell: ({ value }) => {
      return DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)
    }
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }: { value: string }) => {
      return value === 'completed' ? (
        <FontAwesomeIcon icon={faCheckCircle} className={styles.completed} size="2x" />
      ) : (
        <FontAwesomeIcon icon={faHourglassStart} className={styles.pending} size="2x" />
      )
    }
  }
]
