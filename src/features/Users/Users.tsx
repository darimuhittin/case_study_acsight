/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import {
  getQueryForHeaderData
  // getQuery
} from '../../api/API'
import UserCard from '../../common/components/UserCard/UserCard'
import EditModal from './components/EditModal/EditModal'

import { useSelector, useDispatch } from 'react-redux'
import { SET_ADD_USER_MODAL_OPEN } from './slices/usersSlice'

import styles from './Users.module.scss'
import AddUserModal from './components/AddUserModal/AddUserModal'
import DeleteModal from './components/DeleteModal/DeleteModal'
import NoData from '../../common/components/NoData/NoData'
import LoadingScreen from '../../common/components/LoadingScreen/LoadingScreen'
import PaginationLocal from '../../common/components/Pagination/Pagination'

const Users = (): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<Record<string, string>>({})
  const [users, setUsers] = useState<any>([])
  const [headers, setHeaders] = useState<any>([])
  const dispatch = useDispatch()

  const { isEditModalOpen, isAddUserModalOpen, isDeleteModalOpen } = useSelector(
    (state: any) => state.users
  )

  const changePage = (page: number): void => {
    if (page < 1) return
    if (page > headers.get('x-pagination-pages')) return
    setPage(page)
  }
  const { data, isLoading, refetch }: { data: any; isLoading: boolean; refetch: () => void } =
    useQuery(
      ['users', { page }],
      async () => {
        let queryString = ''
        for (const key in filter) {
          if (filter[key] !== '') {
            queryString += `&${key}=${filter[key]}`
          }
        }
        const url = `users?page=${page}&per_page=10${queryString}`
        return await getQueryForHeaderData(url)
      },
      {
        keepPreviousData: true
        // onSuccess: (data) => {
        //   setHeaders(data.headers)
        //   data.json().then((res) => {
        //     setUsers(res)
        //   })
        // }
      }
    )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data) {
      // There is a problem about caching data ...
      // This is beacause we re using getQueryForHeaderData
      // which is a function that returns the response not json() of the response
      // we need the whole response cuz we need the headers
      // so response changes every fetch and react query can't use it for cache
      // that's all for me right now. I searched a lot but couldn't find a solution

      console.log('BODY USED : ', data.bodyUsed)
      if (
        !(
          data as {
            bodyUsed: boolean
            json: () => Promise<any>
          }
        ).bodyUsed
      ) {
        console.log('DATA : ', data)
        setHeaders(data.headers)
        data.json().then((res) => {
          if (res !== users) {
            setUsers(res)
          }
        })
      }
    }
  }, [data])

  useEffect(() => {
    const id = setTimeout(() => {
      void refetch()
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [filter])

  return (
    <Container className={styles.container}>
      <div className={styles.top}>
        <Button
          variant="primary"
          className={styles.add_button}
          onClick={() => {
            dispatch(SET_ADD_USER_MODAL_OPEN(true))
          }}>
          <span>Add User </span>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <div className={styles.filter}>
        <Row>
          <Col
            className="d-flex my-2 justify-content-between align-items-center"
            xs={12}
            md={6}
            lg={3}>
            <span className="me-4">Name:</span>
            <Form.Control
              type="text"
              placeholder="Search"
              className={styles.filter__input}
              onChange={(e) => {
                setFilter({ ...filter, name: e.target.value })
              }}
            />
          </Col>
          <Col
            className="d-flex my-2 justify-content-between align-items-center"
            xs={12}
            md={6}
            lg={3}>
            <span className="me-4">Email:</span>
            <Form.Control
              type="text"
              placeholder="Search"
              className={styles.filter__input}
              onChange={(e) => {
                setFilter({ ...filter, email: e.target.value })
              }}
            />
          </Col>

          <Col
            className="d-flex my-2 justify-content-between align-items-center"
            xs={12}
            md={6}
            lg={3}>
            <span className="me-4">Gender:</span>
            <Form.Select
              onChange={(e) => {
                setFilter({ ...filter, gender: e.target.value })
              }}
              className={styles.filter__input}>
              <option value={''}>All</option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </Form.Select>
          </Col>

          <Col
            className="d-flex my-2 justify-content-between align-items-center"
            xs={12}
            md={6}
            lg={3}>
            <span className="me-4">Status:</span>
            <Form.Select
              onChange={(e) => {
                setFilter({ ...filter, status: e.target.value })
              }}
              className={styles.filter__input}>
              <option value={''}>All</option>
              <option value={'active'}>Active</option>
              <option value={'inactive'}>Inactive</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {users.length > 0 ? (
            <>
              <div className={styles.pagination_container}>
                <PaginationLocal
                  currentPage={page}
                  onChangePage={changePage}
                  totalPages={240}

                  // totalPages={headers.get('x-pagination-pages')}
                />
              </div>

              <Row>
                {users.map((user) => (
                  <Col
                    key={user.id}
                    xs={12}
                    lg={6}
                    style={{ marginBottom: '20px', justifyContent: 'center', display: 'flex' }}>
                    <UserCard user={user} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}

      <EditModal
        show={isEditModalOpen}
        onSuccess={() => {
          void refetch()
        }}
      />
      <AddUserModal
        show={isAddUserModalOpen}
        onSuccess={() => {
          void refetch()
        }}
      />
      <DeleteModal
        show={isDeleteModalOpen}
        onSuccess={() => {
          void refetch()
        }}
      />
    </Container>
  )
}

export default Users
