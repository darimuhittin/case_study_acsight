import { useMemo } from 'react'

import { Container, Button } from 'react-bootstrap'
import styles from './Details.module.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getQuery } from '../../api/API'
import Table from '../../common/components/Table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { columnsData } from './util'
import AddTodoModal from './components/AddTodoModal/AddTodoModal'
import { SET_ADD_TODO_MODAL_OPEN } from './slices/detailsSlice'
import classNames from '../../common/util/classNames'
import NoData from '../../common/components/NoData/NoData'
import LoadingScreen from '../../common/components/LoadingScreen/LoadingScreen'
const Details = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const { isAddTodoModalOpen } = useSelector((state: any) => state.details)
  const { data, isLoading, refetch } = useQuery(
    ['users', id, 'todos'],
    async () => await getQuery(`users/${id as string}/todos`),
    { enabled: id != null && id !== '' }
  )
  const { data: userData } = useQuery(
    ['users', id],
    async () => await getQuery(`users/${id as string}`),
    { enabled: id != null && id !== '' }
  )

  const columns = useMemo(() => columnsData, [columnsData])

  // const tableData = useMemo(() => data, [data])

  const tableData = useMemo(() => data, [data])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Container className={styles.container}>
      <div className={classNames(styles.top, 'space-x-4')}>
        <Button
          variant="secondary"
          className={styles.back_button}
          onClick={() => {
            navigate(-1)
          }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
        <Button
          variant="primary"
          className={styles.add_button}
          onClick={() => {
            dispatch(SET_ADD_TODO_MODAL_OPEN(true))
          }}>
          <span>Add Todo</span>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>{data.length === 0 ? <NoData /> : <Table columns={columns} data={tableData} />}</>
      )}

      <AddTodoModal
        show={isAddTodoModalOpen}
        onSuccess={() => {
          void refetch()
        }}
        user={userData}
      />
    </Container>
  )
}

export default Details
