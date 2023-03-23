import { useReducer } from 'react'

import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { postQuery } from 'api/API'
import { SET_ADD_USER_MODAL_OPEN } from '../../slices/usersSlice'

const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_GENDER':
      return { ...state, gender: action.payload }
    case 'SET_STATUS':
      return { ...state, status: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'RESET':
      return { ...state, name: '', email: '', gender: 'female', status: 'active', error: '' }
    default:
      return state
  }
}

const initialState = {
  name: '',
  email: '',
  gender: 'female',
  status: 'active',
  error: ''
}

const AddUserModal = ({
  show,
  onSuccess
}: {
  show: boolean
  onSuccess: () => void
}): JSX.Element => {
  const dispatch = useDispatch()
  const { mutateAsync, isLoading } = useMutation(
    async () => await postQuery(`users`, { name, email, gender, status })
  )

  const [{ name, email, gender, status, error }, dataDispatch] = useReducer(reducer, initialState)

  const close = (): void => {
    dataDispatch({
      type: 'RESET'
    })
    dispatch(SET_ADD_USER_MODAL_OPEN(false))
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
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group as={Row} className={'my-4'}>
            <Form.Label column sm={4}>
              Name :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  dataDispatch({
                    type: 'SET_NAME',
                    payload: e.target.value
                  })
                }}
                placeholder="Enter name"
                isValid={name.length > 0}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className={'my-4'}>
            <Form.Label column sm={4}>
              Email :
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => {
                  dataDispatch({
                    type: 'SET_EMAIL',
                    payload: e.target.value
                  })
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className={'my-4'}>
            <Form.Label column sm={4}>
              Gender :
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                value={gender}
                onChange={(e) => {
                  dataDispatch({
                    type: 'SET_GENDER',
                    payload: e.target.value
                  })
                }}>
                <option value={'male'}>Male</option>
                <option value={'female'}>Female</option>
              </Form.Select>
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
                <option value={'active'}>Active</option>
                <option value={'inactive'}>Inactive</option>
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

export default AddUserModal
