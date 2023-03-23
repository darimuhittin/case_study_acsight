import { useReducer } from 'react'

import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { postQuery } from 'api/API'
import { SET_ADD_TODO_MODAL_OPEN } from '../../slices/detailsSlice'
import { DateTime } from 'luxon'

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload }

    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return { ...state, title: '', date: '', status: 'pending', error: '' }
    default:
      return state
  }
}

const initialState = {
  title: '',
  date: '',
  status: 'pending',
  error: ''
}

const AddTodoModal = ({
  show,
  onSuccess,
  user
}: {
  show: boolean
  onSuccess: () => void
  user: any
}): JSX.Element => {
  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMutation(
    async () =>
      await postQuery(`users/${user.id as number}/todos`, {
        title,
        due_on: DateTime.now().toISO(),
        status,
        email: user.email
      })
  )

  const [{ title, status, error }, dataDispatch] = useReducer(reducer, initialState)

  const close = (): void => {
    dataDispatch({
      type: 'RESET'
    })
    dispatch(SET_ADD_TODO_MODAL_OPEN(false))
  }

  const handleSubmit = (e): void => {
    e.preventDefault()
    e.stopPropagation()

    mutateAsync()
      .then((res) => {
        if (res.status === 201) {
          onSuccess()
          close()
        } else if (res.status === 422) {
          // dataDispatch({
          //   type: 'SET_ERROR',
          //   payload: res.json()
          // })
          res.json().then((err) => {
            const field = err[0].field as string
            dataDispatch({
              type: 'SET_ERROR',
              payload: `${field.charAt(0).toUpperCase() + field.slice(1)} ${
                err[0].message as string
              }`
            })
          })
        }
      })
      .catch((e) => {
        console.log('TEST ', e)
      })
  }

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Todo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group as={Row} className={'my-4'}>
            <Form.Label column sm={4}>
              Title :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  dataDispatch({
                    type: 'SET_TITLE',
                    payload: e.target.value
                  })
                }}
                placeholder="Enter title"
                isValid={title.length > 0}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className={'my-4'}>
            <Form.Label column sm={4}>
              Status :
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                value={status}
                onChange={(e) => {
                  dataDispatch({
                    type: 'SET_STATUS',
                    payload: e.target.value
                  })
                }}>
                <option value={'pending'}>Pending</option>
                <option value={'completed'}>Completed</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 space-x-4">
            <Button variant="danger" onClick={close}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Create'}
            </Button>
          </div>
          {error != null && <span className="text-danger">{error} </span>}
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddTodoModal
