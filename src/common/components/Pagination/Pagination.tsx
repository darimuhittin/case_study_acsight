import { Pagination } from 'react-bootstrap'
import styles from './Pagination.module.scss'
const PaginationLocal = ({
  onChangePage,
  currentPage,
  totalPages
}: {
  onChangePage: (page: number) => void
  currentPage: number
  totalPages: number
}): JSX.Element => {
  return (
    <Pagination className={styles.pagination}>
      <Pagination.First
        onClick={() => {
          onChangePage(1)
        }}
      />
      <Pagination.Prev
        onClick={() => {
          onChangePage(currentPage - 1)
        }}
      />
      <Pagination.Item
        className={currentPage === 1 ? styles.active : ''}
        onClick={() => {
          if (currentPage >= 3) {
            if (currentPage >= totalPages - 2) {
              onChangePage(totalPages - 4)
            } else {
              onChangePage(currentPage - 2)
            }
          } else {
            onChangePage(1)
          }
        }}>
        {currentPage >= 3 ? (currentPage >= totalPages - 2 ? totalPages - 4 : currentPage - 2) : 1}
      </Pagination.Item>

      <Pagination.Item
        className={currentPage === 2 ? styles.active : ''}
        onClick={() => {
          if (currentPage >= 3) {
            if (currentPage >= totalPages - 2) {
              onChangePage(totalPages - 3)
            } else {
              onChangePage(currentPage - 1)
            }
          } else {
            onChangePage(2)
          }
        }}>
        {currentPage >= 4 ? (currentPage >= totalPages - 2 ? totalPages - 3 : currentPage - 1) : 2}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => {
          if (currentPage >= 3) {
            if (currentPage >= totalPages - 2) {
              onChangePage(totalPages - 2)
            } else {
              onChangePage(currentPage)
            }
          } else {
            onChangePage(3)
          }
        }}
        className={currentPage > 2 && currentPage < totalPages - 1 && styles.active}>
        {currentPage > 2 ? (currentPage < totalPages - 2 ? currentPage : totalPages - 2) : 3}
      </Pagination.Item>
      <Pagination.Item
        onClick={() => {
          if (currentPage >= 3) {
            if (currentPage >= totalPages - 2) {
              onChangePage(totalPages - 1)
            } else {
              onChangePage(currentPage + 1)
            }
          } else {
            onChangePage(4)
          }
        }}
        className={currentPage === totalPages - 1 && styles.active}>
        {currentPage <= totalPages - 2 ? (currentPage > 2 ? currentPage + 1 : 4) : totalPages - 1}
      </Pagination.Item>

      <Pagination.Item
        onClick={() => {
          if (currentPage >= 3) {
            if (currentPage >= totalPages - 2) {
              onChangePage(totalPages)
            } else {
              onChangePage(currentPage + 2)
            }
          } else {
            onChangePage(5)
          }
        }}
        className={currentPage === totalPages && styles.active}>
        {currentPage <= totalPages - 3 ? (currentPage > 2 ? currentPage + 2 : 5) : totalPages}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => {
          onChangePage(currentPage + 1)
        }}
      />
      <Pagination.Last
        onClick={() => {
          onChangePage(totalPages)
        }}
      />
    </Pagination>
  )
}

export default PaginationLocal
